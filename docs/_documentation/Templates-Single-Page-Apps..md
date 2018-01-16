---
title: Webpack Single Page App Templates
slug: templates-single-page-apps
---

The [ServiceStackVS VS.NET extension](https://github.com/ServiceStack/ServiceStackVS) contains a pre-configured Single Page App VS.NET template for each of the popular JavaScript frameworks:

[![](/images/ssvs/new-spa-project.png)](/create-your-first-webservice#step-1-download-and-install-servicestackvs)

The Single Page App (SPA) project templates can also be created using the [dotnet-new](/dotnet-new) command line tool:

    $ npm install -g @servicestack/cli

    $ dotnet-new <template-name> ProjectName

Click on the template name below to view a Live Demo and contents of each project template:

### .NET Core 2.0

 - [vue-spa](https://github.com/NetCoreTemplates/vue-spa) - Vue App
 - [react-spa](https://github.com/NetCoreTemplates/react-spa) - React App
 - [angular-cli](https://github.com/NetCoreTemplates/angular-cli) - Angular 5 App
 - [angular-lite-spa](https://github.com/NetCoreTemplates/angular-lite-spa) - Angular 4 Material Design Lite App
 - [aurelia-spa](https://github.com/NetCoreTemplates/aurelia-spa) - Aurelia App

The .NET Core 2.0 project templates utilizes MSBuild's newer and human-friendly format which can be developed using your prefered C# IDE of VS.NET, VS Code or Rider.

### .NET Framework

 - [vue-spa-netfx](https://github.com/NetFrameworkTemplates/vue-spa-netfx) - Vue App
 - [react-spa-netfx](https://github.com/NetFrameworkTemplates/react-spa-netfx) - React App
 - [angular-cli-netfx](https://github.com/NetFrameworkTemplates/angular-cli-netfx) - Angular 5 App
 - [angular-lite-spa-netfx](https://github.com/NetFrameworkTemplates/angular-lite-spa-netfx) - Angular 4 Material Design Lite App
 - [aurelia-spa-netfx](https://github.com/NetFrameworkTemplates/aurelia-spa-netfx) - Aurelia App
 - [react-desktop-apps-netfx](https://github.com/NetFrameworkTemplates/react-desktop-apps-netfx) - React Desktop Apps

.NET Framework Templates utilize MSBuild's classic project format which can be developed using either VS.NET or Rider.

[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/spa-templates-overview.png)](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/spa-templates-overview.png)

All VS.NET Single Page App templates are powered by [Webpack](https://webpack.js.org) which handles the development, testing and production builds of your Web App. 

The [Angular 5](https://angular.io) template built and managed using Angular's default [angular-cli](https://cli.angular.io) tooling. All other SPA Templates (inc. Angular 4) utilize a modernized Webpack build system, pre-configured with npm scripts to perform all necessary debug, production and live watched builds and testing. 

[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/webpack-overview.png)](https://webpack.js.org)
 
Webpack takes care of all packaging and bundling requirements. Gulp is primarily used to provide a GUI to run the [templates npm scripts](https://github.com/NetCoreTemplates/vue-spa/blob/9f4c81c9f6dc5e1e812238357853eb0ea08bac51/MyApp/package.json#L7-L15) in VS.NET's Task Runner Explorer so all templates features can be accessed without leaving VS.NET, or if preferred each npm script can also be run on the command-line with:
 
    $ npm run {script name}
 
Webpack works natively with npm packages and is used to handle **all client assets** which can leverage its
[vast ecosystem](https://webpack.github.io/docs/list-of-loaders.html) of 
[loaders](https://webpack.js.org/concepts/loaders/) and 
[plugins](https://webpack.js.org/concepts/plugins/) to handle every kind of web asset, performing the necessary transformations to transpile it into the native formats browsers understand, loading it in browsers and generating source maps so their original source files can be debugged. The Webpack configuration is customized per build type where the optimal configuration is used in development for faster builds and easier debuggability whilst production builds are optimized for performance, size and cacheability.

### TypeScript and Sass
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/sass-ts.png)
 
All templates are configured with TypeScript which we believe provides the greatest value in enabling a highly-productive and maintainable code-base. TypeScript lets you utilize the latest ES6/7 features including terse ES6 modules and async/await support whilst being able to target down-level browsers. Other benefits include better documented typed APIs, instant compiler feedback, rich intellisense and refactoring support in a graceful superset of JavaScript that scales well to be able develop prototypes quickly then easily go back to harden existing code-bases with optional Type information, catching common errors at compile-time whilst annotating modules with valuable documentation other developers can benefit from.
 
Whilst CSS is a powerful language for styling Web Apps it lacks many of the DRY and reuse features we take for granted in a general purpose programming language. [SASS](http://sass-lang.com/) is designed to close that gap with a number of useful extensions to CSS aimed at enabling a highly-maintainable, modular and configurable css code-base. If you prefer to avoid learning SASS you can continue using vanilla css which has been enhanced with [autoprefixer](https://github.com/postcss/autoprefixer) and [precss](https://github.com/jonathantneal/precss) support.

### End-to-end Typed APIs
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/servicestack-ts.png)
 
Each template is seamlessly integrated with ServiceStack's [TypeScript Add Reference](/typescript-add-servicestack-reference) and generic TypeScript [@servicestack/client](https://github.com/ServiceStack/servicestack-client) to provide an end-to-end Typed API to call your Services that can be synced with your Server DTOs by running the npm (or Gulp) `dtos` script. 

The [Typed API request below](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/src/home/Home.vue) uses the Server Generated 
[dtos.ts](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/src/dtos.ts) and generic `JsonServiceClient` to display a Welcome message on each key-press:
 
```ts
import { client } from '../shared';
import { Hello } from '../dtos';
 
async nameChanged(name: string) {
    if (name) {
        let request = new Hello();
        request.name = name;
        let r = await client.get(request);
        this.result = r.result;
    } else {
        this.result = '';
    }
}
```
 
The imported `client` is an instance of `JsonServiceClient` declared in [shared.ts](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/src/shared.ts) module, configured with the BaseUrl at `/`:
 
```ts
export var client = new JsonServiceClient(global.BaseUrl || '/');
```
 
The `global.BaseUrl` is defined in [package.json](https://github.com/NetCoreTemplates/vue-spa/blob/9f4c81c9f6dc5e1e812238357853eb0ea08bac51/MyApp/package.json#L19) and injected by [Jest](https://facebook.github.io/jest/) or [Karma](https://karma-runner.github.io/2.0/index.html) in order to be able to run end-to-end Integration tests.
 
### Angular 5 HTTP Client

The Angular 5 template is also configured to use Angular's built-in Rx-enabled HTTP Client with ServiceStack's ambient TypeScript declarations, as it's often preferable to utilize Angular's built-in dependencies when available. 

ServiceStack's ambient TypeScript interfaces are leveraged to enable a Typed API, whilst the `createUrl(route,args)` helper lets you reuse your APIs Route definitions (emitted in comments above each Request DTO) to provide a pleasant UX for making API calls using Angular's HTTP Client:

```ts
import { createUrl } from '@servicestack/client';
...

this.http.get<HelloResponse>(createUrl('/hello/{Name}', { name })).subscribe(r => {
    this.result = r.result;
});
```

### Optimal Dev Workflow with Hot Reloading

The templates include a hot-reload feature which works similar to [ServiceStack Templates hot-reloading](http://templates.servicestack.net/docs/hot-reloading) where in **DebugMode** it will long poll the server to watch for any modified files in `/wwwroot` and automatically refresh the page. 

Hot Reloading works by leveraging [ServiceStack Templates](http://templates.servicestack.net) which works seamlessly with Webpack's generated `index.html` where it evaluates server Template Expressions when returning the SPA home page. This is leveraged to enable Hot Reloading support by [including the expression](https://github.com/NetCoreTemplates/vue-spa/blob/0c13183b6a5ae20564f650e50d29b9d4e36cbd0c/MyApp/index.template.ejs#L8):

```html
{% raw %}{{ ifDebug | select: <script>{ '/js/hot-fileloader.js' | includeFile }</script> }}{% endraw %}
```

Which renders the contents of [/js/hot-fileloader.js](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/js/hot-fileloader.js) when running the Web App during development.

Although optional, ServiceStack Templates is useful whenever you need to render any server logic in the SPA home page, e.g:

```html 
{% raw %}<div>Copyright &copy; {{ now | dateFormat('yyyy') }}</div>{% endraw %}
```

Will be evaluated on the server and render the expected:
 
    Copyright © 2017

## Quick tour of Webpack
 
Webpack has been pre-configured in all Single Paeege App templates to enable a flexible and feature-rich development model whose defaults in **webpack.config.js** will be able to support a large number of Web Apps without modification, leaving you free to focus on developing your App.
 
Although as Webpack is the central hub powering each template you'll still want to become familiar with its [four high-level concepts](https://webpack.js.org/concepts/) to understand how it's new approach to Single Page App development works and how it can handle all your App's dependencies and resources.
 
We'll quickly touch on each of Webpack's concepts by seeing how the React App's [webpack.config.js](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/webpack.config.js) is configured to handle its TypeScript sources, sass/css files and their references.
 
### [Entry points](https://webpack.js.org/concepts/entry-points/)
 
Webpack builds a graph of your App's dependencies which it traverses starting from its entry points, this is the input into Webpack where its given the App's entry point. 

#### [webpack.config.js](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/webpack.config.js)

```js
entry: isTest ? NONE : {
    app: [
        './src/main.ts'
    ]
},
```
 
#### [webpack.config.vendor.js](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/webpack.config.vendor.js)

A separate **vendor** Webpack configuration is maintained for 3rd party Vendor dependencies independent from your App's code-base so they only need to be compiled once when adding a new dependency instead of each time your App changes. To include another vendor library in the vendor build, add the module name or the resource your App uses in the `VENDOR` collection, e.g:

```js
const VENDOR = [
    'bootstrap/dist/css/bootstrap.css',
    'font-awesome/css/font-awesome.css',
    'es6-shim',
    '@servicestack/client',
    'vue',
    'vue-router'
];

entry: { vendor: VENDOR },
```

### [Output](https://webpack.js.org/concepts/output/)
 
On the opposite end of Webpack's build are its outputs where we tell it where to bundle our App:
 
```js
output: {
    path: root('wwwroot/dist'),
    publicPath: '/dist/',
    filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js',
},
```

Here we can see that our Webpack config supports multiple [isProd and isDev](https://github.com/NetCoreTemplates/vue-spa/blob/9f4c81c9f6dc5e1e812238357853eb0ea08bac51/MyApp/webpack.config.js#L5-L6) configurations, `isDev` is used for development builds where Webpack bundles our website in the `/dist` folder whilst `isProd` is used for production builds which is instead bundled in the `/wwwroot/dist` folder with each `.js` bundle including a **[chunkhash]** cache-breaker in its filename. 
 
> The `root()` and `when()` functions used are basic [helpers used to simplify webpack configuration](https://github.com/NetCoreTemplates/vue-spa/blob/9f4c81c9f6dc5e1e812238357853eb0ea08bac51/MyApp/webpack.config.js#L158-L164)
 
### Vendor Output

The Vendor Webpack configuration utilizes [Webpack's DllPlugin](https://webpack.js.org/plugins/dll-plugin/) to generate a `vendor.dll.css` and a `vendor.dll.js` containing the Vendor's compiled `.css` and `.js` bundles:

```js
const extractCSS = new ExtractTextPlugin('vendor.dll.css');

output: {
    path: root('wwwroot/dist'),
    publicPath: 'dist/',
    filename: '[name].dll.js',
    library: '[name]_[hash]',
},
plugins: [
    extractCSS,
    new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]'
    })
]
```

It also generates `vendor-manifest.json` which is referenced in the App's [webpack.config.js](https://github.com/NetCoreTemplates/vue-spa/blob/9f4c81c9f6dc5e1e812238357853eb0ea08bac51/MyApp/webpack.config.js#L134-L136) to tell it which dependencies are included in the vendor bundles so they don't need to be compiled with the App:

```js
plugins: [
    ...when(!isTest, [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        }),
    ]),
]
```

Utilizing Webpack .dll's plugin for your vendor dependencies allows for faster compilation times as they don't need to be recompiled when your App changes.

### [Loaders](https://webpack.js.org/concepts/loaders/)
 
Loaders are the flexible engine that sets Webpack apart where it's able to leverage its [vast ecosystem](https://webpack.github.io/docs/list-of-loaders.html) where there's a loader for every kind of web asset typically used when developing Web Apps. 
 
Loaders are configured in the `rules` section and invoked using node's `require()` statement or ES6/TypeScript's `import` statement. Rules use the `test` regex to specify which files they should apply to whilst the `loader` property tells Webpack which loader to load them with. Each loader is self-contained in a separate npm package that needs to be made available to your project by adding them to your [package.json devDependencies](https://github.com/NetCoreTemplates/vue-spa/blob/9f4c81c9f6dc5e1e812238357853eb0ea08bac51/MyApp/package.json#L31). 
 
Lets checkout Vue's loader configuration for a typical example:
 
```js
const postcssLoader = {
    loader: 'postcss-loader',
    options: { plugins: [require('precss'), require('autoprefixer')] }
};
 
module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!sass-loader',
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
            }
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/],
                transpileOnly: isTest
            },
            exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules/]
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            enforce: "pre",
            test: /\.js$/, 
            loader: "source-map-loader"
        },
        {
            test: /\.(jpe?g|gif|png|ico|svg|wav|mp3)$/i,
            loader: 'file-loader' + (isProd 
                ? '?hash=sha512&digest=hex&name=img/[name].[hash].[ext]' 
                : '?name=img/[name].[ext]')
        },
        {
            test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: isProd 
                ? 'url-loader?limit=10000&name=img/[name].[hash].[ext]' 
                : 'file-loader?name=img/[name].[ext]'
        },
        ...when(isDev || isTest, [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader', postcssLoader ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [ 'style-loader', 'css-loader', postcssLoader, 'sass-loader' ] 
            },            
        ]),
        ...when(isProd, [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize', postcssLoader],
                }),
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize', postcssLoader, 'sass-loader'],
                }),
            }
        ])
    ]
},
```
 
This configuration instructs Webpack to load any `.ts` or `.tsx` files using the [TypeScript loader for webpack](https://www.npmjs.com/package/ts-loader) which is then responsible for compiling the source files with TypeScript's compiler. 
 
Loaders are also chainable as seen in the `.css` and `.scss` rules which starts from right-to-left where the output of the rightmost loader is passed into the next loader on its left and so on. 

```js
{
    test: /\.css$/,
    use: [ 'style-loader', 'css-loader', postcssLoader ]
},
```
 
Here the `.css` contents are first processed with [postcssLoader](https://github.com/postcss/postcss-loader) which uses [precss](https://github.com/jonathantneal/precss) to let you use basic sass-like features in vanilla `.css` files and [autoprefixer](https://github.com/postcss/autoprefixer) which lets you write clean standard css rules like:
 
```css
a {
    display: flex;
}
```
 
Which autoprefixer will expand to include vendor prefixes, maximizing support for older browser versions:
 
```css
a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex
}
```
 
The output of `postcssLoader` then gets passed into [css-loader](https://github.com/webpack-contrib/css-loader) which processes any css `@import()` and `@url()` rules and loads them with Webpack's `require()` to ensure its references are also processed by Webpack.
 
The output of `css-loader` then gets passed into [style-loader](https://github.com/webpack-contrib/style-loader) who injects the resulting css fragments within `<style></style>` tags in the browser's DOM which is how Web App styles in development builds are still visible despite their being no `.css` files written. [Sass](http://sass-lang.com/) `.scss` files are handled similarly to `.css` files except they're initially loaded with [sass-loader](https://github.com/webpack-contrib/sass-loader) which converts them into `.css`. Both these rules together let you use your preferred choice of `.scss` or `.css` files to style your Web App.
 
There's a separate configuration needed for Production builds which is configured to minify the css and write their contents out into separate `.css` bundles as defined in the plugins section below:
 
### [Plugins](https://webpack.js.org/concepts/plugins/)
 
Loaders only loads and transforms files on a **per-file** basis, anything more advanced requires using plugins. In this template plugins are used to:
 
 1. Set type of Webpack build so other loaders/plugins can optimize accordingly
 2. Ignores watching the `/wwwroot` folder for any changes during watched builds
 3. References the **vendor** `.js` and `.css` bundles in the App's Webpack build
 4. Generate the WebApps `index.html`, based on [index.template.ejs](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/index.template.ejs) and compiled with [lodash template](https://lodash.com/docs/4.17.4#template), which also takes care of injecting any `.css` and `.js` output bundle references
 5. Injects the vendor  `.js` and `.css` bundles in the generated `wwwroot/index.html`
  
```js
plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': isDev ? '"development"' : '"production"' }),
    new webpack.WatchIgnorePlugin([root("wwwroot")]),
    ...when(!isTest, [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            filename: '../index.html',
            inject: true
        }),
        new AddAssetHtmlPlugin({ filepath: root('wwwroot/dist/*.dll.js') }),
        new AddAssetHtmlPlugin({ filepath: root('wwwroot/dist/*.dll.css'), typeOfAsset: 'css' })
    ]),
    ...when(isProd, [
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true, compress: { warnings: false } })
    ]),
]
```

### /wwwroot WebRoot Path for .NET Framework Templates

To simplify migration efforts of ServiceStack projects between .NET Core and .NET Framework, all SPA and Website Templates are configured to use .NET Core's convention of `/wwwroot` for its public WebRoot Path. The 2 adjustments needed to support this was configuring ServiceStack to use the `/wwwroot` path in AppHost:

```csharp
SetConfig(new HostConfig {
    WebHostPhysicalPath = MapProjectPath("~/wwwroot"),
});
```

### Deployments

When your App is ready to deploy, run the `publish` npm (or Gulp) script to package your App for deployment:

    npm run publish

Which creates a production build of your App where the `.css` files are written using [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) and the resulting `.js` files minified with UglifyJS. The full production build is generated in in `/wwwroot/dist` folder where it's ready for an XCOPY, rsync or MSDeploy deployment.

In the .NET Framework templates you can deploy to any [MS WebDeploy](https://www.iis.net/downloads/microsoft/web-deploy) enabled Server by clicking **Publish...** in the ASP.NET's project Context Menu item which makes use of the existing [https://github.com/NetFrameworkTemplates/vue-spa-netfx/blob/master/MyApp/Properties/PublishProfiles/PublishToIIS.pubxml](/PublishProfiles/PublishToIIS.pubxml) which [includes an instruction](https://github.com/NetFrameworkTemplates/vue-spa-netfx/blob/2e8c208982561695275b451a9ece35522d9739d9/MyApp/Properties/PublishProfiles/PublishToIIS.pubxml#L23-L36) to include the `/wwwroot` folder in deployments.

In .NET Core 2.0 projects the `publish` npm script runs `dotnet publish -c Release` to Publish a Release build of your App in the `/bin/netcoreapp2.0/publish` folder which can then copied to remote server or an included in a Docker container to deploy your App.
 
### Loading Dependencies
 
Now that we've covered how Webpack is configured, the next step is showing how to make use of it, by loading your App's resources using node's `require()` or TypeScript's `import` statement. 

This can be seen in the App's [main.ts](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/src/main.ts) starting point where it imports **bootstrap.css** and **font-awesome.css** directly from the installed **bootstrap** and **font-awesome** npm packages as well as a local [./app.scss](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/src/app.scss) SASS file which lives side-by-side next to TypeScript source files:
 
```ts
import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import './app.scss';
import 'es6-shim';

import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import Home from './home/Home.vue';
import View1 from './view1/View1.vue';
import View2 from './view2/View2.vue';
```
 
Importing **bootstrap** and **font-awesome** also imports their references, including any images, fonts, svg and other .css files. These are all transparently added to the webpack build and bundled with the rest of your app. 
 
In production builds the `file-loader` copies their references to the output folder, embedding its `sha512` hash in each file name. `url-loader` works similarly but also has the option of embedding file contents below the configured **10000** byte limit inline inside a [Data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) to reduce network requests in production builds.

```js
{
    test: /\.(jpe?g|gif|png|ico|svg|wav|mp3)$/i,
    loader: 'file-loader' + (isProd 
        ? '?hash=sha512&digest=hex&name=img/[name].[hash].[ext]' 
        : '?name=img/[name].[ext]')
},
{
    test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: isProd 
        ? 'url-loader?limit=10000&name=img/[name].[hash].[ext]' 
        : 'file-loader?name=img/[name].[ext]'
},

```

`require()` can also be used to load resources in other files which is how images can be imported in the [index.template.ejs](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/index.template.ejs) home page template:
 
```html
<img src="<%=require('./src/assets/img/logo.png')%>" />
```
 
Or inside [App components](https://github.com/NetCoreTemplates/angular-lite-spa/blob/4d3ad89c57a7243c6c00758a4de779ba5222de8d/MyApp/src/app.component.ts#L32), both of which returns the image url after it has been processed by Webpack's loaders, e.g:
 
```csharp
constructor() {
    this.logoUrl = require("./assets/img/logo.png");
}
```
 
In production builds this returns a relative url to the output image, e.g: `img/logo.36166adfacf0c8cc11d493f2161164fd.png`.
 
### Webpack builds
 
By importing all your WebApp resources into Webpack it's able to maintain a knowledgeable graph of all your Web Apps dependencies where it lets you define how they're handled at a macro level making it easy to incorporate design-time features like TypeScript and Sass whilst also taking care of generating optimal builds for development, testing and production.
 
#### Development builds
 
You'll use development builds when developing your app locally which you can run with either the `webpack-build` Gulp task in VS.NET's Task Runner Explorer GUI or by running the `build` npm script on the command-line:
 
    $ npm run build
 
This will generate your App in the `/wwwroot/dist` folder similar to:
 
    /wwwroot
        /dist
            /img
                logo.png
                ...
            app.bundle.js
            vendor.dll.css
            vendor.dll.js
            vendor-manifest.json
    index.html
 
The lack of `.css` files or source-maps are due to being embedded in the `.js` bundles and injected in the browser's DOM within `<style></style>` tags. 
 
After the Webpack development build has completed you can just run or refresh your ASP.NET Web App to view the latest changes.
 
#### Production builds
 
When your App is ready to deploy you can run a production build using the `webpack-build-prod` Gulp task or the `build-prod` npm script:
 
    $ npm run build-prod
 
This will bundle and generate your WebApp in the **/wwwroot/dist** folder with css and source maps extracted and written into separate files, css and js minified and all assets emitted with cache-breaking hashes, similar to:
 
    /wwwroot
        /dist
            /img
                logo.36166adfacf0c8cc11d493f2161164fd.png
            674f50d287a8c48dc19ba404d20fe713.eot
            912ec66d7572ff821749319396470bde.svg
            b06871f281fee6b241d60582ae9369b9.ttf
            app.3728b4547755ace1f489.bundle.js
            app.3728b4547755ace1f489.bundle.js.map
            app.3728b4547755ace1f489.css
            app.3728b4547755ace1f489.css.map
            vendor.dll.css
            vendor.dll.css.map
            vendor.dll.js
            vendor.dll.js.map
            vendor-manifest.json
        index.html
 
## Development workflow
 
Executing a development build of Webpack is all that's required to be able to see our changes but it can take a while to run a full dev build which negatively impacts our fast iterative dev workflow. It's instead recommended to leave webpack running in the background and have it watch for changes so it only needs to rebuild assets that have changed, which it's able to do very quickly. 
 
The `00-webpack-dev` and `00-webpack-watch` gulp tasks facilitate the 2 popular development modes for running webpack during development:
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/gulp-tasks.png)

### Gulp Tasks
 
 - **dev** - Run Webpack watch to automatically build, watch and process changed files
 - **dtos** - Run **typescript-ref** npm script to import latest TypeScript Server DTOs
 - **webpack-build** - Run a Webpack development build to bundle and output your app to `/dist`
 - **webpack-build-prod** - Run a Webpack production build to bundle and output your app to `/wwwroot/dist`
 - **webpack-build-vendor** - Run a Webpack production build to bundle the Vendor libraries to `/wwwroot/dist`
 - **package** - Perform all tasks to build the client so your App is ready for deployment
 - **tests-run** - Run all TypeScript/JS unit and integration tests
 - **tests-watch** - Rerun all TypeScript/JS tests as source code changes are made
 - **tests-coverage** - View test coverage of your existing TypeScript/JS tests

Whilst we recommend running the `dev` Gulp or npm script during development to run a live watched development, you can instead run the `npm run dev-server` npm script to run a development build of your app through Webpack's dev-server which has it's own built-in hot reloading for when your Client Apps source code changes. The 2 

### Webpack watch
 
Our recommendation is to run the `dev` Gulp task and leave it running in the background, or if preferred, run the **dev** npm script on the command-line with:
 
    $ npm run dev
 
Webpack **dev**  initially generates a full development build of your Web App then stays running in the background to process files as they're changed. This enables the normal dev workflow of running your ASP.NET Web App from VS.NET, saving changes locally which are then reloaded using ServiceStack's built-in hot reloading. Alternatively hitting **F5** will refresh the page and view the latest changes.
 
Each change updates the output dev resources so even if you stop the **dev** task your Web App remains in a working state that's viewable when running the ASP.NET Web App.
 
### Live reload with Webpack Dev Server
 
The alternative dev workflow is to run the `dev-server` npm script to run the [Webpack dev server](https://webpack.js.org/configuration/dev-server/#devserver):
 
    $ npm run dev
 
This launches the Webpack dev server listening at `http://localhost:3000/` and configured to proxy all non-Webpack HTTP requests to the ASP.NET Web App where it handles all Server API requests. The benefit of viewing your App through the Webpack dev server is its built-in Live Reload feature where it will automatically reload the page as resources are updated. We've found the Webpack dev server ideal when developing UI's where your Web App is running side-by-side VS.NET, where every change saved triggers the dev server to reload the current page so changes are visible immediately. 
 
The disadvantage of the dev server is that all transformations are kept in memory so when the dev server is stopped, the Web Apps resources are lost, so it requires a `webpack-build` in order to generate a current build. There's also a slight lag in API requests resulting from each server request being handled by both Webpack's Dev Server and ASP.NET's IIS Express.
 
## Single Page App Features
 
Our goals with the Single Page Templates is to provide a highly productive base that's ideal for developing small to medium-sized JavaScript Web Apps including just the core essentials that pack the most productive punch whilst adding minimal complexity and required configuration, whilst still remaining open-ended to easily plug-in other tools into your Webpack configuration you believe will improve your development workflow. 
 
With these goals in mind we've hand-picked and integrated a number of simple best-of-breed technologies so you'll be immediately productive:
 
### Integrated UI framework and Vector Icons
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/bootstrap-fontawesome-material.png)
 
Vue, React, Angular 5 and Aurelia are pre-configured with [Bootstrap v4](https://getbootstrap.com/) and [font-awesome vector font icons](http://fontawesome.io/icons/) whilst Angular 4 is preconfigured to use [Material Design Lite](https://getmdl.io/) and [Material Design Icons](https://material.io/icons/) providing a solution for utilizing resources which are all developed and maintained by Google.

#### Updating Server TypeScript DTOs
 
To get the latest Server DTOs, build the ASP.NET Web App then either right-click on `dtos.ts` and select **Update ServiceStack Reference** from the Context Menu:
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/typescript-update-reference.png)
 
Or alternatively you can run the `dtos` Gulp task in Task Runner Explorer GUI, or if preferred, run the script on the command-line with:
 
    $ npm run dtos
 
### Routing Enabled, Multi-page Layout
  
All templates have multiple views with Routing enabled so they're all setup to develop multi-page navigable Single Page Apps out-of-the-gate. All templates are designed to be functionally equivalent utilizing a 3 page tabbed layout but implemented using their own idiomatic style so you'll be able to easily inspect and compare the structure and ergonomics of each JavaScript framework to evaluate the one you like best.
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/routing-overview.png)
 
### Deep linkable Pretty URLs
 
All Single Page Apps are configured to use Pretty URLs (i.e. without `#!`) and are deep-linkable so they behave similarly to server-generated websites in that they support the back button and full-page reloads to refresh the current page. This works behind the scenes using a `[FallbackRoute]` to have all unknown routes return the home page so the route can be handled on the client to load the appropriate view.
 
### JavaScript Unit Testing
 
Aurelia, React and React Desktop Apps are configured to use [Facebook's Jest Testing Framework](https://facebook.github.io/jest/) with the React Templates configured to use [AirBnb's enzyme virtual React DOM](https://github.com/airbnb/enzyme) to enable fast, browser-less tests and includes a few different examples of client/server integration tests.
 
Angular and Vue are configured to use the [Karma test runner](https://karma-runner.github.io/1.0/index.html) with the headless phantomjs WebKit browser so the behavior of Components are tested in a real browser.
 
Tests can be run with the `tests-run` gulp task, or on the command-line using any of npm's testing conventions:
 
    $ npm test
    $ npm t
 
#### Live Testing
 
Each template also includes support for Live Testing which can be run in the background by clicking the `tests-watch` Gulp task or on the command-line with:
 
    $ npm run test-watch
 
Live testing automatically re-runs JavaScript tests after each change to provide instant feedback to detect when changes causes existing tests to fail.
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/gulp-tests-watch.png)
 
#### Test Coverage
 
Angular, Aurelia and React are also pre-configured to be able to show test coverage, viewable by running the `tests-coverage` Gulp task or on the command-line with:
 
    $ npm run test-coverage
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/gulp-tests-coverage.png)
 
#### Multi-Project Solution Layout

All templates follow our [Recommended Physical Project Structure](/physical-project-structure) ensuring ServiceStack projects starts off from an optimal logical project layout, laying the foundation for growing into a more maintainable, cohesive and reusable code-base.

### Track progress whilst templates are being created

The Single Page App templates sources their client dependencies from npm which can take up to few minutes to finish downloading and installing. You'll be able to see its progress by looking at the `Bower/npm` Output Window in VS.NET:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/npm-progress.png)

You'll be able to detect when it's finished by waiting for the original contents of **wwwroot/index.html**:

```html
<!-- auto-generated by webpack -->
```

to be replaced with a [Webpack generated html template](https://github.com/NetCoreTemplates/vue-spa/blob/master/MyApp/wwwroot/index.html).

### Keep Desktop node and VS.NET in sync
 
Unfortunately VS.NET 2017 ships with an outdated version of **node.exe** which can be problematic when trying to run scripts from the command-line with a locally installed version of node as native module packages like **node-sass** are coupled to the specific node version and platform they were installed with. This can easily be resolved by configuring VS.NET to use your Desktop version of node instead by adding its the **C:\Program Files\nodejs** folder as the first path in: 
 
> Tools > Options > Projects and Solutions > External Web Tools
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/node-external-tools.png)
 