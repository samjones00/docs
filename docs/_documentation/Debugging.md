---
slug: debugging
title: Debugging
---

### Debugging Source Symbols in NuGet packages

It's possible to debug into the ServiceStack source code when using the ServiceStack NuGet packages. 

Normally you could enable this after 
[enabling SymbolSource integration in VisualStudio](http://www.symbolsource.org/Public/Home/VisualStudio)
but as the SymbolSource has been unavailable for months it's no longer a reliable source for Debug Symbols.

Instead we're publishing the NuGet package symbols after each release to:
[github.com/ServiceStack/Assets/tree/master/nuget](https://github.com/ServiceStack/Assets/tree/master/nuget)

The easiest way to download all `.pdb` is by downloading **all-pdbs.zip** under the release version you're
interested in then adding the path where you've extracted the pdb's to as a Symbol Source Location:

 1. Go to `Tools -> Options -> Debugger -> General`
 2. Uncheck **Enable Just My Code**, **Enable .NET Framework source stepping** and 
 **Require source files to exactly match the original version**
 3. Check **Enable source server support**
 4. In the `Tools -> Options -> Debugger -> Symbols` dialog, under the **Symbol file (.pdb) locations** 
 section by clicking the New Folder icon and add the following urls (in order):
  - http://referencesource.microsoft.com/symbols
  - C:\path\to\symbols
  - http://msdl.microsoft.com/download/symbols

And with that you should now be able to debug into the source code of any NuGet package 
(who publishes their Symbols) directly from within your application!

### Alternatives Debugging Solutions

[GitLink](https://oren.codes/2015/09/23/enabling-source-code-debugging-for-your-nuget-packages-with-gitlink/)
is another solution for debugging source code in NuGet packages.

Otherwise the most reliable solution for debugging ServiceStack source code is to 
[download the source code for the release](https://github.com/ServiceStack/ServiceStack/releases) on Github 
you want to debug, build the VS.NET Solution locally using **Debug** configuration then change your 
ServiceStack references to use your local **.dll**.

## Configuration

### DebugMode

ServiceStack allows additional debug information when in **DebugMode**, which is automatically set by 
default in **Debug** builds or explicitly with:

```csharp
SetConfig(new HostConfig { DebugMode = true });
```

In addition, users with the **Admin** role or Requests with an **AuthSecret** can also view Debug Info 
in production.

### StrictMode

You can configure Strict Mode in ServiceStack to enforce stricter behavior and have it throw Exceptions when it 
sees certain failure conditions. To enable Strict Mode across all libraries use:

```csharp
Env.StrictMode = true;
```

Otherwise to just enable StrictMode for ServiceStack:

```csharp
SetConfig(new HostConfig {
    StrictMode = true
})
```

When enabled ServiceStack will perform runtime checks to catch invalid state, currently:

 - Checks if Services return Value Types
 - Checks if UserSession has circular dependencies
 - Fails fast for exceptions on Startup

### Admin Role

Users in the `Admin` role have super-user access giving them access to any services or plugins protected 
with Roles and Permissions.

### AuthSecret

You can use **Config.AdminAuthSecret** to specify a special string to give you admin access without having 
to login by adding `?authsecret=xxx` to the query string, e.g:

```csharp
SetConfig(new HostConfig { AdminAuthSecret = "secretz" });
```

By-pass protected services using query string:

    /my-service?authsecret=secretz

## Debug Links

To provide better visibility to the hidden functionality in ServiceStack we've added **Debug Info** links 
section to the `/metadata` page which add links to any Plugins with Web UI's, e.g:

![Debug Info Links](http://i.imgur.com/2Hf3P9L.png)

The **Debug Links** section is only available in **DebugMode**.

You can add links to your own [Plugins](/plugins) in the metadata pages with:

```csharp
appHost.GetPlugin<MetadataFeature>()
    .AddPluginLink("swagger-ui/", "Swagger UI");

appHost.GetPlugin<MetadataFeature>()
    .AddDebugLink("?debug=requestinfo", "Request Info");
```

`AddPluginLink` adds links under the **Plugin Links** section and should be used if your plugin is publicly 
visible, otherwise use `AddDebugLink` for plugins only available during debugging or development.

## Startup Errors

When plugins are registered their Exceptions are swallowed and captured in `AppHost.StartupErrors` so an 
individual Rogue plugin won't prevent your ServiceStack AppHost from starting. But when a plugin doesn't 
work properly it can be hard to determine the cause was due to an Exception occuring at Startup. 

Alternatively enable [StrictMode](#strictmode) to have StartUp Exceptions thrown on StartUp.

## Debug Inspector

[![](http://templates.servicestack.net/assets/img/screenshots/metadata-debug.png)](http://templates.servicestack.net/metadata/debug)

All ServiceStack Apps have access to rich introspection and queryability for inspecting remote ServiceStack instances with the new [Debug Template](http://templates.servicestack.net/docs/info-filters#debug-template).

The Debug Template is a Service in `TemplatePagesFeature` that's pre-registered in [DebugMode](http://docs.servicestack.net/debugging#debugmode). The Service can also be available when not in **DebugMode** by enabling it with:

```csharp
Plugins.Add(new TemplatePagesFeature { 
    MetadataDebugAdminRole = RoleNames.Admin,        // Only allow Admin users
})
```

This registers the Service but limits it to Users with the `Admin` role, alternatively you configure an 
[Admin Secret](http://docs.servicestack.net/debugging#authsecret):

```csharp
SetConfig(new HostConfig { AdminAuthSecret = "secret" })
```

Which will let you access it by appending the authsecret to the querystring: `/metadata/debug?authsecret=secret`

Alternatively if preferred you can make the Debug Template Service available to:

```csharp
Plugins.Add(new TemplatePagesFeature { 
    MetadataDebugAdminRole = RoleNames.AllowAnyUser,  // Allow Authenticated Users
    MetadataDebugAdminRole = RoleNames.AllowAnon,     // Allow anyone
})
```

Which is the configuration that allows [templates.servicestack.net/metadata/debug](http://templates.servicestack.net/metadata/debug) to be accessible to anyone.

### Request Info

ServiceStack's Request Info feature is useful for debugging requests. Just add **?debug=requestinfo** 
in your `/pathinfo` and ServiceStack will return a dump of all the HTTP Request parameters to help with 
debugging interoperability issues. The RequestInfoFeature is only enabled in [DebugMode](/debugging#debugmode).

To better highlight the presence of Startup Errors a red warning banner will also appear in `/metadata` pages when in [DebugMode](/debugging#debugmode), e.g:

![](/images/release-notes/startup-errors.png)

The number of Startup Errors is also added to the `X-Startup-Errors: n` Global HTTP Header so you'll be 
able to notice it when debugging HTTP Traffic.

If you prefer that any Plugin Exception is immediately visible you can register this callback in your 
`AppHost` to throw a YSOD with your first Startup Error:

```csharp
AfterInitCallbacks.Add(host => {
    var appHost = (ServiceStackHost)host;
    if (appHost.StartUpErrors.Count > 0)
        throw new Exception(appHost.StartUpErrors[0].Message);
});
```

## Plugins

There are a number of plugins that can help with debugging:

### [Request Logger](/request-logger)

Add an In-Memory `IRequestLogger` and service with the default route at `/requestlogs` which maintains a 
live log of the most recent requests (and their responses). Supports multiple config options incl. 
Rolling-size capacity, error and session tracking, hidden request bodies for sensitive services, etc.

    Plugins.Add(new RequestLogsFeature());

The `IRequestLogger` is a great way to introspect and analyze your service requests in real-time. 
Here's a screenshot from the [http://bootstrapapi.servicestack.net](http://bootstrapapi.servicestack.net) 
website:

![Live Screenshot](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/request-logs-01.png)

It supports multiple queryString filters and switches so you filter out related requests for better analysis 
and debuggability:

![Request Logs Usage](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/request-logs-02.png)

The [RequestLogsService](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Admin/RequestLogsService.cs) is just a simple C# service under-the-hood but is a good example of how a little bit of code can provide a lot of value in ServiceStack's by leveraging its generic, built-in features.