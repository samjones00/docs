---
title: Reflection Utils
slug: reflection-utils
---

Most of ServiceStack's libraries relies on the high-performance reusable utilities in ServiceStack.Text to power many of its features. 

## Dynamically adding Attributes

Many of ServiceStack features are lit up by decorating Request DTOs or Service Implementations with Attributes, In ServiceStack these attributes can also be dynamically added using the `.AddAttributes()` Extension method which enables an auto dynamic Fluent API for programatically enabling behavior without needing to learn an alternative API for each feature, e.g. We can use this to add Custom Routes, [Restrict Services](/restricting-services) and add [Filter Attributes](/filter-attributes) dynamically with:

```csharp
public class AppHost : AppHostBase 
{
    public AppHost() {

        typeof(MyRequest)
            .AddAttributes(new RouteAttribute("/myrequest"))
            .AddAttributes(new RouteAttribute("/myrequest/{UniqueId}"))
            .AddAttributes(new RestrictAttribute(RequestAttributes.Json))
            .AddAttributes(new MyRequestFilter());

        typeof(MyPoco)
            .GetProperty("LastName")
            .AddAttributes(new DataMemberAttribute { Name = "Surname" });
    }
}
```

> Most Configuration in ServiceStack should be maintained in `Configure()` but as Services are auto-registered before `AppHost.Configure()` is called, Route attributes need to be added before this happens like in the AppHost Constructor or before `new AppHost().Init()`.

## Fast Reflection APIs

The Reflection functionality is consolidated behind a formal API which includes multiple cascading implementations so it's able to use the fastest implementation available in [each supported platform](https://github.com/ServiceStackApps/HelloMobile#portable-class-library-support), i.e. for most .NET platforms we use the Reflection.Emit implementations when possible, when not available it falls back to using Compiled Expression trees, then finally falling back to using a Reflection-based implementation. 
 
This functionality is available using the `CreateGetter()` and `CreateSetter()` extension methods on both `PropertyInfo` or `FieldInfo` which you may find useful if you'd like to get better performance when populating runtime types dynamically.
 
The API examples below showcases the different APIs available:
 
```csharp
var runtimeType = typeof(MyType);
 
object instance = runtimeType.CreateInstance();
PropertyInfo pi = runtimeType.GetProperty("Id");
var idSetter = pi.CreateSetter();
var idGetter = pi.CreateGetter();
 
idSetter(instance, 1);
var idValue = idGetter(instance);
```
 
To squeeze out a bit more performance you can create a generic delegate to avoid some boxing/casting with:
 
```csharp
MyType instance = runtimeType.CreateInstance<MyType>();
var idSetter = pi.CreateSetter<MyType>();
var idGetter = pi.CreateGetter<MyType>();
```
 
All APIs also have field equivalents:
 
```csharp
FieldInfo fi = runtimeType.GetField("Id");
var idSetter = fi.CreateSetter();
var idGetter = fi.CreateGetter();
```
 
The `Create*` APIs above creates the compiled delegates which need to be cached to avoid the compilation penalty on subsequent usages. The `TypeProperties<T>` and `TypeFields<T>` classes offers fast cached access to these setters/getters which compiles all the **public** properties or fields on a per Type basis. 
 
Some examples of using these classes:
 
```csharp
var runtimeType = typeof(MyType);
var instance = runtimeType.CreateInstance();

var typeProps = TypeProperties.Get(runtimeType); //Equivalent to:
//  typeProps = TypeProperties<MyType>.Instance;
 
var idAccessor = typeProps.GetAccessor("Id");
propAccessor.PublicSetter(instance, 1);
var idValue = propAccessor.PublicGetter(instance);
```
 
Alternatively you can access property getters / setters individually:
 
```csharp
typeProps.GetPublicSetter("Id")(instance, 1);
var idValue = typeProps.GetPublicGetter("Id")(instance);
```
 
Whilst `TypeFields<T>` does the same for a Types **public fields** which is also able to work around the copy semantics of ValueTypes (typically lost when boxing) by utilizing the `ref` APIs below where we can use this to populate C# 7's new Value Tuples with:
 
```csharp
var typeFields = TypeFields.Get(typeof((string s, int i)));
 
var oTuple = (object)("foo", 1);
 
var item1Accessor = typeFields.GetAccessor("Item1");
var item2Accessor = typeFields.GetAccessor("Item2");
 
item1Accessor.PublicSetterRef(ref oTuple, "bar");
item2Accessor.PublicSetterRef(ref oTuple, 2);
 
var tuple = ((string s, int i))oTuple;
tuple.s //= bar
tuple.i //= 2
```
