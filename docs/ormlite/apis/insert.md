---
title: OrmLite INSERT APIs
---

To see the behaviour of the different APIs, all examples uses the following model:

```csharp
public class Person
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
}
```

## Full Inserts

An `Insert` will insert every field by default:

```csharp
db.Insert(new Person { Id = 1, FirstName = "Jimi", LastName = "Hendrix", Age = 27 });
```

## Partial Inserts

You can use `InsertOnly` for the cases you don't want to insert every field

```csharp
db.InsertOnly(() => new Person { FirstName = "Amy" });
```

Alternative API using an SqlExpression

```csharp
var q = db.From<Person>()
    .Insert(p => new { p.FirstName });

db.InsertOnly(new Person { FirstName = "Amy" }, onlyFields: q)
```

## Insert by Dictionary

```csharp
var row = new Person { FirstName = "John", LastName = "Smith" };
Dictionary<string,object> obj = row.ToObjectDictionary();
obj[nameof(Person.LastName)] = null;

row.Id = (int) db.Insert<Person>(obj, selectIdentity:true);
```

