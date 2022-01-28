---
title: Custom SqlExpression Filter
---

The generated SQL from a Typed `SqlExpression` can also be customized using `.WithSqlFilter()`, e.g:

```csharp
var q = db.From<Table>()
    .Where(x => x.Age == 27)
    .WithSqlFilter(sql => sql + " option (recompile)");

var q = db.From<Table>()
    .Where(x => x.Age == 27)
    .WithSqlFilter(sql => sql + " WITH UPDLOCK");

var results = db.Select(q);
```

## Ignoring DTO Properties

You may use the `[Ignore]` attribute to denote DTO properties that are not fields in the table. This will force the SQL generation to ignore that property.
