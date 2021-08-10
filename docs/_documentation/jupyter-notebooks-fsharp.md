---
slug: jupyter-notebooks-fsharp
title: F# Jupyter Notebooks
---

Jupyter Commands lets you generate F# Jupyter Notebooks for calling ServiceStack APIs in a single command.

All command line utils used are available in the latest [dotnet tool](/dotnet-tool) which can be installed from:

    $ dotnet tool install --global x 

Or if you had a previous version installed, update with:

    $ dotnet tool update -g x

### Generate F# Jupyter Notebooks

Use `x jupyter-fsharp` to display different usage examples for generating F# Jupyter Notebooks:

```
Usage: x jupyter-fsharp <base-url>
       x jupyter-fsharp <base-url> <request>
       x jupyter-fsharp <base-url> <request> {js-object}
       x jupyter-fsharp <base-url> <request> < body.json

Options:
 -out <file>            Save notebook to file
 -include <pattern>     Include Types DTOs pattern
```

The same syntax for invoking APIs with the [Post Command HTTP Utils](/post-command) can also be used to generate F# Jupyter Notebooks, e.g:

    $ x jupyter-fsharp https://techstacks.io FindTechStacks "{Ids:[1,2,3],VendorName:'Google',Take:5}"

Output:

```
Saved to: techstacks.io-FindTechStacks.ipynb
```

> Jupyter Notebooks can also be created with the API Explorer UI at [apps.servicestack.net](https://apps.servicestack.net).
