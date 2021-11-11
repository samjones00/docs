---
title: Blazor Project Template
slug: templates-blazor
---

<div class="my-8 ml-20"><svg style="max-width:200px" fill="none" viewBox="-10.12021875 -53.60951036 339.95397529 343.02235093" xmlns="http://www.w3.org/2000/svg">
    <path d="m303.935 88.479c-6.598 41.362-27.653 79.041-59.42 106.335s-72.185 42.433-114.064 42.723c-8.483.326-16.977-.19-25.358-1.539a77.723 77.723 0 0 1 -64.63-73.266 75.479 75.479 0 0 1 22.14-52.762 75.46 75.46 0 0 1 105.885-.748 75.478 75.478 0 0 1 22.884 52.443c.317 12.51-5.102 23.483-16.239 23.8-11.899 0-17.477-8.491-17.477-19.934v-31.797a19.478 19.478 0 0 0 -19.323-19.494h-26.653a46.386 46.386 0 0 0 -39.119 20.961 46.399 46.399 0 0 0 31.587 71.268 46.392 46.392 0 0 0 41.8-14.911l.932-1.39.933 1.543a32.82 32.82 0 0 0 27.986 13.328 36.992 36.992 0 0 0 34.268-38.671 100.64 100.64 0 0 0 -2.761-24.577c-4.943-22.734-18.126-42.834-37.008-56.423a94.153 94.153 0 0 0 -125.236 13.718 94.175 94.175 0 0 0 -23.92 63.097 95.352 95.352 0 0 0 27.473 65.824 95.331 95.331 0 0 0 65.448 28.344s6.98.635 14.849.454a200.94 200.94 0 0 0 107.769-32.155c.457-.318.914.317.61.78a158.177 158.177 0 0 1 -123.225 50.396 111.185 111.185 0 0 1 -80.961-32.871 111.215 111.215 0 0 1 -32.215-81.232 115.099 115.099 0 0 1 46.223-92.17 112.704 112.704 0 0 1 66.497-21.953h35.772a100.637 100.637 0 0 0 74.247-32.784 1.39 1.39 0 0 1 .755-.431 1.418 1.418 0 0 1 1.52.663c.153.257.222.555.197.854a100.93 100.93 0 0 1 -15.608 45.14 1.386 1.386 0 0 0 .115 1.511 1.387 1.387 0 0 0 1.424.507 108.158 108.158 0 0 0 75.198-62.013c.173-.277.411-.507.695-.67a1.902 1.902 0 0 1 1.869 0c.284.162.523.392.694.67a137.098 137.098 0 0 1 13.447 87.432zm-189.964 44.858a27.823 27.823 0 0 0 -27.293 33.255 27.83 27.83 0 0 0 21.862 21.865 27.824 27.824 0 0 0 33.251-27.296v-25.977a2.007 2.007 0 0 0 -1.904-1.904z" fill="#702af7"/>
</svg></div>

## Blazor Web Assembly Template

[Sebastian Faltoni](https://github.com/nukedbit) from the ServiceStack community is maintaining a .NET 6.0 [Blazor WASM Template](https://github.com/nukedbit/blazor-wasm-servicestack)

A New ServiceStack + Blazor WASM templates can be created with:

```bash
$ x new nukedbit/blazor-wasm-servicestack ProjectName
```

### Executing in a Standalone Desktop app

For an even better integrated Desktop App Experience you can also use ServiceStack's [app dotnet tool](https://docs.servicestack.net/netcore-windows-desktop) to run your Blazor Desktop Apps as a Chromium Desktop App:

```bash
$ dotnet tool update -g app
$ x new nukedbit/blazor-wasm-servicestack Acme
$ cd Acme\Acme
$ dotnet public -c Release
$ cd bin\Release\net5.0\publish
$ app Acme.dll
```

![](https://raw.githubusercontent.com/nukedbit/blazor-wasm-servicestack/master/blazor-wasm-servicestack.png)

## Blazor Service Client

As we track Blazor's progress we've created an official API for creating C#/.NET Service Client instances with:

```csharp
var client = BlazorClient.Create(baseUrl);
```

Which returns a `JsonHttpClient` stripped of features that are known not to work in Blazor, we'll keep it updated as Blazor gains support for additional features.

This API also lets you modify the MessageHandler all Blazor client instances are configured with:

```csharp
BlazorClient.MessageHandler = new HttpClientHandler { ... };
```
