---
slug: templates-angular
title: Angular Templates
---

[Angular](https://angular.io) is the premier JavaScript framework developed by Google for building applications that live on the web, mobile, or the desktop.

## Angular .NET Core and .NET Framework Single Page App Templates

The templates below have been bootstrapped with the latest angular-cli tooling that's 
[seamlessly integrated](http://docs.servicestack.net/templates-single-page-apps#end-to-end-typed-apis) into 
ServiceStack's [Recommended Physical Project Structure](/physical-project-structure). 

See the documentation in each project for more info on features of each template:

### [angular-spa](https://github.com/NetCoreTemplates/angular-spa)

.NET Core 2.1 Angular 6.1 project generated with [Angular CLI](https://github.com/angular/angular-spa).

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/angular-spa.png)](http://angular-spa.web-templates.io/)

> Browse [source code](https://github.com/NetCoreTemplates/angular-spa), view live demo [angular-spa.web-templates.io](http://angular-spa.web-templates.io) and install with [dotnet-new](http://docs.servicestack.net/dotnet-new):

Create new Angular 6.1 Project for .NET Core 2.1:

    $ dotnet-new angular-spa ProjectName

Create new Angular 6.1 Project for .NET Framework:

    $ dotnet-new angular-spa-netfx ProjectName

### [angular-lite-spa](https://github.com/NetCoreTemplates/angular-lite-spa)

.NET Core 2.1 Angular4 and Material Design Lite Webpack App Template:

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/angular-lite-spa.png)](http://angular-lite-spa.web-templates.io/)

> Browse [source code](https://github.com/NetCoreTemplates/angular-lite-spa), view Live Demo [angular-lite-spa.web-templates.io](http://angular-lite-spa.web-templates.io) and install with [dotnet-new](http://docs.servicestack.net/dotnet-new):

Create new Angular 4 Project for .NET Core 2.1:

    $ dotnet-new angular-lite-spa ProjectName

Create new Angular 4 Project for .NET Framework:

    $ dotnet-new angular-lite-spa-netfx ProjectName

---

# Angular Examples

## [TechStacks](https://github.com/ServiceStackApps/TechStacks)

TechStacks is an AngularJS App that lets you explore TechStacks of popular StartUps using your favorite techology

[![TechStacks](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/techstacks/screenshots/techstacks.png)](http://angular.techstacks.io)

#### Features 

TechStacks is based on a [Bootstrap template](http://getbootstrap.com) with client-side features:

 - HTML5 Routing to enable pretty urls, also supports full page reloads and back button support
 - Same Services supporting both human-readable Slugs or int primary keys
 - Responsive design supporting iPad Landscape and Portrait modes
 - Preloading and background data fetching to reduce flicker and maximize responsiveness
 - [Disqus](https://disqus.com/) commenting system
 - [Chosen](http://harvesthq.github.io/chosen/) for UX-friendly multi combo boxes

and some of TechStacks back-end features include: 

 - [SEO-optimized, Server HTML generated, read-only version of the website](http://techstacks.io/?html=server)
   - Dynamically generated [sitemaps.xml](http://techstacks.io/sitemap.xml)
 - Page-level Locking
 - Record and Restore Page Content Versioning
 - [Twitter and GitHub OAuth Providers](https://github.com/ServiceStack/ServiceStack/wiki/Authentication-and-authorization)
 - Substitutable [OrmLite](https://github.com/ServiceStack/ServiceStack.OrmLite) RDBMS [PostgreSQL and Sqlite](https://github.com/ServiceStackApps/TechStacks/blob/875e78910e43d2230f0925b71d5990497216511e/src/TechStacks/TechStacks/AppHost.cs#L49-L56) back-ends
 - [Auto Query](https://github.com/ServiceStack/ServiceStack/wiki/Auto-Query) for automatic services of RDBMS tables
 - [RDBMS Sessions and In Memory Caching](https://github.com/ServiceStack/ServiceStack/wiki/Caching)
 - [Fluent Validation](https://github.com/ServiceStack/ServiceStack/wiki/Validation)