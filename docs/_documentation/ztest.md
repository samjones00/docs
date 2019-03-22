---
slug: ztest
title: ztest
---

### Bootstrap Tabs

<ul class="nav nav-pills mb-3" id="pills-server" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="pills-vuetify-tab" data-toggle="pill" href="#pills-vuetify" role="tab" aria-controls="pills-vuetify" aria-selected="true">
        Vuetify
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-client-ts-tab" data-toggle="pill" href="#pills-client-ts" role="tab" aria-controls="pills-client-ts" aria-selected="false">
        Client TypeScript
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-client-jquery-tab" data-toggle="pill" href="#pills-client-jquery" role="tab" aria-controls="pills-client-jquery" aria-selected="false">
        Client jQuery
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-client-razor-tab" data-toggle="pill" href="#pills-client-razor" role="tab" aria-controls="pills-client-razor" aria-selected="true">
        Client Razor
    </a>
  </li>
</ul>
<div class="tab-content" id="pills-serverContent">
  <div class="tab-pane fade show active" id="pills-vuetify" role="tabpanel" aria-labelledby="pills-vuetify-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/login.html">/server/login.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/vuetify.html %}
  </div>

  <div class="tab-pane fade" id="pills-client-ts" role="tabpanel" aria-labelledby="pills-client-ts-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/client-ts/login.html">/client-ts/login.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/client-ts.html %}
  </div>

  <div class="tab-pane fade" id="pills-client-jquery" role="tabpanel" aria-labelledby="pills-client-jquery-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/client-jquery/login.html">/client-jquery/login.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/client-jquery.html %}
  </div>

  <div class="tab-pane fade" id="pills-client-razor" role="tabpanel" aria-labelledby="pills-client-razor-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/client-razor/login.cshtml">/client-razor/login.cshtml</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/client-razor.html %}
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

