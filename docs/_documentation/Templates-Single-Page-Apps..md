---
title: Webpack Single Page App Templates
slug: templates-single-page-apps
---

The [ServiceStackVS VS.NET extension](https://marketplace.visualstudio.com/items?itemName=Mythz.ServiceStackVS) contains a pre-configured Single Page App VS.NET template for each of the popular JavaScript frameworks:

 - [Angular4 App](https://angular.io)
 - [Aurelia App](http://aurelia.io)
 - [React App](https://facebook.github.io/react/)
 - [React Desktop Apps](https://facebook.github.io/react/)
 - [Vue App](https://vuejs.org)

[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/spa-templates-overview.png)](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/spa-templates-overview.png)

All VS.NET Single Page App templates are powered by [Webpack](https://webpack.js.org) which handles the development, testing and production builds of your Web App. 
 
[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/webpack-overview.png)](https://webpack.js.org)
 
Webpack takes care of all packaging and bundling requirements. Gulp is primarily used to provide a GUI to run the [templates npm scripts](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/package.json#L5-L13) in VS.NET's Task Runner Explorer so all templates features can be accessed without leaving VS.NET, or if preferred each npm script can also be run on the command-line with:
 
    $ npm run {script name}
 
Webpack works natively with npm packages and is used to handle **all client assets** which can leverage its
[vast ecosystem](https://webpack.github.io/docs/list-of-loaders.html) of 
[loaders](https://webpack.js.org/concepts/loaders/) and 
[plugins](https://webpack.js.org/concepts/plugins/) to handle every kind of web asset, performing the necessary transformations to transpile it into the native formats browsers understand, loading it in browsers and generating source maps so their original source files can be debugged. The Webpack configuration is customized per build type where the optimal configuration is used in development for faster builds and easier debuggability whilst production builds are optimized for performance, size and cacheability.
 
## Quick tour of Webpack
 
Webpack has been pre-configured in all Single Page App templates to enable a flexible and feature-rich development model whose defaults in **webpack.config.js** will be able to support a large number of Web Apps without modification, leaving you free to focus on developing your App.
 
Although as Webpack is the central hub powering each template you'll still want to become familiar with its [four high-level concepts](https://webpack.js.org/concepts/) to understand how it's new approach to Single Page App development works and how it can handle all your App's dependencies and resources.
 
We'll quickly touch on each of Webpack's concepts by seeing how the React App's [webpack.config.js](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/webpack.config.js) is configured to handle its TypeScript sources, sass/css files and their references.
 
### [Entry points](https://webpack.js.org/concepts/entry-points/)
 
Webpack builds a graph of your App's dependencies which it traverses starting from its entry points, this is the input into Webpack where its given the App's entry point, we also tell Webpack we want to create a separate **vendor** entry point referencing our App's 3rd party dependencies so their outputs can be configured independently:
 
```js
entry: {
    app: [
        './src/app.tsx'
    ],
    vendor: [
        'es6-shim',
        'classnames',
        'react',
        'react-dom',
        'react-router-dom',
        '@servicestack/client'
    ]
},
```
 
### [Output](https://webpack.js.org/concepts/output/)
 
On the opposite end of Webpack's build are its outputs where we tell it where to bundle our App:
 
```js
output: {
    path: isProd ? root('wwwroot/dist') : root('dist'),
    publicPath: '/dist/',
    filename: isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].js',
},
```
 
Here we can see that our Webpack config supports multiple [isProd and isDev](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/webpack.config.js#L22-L23) configurations, `isDev` is used for development builds where Webpack bundles our website in the `/dist` folder whilst `isProd` is used for production builds which is instead bundled in the `/wwwroot/dist` folder with each `.js` bundle including a **[chunkhash]** cache-breaker in its filename. 
 
> The `root()` and `when()` functions used are basic [helpers used to simplify webpack configuration](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/webpack.config.js#L159-L174)
 
### [Loaders](https://webpack.js.org/concepts/loaders/)
 
Loaders are the flexible engine that sets Webpack apart where it's able to leverage its [vast ecosystem](https://webpack.github.io/docs/list-of-loaders.html) where there's a loader for every kind of web asset typically used when developing Web Apps. 
 
Loaders are configured in the `rules` section and invoked using node's `require()` statement or ES6/TypeScript's `import` statement. Rules use the `test` regex to specify which files they should apply to whilst the `loader` property tells Webpack which loader to load them with. Each loader is self-contained in a separate npm package that needs to be made available to your project by adding them to your [package.json devDependencies](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/package.json#L43). 
 
Lets checkout React's loader configuration for a typical example:
 
```js
var postcssLoader = {
    loader: 'postcss-loader',
    options: { plugins: [ require('precss'), require('autoprefixer') ] }
};
 
rules: [
    {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
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
    ...when(isDev, [
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
```
 
This configuration instructs Webpack to load any `.ts` or `.tsx` files using the [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) which is then responsible for compiling the source files with TypeScript's compiler. 
 
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
 2. Deletes the output folder
 3. Exports common dependencies into a **vendor** `bundle.js`
 4. Generate the WebApps `index.html`, based on [index.template.ejs](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/index.template.ejs) and compiled with [lodash template](https://lodash.com/docs/4.17.4#template), which also takes care of injecting any `.css` and `.js` output bundle references
  
```js
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
        }
    }),
    new Clean([isProd ? root('wwwroot/*') : root('dist')]),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: isProd ? 'vendor.[chunkhash].bundle.js' : 'vendor.bundle.js'
    }),
    new HtmlWebpackPlugin({
        template: 'index.template.ejs',
        filename: '../index.html',
        inject: true
    }),
    ...when(isProd, [
        new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true }),            
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new CopyWebpackPlugin(COPY_FILES)
    ]),
]
```
 
In production builds, `.css` files are written using [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) and the resulting `.js` files minified with UglifyJS. The [CopyWebpackPlugin](https://github.com/kevlened/copy-webpack-plugin) is then used to copy the [.NET Web Apps Server assets and binaries](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/webpack.config.js#L3-L14), completing the full production build of the WebApp in `/wwwroot` that's all ready to be deployed to any [MS WebDeploy](https://www.iis.net/downloads/microsoft/web-deploy) enabled Server using the `03-deploy-app` Gulp task.
 
### Loading Dependencies
 
Now that we've covered how Webpack is configured, the next step is showing how to make use of it, by loading your App's resources using node's `require()` or TypeScript's `import` statement. 

This can be seen in the App's [app.tsx](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/src/app.tsx) starting point where it imports **bootstrap.css** and **font-awesome.css** directly from the installed **bootstrap** and **font-awesome** npm packages as well as a local [./app.scss](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/src/app.scss) SASS file which lives side-by-side next to TypeScript source files:
 
```ts
import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import './app.scss';
 
import "es6-shim";
import * as ReactDOM from 'react-dom';
import * as React from 'react';
 
import Home from './home/Home';
import View1 from './view1/View';
import View2 from './view2/View';
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

`require()` can also be used to load resources in other files which is how images can be imported in the [index.template.ejs](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/Angular4App/Angular4App/index.template.ejs) home page template:
 
```html
<link rel="shortcut icon" href="<%=require('./src/assets/img/favicon.png')%>">
```
 
Or inside [App components](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/Angular4App/Angular4App/src/app.component.ts#L32), both of which returns the image url after it has been processed by Webpack's loaders, e.g:
 
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
 
This will generate your App in the [/dist](https://github.com/ServiceStack/Templates/tree/master/src/SinglePageApps/ReactApp/ReactApp/dist) folder similar to:
 
    /dist
        /img
            logo.png
            fontawesome-webfont.ttf
            ...
        app.bundle.js
        vendor.bundle.js
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
                fontawesome-webfont.b06871f281fee6b241d60582ae9369b9.ttf
                ...
            app.0f14847405ac6f9ebc18.bundle.js
            app.0f14847405ac6f9ebc18.bundle.js.map
            app.0f14847405ac6f9ebc18.css
            app.0f14847405ac6f9ebc18.css.map
            vendor.dca56d88046f8443277c.bundle.js
            vendor.dca56d88046f8443277c.bundle.js.map
        index.html
 
## Development workflow
 
Executing a development build of Webpack is all that's required to be able to see our changes but it can take a while to run a full dev build which negatively impacts our fast iterative dev workflow. It's instead recommended to leave webpack running in the background and have it watch for changes so it only needs to rebuild assets that have changed, which it's able to do very quickly. 
 
The `00-webpack-dev` and `00-webpack-watch` gulp tasks facilitate the 2 popular development modes for running webpack during development:
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/gulp-tasks.png)

### Gulp Tasks
 
 - **00-webpack-dev** - Run Webpack Dev Server proxy on port **3000** and watch for changes
 - **00-webpack-watch** - Run Webpack watch to automatically build, watch and process changed files
 - **01-package-server** - Used for building and staging the server components of your application
 - **02-package-client** - Used to compile and stage your client side resources ready for deployment
 - **03-deploy-app** - Deploys your application using msdeploy and **config.json** found in `wwwroot_build/publish`
 - **package-and-deploy** - Perform all tasks to build, stage and deploy your application
 - **test-coverage** - View test coverage of your existing TypeScript/JS tests
 - **tests-run** - Run all TypeScript/JS unit and integration tests
 - **tests-watch** - Rerun all TypeScript/JS tests as source code changes are made
 - **update-dtos** - Run **typescript-ref** npm script to import latest TypeScript Server DTOs
 - **webpack-build** - Run a Webpack development build to bundle and output your app to `/dist`
 - **webpack-build-prod** - Run a Webpack development build to bundle and output your app to `/wwwroot/dist`

> Tip: as both **00-webpack-dev** and **00-webpack-watch** tasks are used to build your App during development, 
[commenting out the one you don't use](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/gulpfile.js#L4-L5) 
in your gulpfile.js is a nice time saver as it will then only show your preferred option that's always at the top, e.g:

```js
var SCRIPTS = {
//    '00-webpack-dev': 'npm run dev',
    '00-webpack-watch': 'npm run watch',
    'webpack-build': 'npm run build',
    'webpack-build-prod': 'npm run build-prod',
    'tests-run': 'npm run test',
    'tests-watch': 'npm run test-watch',
    'tests-coverage': 'npm run test-coverage',
    'update-dtos': 'npm run typescript-ref'
};
```

### Webpack watch
 
Our recommendation is to run the `00-webpack-watch` Gulp task and leave it running in the background, or if preferred, run the **watch** npm script on the command-line with:
 
    $ npm run watch
 
Webpack **watch** works as you'd expect where it initially generates a full development build of your Web App then stays running in the background to process files as they're changed. This enables the normal dev workflow of running your ASP.NET Web App from VS.NET, saving changes locally then hitting **F5** to refresh the page and view them.
 
Each change updates the output dev resources so even if you stop the **watch** task your Web App remains in a working state that's viewable when running the ASP.NET Web App.
 
### Live reload with Webpack Dev Server
 
The alternative dev workflow is to run the `00-webpack-dev` Gulp task to run the [Webpack dev server](https://webpack.js.org/configuration/dev-server/#devserver), or you can run it from the command-line with:
 
    $ npm run dev
 
This launches the Webpack dev server listening at `http://localhost:3000/` and configured to proxy all non-Webpack HTTP requests to the ASP.NET Web App where it handles all Server API requests. The benefit of viewing your App through the Webpack dev server is its built-in Live Reload feature where it will automatically reload the page as resources are updated. We've found the Webpack dev server ideal when developing UI's where your Web App is running side-by-side VS.NET, where every change saved triggers the dev server to reload the current page so changes are visible immediately. 
 
The disadvantage of the dev server is that all transformations are kept in memory so when the dev server is stopped, the Web Apps resources are lost, so it requires a `webpack-build` in order to generate a current build. There's also a slight lag in API requests resulting from each server request being handled by both Webpack's Dev Server and ASP.NET's IIS Express.
 
## Single Page App Features
 
Our goals with the Single Page Templates is to provide a highly productive base that's ideal for developing small to medium-sized JavaScript Web Apps including just the core essentials that pack the most productive punch whilst adding minimal complexity and required configuration, whilst still remaining open-ended to easily plug-in other tools into your Webpack configuration you believe will improve your development workflow. 
 
With these goals in mind we've hand-picked and integrated a number of simple best-of-breed technologies so you'll be immediately productive:
 
### Integrated UI framework and Vector Icons
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/bootstrap-fontawesome-material.png)
 
React, Vue and Aurelia are pre-configured with [Bootstrap v4](https://v4-alpha.getbootstrap.com/) and [font-awesome vector font icons](http://fontawesome.io/icons/) whilst Angular 4 is preconfigured to use [Material Design Lite](https://getmdl.io/) and [Material Design Icons](https://material.io/icons/) which are the more natural choice for Angular Apps where they're all developed and maintained by Google.

### TypeScript and Sass
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/sass-ts.png)
 
All templates are configured with TypeScript which we believe provides the greatest value in enabling a highly-productive and maintainable code-base. TypeScript lets you utilize the latest ES6/7 features including terse ES6 modules and async/await support whilst being able to target down-level browsers. Other benefits include better documented typed APIs, instant compiler feedback, rich intellisense and refactoring support in a graceful superset of JavaScript that scales well to be able develop prototypes quickly then easily go back to harden existing code-bases with optional Type information, catching common errors at compile-time whilst annotating modules with valuable documentation other developers can benefit from.
 
Whilst CSS is a powerful language for styling Web Apps it lacks many of the DRY and reuse features we take for granted in a general purpose programming language. [SASS](http://sass-lang.com/) is designed to close that gap with a number of useful extensions to CSS aimed at enabling a highly-maintainable, modular and configurable css code-base. If you prefer to avoid learning SASS you can continue using vanilla css which has been enhanced with [autoprefixer](https://github.com/postcss/autoprefixer) and [precss](https://github.com/jonathantneal/precss) support.
 
### End-to-end Typed APIs
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/servicestack-ts.png)
 
ServiceStack is seamlessly [integrated with TypeScript](/typescript-add-servicestack-reference) where all templates are pre-configured to use the Server's TypeScript DTOs and [@servicestack/client](https://github.com/ServiceStack/servicestack-client) generic `JsonServiceClient` to make the [Typed API request below](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/src/home/Hello.tsx) which displays a Welcome message on each key-press:
 
```ts
import { client } from '../shared';
import { Hello } from '../dtos';
 
async nameChanged(name:string) {
    if (name) {
        let request = new Hello();
        request.name = name;
        let r = await client.get(request);
        this.setState({ result: r.result });
    } else {
        this.setState({ result: '' });
    }
}
```
 
The imported `client` is an instance of `JsonServiceClient` declared in [shared.ts](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/src/shared.tsx) module, configured with the BaseUrl at `/`:
 
```ts
export var client = new JsonServiceClient(global.BaseUrl || '/');
```
 
The `global.BaseUrl` is defined in [package.json](https://github.com/ServiceStack/Templates/blob/9e5bd421decffda43fcc46f4cf112b3999888e53/src/SinglePageApps/ReactApp/ReactApp/package.json#L17) and injected by [Jest](https://facebook.github.io/jest/) in order to be able to run end-to-end Integration tests.
 
#### Updating Server TypeScript DTOs
 
To get the latest Server DTOs, build the ASP.NET Web App then either right-click on `dtos.ts` and select **Update ServiceStack Reference** from the Context Menu:
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/typescript-update-reference.png)
 
Or alternatively you can run the `update-dtos` Gulp task in Task Runner Explorer GUI, or if preferred, run the script on the command-line with:
 
    $ npm run typescript-ref
 
### Routing Enabled, Multi-page Layout
  
All templates have multiple views with Routing enabled so they're all setup to develop multi-page navigable Single Page Apps out-of-the-gate. All templates are designed to be functionally equivalent utilizing a 3 page tabbed layout but implemented using their own idiomatic style so you'll be able to easily inspect and compare the structure and ergonomics of each JavaScript framework to evaluate the one you like best.
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/routing-overview.png)
 
### Deep linkable Pretty URLs
 
All Single Page Apps are configured to use Pretty URLs (i.e. without `#!`) and are deep-linkable so they behave similarly to server-generated websites in that they support the back button and full-page reloads to refresh the current page. This works behind the scenes using a `[FallbackRoute]` to have all unknown routes return the home page so the route can be handled on the client to load the appropriate view.
 
### JavaScript Unit Testing
 
Aurelia, React and React Desktop Apps are configured to use [Facebook's Jest Testing Framework](https://facebook.github.io/jest/) with the React Templates configured to use [AirBnb's enzyme virtual React DOM](https://github.com/airbnb/enzyme) to enable fast, browser-less tests and includes a few different examples of client/server integration tests.
 
Angular4 and Vue are configured to use the [Karma test runner](https://karma-runner.github.io/1.0/index.html) with the headless phantomjs WebKit browser so the behavior of Components are tested in a real browser.
 
Tests can be run with the `tests-run` gulp task, or on the command-line using any of npm's testing conventions:
 
    $ npm test
    $ npm t
 
#### Live Testing
 
Each template also includes support for Live Testing which can be run in the background by clicking the `tests-watch` Gulp task or on the command-line with:
 
    $ npm run test-watch
 
Live testing automatically re-runs JavaScript tests after each change to provide instant feedback to detect when changes causes existing tests to fail.
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/gulp-tests-watch.png)
 
#### Test Coverage
 
Angular4, Aurelia and React are also pre-configured to be able to show test coverage, viewable by running the `tests-coverage` Gulp task or on the command-line with:
 
    $ npm run test-coverage
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/gulp-tests-coverage.png)
 
#### Single Click Deployments
 
All templates continue to include our one-click deploy functionality by running the `package-and-deploy` Gulp task which will perform a full ASP.NET server release build and Webpack client production build then runs MS WebDeploy to package and deploy the bundled App to the remote server configured in `wwwroot_build/publish/config.json`. If you already have a production build you wish to deploy you can run `03-deploy-app` Gulp task instead to just perform the MS WebDeploy step.
 
> publish/config.json

```json
{
    "iisApp": "SiteName",
    "serverAddress": "remote.server.org",
    "userName": "{WebDeployUserName}",
    "password" : "{WebDeployPassword}"
}
```

#### Multi-Project Solution Layout

All templates follow our [Recommended Physical Project Structure](/physical-project-structure) ensuring ServiceStack projects starts off from an optimal logical project layout, laying the foundation for growing into a more maintainable, cohesive and reusable code-base.

### Track progress whilst templates are being created

The Single Page App templates sources their client dependencies from npm which can take up to few minutes to finish downloading and installing. You'll be able to see its progress by looking at the **Bower/npm** Output Window in VS.NET:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/npm-progress.png)

You'll be able to detect when it's finished by waiting for the original contents of **index.html**:

```html
<!-- auto-generated by webpack -->
```

to be replaced with a [Webpack generated html template](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp/ReactApp/index.html).

### Keep Desktop node and VS.NET in sync
 
Unfortunately VS.NET 2017 ships with an outdated version of **node.exe** which can be problematic when trying to run scripts from the command-line with a locally installed version of node as native module packages like **node-sass** are coupled to the specific node version and platform they were installed with. This can easily be resolved by configuring VS.NET to use your Desktop version of node instead by adding its the **C:\Program Files\nodejs** folder as the first path in: 
 
> Tools > Options > Projects and Solutions > External Web Tools
 
![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/node-external-tools.png)
 