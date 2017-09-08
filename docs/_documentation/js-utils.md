---
slug: js-utils
title: JavaScript Utils
---

The ServiceStack.Text JSON Serializers are only designed for serializing Typed POCOs, but you can still use it to [deserialize dynamic JSON](https://github.com/ServiceStack/ServiceStack.Text#supports-dynamic-json) but you'd need to specify the Type to deserialize into on the call-site otherwise the value would be returned as a string.

The [Templates](http://templates.servicestack.net) implementation of JavaScript on the other hand preserves the Type which can be used to parse JavaScript or JSON literals:

```csharp
JSON.parse("1")      //= int 1 
JSON.parse("1.1")    //= double 1.1
JSON.parse("'a'")    //= string "a"
JSON.parse("{a:1}")  //= new Dictionary<string, object> { {"a", 1 } }
```

It can be used to parse dynamic JSON and any primitive JavaScript data type. The inverse API of `JSON.stringify()` is also available.

### Eval

Eval is useful if you want to execute custom JavaScript functions, or if you want to have a text DSL or scripting language for executing custom logic or business rules you want to be able to change without having to compile or redeploy your App. It uses [Templates Sandbox](http://templates.servicestack.net/docs/sandbox) which lets you evaluate the script within a custom scope that defines what functions and arguments it has access to, e.g:

```csharp
public class CustomFilter : TemplateFilter
{
    public string reverse(string text) => new string(text.Reverse().ToArray());
}

var scope = JS.CreateScope(
         args: new Dictionary<string, object> { { "arg", "value"} }, 
    functions: new CustomFilter());

JS.eval("arg", scope)                                        //= "value"
JS.eval("reverse(arg)", scope)                               //= "eulav"
JS.eval("itemsOf(3, padRight(reverse(arg), 8, '_'))", scope) //= ["eulav___", "eulav___", "eulav___"]

//= { a: ["eulav___", "eulav___", "eulav___"] }
JS.eval("{a: itemsOf(3, padRight(reverse(arg), 8, '_')) }", scope)
```
