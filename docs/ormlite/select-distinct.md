---
title: SELECT DISTINCT in SelectMulti
---

[SelectMulti](https://github.com/ServiceStack/ServiceStack.OrmLite#selecting-multiple-columns-across-joined-tables) APIs for populating
multiple tables now supports **SELECT DISTINCT** with:

```csharp
var tuples = db.SelectMulti<Customer, CustomerAddress>(q.SelectDistinct());
```

## Select data from multiple tables into a Custom POCO

Another implicit behaviour when selecting from a typed SqlExpression is that results are mapped to the
`Customer` POCO. To change this default we just need to explicitly specify what POCO it should map to instead:

```csharp
List<FullCustomerInfo> customers = db.Select<FullCustomerInfo>(
    db.From<Customer>().Join<CustomerAddress>());
```

Where `FullCustomerInfo` is any POCO that contains a combination of properties matching any of the joined
tables in the query.

The above example is also equivalent to the shorthand `db.Select<Into,From>()` API:

```csharp
var q = db.From<Customer>()
          .Join<CustomerAddress>();

var customers = db.Select<FullCustomerInfo,Customer>(q);
```

Rules for how results are mapped is simply each property on `FullCustomerInfo` is mapped to the first matching property in any of the tables in the order they were added to the SqlExpression.

The mapping also includes a fallback for referencing fully-qualified names in the format: `{TableName}{FieldName}` allowing you to reference ambiguous fields, e.g:

- `CustomerId` => "Customer"."Id"
- `OrderId` => "Order"."Id"
- `CustomerName` => "Customer"."Name"
- `OrderCost` => "Order"."Cost"
