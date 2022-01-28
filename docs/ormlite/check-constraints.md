---
title: OrmLite Check Constraints
---
OrmLite includes support for [SQL Check Constraints](https://en.wikipedia.org/wiki/Check_constraint) which will create your Table schema with the `[CheckConstraint]` specified, e.g:

```csharp
public class Table
{
    [AutoIncrement]
    public int Id { get; set; }

    [Required]
    [CheckConstraint("Age > 1")]
    public int Age { get; set; }

    [CheckConstraint("Name IS NOT NULL")]
    public string Name { get; set; }
}
```
