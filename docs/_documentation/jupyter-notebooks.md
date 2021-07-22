---
slug: jupyter-notebooks
title: Jupyter Notebooks
---

Jupyter Commands lets you generate Python Jupyter Notebooks for calling ServiceStack APIs in a single command.

All command line utils used are available in the latest [dotnet tool](/dotnet-tool) which can be installed from:

    $ dotnet tool install --global x 

Or if you had a previous version installed, update with:

    $ dotnet tool update -g x

### Generate Jupyter Notebooks

Use `x jupyter` to display different usage examples for generating notebooks:

```
Usage: x jupyter <base-url>
       x jupyter <base-url> <request>
       x jupyter <base-url> <request> {js-object}
       x jupyter <base-url> <request> < body.json

Options:
 -out <file>            Save notebook to file
```

The same syntax for invoking APIs with the [Post Command HTTP Utils](/post-command) can also be used to generate Python Jupyter Notebooks, e.g:

    $ x jupyter https://techstacks.io FindTechStacks "{Ids:[1,2,3],VendorName:'Google',Take:5,Fields:'Id,Name,VendorName,Slug,FavCount,ViewCount'}"

Output:

```
Saved to: techstacks.io-FindTechStacks.ipynb
```

Jupyter Notebooks can also be created with the API Explorer UI at https://apps.servicestack.net