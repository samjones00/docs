---
title: OrmLite APIs
---

OrmLite provides terse and intuitive typed API's for database querying from simple
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

## Convenient common usage data access patterns

OrmLite also includes a number of convenient APIs providing DRY, typed data access for common queries:

The `SingleById<T>` uses the provided value to query against a primary key, expecting 1 result.

```csharp
Person person = db.SingleById<Person>(1);
```

Lambda expressions can be provided to `Single` as a way to return the first instance from the result set.

```csharp
Person person = db.Single<Person>(x => x.Age == 42);
```

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

## INSERT, UPDATE and DELETEs

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

### UPDATE

Updating any model without any filters will update every field, except the **Id** which
is used to filter the update to this specific record:

```csharp
db.Update(new Person { Id = 1, FirstName = "Jimi", LastName = "Hendrix", Age = 27});
```

If you supply your own where expression, it updates every field (inc. Id) but uses your filter instead:

```csharp
db.Update(new Person { Id = 1, FirstName = "JJ" }, p => p.LastName == "Hendrix");
```

One way to limit the fields which gets updated is to use an **Anonymous Type**:

```csharp
db.Update<Person>(new { FirstName = "JJ" }, p => p.LastName == "Hendrix");
```

Or by using `UpdateNonDefaults` which only updates the non-default values in your model using the filter specified:

```csharp
db.UpdateNonDefaults(new Person { FirstName = "JJ" }, p => p.LastName == "Hendrix");
```

#### UpdateOnly

As updating a partial row is a common use-case in Db's, we've added a number of methods for just
this purpose, named **UpdateOnly**.

The lambda syntax lets you update only the fields listed in property initializers, e.g:

```csharp
db.UpdateOnly(() => new Person { FirstName = "JJ" });
```

The second argument lets you specify a filter for updates:

```csharp
db.UpdateOnly(() => new Person { FirstName = "JJ" }, where: p => p.LastName == "Hendrix");
```

Alternatively you can pass in a POCO directly, in which case the first expression in an `UpdateOnlyFields`
statement is used to specify which fields should be updated:

```csharp
db.UpdateOnlyFields(new Person { FirstName = "JJ" }, onlyFields: p => p.FirstName);

db.UpdateOnlyFields(new Person { FirstName = "JJ", Age = 12 }, 
    onlyFields: p => new { p.FirstName, p.Age });

db.UpdateOnlyFields(new Person { FirstName = "JJ", Age = 12 }, 
    onlyFields: p => new[] { "Name", "Age" });
```

When present, the second expression is used as the where filter:

```csharp
db.UpdateOnlyFields(new Person { FirstName = "JJ" }, 
    onlyFields: p => p.FirstName, 
    where: p => p.LastName == "Hendrix");
```
Instead of using the expression filters above you can choose to use an SqlExpression builder which provides more flexibility when you want to programatically construct the update statement:

```csharp
var q = db.From<Person>()
    .Update(p => p.FirstName);

db.UpdateOnlyFields(new Person { FirstName = "JJ", LastName = "Hendo" }, onlyFields: q);
```

Using an Object Dictionary:

```csharp
var updateFields = new Dictionary<string,object> {
    [nameof(Person.FirstName)] = "JJ",
};

db.UpdateOnlyFields<Person>(updateFields, p => p.LastName == "Hendrix");
```

Using a typed SQL Expression:

```csharp
var q = db.From<Person>()
    .Where(x => x.FirstName == "Jimi")
    .Update(p => p.FirstName);
          
db.UpdateOnlyFields(new Person { FirstName = "JJ" }, onlyFields: q);
```

#### Updating existing values

The `UpdateAdd` API provides several Typed API's for updating existing values:

```csharp
//Increase everyone's Score by 3 points
db.UpdateAdd(() => new Person { Score = 3 }); 

//Remove 5 points from Jackson Score
db.UpdateAdd(() => new Person { Score = -5 }, where: x => x.LastName == "Jackson");

//Graduate everyone and increase everyone's Score by 2 points 
db.UpdateAdd(() => new Person { Points = 2, Graduated = true });

//Add 10 points to Michael's score
var q = db.From<Person>()
    .Where(x => x.FirstName == "Michael");
db.UpdateAdd(() => new Person { Points = 10 }, q);
```

> Note: Any non-numeric values in an `UpdateAdd` statement (e.g. strings) are replaced as normal.

### INSERT

An `Insert` will insert every field by default:

```csharp
db.Insert(new Person { Id = 1, FirstName = "Jimi", LastName = "Hendrix", Age = 27 });
```

#### Partial Inserts

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

## DELETE

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

## API Overview

The API is minimal, providing basic shortcuts for the primitive SQL statements:

[![OrmLite API](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/ormlite/OrmLiteApi.png)](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/ormlite/OrmLiteApi.png)

OrmLite makes available most of its functionality via extension methods to add enhancements over ADO.NET's `IDbConnection`, providing
a Typed RDBMS-agnostic API that transparently handles differences in each supported RDBMS provider.

