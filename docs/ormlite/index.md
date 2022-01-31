---
title: Fast, Simple, Typed ORM for .NET
---

OrmLite's goal is to provide a convenient, DRY, config-free, RDBMS-agnostic typed wrapper that retains
a high affinity with SQL, exposing intuitive APIs that generate predictable SQL and maps cleanly to
 disconnected and Data Transfer Object (DTO) friendly, Plain Old C# Objects (POCOs). This approach makes easier to reason-about your data access making
it obvious what SQL is getting executed at what time, whilst mitigating unexpected behavior,
implicit N+1 queries and leaky data access prevalent in Heavy Object Relational Mappers (ORMs).

OrmLite was designed with a focus on the core objectives:

* Provide a set of light-weight C# extension methods around .NET's impl-agnostic `System.Data.*` interfaces
* Map a POCO class 1:1 to an RDBMS table, cleanly by conventions, without any attributes required.
* Create/Drop DB Table schemas using nothing but POCO class definitions
* Simplicity - typed, wrist friendly API for common data access patterns.
* High performance - with support for indexes, text blobs, etc.
    * Amongst the [fastest Micro ORMs](https://servicestackv3.github.io/Mono/src/Mono/benchmarks/default.htm) for .NET.
* Expressive power and flexibility - with access to `IDbCommand` and raw SQL
* Cross-platform - supports multiple dbs (currently: Sql Server, Sqlite, MySql, PostgreSQL, Firebird) running on both .NET Framework and .NET Core platforms.

In OrmLite: **1 Class = 1 Table**. There should be no surprising or hidden behaviour, the Typed API
that produces the Query
[doesn't impact how results get intuitively mapped](http://stackoverflow.com/a/37443162/85785)
to the returned POCO's which could be different to the POCO used to create the query, e.g. containing only
a subset of the fields you want populated.

Any non-scalar properties (i.e. complex types) are text blobbed by default in a schema-less text field
using any of the [available pluggable text serializers](logging-and-introspection#pluggable-complex-type-serializers).
Support for [POCO-friendly references](reference-support) is also available to provide
a convenient API to persist related models. Effectively this allows you to create a table from any
POCO type, and it should persist as expected in a DB Table with columns for each of the classes 1st
level public properties.

## Download

Install the NuGet package for your RDBMS Provider, e.g:

```
$ dotnet add package ServiceStack.OrmLite.PostgreSQL
```

Package Reference:

```xml
<PackageReference Include="ServiceStack.OrmLite.SqlServer" Version="6.*" />
```

## OrmLite RDBMS Providers

- [ServiceStack.OrmLite.PostgreSQL](http://nuget.org/List/Packages/ServiceStack.OrmLite.PostgreSQL)
- [ServiceStack.OrmLite.SqlServer](http://nuget.org/List/Packages/ServiceStack.OrmLite.SqlServer)
- [ServiceStack.OrmLite.SqlServer.Data](http://nuget.org/List/Packages/ServiceStack.OrmLite.SqlServer.Data) (uses [Microsoft.Data.SqlClient](https://devblogs.microsoft.com/dotnet/introducing-the-new-microsoftdatasqlclient/))
- [ServiceStack.OrmLite.Sqlite](http://nuget.org/packages/ServiceStack.OrmLite.Sqlite)
- [ServiceStack.OrmLite.Sqlite.Data](http://nuget.org/packages/ServiceStack.OrmLite.Sqlite.Data) (uses [Microsoft.Data.SQLite](https://stackoverflow.com/a/52025556/85785))
- [ServiceStack.OrmLite.Sqlite.Cil](http://nuget.org/packages/ServiceStack.OrmLite.Sqlite.Cil) (uses [Uses SQLitePCLRaw.bundle_cil](https://ericsink.com/entries/sqlite_llama_preview.html))
- [ServiceStack.OrmLite.Sqlite.Windows](http://nuget.org/packages/ServiceStack.OrmLite.Sqlite.Windows) (Windows / .NET Framework only)
- [ServiceStack.OrmLite.MySql](http://nuget.org/List/Packages/ServiceStack.OrmLite.MySql)
- [ServiceStack.OrmLite.MySqlConnector](http://nuget.org/List/Packages/ServiceStack.OrmLite.MySqlConnector) (uses [MySqlConnector](https://github.com/mysql-net/MySqlConnector))

These packages contain **.NET Framework v4.7.2**, **.NET Standard 2.0**, and .NET 6 versions and supports both .NET Framework and .NET Core projects.

The `.Core` packages contains only **.NET Standard 2.0** versions which can be used in ASP.NET Core Apps running on the .NET Framework:

- [ServiceStack.OrmLite.SqlServer.Core](http://nuget.org/List/Packages/ServiceStack.OrmLite.SqlServer.Core)
- [ServiceStack.OrmLite.PostgreSQL.Core](http://nuget.org/List/Packages/ServiceStack.OrmLite.PostgreSQL.Core)
- [ServiceStack.OrmLite.MySql.Core](http://nuget.org/List/Packages/ServiceStack.OrmLite.MySql.Core)
- [ServiceStack.OrmLite.Sqlite.Core](http://nuget.org/packages/ServiceStack.OrmLite.Sqlite.Core)

### Community Providers

Unofficial Releases maintained by ServiceStack Community:

- [ServiceStack.OrmLite.Oracle](http://nuget.org/packages/ServiceStack.OrmLite.Oracle)
- [ServiceStack.OrmLite.Firebird](http://nuget.org/List/Packages/ServiceStack.OrmLite.Firebird)

## Getting Started with OrmLite and AWS RDS

OrmLite has great support AWS's managed RDS Databases, follow these getting started guides to help to get up and running quickly:

- [PostgreSQL](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-postgresql-and-ormlite)
- [Aurora](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-aurora-and-ormlite)
- [MySQL](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-mysql-and-ormlite)
- [MariaDB](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-mariadb-and-ormlite)
- [SQL Server](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-sql-server-and-ormlite)

Source code for example can be found on our [AwsGettingStarted](https://github.com/ServiceStackApps/AwsGettingStarted) repositories.


## Community Resources

- [OrmLite and Redis: New alternatives for handling db communication](http://www.abtosoftware.com/blog/servicestack-ormlite-and-redis-new-alternatives-for-handling-db-communication) by [@abtosoftware](https://twitter.com/abtosoftware)
- [Object Serialization as Step Towards Normalization](http://www.unpluggeddevelopment.com/post/85225892120/object-serialization-as-step-towards-normalization) by [@ 82unpluggd](https://twitter.com/82unpluggd)
- [Creating a Data Access Layer using OrmLite](http://blogs.askcts.com/2014/05/07/getting-started-with-servicestack-part-2/) by [Lydon Bergin](http://blogs.askcts.com/)
- [Code Generation using ServiceStack.OrmLite and T4 Text templates](http://jokecamp.wordpress.com/2013/09/07/code-generation-using-servicestack-ormlite-and-t4-text-templates/) by [@jokecamp](https://twitter.com/jokecamp)
- [Simple ServiceStack OrmLite Example](http://www.curlette.com/?p=1068) by [@robrtc](https://twitter.com/robrtc)
- [OrmLite Blobbing done with NHibernate and Serialized JSON](http://www.philliphaydon.com/2012/03/ormlite-blobbing-done-with-nhibernate-and-serialized-json/) by [@philliphaydon](https://twitter.com/philliphaydon)
- [Creating An ASP.NET MVC Blog With ServiceStack.OrmLite](http://www.eggheadcafe.com/tutorials/asp-net/285cbe96-9922-406a-b193-3a0b40e31c40/creating-an-aspnet-mvc-blog-with-servicestackormlite.aspx) by [@peterbromberg](https://twitter.com/peterbromberg)

## Other notable Micro ORMs for .NET
Many performance problems can be mitigated and a lot of use-cases can be simplified without the use of a heavyweight ORM, and their config, mappings and infrastructure.
As [performance is the most important feature](https://github.com/mythz/ScalingDotNET) we can recommend the following list, each with their own unique special blend of features.

* **[Dapper](http://code.google.com/p/dapper-dot-net/)** - by [@samsaffron](http://twitter.com/samsaffron) and [@marcgravell](http://twitter.com/marcgravell)
    - The current performance king, supports both POCO and dynamic access, fits in a single class. Put in production to solve [StackOverflow's DB Perf issues](http://samsaffron.com/archive/2011/03/30/How+I+learned+to+stop+worrying+and+write+my+own+ORM). Requires .NET 4.
* **[PetaPoco](http://www.toptensoftware.com/petapoco/)** - by [@toptensoftware](http://twitter.com/toptensoftware)
    - Fast, supports dynamics, expandos and typed POCOs, fits in a single class, runs on .NET 3.5 and Mono. Includes optional T4 templates for POCO table generation.
* **[Massive](https://github.com/robconery/massive)** - by [@robconery](http://twitter.com/robconery)
    - Fast, supports dynamics and expandos, smart use of optional params to provide a wrist-friendly api, fits in a single class. Multiple RDBMS support. Requires .NET 4.
* **[Simple.Data](https://github.com/markrendle/Simple.Data)** - by [@markrendle](http://twitter.com/markrendle)
    - A little slower than above ORMS, most wrist-friendly courtesy of a dynamic API, multiple RDBMS support inc. Mongo DB. Requires .NET 4.
