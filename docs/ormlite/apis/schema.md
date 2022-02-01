---
title: Schema, Table & Column APIs
---

As the queries for retrieving table names can vary amongst different RDBMS's, we've abstracted their implementations behind uniform APIs
where you can now get a list of table names and their row counts for all supported RDBMS's with:

```csharp
List<string> tableNames = db.GetTableNames();

List<KeyValuePair<string,long>> tableNamesWithRowCounts = db.GetTableNamesWithRowCounts();
```

::: info
`*Async` variants also available
:::

Both APIs can be called with an optional `schema` if you only want the tables for a specific schema.
It defaults to using the more efficient RDBMS APIs, which if offered typically returns an approximate estimate of rowcounts in each table.

If you need exact table row counts, you can specify `live:true`:

```csharp
var tablesWithRowCounts = db.GetTableNamesWithRowCounts(live:true);
```

## Modify Custom Schema

OrmLite provides Typed APIs for modifying Table Schemas that makes it easy to inspect the state of an
RDBMS Table which can be used to determine what modifications you want on it, e.g:

```csharp
class Poco 
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Ssn { get; set; }
}

db.DropTable<Poco>();
db.TableExists<Poco>(); //= false

db.CreateTable<Poco>(); 
db.TableExists<Poco>(); //= true

db.ColumnExists<Poco>(x => x.Ssn); //= true
db.DropColumn<Poco>(x => x.Ssn);
db.ColumnExists<Poco>(x => x.Ssn); //= false
```

In a future version of your Table POCO you can use `ColumnExists` to detect which columns haven't been
added yet, then use `AddColumn` to add it, e.g:

```csharp
class Poco 
{
    public int Id { get; set; }
    public string Name { get; set; }

    [Default(0)]
    public int Age { get; set; }
}

if (!db.ColumnExists<Poco>(x => x.Age)) //= false
    db.AddColumn<Poco>(x => x.Age);

db.ColumnExists<Poco>(x => x.Age); //= true
```

## Modify Schema APIs

Additional Modify Schema APIs available in OrmLite include:

- `AlterTable`
- `AddColumn`
- `AlterColumn`
- `ChangeColumnName`
- `DropColumn`
- `AddForeignKey`
- `DropForeignKey`
- `CreateIndex`
- `DropIndex`

## Typed `Sql.Cast()` SQL Modifier

The `Sql.Cast()` provides a cross-database abstraction for casting columns or expressions in SQL queries, e.g:

```csharp
db.Insert(new SqlTest { Value = 123.456 });

var results = db.Select<(int id, string text)>(db.From<SqlTest>()
    .Select(x => new {
        x.Id,
        text = Sql.Cast(x.Id, Sql.VARCHAR) + " : " + Sql.Cast(x.Value, Sql.VARCHAR) + " : " 
             + Sql.Cast("1 + 2", Sql.VARCHAR) + " string"
    }));

results[0].text //= 1 : 123.456 : 3 string
```

## Typed `Column<T>` and `Table<T>` APIs

You can use the `Column<T>` and `Table<T>()` methods to resolve the quoted names of a Column or Table within SQL Fragments (taking into account any configured aliases or naming strategies).

Usage Example of the new APIs inside a `CustomJoin()` expression used to join on a custom SELECT expression:

```csharp
q.CustomJoin($"LEFT JOIN (SELECT {q.Column<Job>(x => x.Id)} ...")
q.CustomJoin($"LEFT JOIN (SELECT {q.Column<Job>(nameof(Job.Id))} ...")

q.CustomJoin($"LEFT JOIN (SELECT {q.Column<Job>(x => x.Id, tablePrefix:true)} ...")
//Equivalent to:
q.CustomJoin($"LEFT JOIN (SELECT {q.Table<Job>()}.{q.Column<Job>(x => x.Id)} ...")

q.Select($"{q.Column<Job>(x => x.Id)} as JobId, {q.Column<Task>(x => x.Id)} as TaskId")
//Equivalent to:
q.Select<Job,Task>((j,t) => new { JobId = j.Id, TaskId = t.Id })
```

## DB Parameter APIs

To enable even finer-grained control of parameterized queries we've added new overloads that take a collection of IDbDataParameter's:

```csharp
List<T> Select<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
T Single<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
T Scalar<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
List<T> Column<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
IEnumerable<T> ColumnLazy<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
HashSet<T> ColumnDistinct<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
Dictionary<K, List<V>> Lookup<K, V>(string sql, IEnumerable<IDbDataParameter> sqlParams)
List<T> SqlList<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
List<T> SqlColumn<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
T SqlScalar<T>(string sql, IEnumerable<IDbDataParameter> sqlParams)
```

::: info
Including Async equivalents for each of the above Sync APIs.
:::

The new APIs let you execute parameterized SQL with finer-grained control over the `IDbDataParameter` used, e.g:

```csharp
IDbDataParameter pAge = db.CreateParam("age", 40, dbType:DbType.Int16);
db.Select<Person>("SELECT * FROM Person WHERE Age > @pAge", new[] { pAge });
```

The new `CreateParam()` extension method above is a useful helper for creating custom IDbDataParameter's.

## Customize null values

The new `OrmLiteConfig.OnDbNullFilter` lets you replace DBNull values with a custom value, so you could convert all `null` strings to be populated with `"NULL"` using:

```csharp
OrmLiteConfig.OnDbNullFilter = fieldDef => 
    fieldDef.FieldType == typeof(string)
        ? "NULL"
        : null;
```
