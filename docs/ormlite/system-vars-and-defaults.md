---
title: System variables and default values
---

To provide richer support for non-standard default values, each RDBMS Dialect Provider contains a
`OrmLiteDialectProvider.Variables` placeholder dictionary for storing common, but non-standard RDBMS functionality.
We can use this to define non-standard default values, in a declarative way, that works across all supported RDBMS's
like automatically populating a column with the RDBMS UTC Date when Inserted with a `default(T)` Value:

```csharp
public class Poco
{
    [Default(OrmLiteVariables.SystemUtc)]  //= {SYSTEM_UTC}
    public DateTime CreatedTimeUtc { get; set; }
}
```

OrmLite variables need to be surrounded with `{}` braces to identify that it's a placeholder variable, e.g `{SYSTEM_UTC}`.

The [ForeignKeyTests](https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/tests/ServiceStack.OrmLite.Tests/ForeignKeyAttributeTests.cs)
show the resulting behaviour with each of these configurations in more detail.

::: info
Note: Only supported on RDBMS's with foreign key/referential action support, e.g.
[Sql Server](http://msdn.microsoft.com/en-us/library/ms174979.aspx),
[PostgreSQL](http://www.postgresql.org/docs/9.1/static/ddl-constraints.html),
[MySQL](http://dev.mysql.com/doc/refman/5.5/en/innodb-foreign-key-constraints.html). Otherwise they're ignored.
:::