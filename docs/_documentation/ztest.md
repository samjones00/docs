---
slug: ztest
title: ztest
---

All Auth Configuration is encapsulated within a "no-touch" `IConfigureAppHost` plugin that's run once on Startup:

{% include gist94750992.html %}

All Services and Validators used in this App. Extension methods are used to DRY reusable code and a Custom
[Auto Mapping](/auto-mapping) handles conversion between the `Contact` Data Model and Contact`` DTO:

{% include gist94751658.html %}

The dynamic App data used within ServiceStack Sharp Pages and Razor pages are maintained within Custom `ContactScripts` and `RazorHelpers`:

{% include gist94751797.html %}

Typed Request/Response Service Contracts including Data and DTO models that utilizes Enum's:

{% include gist94765060.html %}

### Includes

