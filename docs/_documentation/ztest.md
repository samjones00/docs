---
slug: ztest
title: ztest
---

### Bootstrap Tabs

<ul class="nav nav-pills mb-3" id="contacts-server" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="contacts-server-sharp-tab" data-toggle="pill" href="#contacts-server-sharp" role="tab" aria-controls="contacts-server-sharp" aria-selected="true">
        Sharp Pages
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contacts-server-ts-tab" data-toggle="pill" href="#contacts-server-ts" role="tab" aria-controls="contacts-server-ts" aria-selected="false">
        Server TypeScript
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contacts-server-jquery-tab" data-toggle="pill" href="#contacts-server-jquery" role="tab" aria-controls="contacts-server-jquery" aria-selected="false">
        Server jQuery
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contacts-server-razor-tab" data-toggle="pill" href="#contacts-server-razor" role="tab" aria-controls="contacts-server-razor" aria-selected="true">
        Server Razor
    </a>
  </li>
</ul>
<div class="tab-content" id="contacts-serverContent">
  <div class="tab-pane fade show active" id="contacts-server-sharp" role="tabpanel" aria-labelledby="contacts-server-sharp-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/contacts.html">/server/contacts.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/server-sharp.html %}
  </div>

  <div class="tab-pane fade" id="contacts-server-ts" role="tabpanel" aria-labelledby="contacts-server-ts-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server-ts/contacts.html">/server-ts/contacts.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/server-ts.html %}
  </div>

  <div class="tab-pane fade" id="contacts-server-jquery" role="tabpanel" aria-labelledby="contacts-server-jquery-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server-jquery/contacts.html">/server-jquery/contacts.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/server-jquery.html %}
  </div>

  <div class="tab-pane fade" id="contacts-server-razor" role="tabpanel" aria-labelledby="contacts-server-razor-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server-razor/contacts.cshtml">/server-razor/contacts.cshtml</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/server-razor.html %}
  </div>
</div>

{ % gist 166272f4b106cf254fd30448f7054440 % }

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

