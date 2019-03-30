---
slug: web-new
title: Create new Projects with 'web new'
---

All ServiceStack Projects can be created using the .NET Core [web](https://www.nuget.org/packages/web) tool:

    $ dotnet tool install --global web 

If you had a previous version installed, update with:

    $ dotnet tool update -g web

All features from the cross-platform `web` .NET Core tool are also available from the [.NET Core Windows Desktop app](/netcore-windows-desktop) tool:

    $ dotnet tool install --global app 

#### Usage

To view a list of projects run:

    $ web new

Where it will display all repositories in [.NET Core](https://github.com/NetCoreTemplates), 
[.NET Framework](https://github.com/NetFrameworkTemplates) and 
[ASP.NET Core Framework](https://github.com/NetFrameworkCoreTemplates) GitHub Orgs:

<div class='markdown-body'>
{% capture projects %}{% include web-new.md %}{% endcapture %}
{{ projects | markdownify }}
</div>

#### Usage

web new `<template>` `<name>`

For example to create a new **Vue Single Page App**, run:

    $ web new vue-spa ProjectName

## Why a new project template system?

It's not often that a tool causes enough friction that it ends up requiring less effort to develop a replacement than 
it is to continue using the tool. But this has been our experience with maintaining our VS.NET Templates in the 
[ServiceStackVS](https://github.com/ServiceStack/ServiceStackVS) VS.NET Extension which has been the biggest time sink of all our
3rd Party Integrations where the iteration time to check in a change, wait for CI build, uninstall/re-install the VS.NET extension 
and create and test new projects is measured in hours not minutes. To top off the poor development experience we've now appeared to have 
reached the limits of the number of Project Templates we can bundle in our 5MB **ServiceStackVS.vsix** VS.NET Extension as a 
number of Customers have reported seeing VS.NET warning messages that ServiceStackVS is taking too long to load.

Given all the scenarios ServiceStack can be used in, we needed a quicker way to create, update and test our growing **47 starting project templates**. 
In the age of simple command-line dev tools like git and .NET Core's light weight text/human friendly projects, maintaining and creating 
new .NET project templates still feels archaic & legacy requiring packaging projects as binary blobs in NuGet packages which become stale 
the moment they're created.

## How it works

### GitHub powered Project Templates

Especially for SPA projects which need to be frequently updated, the existing .NET Project Templates system is a stale solution that doesn't offer 
much benefit over maintaining individual GitHub projects, which is exactly what the `dotnet-new` npm tool and now `web new` .NET Core are designed around.

Inside [dotnet-new](/dotnet-new) and `web new` is an easier way to create and share any kind of project templates which are easier for developers
to create, test, maintain and install. So if you're looking for a simpler way to be able to create and maintain your own value-added project templates 
with additional bespoke customizations, functionality, dependencies and configuration, using `web new` is a great way to maintain and share them.

Using GitHub for maintaining project templates yields us a lot of natural benefits:

 - Uses the same familiar development workflow to create and update Project Templates
 - Git commit history provides a public audit trail of changes
 - Publish new versions of project templates by creating a new GitHub release
 - Compare changes between Project Templates using GitHub's compare changes viewer
 - Browse and Restore Previous Project Releases
 - End users can raise issues with individual project templates and send PR contributions

### Always up to date

Importantly end users will always be able to view the latest list of project templates and create projects using the latest available version, 
even if using older versions of the tools as they query GitHub's public APIs to list all currently available projects that for installation
will use the latest published release (or **master** if there are no published releases), which if available, downloads, caches and 
creates new projects from the latest published `.zip` release.

### Just regular Projects

Best of all creating and testing projects are now much easier since project templates are just working projects following a simple naming convention
that when a new project is created with:

    $ web new <template> ProjectName

Replaces all occurrences in all text files, file and directory names, where:

 - `MyApp` is replaced with `ProjectName`
 - `my-app` is replaced with `project-name`
 - `My App` is replaced with `Project Name`

The tool installer then inspects the project contents and depending on what it finds will:

 - Restore the .NET `.sln` if it exists
 - Install npm packages if `package.json` exists
 - Install libman packages if `libman.json` exists

That after installation is complete, results in newly created projects being all setup and ready to run.

### Available project templates

One missing detail is how it finds which GitHub repo should be installed from the `<template>` name. 

This can be configured with the `APP_SOURCE_TEMPLATES` Environment variable to configure the `web` tool to use your own GitHub organizations instead, e.g:

    APP_SOURCE_TEMPLATES=NetCoreTemplates;NetFrameworkTemplates;NetFrameworkCoreTemplates

Optionally you can display a friendly name next to each Organization name, e.g:

    APP_SOURCE_TEMPLATES=NetCoreTemplates .NET Core C# Templates;

`web new` will then use the first GitHub Repo that matches the `<template>` name from all your GitHub Sources, so this
does require that all repos have unique names across all your configured GitHub Sources.

These are the only sources `web new` looks at to create ServiceStack projects, which by default is configured to use 
[NetCoreTemplates](https://github.com/NetCoreTemplates), [NetFrameworkTemplates](https://github.com/NetFrameworkTemplates) and 
[NetFrameworkCoreTemplates](https://github.com/NetFrameworkCoreTemplates) GitHub Organizations, whose repos will be listed when running:

    $ web new

### Create Customized Projects with `web +` 

All new projects can be further customized with [web +](/web-apply) to mix in additional "layered" features, e.g. 
you can create a new [Sharp Pages](https://sharpscript.net/docs/sharp-pages) Web Project and configure it with **PostgreSQL** and 
**RDBMS Auth** with:

    $ web new sharp+postgres+auth-db
