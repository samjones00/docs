---
slug: ztest
title: ztest
---

### Bootstrap Tabs

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="pills-server-sharp-tab" data-toggle="pill" href="#pills-server-sharp" role="tab" aria-controls="pills-server-sharp" aria-selected="true">
        Sharp Pages
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-server-ts-tab" data-toggle="pill" href="#pills-server-ts" role="tab" aria-controls="pills-server-ts" aria-selected="false">
        Server TypeScript
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-server-jquery-tab" data-toggle="pill" href="#pills-server-jquery" role="tab" aria-controls="pills-server-jquery" aria-selected="false">
        Server jQuery
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-server-razor-tab" data-toggle="pill" href="#pills-server-razor" role="tab" aria-controls="pills-server-razor" aria-selected="true">
        Server Razor
    </a>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-server-sharp" role="tabpanel" aria-labelledby="pills-server-sharp-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/login.html">/server/login.html</a>
    </div>
    <h3>Source Code and References</h3>

    {% include validation/server/sharp.html %}

  </div>

  <div class="tab-pane fade" id="pills-server-ts" role="tabpanel" aria-labelledby="pills-server-ts-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/login.html">/server/login.html</a>
    </div>
    <h3>Source Code and References</h3>

    {% include validation/server/ts.html %}

  </div>

  <div class="tab-pane fade" id="pills-server-jquery" role="tabpanel" aria-labelledby="pills-server-jquery-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/login.html">/server/login.html</a>
    </div>
    <h3>Source Code and References</h3>

    {% include validation/server/jquery.html %}

  </div>

  <div class="tab-pane fade" id="pills-server-razor" role="tabpanel" aria-labelledby="pills-server-razor-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/login.html">/server/login.html</a>
    </div>
    <h3>Source Code and References</h3>

    {% include validation/server/razor.html %}

  </div>
</div>

### Server Gists

All Auth Configuration is encapsulated within a "no-touch" `IConfigureAppHost` plugin that's run once on Startup:

{% include validation/services/gist94750992.html %}

All Services and Validators used in this App. Extension methods are used to DRY reusable code and a Custom
[Auto Mapping](/auto-mapping) handles conversion between the `Contact` Data Model and Contact`` DTO:

{% include validation/services/gist94751658.html %}

The dynamic App data used within ServiceStack Sharp Pages and Razor pages are maintained within Custom `ContactScripts` and `RazorHelpers`:

{% include validation/services/gist94751797.html %}

Typed Request/Response Service Contracts including Data and DTO models that utilizes Enum's:

{% include validation/services/gist94765060.html %}

