---
slug: vue-desktop
title: Redis Vue Desktop
---

[Redis Vue](https://sharpscript.net/sharp-apps/redis#redis-vue) is a simple user-friendly [Vue Desktop App](https://www.vuedesktop.com) for browsing data in Redis servers which takes advantages of the complex
type conventions built in the ServiceStack.Redis Client to provide a rich, human-friendly UI for navigating related datasets, enabling a fast and fluid browsing experience for your Redis servers.

Install [.NET SDK](https://dotnet.microsoft.com/download) and run [install/app.ps1](https://servicestack.net/install/app.ps1) to install the `app` dotnet tool:

```
powershell iwr gist.cafe/install.ps1 -useb | iex
```

Then run `redis` Vue Desktop App in a browser:

```
app://redis
```

Or from the command-line:

```
app open redis
```