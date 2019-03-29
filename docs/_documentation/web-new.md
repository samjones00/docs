---
slug: web-new
title: web-new - .NET's missing project template system
---

All ServiceStack Projects can be created using the .NET Core [web](https://www.nuget.org/packages/web) tool:

    $ dotnet tool install --global web 

If you had a previous version installed, update with:

    $ dotnet tool update -g web

## Usage

To view a list of projects run:

    $ web new

Where it will display all repositories in the [NetCoreTemplates](https://github.com/NetCoreTemplates), 
[NetFrameworkTemplates](https://github.com/NetFrameworkTemplates) and 
[NetFrameworkCoreTemplates](https://github.com/NetFrameworkCoreTemplates) GitHub Organizations:

```
.NET Core C# Templates:

   1. angular-lite-spa   .NET Core 2.1 Angular 4 Material Design Lite Webpack App
   2. angular-spa        .NET Core 2.1 Angular 7 CLI Bootstrap App
   3. aurelia-spa        .NET Core 2.1 Aurelia CLI Bootstrap App
   4. bare-webapp        .NET Core 2.1 Bare Sharp Apps
   5. mvc                .NET Core 2.1 MVC Website
   6. mvcauth            .NET Core 2.2 MVC Website integrated with ServiceStack Auth
   7. mvcidentity        .NET Core 2.2 MVC Website integrated with ServiceStack using MVC Identity Auth
   8. mvcidentityserver  .NET Core 2.1 MVC Website integrated with ServiceStack using IdentityServer4 Auth
   9. parcel             .NET Core 2.1 Parcel TypeScript App
  10. parcel-webapp      .NET Core 2.1 Parcel Sharp Apps
  11. razor              .NET Core 2.1 Website with ServiceStack.Razor
  12. react-lite         .NET Core 2.1 simple + lite (npm-free) React SPA using TypeScript inc bundling + hot reloading
  13. react-spa          .NET Core 2.1 React Create App CLI Bootstrap App
  14. rockwind-webapp    .NET Core 2.1 Rockwind Sharp Apps
  15. selfhost           .NET Core 2.1 self-hosting Console App
  16. sharp              .NET Core 2.1 Sharp Pages Bootstrap Website
  17. vue-lite           .NET Core 2.1 simple + lite (npm-free) Vue SPA using TypeScript inc bundling + hot reloading
  18. vue-nuxt           .NET Core 2.1 Nuxt.js SPA App with Bootstrap
  19. vue-spa            .NET Core 2.1 Vue CLI Bootstrap App
  20. vuetify-nuxt       .NET Core 2.1 Nuxt.js SPA App with Material Vuetify
  21. vuetify-spa        .NET Core 2.1 Vue CLI App with Material Vuetify
  22. web                .NET Core 2.1 Empty Website

.NET Framework C# Templates:

   1. angular-lite-spa-netfx    .NET Framework Angular 4 Material Design Lite Webpack App
   2. angular-spa-netfx         .NET Framework Angular 7 Bootstrap cli.angular.io App
   3. aurelia-spa-netfx         .NET Framework Aurelia Bootstrap Webpack App
   4. mvc-netfx                 .NET Framework MVC Website
   5. razor-netfx               .NET Framework Website with ServiceStack.Razor
   6. react-desktop-apps-netfx  .NET Framework React Desktop Apps
   7. react-spa-netfx           .NET Framework React Bootstrap Webpack App
   8. selfhost-netfx            .NET Framework self-hosting HttpListener Console App
   9. sharp-netfx               .NET Framework Templates Bootstrap WebApp
  10. vue-nuxt-netfx            .NET Framework Vue Nuxt.js SPA Web App
  11. vue-spa-netfx             .NET Framework Vue Bootstrap Webpack App
  12. vuetify-nuxt-netfx        .NET Framework Vuetify Material Nuxt.js SPA Web App
  13. vuetify-spa-netfx         .NET Framework Vuetify Material Webpack App
  14. web-netfx                 .NET Framework Empty Website
  15. winservice-netfx          .NET Framework Windows Service

ASP.NET Core Framework Templates:

   1. mvc-corefx         .NET Framework ASP.NET Core MVC Website
   2. razor-corefx       .NET Framework ASP.NET Core Website with ServiceStack.Razor
   3. react-lite-corefx  .NET Framework ASP.NET Core lite (npm-free) React SPA using TypeScript inc bundling + hot reloading
   4. selfhost-corefx    .NET Framework ASP.NET Core self-hosting Console App
   5. sharp-corefx       .NET Framework ASP.NET Core Templates Bootstrap Website
   6. vue-lite-corefx    .NET Framework ASP.NET Core lite (npm-free) Vue SPA using TypeScript inc bundling + hot reloading
   7. web-corefx         .NET Framework ASP.NET Core Website

Usage: web new <template> <name>
```

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
