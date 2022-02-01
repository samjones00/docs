---
title: Multi-nested database connections example
---

We now support multiple nested database connections so you can now trivially use OrmLite to access multiple databases
on different connections. The `OrmLiteConnectionFactory` class has been extended to support named connections which
allows you to conveniently define all your db connections when you register it in your IOC and access them with the
named property when you use them.

A popular way of scaling RDBMS's is to create a Master / Shard setup where datasets for queries that span entire system
are kept in the master database, whilst context-specific related data can be kept together in an isolated shard.
This feature makes it trivial to maintain multiple separate db shards with a master database in a different RDBMS.

Here's an (entire source code) sample of the code needed to define, and populate a Master/Shard setup.
Sqlite can create DB shards on the fly so only the blank SqlServer master database needed to be created out-of-band:

## Sharding 1000 Robots into 10 Sqlite DB shards - referencing each in a Master SqlServer RDBMS

```csharp
public class MasterRecord {
    public Guid Id { get; set; }
    public int RobotId { get; set; }
    public string RobotName { get; set; }
    public DateTime? LastActivated { get; set; }
}

public class Robot {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsActivated { get; set; }
    public long CellCount { get; set; }
    public DateTime CreatedDate { get; set; }
}

const int NoOfShards = 10;
const int NoOfRobots = 1000;

var dbFactory = new OrmLiteConnectionFactory(
    "Data Source=host;Initial Catalog=RobotsMaster;Integrated Security=SSPI",  //Connection String
    SqlServerDialect.Provider); 

dbFactory.Run(db => db.CreateTable<MasterRecord>(overwrite:false));

NoOfShards.Times(i => {
    var namedShard = "robots-shard" + i;
    dbFactory.RegisterConnection(namedShard, 
        $"~/App_Data/{shardId}.sqlite".MapAbsolutePath(),                //Connection String
        SqliteDialect.Provider);
	
	dbFactory.OpenDbConnection(namedShard).Run(db => db.CreateTable<Robot>(overwrite:false));
});

var newRobots = NoOfRobots.Times(i => //Create 1000 Robots
    new Robot { Id=i, Name="R2D"+i, CreatedDate=DateTime.UtcNow, CellCount=DateTime.Now.ToUnixTimeMs() % 100000 });

foreach (var newRobot in newRobots) 
{
    using (IDbConnection db = dbFactory.OpenDbConnection()) //Open Connection to Master DB 
    {
        db.Insert(new MasterRecord { Id = Guid.NewGuid(), RobotId = newRobot.Id, RobotName = newRobot.Name });
        using (IDbConnection robotShard = dbFactory.OpenDbConnection("robots-shard"+newRobot.Id % NoOfShards)) //Shard
        {
            robotShard.Insert(newRobot);
        }
    }
}
```

Using the [SQLite Manager](https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/?src=search) Firefox extension
we can peek at one of the created shards to see 100 Robots in each shard. This is the dump of `robots-shard0.sqlite`:

