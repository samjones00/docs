---
title: Website Templates
slug: templates-websites
---

There are 3 templates for each of the different technologies that can be used with ServiceStack to develop Server HTML Generated Websites and HTTP APIs: 

#### ASP.NET MVC

The `mvc` template differentiates the most between .NET Core and ASP.NET versions as ASP.NET Core MVC and ASP.NET MVC 5 are completely different implementations. With `mvc` ServiceStack is configured within the same .NET Core pipeline and shares the same request pipeline and "route namespace" but in ASP.NET MVC 5, ServiceStack is hosted at the `/api` Custom Path. Use MVC if you prefer to create different Controllers and View Models for your Website UI independently from your HTTP APIs or if you prefer to generate **server HTML validation errors** within MVC Controllers.

#### ServiceStack.Razor

The `razor` Template is configured to develop Websites using [ServiceStack.Razor](http://razor.servicestack.net) for developing server-generated Websites using Razor without MVC Controllers which lets you create Content Razor Pages that can be called directly or View Pages for generating HTML Views for existing Services. The source code for .NET Core and ASP.NET Framework projects are nearly identical despite being completely different implementations with the .NET Core version being retrofitted on top of .NET Core MVC Views. Use `razor` templates if you like Razor and prefer the [API First Development model](/releases/v4.5.14#end-user-language-with-low-roi) or plan on developing Websites for both .NET Core and ASP.NET and would like to be easily able to migrate between them.

#### ServiceStack Templates

The `templates` Project Template is configured to develop Websites using [ServiceStack Templates](http://templates.servicestack.net), a simpler and cleaner alternative to Razor that lets you utilize simple Template Expressions for evaluating Server logic in `.html` pages. Templates doesn't require any precompilation, is easier to learn and more intuitive for non-programmers that's more suitable for a [number of use-cases](http://templates.servicestack.net/usecases/). Use templates if you want an [alternative to Razor](/releases/v4.5.14#why-templates) syntax and the heavy machinery required to support it.

#### Hot Reloading

Both `razor` and `templates` project enjoy Hot Reloading where in development a long poll is used to detect and reload changes in the current Template Page or static files in `/wwwroot`.

<table>
<tr>
    <th>.NET Core 2.0</th>
    <th>.NET Framework</th>
    <th>Single Page App Templates</th>
</tr>
<tr>
    <td><a href="https://github.com/NetCoreTemplates/mvc">mvc</a></td>
    <td><a href="https://github.com/NetFrameworkTemplates/mvc-netfx">mvc-netfx</a></td>
    <td align="center">
        <h3>MVC Bootstrap Template</h3>
        <a href="http://mvc.web-templates.io"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/mvc.png" width="500" /></a>
        <p><a href="http://mvc.web-templates.io">mvc.web-templates.io</a></p>
    </td>
</tr>
<tr>
    <td><a href="https://github.com/NetCoreTemplates/razor">razor</a></td>
    <td><a href="https://github.com/NetFrameworkTemplates/razor-netfx">razor-netfx</a></td>
    <td align="center">
        <h3>ServiceStack.Razor Bootstrap Template</h3>
        <a href="http://razor.web-templates.io"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/razor.png" width="500" /></a>
        <p><a href="http://razor.web-templates.io">razor.web-templates.io</a></p>
    </td>
</tr>
<tr>
    <td><a href="https://github.com/NetCoreTemplates/templates">templates</a></td>
    <td><a href="https://github.com/NetFrameworkTemplates/templates-netfx">templates-netfx</a></td>
    <td align="center">
        <h3>ServiceStack Templates Bootstrap Template</h3>
        <a href="http://templates.web-templates.io"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/templates.png" width="500" /></a>
        <p><a href="http://templates.web-templates.io">templates.web-templates.io</a></p>
    </td>
</tr>
</table>


### .NET Core 2.0 ServiceStack WebApp Template

The .NET Core 2.0 [templates-webapp](https://github.com/NetCoreTemplates/templates-webapp) project template is a pre-built .NET Core 2.0 App that dramatically simplifies .NET Wep App development by enabling Websites and APIs to be developed instantly without compilation.

<table>
<tr>
    <th>.NET Core 2.0</th>
    <th>ServiceStack Templates WebApp</th>
</tr>
<tr>
    <td><a href="https://github.com/NetCoreTemplates/templates-webapp">templates-webapp</a></td>
    <td align="center">
        <a href="http://templates-webapp.web-templates.io"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/templates-webapp.png" width="500" /></a>
        <p><a href="http://templates-webapp.web-templates.io">templates-webapp.web-templates.io</a></p>
    </td>
</tr>
</table>

See [templates.servicestack.net/docs/web-apps](http://templates.servicestack.net/docs/web-apps) to learn the different use-cases made possible with Web Apps.