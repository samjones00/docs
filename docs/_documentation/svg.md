---
slug: svg
title: SVG Support
---

ServiceStack lets you register use built-in and register custom SVG icons from the `Svg` static API class.

### Viewing SVG Icons

You can view all built-in SVG icons from the  `/metadata/svg` page which is also available under the **SVG Images** link in your 
[/metadata page Debug Links](/metadata-page#debug-links).

The `/metadata/svg` page contains a number of usage examples, code fragments and links to view 

They're also available from the `Svg.Images` collection if you need to access them programmatically:

```csharp
foreach (var entry in Svg.Images) {
    var name = entry.Key;
    var svg = entry.Value;
    $"{name}: {svg}".Print();
}
```

### Loading SVG from FileSystem

The most user-friendly way to load custom SVG icons is to add them from a custom directory, e.g:

    /svg
        /svg-icons
            vue.svg
            spirals.html
        /my-icons
            myicon.svg

Then in your `AppHost` you can load them with using `Svg.Load()`:

```csharp
public override void Configure(Container container)
{
    Svg.Load(VirtualFiles.GetDirectory("svg"));
}
```

> `VirtualFiles` is configured to your projects **ContentRoot**, use `VirtualFileSources` to use your **WebRoot**

This will load all the SVG images in the `/svg` directory with the sub directory used for the **cssfile** you want to add them to 
and the file name used as the svg **name**.

It will also evaluate any `.html` files in the directory with [#Script](https://sharpscript.net) and add the rendered SVG,
e.g. we can load the generated SVG from the [Spirals Sharp App](https://github.com/mythz/spirals):

##### /svg/svg-icons/spirals.html

```
{% raw %}<svg height="640" width="240">
{{#each range(180) }}
    {{ 120 + 100 * cos((5)  * it * 0.02827) | assignTo: x }}
    {{ 320 + 300 * sin((1)  * it * 0.02827) | assignTo: y }}
    <circle cx="{{x}}" cy="{{y}}" r="{{it*0.1}}" fill="#556080" stroke="black" stroke-width="1"></circle>
{{/each}}
</svg>{% endraw %}
```

The SVG rendered output of which is registered as any normal SVG Image.

### Register Custom SVG Images via API

You can also register your own SVG images programmatically with:

```csharp
Svg.AddImage("<svg width='100' height='100' viewBox='0 0 100 100'>...</svg>", "myicon", "my-icons");
```

Where it will register the SVG under the `myicon` name and include it in the `/css/my-icons.css` css file.

The same icon can also be included in multiple stylesheets by adding its name to the `Svg.CssFiles` collection, e.g:

```csharp
Svg.CssFiles["svg-icons"].Add("myicon");
```

#### SVG APIs

Once added you can access your SVG images from the available `Svg` APIs:

```csharp
var svg = Svg.GetImage("myicon");
var dataUri = Svg.GetDataUri("myicon");
```

All built-in SVG's are `100x100` in size, for consistency we recommend that your SVG icons also retain the same size, as they're 
vector images they can be later resized when they're referenced in your App.

If your icons use the **fill** colors registered in:

```csharp
Svg.FillColors = new[] { "#ffffff", "#556080" };
```

You will be able replace the fill colors with:

```csharp
var svg = Svg.GetImage("myicon", "#e33");
var dataUri = Svg.GetDataUri("myicon", "#e33");
```

## Using SVG images in CSS

On Startup ServiceStack generates `.css` files for all SVG icons in `Svg.CssFiles` where you can import all icons with a single 
stylesheet reference with all icons in each CSS file available from `/css/{name}.css`, e.g:

```html
<link rel="stylesheet" href="/css/svg-icons.css">
```

Each CSS file includes 2 CSS classes for each SVG image that are both configured with the SVG as a background image:

```css
.svg-myicon, .fa-myicon { background-image: url(...) }
```

Use the `svg-myicon` class when you want to set an HTML Element to use your SVG as its background:

```html
<div class="icon svg-myicon"></div>
```

A good way to set the size of all related icons is to use a shared class, e.g:

```css
.icon {
  width: 50px;
  height: 50px;
  background-size: 50px 50px;
  background-repeat: no-repeat;
  background-position: 2px 2px;
}
```

The `fa-myicon` class follows [Font Awesome](https://fontawesome.com) convention which you can use to render SVG icons inside buttons, e.g:

```html
<button class="btn btn-block btn-social btn-light">
  <i class="fab fa-myicon"></i> Label
</button>
```

You can either use [Bootstrap Button colors](https://getbootstrap.com/docs/4.3/components/buttons/#examples) to select the button color
you want or use a custom `btn-myicon` class to choose different backgrounds for each SVG, e.g:

```css
.btn-myicon {
  color: #212529;
  background-color: #dae0e5;
  border-color: #d3d9df;
}
```

The buttons requires the [Social Buttons for Bootstrap](https://lipis.github.io/bootstrap-social/) which is also embedded in ServiceStack.dll
and can be included with:

```html
<link rel="stylesheet" href="/css/buttons.css">
<link rel="stylesheet" href="/css/svg-icons.css">
```

### Inline CSS

An alternative to using external stylesheet references above, is to embed them as inline styles in your page which can benefit in reduced
network requests as well as better isolation in contrast to including all CSS your App's use in each page.

You can use `cssIncludes` to embed the contents of multiple css files in `#Script` pages with:

```html
{% raw %}{{ 'buttons,svg-icons' | cssIncludes }}{% endraw %}
```

Or in Razor with:

```html
@Html.CssIncludes("buttons","svg-icons")
```

## Using SVG images in `#Script`

In [#Script Pages](https://sharpscript.net/docs/sharp-pages) you can embed SVG xml with the `svgImage` and `svgDataUri` script methods:

```hbs
{% raw %}{{ 'myicon' | svgImage }}
{{ 'myicon'.svgImage('#e33') }}{% endraw %}
```

Inside an HTML IMG element using its data URI:

```html
{% raw %}<img src="{{ 'myicon'.svgDataUri() }}">
<img src="{{ 'myicon'.svgDataUri('#e33') }}">{% endraw %}
```

Or as a background image in a custom CSS class:

```css
{% raw %}.myicon {
  width: 150px;
  height: 150px;
  background-size: 142px;
  background-position: 4px;
  background-repeat: no-repeat;
  {{ 'myicon'.svgBackgroundImageCss() }} 
}{% endraw %}
```

Where you can use the class name to apply the above CSS to an element:

```html
<div class="myicon"></div>
```

### Using SVG images in Razor

Likewise there are HTML Helpers with the same name available in Razor Pages, where you can embed SVG images directly with:

```csharp
@Html.SvgImage("myicon")
@Html.SvgImage("myicon", "#e33")
```

Inside an HTML IMG element using its data URI:

```html
<img src="@Html.SvgDataUri("myicon")">
<img src="@Html.SvgDataUri("myicon", "#e33")">
```

Or inside a CSS class:

```css
.myicon {
  width: 150px;
  height: 150px;
  background-size: 150px;
  background-repeat: no-repeat;
  @Html.SvgBackgroundImageCss("myicon")
}
```

