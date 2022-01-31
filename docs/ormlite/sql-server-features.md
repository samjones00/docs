---
title: SQL Server Features
---

## Memory Optimized Tables

OrmLite allows access to many advanced SQL Server features including
[Memory-Optimized Tables](https://msdn.microsoft.com/en-us/library/dn133165.aspx) where you can tell
SQL Server to maintain specific tables in Memory using the `[SqlServerMemoryOptimized]` attribute, e.g:

```csharp
[SqlServerMemoryOptimized(SqlServerDurability.SchemaOnly)]
public class SqlServerMemoryOptimizedCacheEntry : ICacheEntry
{
    [PrimaryKey]
    [StringLength(StringLengthAttribute.MaxText)]
    [SqlServerBucketCount(10000000)]
    public string Id { get; set; }
    [StringLength(StringLengthAttribute.MaxText)]
    public string Data { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public DateTime ModifiedDate { get; set; }
}
```

The `[SqlServerBucketCount]` attribute can be used to
[configure the bucket count for a hash index](https://msdn.microsoft.com/en-us/library/mt706517.aspx#configuring_bucket_count)
whilst the new `[SqlServerCollate]` attribute can be used to specify an SQL Server collation.

## SQL Server Types

OrmLite can be extended to support new Types using SQL Server Special Type Converters which currently adds support for the SQL Server-specific
[SqlGeography](https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/src/ServiceStack.OrmLite.SqlServer.Converters/SqlServerGeographyTypeConverter.cs),
[SqlGeometry](https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/src/ServiceStack.OrmLite.SqlServer.Converters/SqlServerGeometryTypeConverter.cs)
and
[SqlHierarchyId](https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/src/ServiceStack.OrmLite.SqlServer.Converters/SqlServerHierarchyIdTypeConverter.cs)
Types.

Since these Types require an external dependency to the **Microsoft.SqlServer.Types** NuGet package they're
contained in a separate NuGet package that can be installed with:

```
PM> Install-Package ServiceStack.OrmLite.SqlServer.Converters
```

Once installed, all available SQL Server Types can be registered on your SQL Server Provider with:

```csharp
SqlServerConverters.Configure(SqlServer2012Dialect.Provider);
```

## SqlServer 2012 Connection String

In addition to using `SqlServer2012Dialect.Provider` you'll also need to specify you're using MSSQL 2012 on the connection string by adding the `;Type System Version=SQL Server 2012;` suffix, e.g:

```csharp
var dbFactory = new OrmLiteConnectionFactory(
  "Server=host;Database=db;User Id=sa;Password=test;Type System Version=SQL Server 2012",
  SqlServer2012Dialect.Provider);

var db = dbFactory.OpenDbConnection();
```

### Example Usage

After the Converters are registered they can treated like a normal .NET Type, e.g:

**SqlHierarchyId** Example:

```csharp
public class Node {
    [AutoIncrement]
    public long Id { get; set; }
    public SqlHierarchyId TreeId { get; set; }
}

db.DropAndCreateTable<Node>();

var treeId = SqlHierarchyId.Parse("/1/1/3/"); // 0x5ADE is hex
db.Insert(new Node { TreeId = treeId });

var parent = db.Scalar<SqlHierarchyId>(
    db.From<Node>().Select("TreeId.GetAncestor(1)"));
parent.ToString().Print(); //= /1/1/
```

**SqlGeography** and **SqlGeometry** Example:

```csharp
public class GeoTest {
    public long Id { get; set; }
    public SqlGeography Location { get; set; }
    public SqlGeometry Shape { get; set; }
}

db.DropAndCreateTable<GeoTest>();

var geo = SqlGeography.Point(40.6898329,-74.0452177, 4326); // Statue of Liberty

// A simple line from (0,0) to (4,4)  Length = SQRT(2 * 4^2)
var wkt = new System.Data.SqlTypes.SqlChars("LINESTRING(0 0,4 4)".ToCharArray());
var shape = SqlGeometry.STLineFromText(wkt, 0);

db.Insert(new GeoTestTable { Id = 1, Location = geo, Shape = shape });
var dbShape = db.SingleById<GeoTest>(1).Shape;

new { dbShape.STEndPoint().STX, dbShape.STEndPoint().STY }.PrintDump();
```

Output:

```
{
    STX: 4,
    STY: 4
}
```
