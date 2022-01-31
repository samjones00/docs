---
title: Getting started with OrmLite
---

First Install the NuGet package of the RDBMS you want to use, e.g:

::: nuget
`<PackageReference Include="ServiceStack.OrmLite.SqlServer" Version="6.*" />`
:::

Each RDBMS includes a specialized dialect provider that encapsulated the differences in each RDBMS
to support OrmLite features. The available Dialect Providers for each RDBMS is listed below:

```csharp
SqlServerDialect.Provider      // SQL Server Version 2012+
SqliteDialect.Provider         // Sqlite
PostgreSqlDialect.Provider     // PostgreSQL 
MySqlDialect.Provider          // MySql
OracleDialect.Provider         // Oracle
FirebirdDialect.Provider       // Firebird
```

## Quickstart using `x mix`

If you already have a .NET+ ASP.NET project, you can use the [ServiceStack dotnet tool `x`](../dotnet-tool) to `mix` in pre-configured modules for your database of choice.
For example for SQL Server:

```bash
$ x mix sqlserver 
```

We have mix templates for all OrmLite's supported database vendors.

```bash
$ x mix postgres
$ x mix mysql
$ x mix sqlite
$ x mix dynamodb
$ x mix ravendb
$ x mix oracle
$ x mix mongodb
$ x mix firebird
$ x mix marten
```



## SQL Server Versions

There are a number of different SQL Server dialects to take advantage of features available in each version. For any version before SQL Server 2008 please use `SqlServer2008Dialect.Provider`, for any other version please use the best matching version:

```csharp
SqlServer2008Dialect.Provider  // SQL Server <= 2008
SqlServer2012Dialect.Provider  // SQL Server 2012
SqlServer2014Dialect.Provider  // SQL Server 2014
SqlServer2016Dialect.Provider  // SQL Server 2016
SqlServer2017Dialect.Provider  // SQL Server 2017+
```

## Configure OrmLiteConnectionFactory

To configure OrmLite you need the DB Connection string along the Dialect Provider of the RDBMS you're
connecting to, e.g:

```csharp
var dbFactory = new OrmLiteConnectionFactory(
    connectionString,  
    SqlServerDialect.Provider);
```

If you're using an IOC you can register `OrmLiteConnectionFactory` as a **singleton**, e.g:

```csharp
container.Register<IDbConnectionFactory>(c => 
    new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider)); //InMemory Sqlite DB
```

You can then use the `dbFactory` to open ADO.NET DB Connections to your database.
If connecting to an empty database you can use OrmLite's Create Table API's to create any tables
you need based solely on the Schema definition of your POCO and populate it with any initial
seed data you need, e.g:

```csharp
using (var db = dbFactory.Open())
{
    if (db.CreateTableIfNotExists<Poco>())
    {
        db.Insert(new Poco { Id = 1, Name = "Seed Data"});
    }

    var result = db.SingleById<Poco>(1);
    result.PrintDump(); //= {Id: 1, Name:Seed Data}
}
```

## [OrmLite Interactive Tour](https://gist.cafe/87164fa870ac7503b43333d1d275456c?docs=8a70f8bf2755f0a755afeca6b2a5238e)

The best way to learn about OrmLite is to take the [OrmLite Interactive Tour](https://gist.cafe/87164fa870ac7503b43333d1d275456c?docs=8a70f8bf2755f0a755afeca6b2a5238e)
which lets you try out and explore different OrmLite features immediately from the comfort of your own
browser without needing to install anything:

[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/gistcafe/ormlite-tour-screenshot.png)](https://gist.cafe/87164fa870ac7503b43333d1d275456c?docs=8a70f8bf2755f0a755afeca6b2a5238e)

