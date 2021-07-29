---
slug: jupyter-notebooks-python
title: Python Jupyter Notebooks
---

Jupyter Commands lets you generate Python Jupyter Notebooks for calling ServiceStack APIs in a single command.

All command line utils used are available in the latest [dotnet tool](/dotnet-tool) which can be installed from:

    $ dotnet tool install --global x 

Or if you had a previous version installed, update with:

    $ dotnet tool update -g x

### Generate Python Jupyter Notebooks

Use `x jupyter-python` to display different usage examples for generating Python Jupyter Notebooks:

```
Usage: x jupyter-python <base-url>
       x jupyter-python <base-url> <request>
       x jupyter-python <base-url> <request> {js-object}
       x jupyter-python <base-url> <request> < body.json

Options:
 -out <file>            Save notebook to file
 -include <pattern>     Include Types DTOs pattern
```

The same syntax for invoking APIs with the [Post Command HTTP Utils](/post-command) can also be used to generate Python Jupyter Notebooks, e.g:

    $ x jupyter-python https://techstacks.io FindTechStacks "{Ids:[1,2,3],VendorName:'Google',Take:5}"

Output:

```
Saved to: techstacks.io-FindTechStacks.ipynb
```

> Jupyter Notebooks can also be created with the API Explorer UI at [apps.servicestack.net](https://apps.servicestack.net).

### 