![Data dump of Robot Shard #1](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ormlite/robots-shard0.sqlite.jpg)

As expected each shard has every 10th robot inside.

## Code-first Customer & Order example with complex types on POCO as text blobs

Below is a complete stand-alone example. No other config or classes is required for it to run. It's also available as a
[stand-alone unit test](https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/tests/ServiceStack.OrmLite.Tests/UseCase/CustomerOrdersUseCase.cs).

```csharp
public enum PhoneType {
    Home,
    Work,
    Mobile,
}

public enum AddressType {
    Home,
    Work,
    Other,
}

public class Address {
    public string Line1 { get; set; }
    public string Line2 { get; set; }
    public string ZipCode { get; set; }
    public string State { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
}

public class Customer {
    public Customer() {
        this.PhoneNumbers = new Dictionary<PhoneType, string>();
        this.Addresses = new Dictionary<AddressType, Address>();
    }

    [AutoIncrement] // Creates Auto primary key
    public int Id { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    [Index(Unique = true)] // Creates Unique Index
    public string Email { get; set; }
    
    public Dictionary<PhoneType, string> PhoneNumbers { get; set; }  //Blobbed
    public Dictionary<AddressType, Address> Addresses { get; set; }  //Blobbed
    public DateTime CreatedAt { get; set; }
}

public class Order {
    
    [AutoIncrement]
    public int Id { get; set; }
    
    [References(typeof(Customer))]      //Creates Foreign Key
    public int CustomerId { get; set; }
    
    [References(typeof(Employee))]      //Creates Foreign Key
    public int EmployeeId { get; set; }
    
    public Address ShippingAddress { get; set; } //Blobbed (no Address table)
    
    public DateTime? OrderDate { get; set; }
    public DateTime? RequiredDate { get; set; }
    public DateTime? ShippedDate { get; set; }
    public int? ShipVia { get; set; }
    public decimal Freight { get; set; }
    public decimal Total { get; set; }
}

public class OrderDetail {
    
    [AutoIncrement]
    public int Id { get; set; }
    
    [References(typeof(Order))] //Creates Foreign Key
    public int OrderId { get; set; }
    
    public int ProductId { get; set; }
    public decimal UnitPrice { get; set; }
    public short Quantity { get; set; }
    public decimal Discount { get; set; }
}

public class Employee {
    public int Id { get; set; }
    public string Name { get; set; }
}

public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal UnitPrice { get; set; }
}

//Setup SQL Server Connection Factory
var dbFactory = new OrmLiteConnectionFactory(
	@"Data Source=.\SQLEXPRESS;AttachDbFilename=|DataDirectory|\App_Data\Database1.mdf;Integrated Security=True;User Instance=True",
	SqlServerDialect.Provider);

//Use in-memory Sqlite DB instead
//var dbFactory = new OrmLiteConnectionFactory(
//    ":memory:", false, SqliteDialect.Provider);

//Non-intrusive: All extension methods hang off System.Data.* interfaces
using (IDbConnection db = Config.OpenDbConnection())
{
  //Re-Create all table schemas:
  db.DropTable<OrderDetail>();
  db.DropTable<Order>();
  db.DropTable<Customer>();
  db.DropTable<Product>();
  db.DropTable<Employee>();

  db.CreateTable<Employee>();
  db.CreateTable<Product>();
  db.CreateTable<Customer>();
  db.CreateTable<Order>();
  db.CreateTable<OrderDetail>();

  db.Insert(new Employee { Id = 1, Name = "Employee 1" });
  db.Insert(new Employee { Id = 2, Name = "Employee 2" });
  var product1 = new Product { Id = 1, Name = "Product 1", UnitPrice = 10 };
  var product2 = new Product { Id = 2, Name = "Product 2", UnitPrice = 20 };
  db.Save(product1, product2);

  var customer = new Customer {
      FirstName = "Orm",
      LastName = "Lite",
      Email = "ormlite@servicestack.net",
      PhoneNumbers =
      {
          { PhoneType.Home, "555-1234" },
          { PhoneType.Work, "1-800-1234" },
          { PhoneType.Mobile, "818-123-4567" },
      },
      Addresses =
      {
          { AddressType.Work, new Address { 
            Line1 = "1 Street", Country = "US", State = "NY", City = "New York", ZipCode = "10101" } 
          },
      },
      CreatedAt = DateTime.UtcNow,
  };

  var customerId = db.Insert(customer, selectIdentity: true); //Get Auto Inserted Id
  customer = db.Single<Customer>(new { customer.Email }); //Query
  Assert.That(customer.Id, Is.EqualTo(customerId));

  //Direct access to System.Data.Transactions:
  using (IDbTransaction trans = db.OpenTransaction(IsolationLevel.ReadCommitted))
  {
      var order = new Order {
          CustomerId = customer.Id,
          EmployeeId = 1,
          OrderDate = DateTime.UtcNow,
          Freight = 10.50m,
          ShippingAddress = new Address { 
            Line1 = "3 Street", Country = "US", State = "NY", City = "New York", ZipCode = "12121" },
      };
      db.Save(order); //Inserts 1st time

      //order.Id populated on Save().

      var orderDetails = new[] {
          new OrderDetail {
              OrderId = order.Id,
              ProductId = product1.Id,
              Quantity = 2,
              UnitPrice = product1.UnitPrice,
          },
          new OrderDetail {
              OrderId = order.Id,
              ProductId = product2.Id,
              Quantity = 2,
              UnitPrice = product2.UnitPrice,
              Discount = .15m,
          }
      };

      db.Save(orderDetails);

      order.Total = orderDetails.Sum(x => x.UnitPrice * x.Quantity * x.Discount) + order.Freight;

      db.Save(order); //Updates 2nd Time

      trans.Commit();
  }
}
```

Running this against a SQL Server database will yield the results below:

[![SQL Server Management Studio results](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ormlite/ormlite-example.png)](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ormlite/ormlite-example.png)

Notice the POCO types are stored in the [very fast](https://github.com/ServiceStackV3/mythz_blog/blob/master/pages/176.md)
and [Versatile](https://github.com/ServiceStackV3/mythz_blog/blob/master/pages/314.md)
[JSV Format](https://docs.servicestack.net/jsv-format) which although hard to do -
is actually more compact, human and parser-friendly than JSON :)
