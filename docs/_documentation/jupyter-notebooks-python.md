---
slug: jupyter-notebooks-python
title: Python Jupyter Notebooks
---

![](../images/apps/jupyter-python.png)

Whilst the [Jupyter project](https://jupyter.org) has designed its Notebooks to be language agnostic with current support for over 40+ programming languages, the best experience and broadest ecosystem and community support is still centered around Python Jupyter Notebooks.

Thanks to [Python Add ServiceStack Reference](/python-add-servicestack-reference) support for generating typed Python data classes for your ServiceStack Service DTOs, your API consumers are able to tap into the beautiful [interactive world of Jupyter Notebooks](/jupyter-notebooks) who can leverage end-to-end typed APIs with your Services Python DTOs and the generic [servicestack](https://pypi.org/project/servicestack/) Python package containing both the generic `JsonServiceClient` for making typed API requests as well as useful utilities for easily previewing API Responses in human-readable HTML or markdown table formats.

## Instant Client Apps

Easiest way to generate a Python Notebook for a publicly available ServiceStack instance is to use Instant Client Apps UI at:

### [apps.servicestack.net](https://apps.servicestack.net)

Where API Consumers will be able to select an API for a remote ServiceStack Instance and generate a native UI to generate an API Request that can be downloaded in a stand-alone client App in any of the 9 supported programming languages:

[![](../images/apps/apps-languages.png)](https://apps.servicestack.net)

Within seconds after being guided by Instant Client Apps UI, users will be able to select their preferred API and use the Auto form to pre-populate their API 
Request, e.g:

[![](../images/apps/apps-techstacks-FindTechnologies.png)](https://apps.servicestack.net/#techstacks.io/python/AutoQuery/FindTechnologies(Ids:[1,2,4,6],VendorName:Google,Take:10,Fields:%22Id,%20Name,%20VendorName,%20Slug,%20Tier,%20FavCount,%20ViewCount%22))

Which can be run online to display results in a HTML table and a human-friendly markdown table for [AutoQuery Requests](/autoquery-rdbms) or API Responses containing a `Results` resultset. Clicking on **Python Notebook** will download a custom [techstacks.io-FindTechnologies.ipynb](https://github.com/ServiceStack/jupyter-notebooks/blob/main/techstacks.io-FindTechnologies.ipynb) Jupyter Notebook that when executed in either a Binder or self-hosted **notebook** web app will render API responses that looks like:

[![](../images/apps/jupyterlab-mybinder-techstacks.png)](https://github.com/ServiceStack/jupyter-notebooks/blob/main/techstacks.io-FindTechnologies.ipynb)

All populated API Requests are also deep-linkable so they can be easily documented, shared and customized with other team members:

**[apps.servicestack.net/#techstacks.io/python/AutoQuery/FindTechnologies(Ids:[1,2,4,6],VendorName:Google,Take:10)](https://apps.servicestack.net/#techstacks.io/python/AutoQuery/FindTechnologies(Ids:[1,2,4,6],VendorName:Google,Take:10,Fields:%22Id,%20Name,%20VendorName,%20Slug,%20Tier,%20FavCount,%20ViewCount%22))**

## Generate Notebook using command-line

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