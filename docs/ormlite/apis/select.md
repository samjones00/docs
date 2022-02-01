---
title: OrmLite SELECT APIs
---

OrmLite provides terse and intuitive typed APIs for database querying from simple
lambda expressions to more complex LINQ-Like Typed SQL Expressions which you can use to
construct more complex queries. To give you a flavour here are some examples:

## Querying with SELECT

```csharp
int agesAgo = DateTime.Today.AddYears(-20).Year;
db.Select<Author>(x => x.Birthday >= new DateTime(agesAgo, 1, 1) 
                    && x.Birthday <= new DateTime(agesAgo, 12, 31));
```

```csharp
db.Select<Author>(x => Sql.In(x.City, "London", "Madrid", "Berlin"));
```

```csharp
db.Select<Author>(x => x.Earnings <= 50);
```

```csharp
db.Select<Author>(x => x.Name.StartsWith("A"));
```

```csharp
db.Select<Author>(x => x.Name.EndsWith("garzon"));
```

```csharp
db.Select<Author>(x => x.Name.Contains("Benedict"));
```

```csharp
db.Select<Author>(x => x.Rate == 10 && x.City == "Mexico");
```

```csharp
db.Select<Author>(x => x.Rate.ToString() == "10"); //impicit string casting
```

```csharp
db.Select<Author>(x => "Rate " + x.Rate == "Rate 10"); //server string concatenation
```

## Convenient data access patterns

OrmLite also includes a number of convenient APIs providing DRY, typed data access for common queries:

The `SingleById<T>` uses the provided value to query against a primary key, expecting 1 result.

```csharp
Person person = db.SingleById<Person>(1);
```

Lambda expressions can be provided to `Single` as a way to return the first instance from the result set.

```csharp
Person person = db.Single<Person>(x => x.Age == 42);
```

## Using Typed SqlExpression

The `From<T>` can be used to create an `SqlExpression<T>` query to build on and use later. 

```csharp
var q = db.From<Person>()
          .Where(x => x.Age > 40)
          .Select(Sql.Count("*"));

int peopleOver40 = db.Scalar<int>(q);
```

Common aggregate methods can be used with type safety. For example:

```csharp
int peopleUnder50 = db.Count<Person>(x => x.Age < 50);
```

```csharp
bool has42YearOlds = db.Exists<Person>(new { Age = 42 });
```

```csharp
int maxAgeUnder50 = db.Scalar<Person, int>(x => Sql.Max(x.Age), x => x.Age < 50);
```

Returning a single column from a query can be used with `.Select` of a property and `.Column`.

```csharp
var q = db.From<Person>()
    .Where(x => x.Age == 27)
    .Select(x => x.LastName);
    
List<string> results = db.Column<string>(q);
```

```csharp
var q = db.From<Person>()
          .Where(x => x.Age < 50)
          .Select(x => x.Age);

HashSet<int> results = db.ColumnDistinct<int>(q);
```

Multiple columns can do the same. For example using the same `.Select` on a `SqlExpression<T>` with an anonymous type, returning a Dictionary of matching types. 

```csharp
var q = db.From<Person>()
          .Where(x => x.Age < 50)
          .Select(x => new { x.Id, x.LastName });

Dictionary<int,string> results = db.Dictionary<int, string>(q);
```

The `Lookup<T,K>` method returns a `Dictionary<K,List<V>>` grouping made from the first two columns using n SQL Expression.

```csharp
var q = db.From<Person>()
          .Where(x => x.Age < 50)
          .Select(x => new { x.Age, x.LastName });

Dictionary<int, List<string>> results = db.Lookup<int, string>(q);
```

The `db.KeyValuePair<K,V>` API is similar to `db.Dictionary<K,V>` where it uses the **first 2 columns** for its Key/Value Pairs to
create a Dictionary but is more appropriate when the results can contain duplicate Keys or when ordering needs to be preserved:

```csharp
var q = db.From<StatsLog>()
    .GroupBy(x => x.Name)
    .Select(x => new { x.Name, Count = Sql.Count("*") })
    .OrderByDescending("Count");

var results = db.KeyValuePairs<string, int>(q);
```

