---
title: Run ASP.NET Core Apps on the .NET Framework
slug: templates-corefx
---

Use the [NetFrameworkCoreTemplates](https://github.com/NetFrameworkCoreTemplates) to create ASP.NET Core Apps on the .NET Framework which contains popular starting templates for running ASP.NET Core Apps on .NET Framework (default v4.7) which as a convention all have the `-corefx` suffix: 

 - [web-corefx](https://github.com/NetFrameworkCoreTemplates/web-corefx) - .NET Framework ASP.NET Core Website
 - [selfhost-corefx](https://github.com/NetFrameworkCoreTemplates/selfhost-corefx) - .NET Framework ASP.NET Core self-hosting Console App
 - [mvc-corefx](https://github.com/NetFrameworkCoreTemplates/mvc-corefx) - .NET Framework ASP.NET Core MVC Website
 - [razor-corefx](https://github.com/NetFrameworkCoreTemplates/razor-corefx) - .NET Framework ASP.NET Core Website with ServiceStack.Razor
 - [templates-corefx](https://github.com/NetFrameworkCoreTemplates/templates-corefx) - .NET Framework ASP.NET Core Templates Bootstrap Website

This will let you create an ASP.NET Core App running on the .NET Framework v4.7 with:

    $ npm install -g @servicestack/cli

    $ dotnet-new web-corefx AcmeNetFx

Which can then be opened in your preferred VS.NET or Project Rider C# IDE.

### Reference .Core packages

The primary difference between ASP.NET Core Apps on **.NET Core 2.0** vs **.NET Framework** is needing to reference the `.Core` packages to force referencing ServiceStack **.NET Standard 2.0** libraries, which otherwise when installed in a .NET Framework project would install `net45` libraries. The differences between the 2 builds include:

  - `net45` - Contains support for running **ASP.NET** Web or Self-Hosting **HttpListener** App Hosts
  - `netstandard2.0` - Contains support for only running on **ASP.NET Core** App Hosts

In order to run ASP.NET Core Apps on the .NET Framework it needs to only reference `.Core` NuGet packages which contains only the **.NET Standard 2.0** builds. Currently the list of `.Core` packages which contains only **.NET Standard 2.0** builds include:

 - ServiceStack.Text.Core
 - ServiceStack.Interfaces.Core
 - ServiceStack.Client.Core
 - ServiceStack.HttpClient.Core
 - ServiceStack.Core
 - ServiceStack.Common.Core
 - ServiceStack.Mvc.Core
 - ServiceStack.Server.Core
 - ServiceStack.Redis.Core
 - ServiceStack.OrmLite.Core
 - ServiceStack.OrmLite.Sqlite.Core
 - ServiceStack.OrmLite.SqlServer.Core
 - ServiceStack.OrmLite.PostgreSQL.Core
 - ServiceStack.OrmLite.MySql.Core
 - ServiceStack.OrmLite.MySqlConnector.Core
 - ServiceStack.Aws.Core
 - ServiceStack.Azure.Core
 - ServiceStack.RabbitMq.Core
 - ServiceStack.Api.OpenApi.Core
 - ServiceStack.Admin.Core
 - ServiceStack.Stripe.Core
 - ServiceStack.Kestrel

> Ultimately support for whether a **.NET Standard 2.0** library will run on the .NET Framework depends on whether external dependencies also support this scenario which as it's a more niche use-case, will be a less tested scenario. 
