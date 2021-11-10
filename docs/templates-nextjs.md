---
slug: templates-nextjs
title: NextJs JAMStack Template
---

## NextJS and Edge Functions

NextJS creators, Vercel, offer a way to host *Edge Functions* using JavaScript can integrate with their other hosting services.
This provides a convenient and fast way to provide custom server functionality without worrying about the hosting.

However, as convenient as they are, these don't produce a well-defined HTTP API for easy reuse outside your web application.
This is where ServiceStack can offer a developer experience that will not only enable fast integration for your NextJs application, but for multiple front ends you might need in the future.

## Deployment process

JAMStack deployments are extremely flexible since the UI and API are logically separated.
They can be hosted together with the API also serving the statically generated site files, or using separate hosts with a variety of different setups.

This template utilizes [GitHub Actions](https://github.com/features/actions) to build and deploy the UI and API projects.
The UI project is hosted directly on [GitHub Pages](https://pages.github.com/) while the API is bundled into a Docker image and can be hosted on any [Linux server with SSH access and Docker Compose](/do-github-action-mix-deployment).

To support both, the `npm publish` command copies the statically generated site to the `wwwroot` folder within the API before it is bundled into a docker image.
Additionally, the `release.yml` GitHub Actions workflow pushes the UI to the `gh-pages` branch of your repository to enable GitHub Pages.

## Ways to deploy

The template will trigger a deployment on every push or Release to the GitHub repository. It can also be deployed manually providing the *version* you want to redeploy.

This adhoc method can work with the default `latest` as well as any previous Release tags you have created.
This provides a basic rollback mechanism. If you have been uses `Releases`to tag your application, you can specify a tag, eg `v2` and the GitHub Action will do the following.

- Checkout your code at the specified tag
- Rebuild and deploy your `ui`
- Use the specified tag to change which version is running via `docker compose` on the remote server

> The provided GitHub Actions are just a starting point for how to deploy your application. When your hosting requirements change you'll need to update your GitHub Actions to suit.


