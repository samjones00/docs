---
slug: myget
title: MyGet
---

## ServiceStack pre-release MyGet Feed

Our interim pre-release NuGet packages first get published to 
[MyGet](https://www.myget.org/).

Instructions to add ServiceStack's MyGet feed to VS.NET are:

  1. Go to `Tools -> Options -> Package Manager -> Package Sources`
  2. Add the Source `https://www.myget.org/F/servicestack` with the name of your choice, 
  e.g. _ServiceStack MyGet feed_

![NuGet Package Sources](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/myget/package-sources.png)

After registering the MyGet feed it will show up under NuGet package sources when opening the NuGet 
package manager dialog:

![NuGet Package Manager](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/myget/package-manager-ui.png)

Which will allow you to search and install pre-release packages from the selected MyGet feed.

### Adding MyGet feed without VS.NET

If you're not using or don't have VS.NET installed, you can add the MyGet feed to your NuGet.config at `%AppData%\NuGet\NuGet.config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="ServiceStack MyGet feed" value="https://www.myget.org/F/servicestack" />
    <add key="nuget.org" value="https://www.nuget.org/api/v2/" />
  </packageSources>
</configuration>
```

## Redownloading MyGet packages

If you've already packages with the **same version number** from MyGet previously installed, you will 
need to manually delete the NuGet `/packages` folder for NuGet to pull down the latest packages.

### Clear NuGet Package Cache

You can clear your local NuGet packages cache in any OS by running the command-line below in your favorite Terminal:

    $ nuget locals all -clear

If you're using VS.NET you can also clear them from `Tools -> Options -> NuGet Package Manager` and click **Clear All NuGet Cache(s)**:

![Clear Packages Cache](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/myget/clear-package-cache.png)

Alternatively on Windows you can delete the Cached NuGet packages manually with:

    $ del %LOCALAPPDATA%\NuGet\Cache\*.nupkg /q
