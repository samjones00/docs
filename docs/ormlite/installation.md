---
title: OrmLite Installation
---

OrmLite packages are available on NuGet and can be installed directly using your IDE or by adding a `PackageReference` directly to your `.csproj` file.

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.PostgreSQL" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.SqlServer" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.SqlServer.Data" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Sqlite" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Sqlite.Data" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Sqlite.Cil" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Sqlite.Windows" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.MySql" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.MySqlConnector" Version="6.*" />`
:::

These packages contain **.NET Framework v4.7.2**, **.NET Standard 2.0**, and .NET 6 versions and supports both .NET Framework and .NET Core projects.

The `.Core` packages contains only **.NET Standard 2.0** versions which can be used in ASP.NET Core Apps running on the .NET Framework:

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.SqlServer.Core" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.PostgreSQL.Core" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.MySql.Core" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Sqlite.Core" Version="6.*" />`
:::

### Community Providers

Unofficial Releases maintained by ServiceStack Community:

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Oracle" Version="6.*" />`
:::

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.Firebird" Version="6.*" />`
:::

## Quickstart using `x mix`

If you already have a .NET6+ ASP.NET Core project, you can use the [ServiceStack dotnet tool `x`](../dotnet-tool) to `mix` in pre-configured modules for your database of choice.
For example for SQL Server:

```bash
$ x mix sqlserver 
```

We have mix templates for all OrmLite's supported database vendors.

```bash
$ x mix postgres
$ x mix mysql
$ x mix sqlite
$ x mix oracle
$ x mix firebird
```

::: info
If you don't have the dotnet `x` tool installed, it can be installed using the command:
```bash
dotnet tool install -g x
```
:::
