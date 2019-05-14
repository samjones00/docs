---
slug: web-tool
title: ServiceStack's .NET Core Utility Belt
---

Our `web` (and `app`) .NET Core tools are a versatile invaluable companion for all ServiceStack developers where it's 
jam packed with functionality to power a number of exciting scenarios where it serves as a [Sharp App](https://sharpscript.net/docs/sharp-apps) 
delivery platform where they can be run as a .NET Core Windows Desktop App with `app` or as a cross-platform Web App launcher 
using `web` and we've already how it's now a [`#Script` runner](https://sharpscript.net/docs/sharp-scripts) with `web run` and into a 
[Live `#Script` playground](https://sharpscript.net/docs/sharp-scripts#live-script-with-web-watch) with `web watch`.

They also contain all features from our [@servicestack/cli](https://github.com/ServiceStack/servicestack-cli) npm tools
so you'll **no longer need npm** to [create ServiceStack projects](/web-new) or 
[Add/Update ServiceStack References](/add-servicestack-reference).

To access available features, install with:

    $ dotnet tool install --global web 

Or if you had a previous version installed, update with:

    $ dotnet tool update -g web

> The Windows-only `app` tool has better integration with Windows that can power [.NET Core Windows Desktop Apps](/netcore-windows-desktop).

Then run `web` without any arguments to view Usage:

    $ web

```
Usage:

  web new                     List available Project Templates
  web new <template> <name>   Create New Project From Template

  web <lang>                  Update all ServiceStack References in directory (recursive)
  web <file>                  Update existing ServiceStack Reference (e.g. dtos.cs)
  web <lang>     <url> <file> Add ServiceStack Reference and save to file name
  web csharp     <url>        Add C# ServiceStack Reference         (Alias 'cs')
  web typescript <url>        Add TypeScript ServiceStack Reference (Alias 'ts')
  web swift      <url>        Add Swift ServiceStack Reference      (Alias 'sw')
  web java       <url>        Add Java ServiceStack Reference       (Alias 'ja')
  web kotlin     <url>        Add Kotlin ServiceStack Reference     (Alias 'kt')
  web dart       <url>        Add Dart ServiceStack Reference       (Alias 'da')
  web fsharp     <url>        Add F# ServiceStack Reference         (Alias 'fs')
  web vbnet      <url>        Add VB.NET ServiceStack Reference     (Alias 'vb')
  web tsd        <url>        Add TypeScript Definition ServiceStack Reference

  web +                       Show available gists
  web +<name>                 Write gist files locally, e.g:
  web +init                   Create empty .NET Core 2.2 ServiceStack App
  web + #<tag>                Search available gists
  web gist <gist-id>          Write all Gist text files to current directory

  web run <name>.ss           Run #Script within context of AppHost   (or <name>.html)
  web watch <name>.ss         Watch #Script within context of AppHost (or <name>.html)

  web run                     Run Sharp App in App folder using local app.settings
  web run path/app.settings   Run Sharp App at folder containing specified app.settings

  web list                    List available Sharp Apps            (Alias 'l')
  web gallery                 Open Sharp App Gallery in a Browser  (Alias 'g')
  web install <name>          Install Sharp App                    (Alias 'i')

  web publish                 Package Sharp App to /publish ready for deployment (.NET Core Required)
  web publish-exe             Package self-contained .exe Sharp App to /publish  (.NET Core Embedded)

  web shortcut                Create Shortcut for Sharp App
  web shortcut <name>.dll     Create Shortcut for .NET Core App

  dotnet tool update -g web   Update to latest version

Options:
    -h, --help, ?             Print this message
    -v, --version             Print this version
    -d, --debug               Run in Debug mode for Development
    -r, --release             Run in Release mode for Production
    -s, --source              Change GitHub Source for App Directory
    -f, --force               Quiet mode, always approve, never prompt
        --clean               Delete downloaded caches
        --verbose             Display verbose logging
```

### Add/Update ServiceStack References

This shows us we can Add a ServiceStack Reference with `web <lang> <baseurl>` which will let us create a TypeScript Reference 
to the new [World Validation](/world-validation) App using its `ts` file extension alias:

    $ web ts http://validation.web-app.io

    Saved to: dtos.ts

Or create a C# ServiceStack Reference with:

    $ web cs http://validation.web-app.io

    Saved to: dtos.cs

To update run `web <lang>` which will recursively update all existing ServiceStack References:

    $ web ts

    Updated: dtos.ts

### Create new Projects with `web new`

See [web new](/web-new) for info on how to create new projects.

## Integrate with Visual Studio

You can also easily integrate this within your VS.NET dev workflows by [adding it as an External Tool](https://docs.microsoft.com/en-us/visualstudio/ide/managing-external-tools?view=vs-2019) in the **External Tools** dialog box by choosing `Tools > External Tools`:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/tool-ts-reference.png)

|  ||
|-|-|
| Title             | Update TypeScript &Reference |
| Command           | web.exe |
| Arguments         | ts |
| Initial directory | $(ProjectDir) |
|  ||

Which will then let you update all your `*dtos.ts` TypeScript References in your project by clicking on `Tools > Update TypeScript Reference` 
or using the `ALT+T R` keyboard shortcut.

If you wanted to Update your `*dtos.cs` C# ServiceStack References instead, just change the Arguments to `cs`:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/tool-cs-reference.png)

|  ||
|-|-|
| Title             | Update C# &Reference |
| Command           | web.exe |
| Arguments         | cs |
| Initial directory | $(ProjectDir) |
|  ||

## Mix/Match ASP.NET Core projects with `web +`

See [web +](/web-apply) for how to mix/match gists to "layer on" functionality to create customized ASP.NET Core projects.

{% capture trouble %}{% include web-trouble.md %}{% endcapture %}
{{ trouble | markdownify }}
