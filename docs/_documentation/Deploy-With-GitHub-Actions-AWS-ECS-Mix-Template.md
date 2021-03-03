# GitHub Actions mix template - Deploy to AWS ECS

AWS EC2 Container Service is a managed container hosting environment that while not as flexible as Kubernetes, it provides some great integration if you are already in an AWS environment, especially for hosting HTTP APIs. However, when just getting started on a project, reaching for Application Load Balancers, CloudFront CDN, AutoScaling Groups etc can be a high cost entry point from a monthly cost and complexity standpoint. ECS on EC2 also provides a more predicable cost and runtime alternative to serverless solutions like AWS Lambda, Azure Functions or GCP Cloud Functions.

We've created a new `x mix release-ecr-aws` template to try and help bridge this gap to minimise effort getting started as well as keeping costs down for trying out ideas and still deploying to AWS ECS. Once your product grows, integrating all the other AWS infrastructure is a smaller and clearer path than trying to do it from the very beginning, not knowing if you'll ever need it.

We're also going to leverage the powerful GitHub Actions platform so that the distance between your CI environment and code is as small as possible. The `x mix release-ecr-aws` template provides a starting point for your ServiceStack application to have a CI setup and deploy to a *single* server in ECS to keep costs down. This is good for prototyping an idea or any low request rate applications where you think you'll move into a more standard ECS infrastructure pattern as your application usage increases.

### Getting started
For this tutorial, we'll start with a new ServiceStack application using `x new` and incorporate the GitHub Action templates to get our CI environment started.

First, create your new empty git repository on GitHub. Don't add any generated files.

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/github-create-new-repo.png)

Then you can use the following commands to get your new ServiceStack application setup in GitHub with GitHub Actions.
> Choose the appropriate web template from `x new` for your needs as most templates are compatible GitHub Actions `x mix` templates.

```
x new web MyApplication
cd MyApplication
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin <copy git URL from GitHub page>
git push -u origin main
x mix build release-ecr-aws
git add -A
git commit -m "Add GitHub Action files"
git push
```

## AWS Setup

If you're use to setting up larger AWS infrastructure, you'll likely have experienced how costs can rise easily or seen complex infrastructure architect for a web application doing 5 requests/sec with minimal users. These types of setups can be unnecessarily costly and complex and if you are a solo developer or small team and is likely not a well matched starting point. As your application infrastructure needs evolve, so can your cloud provider environment, this template provides a starting point with AWS ECS while keeping costs to a minimum.

This template needs the following in AWS:

- A dedicated ECS cluster (not shared)
- Single EC2 server in the ECS cluster
- User Credentials with `AmazonEC2ContainerRegistryFullAccess` and `AmazonECS_FullAccess` for use by GitHub Actions.
- Route53 with an A record pointing to the EC2 instance public IP

### ECS Cluster

An empty ECS Cluster is needed as the GitHub Action process won't create this for you. You can choose to use the ECS Cluster wizard to create you an Auto-scaling Group, security groups, etc but the idea to start with is to just start with an empty ECS Cluster that an EC2 instance will join when we create it. This pattern doesn't scale horizontally with additional EC2 instances. 
> If you know you need horizontal scaling, it would be suggested to jump straight to using Application Load Balancer with Target Groups to manage your cluster services routing with the additional costs that come with that.

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/create-cluster-ecs-1.png) ![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/create-cluster-ecs-2.png)


