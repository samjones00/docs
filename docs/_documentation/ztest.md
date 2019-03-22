---
slug: ztest
title: ztest
---

### Bootstrap Tabs

<ul class="nav nav-pills mb-3" id="login-server" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="login-server-sharp-tab" data-toggle="pill" href="#login-server-sharp" role="tab" aria-controls="login-server-sharp" aria-selected="true">
        Sharp Pages
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="login-server-ts-tab" data-toggle="pill" href="#login-server-ts" role="tab" aria-controls="login-server-ts" aria-selected="false">
        Server TypeScript
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="login-server-jquery-tab" data-toggle="pill" href="#login-server-jquery" role="tab" aria-controls="login-server-jquery" aria-selected="false">
        Server jQuery
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="login-server-razor-tab" data-toggle="pill" href="#login-server-razor" role="tab" aria-controls="login-server-razor" aria-selected="true">
        Server Razor
    </a>
  </li>
</ul>
<div class="tab-content" id="login-serverContent">
  <div class="tab-pane fade show active" id="login-server-sharp" role="tabpanel" aria-labelledby="login-server-sharp-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/login.html">/server/login.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/login/server-sharp.html %}
  </div>

  <div class="tab-pane fade" id="login-server-ts" role="tabpanel" aria-labelledby="login-server-ts-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server-ts/login.html">/server-ts/login.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/login/server-ts.html %}
  </div>

  <div class="tab-pane fade" id="login-server-jquery" role="tabpanel" aria-labelledby="login-server-jquery-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server-jquery/login.html">/server-jquery/login.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/login/server-jquery.html %}
  </div>

  <div class="tab-pane fade" id="login-server-razor" role="tabpanel" aria-labelledby="login-server-razor-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server-razor/login.cshtml">/server-razor/login.cshtml</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/login/server-razor.html %}
  </div>
</div>

{% gist 166272f4b106cf254fd30448f7054440 %}

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