### Create Tables Schemas

OrmLite is able to **CREATE**, **DROP** and **ALTER** RDBMS Tables from your code-first Data Models with rich annotations for
controlling how the underlying RDBMS Tables are constructed.

The Example below utilizes several annotations to customize the definition and behavior of RDBMS tables based on a POCOs
**public properties**:

```csharp
public class Player
{
    public int Id { get; set; }                     // 'Id' is PrimaryKey by convention

    [Required]
    public string FirstName { get; set; }           // Creates NOT NULL Column

    [Alias("Surname")]                              // Maps to [Surname] RDBMS column
    public string LastName { get; set; }

    [Index(Unique = true)]                          // Creates Unique Index
    public string Email { get; set; }

    public List<Phone> PhoneNumbers { get; set; }   // Complex Types blobbed by default

    [Reference]
    public List<GameItem> GameItems { get; set; }   // 1:M Reference Type saved separately

    [Reference]
    public Profile Profile { get; set; }            // 1:1 Reference Type saved separately
    public int ProfileId { get; set; }              // 1:1 Self Ref Id on Parent Table

    [ForeignKey(typeof(Level), OnDelete="CASCADE")] // Creates ON DELETE CASCADE Constraint
    public Guid SavedLevelId { get; set; }          // Creates Foreign Key Reference

    public ulong RowVersion { get; set; }           // Optimistic Concurrency Updates
}

public class Phone                                  // Blobbed Type only
{
    public PhoneKind Kind { get; set; }
    public string Number { get; set; }
    public string Ext { get; set; }
}

public enum PhoneKind
{
    Home,
    Mobile,
    Work,
}

[Alias("PlayerProfile")]                            // Maps to [PlayerProfile] RDBMS Table
[CompositeIndex(nameof(Username), nameof(Region))]  // Creates Composite Index
public class Profile
{
    [AutoIncrement]                                 // Auto Insert Id assigned by RDBMS
    public int Id { get; set; }

    public PlayerRole Role { get; set; }            // Native support for Enums
    public Region Region { get; set; }
    public string Username { get; set; }
    public long HighScore { get; set; }

    [Default(1)]                                    // Created in RDBMS with DEFAULT (1)
    public long GamesPlayed { get; set; }

    [CheckConstraint("Energy BETWEEN 0 AND 100")]   // Creates RDBMS Check Constraint
    public short Energy { get; set; }

    public string ProfileUrl { get; set; }
    public Dictionary<string, string> Meta { get; set; }
}

public enum PlayerRole                              // Enums saved as strings by default
{
    Leader,
    Player,
    NonPlayer,
}

[EnumAsInt]                                         // Enum Saved as int
public enum Region
{
    Africa = 1,
    Americas = 2,
    Asia = 3,
    Australasia = 4,
    Europe = 5,
}

public class GameItem
{
    [PrimaryKey]                                    // Specify field to use as Primary Key
    [StringLength(50)]                              // Creates VARCHAR COLUMN
    public string Name { get; set; }

    public int PlayerId { get; set; }               // Foreign Table Reference Id

    [StringLength(StringLengthAttribute.MaxText)]   // Creates "TEXT" RDBMS Column 
    public string Description { get; set; }

    [Default(OrmLiteVariables.SystemUtc)]           // Populated with UTC Date by RDBMS
    public DateTime DateAdded { get; set; }
}

public class Level
{
    public Guid Id { get; set; }                    // Unique Identifer/GUID Primary Key
    public byte[] Data { get; set; }                // Saved as BLOB/Binary where possible
}
```

We can drop the existing tables and re-create the above table definitions with:

```csharp
using (var db = dbFactory.Open())
{
    if (db.TableExists<Level>())
        db.DeleteAll<Level>();                      // Delete ForeignKey data if exists

    //DROP and CREATE ForeignKey Tables in dependent order
    db.DropTable<Player>();
    db.DropTable<Level>();
    db.CreateTable<Level>();
    db.CreateTable<Player>();

    //DROP and CREATE tables without Foreign Keys in any order
    db.DropAndCreateTable<Profile>();
    db.DropAndCreateTable<GameItem>();

    var savedLevel = new Level
    {
        Id = Guid.NewGuid(),
        Data = new byte[]{ 1, 2, 3, 4, 5 },
    };
    db.Insert(savedLevel);

    var player = new Player
    {
        Id = 1,
        FirstName = "North",
        LastName = "West",
        Email = "north@west.com",
        PhoneNumbers = new List<Phone>
        {
            new Phone { Kind = PhoneKind.Mobile, Number = "123-555-5555"},
            new Phone { Kind = PhoneKind.Home,   Number = "555-555-5555", Ext = "123"},
        },
        GameItems = new List<GameItem>
        {
            new GameItem { Name = "WAND", Description = "Golden Wand of Odyssey"},
            new GameItem { Name = "STAFF", Description = "Staff of the Magi"},
        },
        Profile = new Profile
        {
            Username = "north",
            Role = PlayerRole.Leader,
            Region = Region.Australasia,
            HighScore = 100,
            GamesPlayed = 10,
            ProfileUrl = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg",
            Meta = new Dictionary<string, string>
            {
                {"Quote", "I am gamer"}
            },
        },
        SavedLevelId = savedLevel.Id,
    };
    db.Save(player, references: true);
}
```

