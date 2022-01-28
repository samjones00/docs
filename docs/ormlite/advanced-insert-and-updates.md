---
title: OrmLite Advanced Insert and Update APIs
---

OrmLite's Expression support satisfies the most common RDBMS queries with a strong-typed API.
For more complex queries you can easily fall back to raw SQL where the Custom SQL APIs
let you map custom SqlExpressions into different responses:

```csharp
var q = db.From<Person>()
          .Where(x => x.Age < 50)
          .Select("*");
List<Person> results = db.SqlList<Person>(q);

List<Person> results = db.SqlList<Person>(
    "SELECT * FROM Person WHERE Age < @age", new { age=50});

List<string> results = db.SqlColumn<string>(db.From<Person>().Select(x => x.LastName));
List<string> results = db.SqlColumn<string>("SELECT LastName FROM Person");

HashSet<int> results = db.ColumnDistinct<int>(db.From<Person>().Select(x => x.Age));
HashSet<int> results = db.ColumnDistinct<int>("SELECT Age FROM Person");

var q = db.From<Person>()
          .Where(x => x.Age < 50)
          .Select(Sql.Count("*"));
int result = db.SqlScalar<int>(q);
int result = db.SqlScalar<int>("SELCT COUNT(*) FROM Person WHERE Age < 50");
```

## Custom Insert and Updates

```csharp
Db.ExecuteSql("INSERT INTO page_stats (ref_id, fav_count) VALUES (@refId, @favCount)",
              new { refId, favCount })

//Async:
Db.ExecuteSqlAsync("UPDATE page_stats SET view_count = view_count + 1 WHERE id = @id", new { id })
```

## INSERT INTO SELECT

You can use OrmLite's Typed `SqlExpression` to create a subselect expression that you can use to create and execute a
typed **INSERT INTO SELECT** `SqlExpression` with:

```csharp
var q = db.From<User>()
    .Where(x => x.UserName == "UserName")
    .Select(x => new {
        x.UserName, 
        x.Email, 
        GivenName = x.FirstName, 
        Surname = x.LastName, 
        FullName = x.FirstName + " " + x.LastName
    });

var id = db.InsertIntoSelect<CustomUser>(q)
```

## Foreign Key attribute for referential actions on Update/Deletes

Creating a foreign key in OrmLite can be done by adding `[References(typeof(ForeignKeyTable))]` on the relation property,
which will result in OrmLite creating the Foreign Key relationship when it creates the DB table with `db.CreateTable<Poco>`.

Additional fine-grain options and behaviour are available in the `[ForeignKey]` attribute which will let you specify the desired behaviour when deleting or updating related rows in Foreign Key tables.

An example of a table with the different available options:

```csharp
public class TableWithAllCascadeOptions
{
	[AutoIncrement] public int Id { get; set; }
	
	[References(typeof(ForeignKeyTable1))]
	public int SimpleForeignKey { get; set; }
	
	[ForeignKey(typeof(ForeignKeyTable2), OnDelete = "CASCADE", OnUpdate = "CASCADE")]
	public int? CascadeOnUpdateOrDelete { get; set; }
	
	[ForeignKey(typeof(ForeignKeyTable3), OnDelete = "NO ACTION")]
	public int? NoActionOnCascade { get; set; }
	
	[Default(typeof(int), "17")]
	[ForeignKey(typeof(ForeignKeyTable4), OnDelete = "SET DEFAULT")]
	public int SetToDefaultValueOnDelete { get; set; }
	
	[ForeignKey(typeof(ForeignKeyTable5), OnDelete = "SET NULL")]
	public int? SetToNullOnDelete { get; set; }
}
```