---
slug: ztest
title: ztest
---

All Auth Configuration is encapsulated within a "no-touch" `IConfigureAppHost` plugin that's run once on Startup:

{% gist a965b4bbed8142c9f8215fd25f40317b %}

All Services and Validators used in this App. Extension methods are used to DRY reusable code and a Custom
[Auto Mapping](/auto-mapping) handles conversion between the `Contact` Data Model and Contact`` DTO:

{% gist 955b35004a72a293334e812978f42503 %}

The dynamic App data used within ServiceStack Sharp Pages and Razor pages are maintained within Custom `ContactScripts` and `RazorHelpers`:

{% gist 92a3c2cf97b5c6ce6d5b67c0a87b7d22 %}

Typed Request/Response Service Contracts including Data and DTO models that utilizes Enum's:

{% gist 9a95fd0e2280f961a0a67243d2c799b0 %}

### Includes

{% include gist94750992.html %}