This will add a record in all the above tables with all the Reference data properties automatically populated which we can quickly see
by selecting the inserted `Player` record and all its referenced data by using [OrmLite's Load APIs](#querying-pocos-with-references), e.g:

```csharp
var dbPlayer = db.LoadSingleById<Player>(player.Id);

dbPlayer.PrintDump();
```

Which uses the [Dump Utils](http://docs.servicestack.net/dump-utils) to quickly display the populated data to the console:

```
{
    Id: 1,
    FirstName: North,
    LastName: West,
    Email: north@west.com,
    PhoneNumbers: 
    [
        {
            Kind: Mobile,
            Number: 123-555-5555
        },
        {
            Kind: Home,
            Number: 555-555-5555,
            Ext: 123
        }
    ],
    GameItems: 
    [
        {
            Name: WAND,
            PlayerId: 1,
            Description: Golden Wand of Odyssey,
            DateAdded: 2018-01-17T07:53:45-05:00
        },
        {
            Name: STAFF,
            PlayerId: 1,
            Description: Staff of the Magi,
            DateAdded: 2018-01-17T07:53:45-05:00
        }
    ],
    Profile: 
    {
        Id: 1,
        Role: Leader,
        Region: Australasia,
        Username: north,
        HighScore: 100,
        GamesPlayed: 10,
        Energy: 0,
        ProfileUrl: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg",
        Meta: 
        {
            Quote: I am gamer
        }
    },
    ProfileId: 1,
    SavedLevelId: 7690dfa4d31949ab9bce628c34d1c549,
    RowVersion: 2
}
```

Feel free to continue experimenting with [this Example Live on Gistlyn](https://gistlyn.com/?gist=840bc7f09292ad5753d07cef6063893e&collection=991db51e44674ad01d3d318b24cf0934).

## Select APIs

If your SQL doesn't start with a **SELECT** statement, it is assumed a `WHERE` clause is being provided, e.g:

```csharp
var tracks = db.Select<Track>("Artist = @artist AND Album = @album",
    new { artist = "Nirvana", album = "Heart Shaped Box" });
```

Which is equivalent to:

```csharp
var tracks = db.Select<Track>("SELECT * FROM track WHERE Artist = @artist AND Album = @album", 
    new { artist = "Nirvana", album = "Heart Shaped Box" });
```

Use `Sql*` APIs for when you want to query custom SQL that is not a SELECT statement, e.g:

```csharp
var tracks = db.SqlList<Track>("EXEC GetArtistTracks @artist, @album",
    new { artist = "Nirvana", album = "Heart Shaped Box" });
```

**Select** returns multiple records:

```csharp
List<Track> tracks = db.Select<Track>()
```

**Single** returns a single record:

```csharp
Track track = db.Single<Track>(x => x.RefId == refId)
```

**Dictionary** returns a Dictionary made from the first two columns:

```csharp
Dictionary<int, string> trackIdNamesMap = db.Dictionary<int, string>(
    db.From<Track>().Select(x => new { x.Id, x.Name }))

Dictionary<int, string> trackIdNamesMap = db.Dictionary<int, string>(
    "select Id, Name from Track")
```

**Lookup** returns an `Dictionary<K, List<V>>` made from the first two columns:

```csharp
Dictionary<int, List<string>> albumTrackNames = db.Lookup<int, string>(
    db.From<Track>().Select(x => new { x.AlbumId, x.Name }))

Dictionary<int, List<string>> albumTrackNames = db.Lookup<int, string>(
    "select AlbumId, Name from Track")
```

**Column** returns a List of first column values:

```csharp
List<string> trackNames = db.Column<string>(db.From<Track>().Select(x => x.Name))

List<string> trackNames = db.Column<string>("select Name from Track")
```

**HashSet** returns a HashSet of distinct first column values:

```csharp    
HashSet<string> uniqueTrackNames = db.ColumnDistinct<string>(
    db.From<Track>().Select(x => x.Name))

HashSet<string> uniqueTrackNames = db.ColumnDistinct<string>("select Name from Track")
```

**Scalar** returns a single scalar value:

```csharp
var trackCount = db.Scalar<int>(db.From<Track>().Select(Sql.Count("*")))

var trackCount = db.Scalar<int>("select count(*) from Track")
```

Anonymous types passed into **Where** are treated like an **AND** filter:

```csharp
var track3 = db.Where<Track>(new { AlbumName = "Throwing Copper", TrackNo = 3 })
```

SingleById(s), SelectById(s), etc provide strong-typed convenience methods to fetch by a Table's **Id** primary key field.

```csharp
var track = db.SingleById<Track>(1);
var tracks = db.SelectByIds<Track>(new[]{ 1,2,3 });
```

