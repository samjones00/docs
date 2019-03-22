---
slug: ztest
title: ztest
---

### Bootstrap Tabs

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>

### Server Gists

All Auth Configuration is encapsulated within a "no-touch" `IConfigureAppHost` plugin that's run once on Startup:

{% include gist94750992.html %}

All Services and Validators used in this App. Extension methods are used to DRY reusable code and a Custom
[Auto Mapping](/auto-mapping) handles conversion between the `Contact` Data Model and Contact`` DTO:

{% include gist94751658.html %}

The dynamic App data used within ServiceStack Sharp Pages and Razor pages are maintained within Custom `ContactScripts` and `RazorHelpers`:

{% include gist94751797.html %}

Typed Request/Response Service Contracts including Data and DTO models that utilizes Enum's:

{% include gist94765060.html %}

