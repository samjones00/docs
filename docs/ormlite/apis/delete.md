---
title: OrmLite DELETE APIs
---

Like updates for DELETE's we also provide APIs that take a where Expression:
```csharp
db.Delete<Person>(p => p.Age == 27);
```

Or an SqlExpression:

```csharp
var q = db.From<Person>()
    .Where(p => p.Age == 27);

db.Delete<Person>(q);
```

As well as un-typed, string-based expressions:
```csharp
db.Delete<Person>(where: "Age = @age", new { age = 27 });
```

### Delete from Table JOIN

Using a SqlExpression to delete rows by querying from a joined table:

```csharp
var q = db.From<Person>()
    .Join<PersonJoin>((x, y) => x.Id == y.PersonId)
    .Where<PersonJoin>(x => x.Id == 2);

db.Delete(q);
```

> Not supported in MySql

## Delete by Dictionary

```csharp
db.Delete<Rockstar>(new Dictionary<string, object> {
    ["Age"] = 27
});
```
