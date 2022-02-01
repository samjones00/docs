---
title: Getting started with OrmLite
---

After [installing OrmLite](installation) we now need to configure OrmLite's DB Connection Factory containing the RDBMS Dialect you want to use and the primary DB connection string you wish to connect to. Most NuGet OrmLite packages only contain a single provider listed below:

```csharp
SqlServerDialect.Provider      // SQL Server Version 2012+
SqliteDialect.Provider         // Sqlite
PostgreSqlDialect.Provider     // PostgreSQL 
MySqlDialect.Provider          // MySql
OracleDialect.Provider         // Oracle
FirebirdDialect.Provider       // Firebird
```

### SQL Server Dialects

Except for SQL Server which has a number of different dialects to take advantage of features available in each version, please use the best matching version closest to your SQL Server version:

```csharp
SqlServer2008Dialect.Provider  // SQL Server <= 2008
SqlServer2012Dialect.Provider  // SQL Server 2012
SqlServer2014Dialect.Provider  // SQL Server 2014
SqlServer2016Dialect.Provider  // SQL Server 2016
SqlServer2017Dialect.Provider  // SQL Server 2017+
```

## OrmLite Connection Factory

To configure OrmLite you'll need your App's DB Connection string along the above RDBMS Dialect Provider, e.g:

```csharp
var dbFactory = new OrmLiteConnectionFactory(
    connectionString,  
    SqlServerDialect.Provider);
```

If you're using an IOC register `OrmLiteConnectionFactory` as a **singleton**:

```csharp
services.AddSingleton<IDbConnectionFactory>(
    new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider)); //InMemory Sqlite DB
```

Which can then be used to open DB Connections to your RDBMS.

### Creating Table and Seed Data Example

If connecting to an empty database you can use OrmLite's Create Table APIs to create any missing tables you need, which OrmLite creates
based solely on the Schema definition of your POCO data models.

`CreateTableIfNotExists` returns **true** if the table didn't exist and OrmLite created it, where it can be further populated with any initial seed data it should have, e.g:

```csharp
using var db = dbFactory.Open();

if (db.CreateTableIfNotExists<Poco>())
{
    db.Insert(new Poco { Id = 1, Name = "Seed Data"});
}

var result = db.SingleById<Poco>(1);
result.PrintDump(); //= {Id: 1, Name:Seed Data}
```

## OrmLite Interactive Tour

A quick way to learn about OrmLite is to take the [OrmLite Interactive Tour](https://gist.cafe/87164fa870ac7503b43333d1d275456c?docs=8a70f8bf2755f0a755afeca6b2a5238e) which lets you try out and explore different OrmLite features immediately from the comfort of your own
browser without needing to install anything:

[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/gistcafe/ormlite-tour-screenshot.png)](https://gist.cafe/87164fa870ac7503b43333d1d275456c?docs=8a70f8bf2755f0a755afeca6b2a5238e)

## Getting Started with OrmLite and AWS RDS

OrmLite has great support AWS's managed RDS Databases, follow these getting started guides to help to get up and running quickly:

- [PostgreSQL](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-postgresql-and-ormlite)
- [Aurora](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-aurora-and-ormlite)
- [MySQL](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-mysql-and-ormlite)
- [MariaDB](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-mariadb-and-ormlite)
- [SQL Server](https://github.com/ServiceStackApps/AwsGettingStarted#getting-started-with-aws-rds-sql-server-and-ormlite)

Source code for example can be found on our [AwsGettingStarted](https://github.com/ServiceStackApps/AwsGettingStarted) repositories.
