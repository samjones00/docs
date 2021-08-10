---
slug: jupyter-notebooks-csharp
title: C# Jupyter Notebooks
---

Jupyter Commands lets you generate C# Jupyter Notebooks for calling ServiceStack APIs in a single command.

All command line utils used are available in the latest [dotnet tool](/dotnet-tool) which can be installed from:

    $ dotnet tool install --global x 

Or if you had a previous version installed, update with:

    $ dotnet tool update -g x

### Generate C# Jupyter Notebooks

Use `x jupyter-csharp` to display different usage examples for generating C# Jupyter Notebooks:

```
Usage: x jupyter-csharp <base-url>
       x jupyter-csharp <base-url> <request>
       x jupyter-csharp <base-url> <request> {js-object}
       x jupyter-csharp <base-url> <request> < body.json

Options:
 -out <file>            Save notebook to file
 -include <pattern>     Include Types DTOs pattern
```

The same syntax for invoking APIs with the [Post Command HTTP Utils](/post-command) can also be used to generate C# Jupyter Notebooks, e.g:

    $ x jupyter-csharp https://techstacks.io FindTechStacks "{Ids:[1,2,3],VendorName:'Google',Take:5}"

Output:

```
Saved to: techstacks.io-FindTechStacks.ipynb
```

> Jupyter Notebooks can also be created with the API Explorer UI at [apps.servicestack.net](https://apps.servicestack.net).
