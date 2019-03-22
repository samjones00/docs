---
slug: ztest
title: ztest
---

### Bootstrap Tabs

<ul class="nav nav-pills mb-3" id="contacts-server" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="contacts-vuetify-tab" data-toggle="pill" href="#contacts-vuetify" role="tab" aria-controls="contacts-vuetify" aria-selected="true">
        Sharp Pages
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contacts-client-ts-tab" data-toggle="pill" href="#contacts-client-ts" role="tab" aria-controls="contacts-client-ts" aria-selected="false">
        Server TypeScript
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contacts-client-jquery-tab" data-toggle="pill" href="#contacts-client-jquery" role="tab" aria-controls="contacts-client-jquery" aria-selected="false">
        Server jQuery
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contacts-client-razor-tab" data-toggle="pill" href="#contacts-client-razor" role="tab" aria-controls="contacts-client-razor" aria-selected="true">
        Server Razor
    </a>
  </li>
</ul>
<div class="tab-content" id="contacts-serverContent">
  <div class="tab-pane fade show active" id="contacts-vuetify" role="tabpanel" aria-labelledby="contacts-vuetify-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/server/contacts.html">/server/contacts.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/vuetify.html %}
  </div>

  <div class="tab-pane fade" id="contacts-client-ts" role="tabpanel" aria-labelledby="contacts-client-ts-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/client-ts/contacts.html">/client-ts/contacts.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/client-ts.html %}
  </div>

  <div class="tab-pane fade" id="contacts-client-jquery" role="tabpanel" aria-labelledby="contacts-client-jquery-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/client-jquery/contacts.html">/client-jquery/contacts.html</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/client-jquery.html %}
  </div>

  <div class="tab-pane fade" id="contacts-client-razor" role="tabpanel" aria-labelledby="contacts-client-razor-tab">
    <div class="float-right">
        <a href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/client-razor/contacts.cshtml">/client-razor/contacts.cshtml</a>
    </div>
    <h3>Source Code and References</h3>
    {% include validation/contacts/client-razor.html %}
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