### EC2 Instance Setup
When launching the EC2 instance, you'll need to select an 'ECS optimized' AMI as the image used for your instance.
### Choose AMI
The easiest way to find the latest Amazon Linux 2 image for this is to go to the [AWS documentation for ECS-optimized AMIs and look up your region here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html#ecs-optimized-ami-linux).

Using the AMI ID (starts with `ami-`) at the bottom, search in the 'Community AMIs' tab on the first step of the `Launch EC2 Instance` wizard.

### Choose Instance Type
A t2.micro or larger will work fine, this pattern can be used to host multiple applications on the 1 server so if the number of applications gets larger, you might need a larger instance type.
> Note this pattern is suitable for testing prototypes or low traffic applications as it is cost effective and makes it easy to bundle multiple apps onto 1 EC2 instance.

### Configure Instance
Under `IAM role`, use the `ecsInstanceRole`, if this is not available, see [AWS documentation for the process of checking if it exists and creating it if needed](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html).

If you are *not* using your own generated Elastic IP, select `Enabled` for `Auto-assign Public IP`.

You will also want to add the following Userdata script (in the `Configure` step of the launch wizard) with your own `ECS_CLUSTER` value. This tells the ecs-agent running on the instance which ECS cluster the instance should join.

```bash
#!/bin/bash
cat <<EOS >/etc/ecs/ecs.config
ECS_CLUSTER=my-cluster
ECS_AVAILABLE_LOGGING_DRIVERS=["awslogs", "syslog"]
ECS_ENABLE_CONTAINER_METADATA=true
EOS
```

Note down your cluster name as it will need to be used to create the cluster in ECS before it is visible.
See [`ECS Container Agent Configuration`](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html) for more information.

### Add Storage
The default of 30gb is fine but take into account how large/how many applications you'll have running.

### Configure Security Groups
You'll want to expose at least ports 80 and 443.

### Setup Docker-compose and nginx-proxy
To let your server handle multiple ServiceStack applications and automate the generation and management of TLS certificates, an additional docker-compose file is provided via the `x mix` template, `nginx-proxy-compose.yml`. This docker-compose file is ready to run and can be copied to the deployment server.
> This is done via docker-compose rather than via ECS itself for simplicity.

First you'll need to install `docker-compose`.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
Run `docker-compose --version` to confirm.

To copy you can use scp or just creating a new file via server text editor to copy the short YML file over. For this example, we are going to copy it straight to the ~/ (home) directory.

```bash
scp -i <path to private ssh key> ./nginx-proxy-compose.yml ec2-user@<server_floating_ip>:~/nginx-proxy.compose.yml
```

For example, once copied to remote `~/nginx-proxy-compose.yml`, the following command can be run on the remote server.

```
docker-compose -f ~/nginx-proxy-compose.yml up -d
```

This will run an nginx reverse proxy along with a companion container that will watch for additional containers in the same docker network and attempt to initialize them with valid TLS certificates. This includes containers created and managed by the ECS agent.
> If the container doesn't have the environment variable `VIRTUAL_HOST` set, it will be ignored.

### Route 53

To enough the nginx-proxy-lets-ecrypt-companion to work, a domain or subdomain DNS entry is needed to point to our EC2 host. You can use any DNS management tool, but in this example we will be using Route53.



### Setup Repository Secrets

The GitHub Action templates added using `x mix release-ecr-aws` get their input from GitHub Secrets. These can be added to the repository or to your organization if there are common ones you are using in multiple repositories. 

- AWS_ACCESS_KEY_ID - AWS access key for programmatic access to AWS APIs.
- AWS_SECRET_ACCESS_KEY - AWS access secrets for programmatic access to AWS APIs.
- AWS_REGION - default region for AWS API calls.
- AWS_ECS_CLUSTER - Cluster name in ECS, this should match the value in your Userdata.
- HOST_DOMAIN - Domain/sub-domain of your application, eg `my-app.example.com` .
- LETSENCRYPT_EMAIL - Email address, required for Let's Encrypt automated TLS certificates.

These secrets can use the [GitHub CLI](https://cli.github.com/manual/gh_secret_set) for ease of creation. Eg, using the GitHub CLI the following can be set.

```bash
gh secret set AWS_ACCESS_KEY_ID -b"<AWS_ACCESS_KEY_ID>"
gh secret set AWS_SECRET_ACCESS_KEY -b"<AWS_SECRET_ACCESS_KEY>"
gh secret set AWS_REGION -b"<AWS_REGION, eg us-east-1>"
gh secret set AWS_ECS_CLUSTER -b"<AWS_ECS_CLUSTER, eg my-apps>"
gh secret set HOST_DOMAIN -b"<HOST_DOMAIN, eg my-app.example.com>"
gh secret set LETSENCRYPT_EMAIL -b"<LETSENCRYPT_EMAIL, eg me@example.com>"
```

These secrets are used to populate variables within GitHub Actions and other configuration files.

For the AWS access, a separate user specifically for deploying via GitHub Actions should be used.

### Deploying your application

To start any new deployment, we use GitHub Releases.

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/github-create-new-release.png)

Provide a version number and name, the version will be used to tag the Docker image in GHCR.io. If you are using the GitHub CLI, you can also do this via the command line. For example,

```
gh release create v1.0 -t "CI Deploy" --notes ""
```

Go to the Actions tab in your repository to see the progress of your deployment.

The initial deployment might take up to a minute for Lets-Encrypt to generate and use the certificate with your domain. Make sure your DNS is all setup before doing this, otherwise further delays related to DNS TTL will likely occur. If you are having problems with your app hosting, be sure to configure the logs in the nginx and your app docker containers for any startup issues. You can also run in attached mode to watch the output of these containers via docker-compose -f ~/nginx-proxy-compose.yml up.


