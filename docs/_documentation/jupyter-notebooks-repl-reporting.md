---
slug: jupyter-notebooks-reporting
title: Jupyter Notebooks for Reporting and Testing
---

Jupyter Notebooks provide a rich set of interactive computing tools that can be used for many different use cases.
Incorporating data from web services means you can rerun/update your notebooks for ease of reuse for things like generating reports and testing.

For reporting tasks, we want to have the ability to save the output of our notebooks as a PDF, so there are a few setup steps that are needed to get Jupyter working with PDF using LaTeX. 
LaTeX has quite a few implicit dependencies that need to be installed locally to get this output to work. One way to make this a bit easier to repeat your results is by using a Docker environment setup to be used by the hosted MyBinder.org service.

## MyBinder

The JupyterHub team maintain their public Jupyter notebooks service at [mybinder.org](https://mybinder.org) for anyone who wants to share their interactive GitHub repositories publicly. Behind the scenes Notebooks are executed on a collection of [BinderHub Federated services](https://mybinder.readthedocs.io/en/latest/about/federation.html) using resources donated by  [Google Cloud](https://cloud.google.com), [OVH](https://www.ovh.com), [GESIS Notebooks](https://notebooks.gesis.org) and the [Turing Institute](https://turing.ac.uk).

To run your Notebooks on Binder head over to https://mybinder.org and paste the URL of your public GitHub repo containing your Jupyter Notebooks to retrieve the generated URL for your repo.

E.g. our [ServiceStack/jupyter-notebooks](https://github.com/ServiceStack/jupyter-notebooks) GitHub repo is available from:

#### [https://mybinder.org/v2/gh/ServiceStack/jupyter-notebooks/HEAD](https://mybinder.org/v2/gh/ServiceStack/jupyter-notebooks/HEAD)

Where behind-the-scenes Binder will build and host a Docker image of your repo and launch a dedicated `notebook` Web App instance to view an execute your repo's Notebooks.
This Docker image is built has on a `Dockerfile` in the root of the repository. Starting with a [base image from the Jupyter Docker docs](https://jupyter-docker-stacks.readthedocs.io/en/latest/using/selecting.html)

```dockerfile
# LaTeX dependencies (as root)
RUN apt-get install -y texlive-xetex \
        texlive-fonts-recommended \
        texlive-latex-recommended \
        texlive-latex-extra \
        texlive-plain-generic

# Install nbconvert (as user)
RUN pip install nbconvert
```

A full example of a `Dockerfile` which also includes support for .NET notebooks can be found in [our `mix` repository](#get-link), this can be built and run locally as well as used with MyBinder by creating a new GitHub repository and committing it in the root of the repository.

To run this locally, build the Dockerfile first using `docker build . -t <my-tag>`, followed by running the docker image using `docker run`.

Running locally, it is most useful to edit notebooks on the local host machine rather than the docker containers storage. To do this, we want to use a few options when using `docker run`. For example, the following command can run and expose local notebooks within `/mnt/c/projects/my-notebooks`.

```shell
docker run -it --rm -p 8888:8888 -v /mnt/c/projects/my-notebooks:/home/jovyan/Notebooks -e CHOWN_HOME=yes <my-tag>
```

Once running, use the `127.0.0.1` url in the command line output and open the full link with your browser. Editing and saving notebooks will update your notebooks on your host file system allowing you to iterate quickly.

## Combining local and MyBinder workflow

Being able to run the same Docker container locally to iterate on host notebooks that are in the same GitHub repository and then commit those changes to share with others and to run on MyBinder creates a great way of getting the most out of the repeatability that is a part of the Binder solution as well as having the same functionality locally to generate reports and share as PDF without needing to regularly rebuild the docker image which will slow down iteration.

### Walk through

- `<go through a step by step of how to setup the repository>`
- `<build and run locally>`
- `<make change locally and generate PDF>`
- `<Commit changes to GitHub allowing others to run + review + validate>`
- `Use example "Sales" report here -> https://github.com/Layoric/my-notebooks/blob/main/notebooks/chinook.netcore.io-QueryInvoices.ipynb`

