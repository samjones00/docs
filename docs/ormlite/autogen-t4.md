---
title: AutoGen & T4 Templates
---

## AutoQuery AutoGen

The recommended way to auto generate Tables and APIs for your existing RDBMS tables is to use [AutoQuery AutoGen](/autoquery-autogen) whose declarative nature allows us to easily generate AutoQuery & Crud Services using just declarative DTOs.

<iframe class="video-hd" src="https://www.youtube.com/embed/NaJ7TW-Q_pU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## T4 Templates

[OrmLite's T4 Template](https://github.com/ServiceStack/ServiceStack.OrmLite/tree/master/src/T4) are useful in database-first development or when wanting to use OrmLite with an existing RDBMS by automatically generating POCO's and strong-typed wrappers for executing stored procedures.

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.T4" Version="6.*" />`
:::
