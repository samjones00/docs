---
slug: web-new
title: web-new - .NET's missing project template system
---

All ServiceStack Projects can be created using the .NET Core [web](https://www.nuget.org/packages/web) tool:

    $ dotnet tool install --global web 

If you had a previous version installed, update with:

    $ dotnet tool update -g web

### Usage

To view a list of projects run:

    $ web new

Where it will display all repositories in the [NetCoreTemplates](https://github.com/NetCoreTemplates), 
[NetFrameworkTemplates](https://github.com/NetFrameworkTemplates) and 
[NetFrameworkCoreTemplates](https://github.com/NetFrameworkCoreTemplates) GitHub Organizations:

| .NET Core C# Templates ||
|-|-|
| angular-lite-spa   | .NET Core 2.1 Angular 4 Material Design Lite Webpack App |
| angular-spa        | .NET Core 2.1 Angular 7 CLI Bootstrap App |
| aurelia-spa        | .NET Core 2.1 Aurelia CLI Bootstrap App |
| bare-webapp        | .NET Core 2.1 Bare Sharp Apps |
| mvc                | .NET Core 2.1 MVC Website |
| mvcauth            | .NET Core 2.2 MVC Website integrated with ServiceStack Auth |
| mvcidentity        | .NET Core 2.2 MVC Website integrated with ServiceStack using MVC Identity Auth |
| mvcidentityserver  | .NET Core 2.1 MVC Website integrated with ServiceStack using IdentityServer4 Auth |
| parcel             | .NET Core 2.1 Parcel TypeScript App |
| parcel-webapp      | .NET Core 2.1 Parcel Sharp Apps |
| razor              | .NET Core 2.1 Website with ServiceStack.Razor |
| react-lite         | .NET Core 2.1 simple + lite (npm-free) React SPA using TypeScript inc bundling + hot reloading |
| react-spa          | .NET Core 2.1 React Create App CLI Bootstrap App |
| rockwind-webapp    | .NET Core 2.1 Rockwind Sharp Apps |
| selfhost           | .NET Core 2.1 self-hosting Console App |
| sharp              | .NET Core 2.1 Sharp Pages Bootstrap Website |
| vue-lite           | .NET Core 2.1 simple + lite (npm-free) Vue SPA using TypeScript inc bundling + hot reloading |
| vue-nuxt           | .NET Core 2.1 Nuxt.js SPA App with Bootstrap |
| vue-spa            | .NET Core 2.1 Vue CLI Bootstrap App |
| vuetify-nuxt       | .NET Core 2.1 Nuxt.js SPA App with Material Vuetify |
| vuetify-spa        | .NET Core 2.1 Vue CLI App with Material Vuetify |
| web                | .NET Core 2.1 Empty Website |

| .NET Framework C# Templates ||
|-|-|
| angular-lite-spa-netfx   | .NET Framework Angular 4 Material Design Lite Webpack App |
| angular-spa-netfx        | .NET Framework Angular 7 Bootstrap cli.angular.io App |
| aurelia-spa-netfx        | .NET Framework Aurelia Bootstrap Webpack App |
| mvc-netfx                | .NET Framework MVC Website |
| razor-netfx              | .NET Framework Website with ServiceStack.Razor |
| react-desktop-apps-netfx | .NET Framework React Desktop Apps |
| react-spa-netfx          | .NET Framework React Bootstrap Webpack App |
| selfhost-netfx           | .NET Framework self-hosting HttpListener Console App |
| sharp-netfx              | .NET Framework Templates Bootstrap WebApp |
| vue-nuxt-netfx           | .NET Framework Vue Nuxt.js SPA Web App |
| vue-spa-netfx            | .NET Framework Vue Bootstrap Webpack App |
| vuetify-nuxt-netfx       | .NET Framework Vuetify Material Nuxt.js SPA Web App |
| vuetify-spa-netfx        | .NET Framework Vuetify Material Webpack App |
| web-netfx                | .NET Framework Empty Website |
| winservice-netfx         | .NET Framework Windows Service |

| ASP.NET Core Framework Templates ||
|-|-|
| mvc-corefx        | .NET Framework ASP.NET Core MVC Website |
| razor-corefx      | .NET Framework ASP.NET Core Website with ServiceStack.Razor |
| react-lite-corefx | .NET Framework ASP.NET Core lite (npm-free) React SPA using TypeScript inc bundling + hot reloading |
| selfhost-corefx   | .NET Framework ASP.NET Core self-hosting Console App |
| sharp-corefx      | .NET Framework ASP.NET Core Templates Bootstrap Website |
| vue-lite-corefx   | .NET Framework ASP.NET Core lite (npm-free) Vue SPA using TypeScript inc bundling + hot reloading |
| web-corefx        | .NET Framework ASP.NET Core Website |

    Usage: web new <template> <name>

For example to create a new **Vue Single Page App**, run:

    $ web new vue-spa ProjectName

## Why?

It's not often that a tool causes enough friction that it ends up requiring less effort to develop a replacement than 
it is to continue using the tool. But this has been our experience with maintaining our VS.NET Templates in the 
[ServiceStackVS](https://github.com/ServiceStack/ServiceStackVS) VS.NET Extension which has been the biggest time sink of all our
3rd Party Integrations where the iteration time to check in a change, wait for CI build, uninstall/re-install the VS.NET extension 
and create and test new projects is measured in hours not minutes. To top off the poor development experience we've now appeared to have 
reached the limits of the number of Project Templates we can bundle in our 5MB **ServiceStackVS.vsix** VS.NET Extension as a 
number of Customers have reported seeing VS.NET warning messages that ServiceStackVS is taking too long to load.

## How it works

Given all the scenarios ServiceStack can be used in, we needed a quicker way to create, update and test our growing **47 starting project templates**. 
In the age of simple command-line dev tools like git and .NET Core's light weight text/human friendly projects, maintaining and creating 
new .NET project templates still feels archaic & legacy requiring packaging projects as binary blobs in NuGet packages which become stale 
the moment they're created.

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
