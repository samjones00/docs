---
slug: javascript-client
title: JavaScript Client
---

Of course, you're able to call your ServiceStack webservice from your 
ajax and JavaScript clients, too. 

### [Using TypeScript](/typescript-add-servicestack-reference#typescript-serviceclient)

The best tooling available for Ajax clients is to use ServiceStack's 
[integrated TypeScript support](/typescript-add-servicestack-reference) where
you can use the TypeScript `JsonServiceClient` with 
TypeScript Add ServiceStack Reference DTO's to get the same productive end-to-end
Typed APIs available in ServiceStack's Typed .NET Clients, e.g:

```ts
var client = new JsonServiceClient(baseUrl);

var request = new Hello();
request.Name = "World";

client.get(request)
  .then(r => console.log(r.Result));
```

The generated JavaScript of the TypeScript Service Client has no dependencies other than [fetch-everywhere](https://github.com/lucasfeliciano/fetch-everywhere) 
polyfill for W3C's [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) available:

 - [index.js](https://github.com/ServiceStack/servicestack-client/blob/master/src/index.js) - The @servicestack/client JavaScript library
 - [index.d.ts](https://github.com/ServiceStack/servicestack-client/blob/master/src/index.d.ts) - Type declarations (for IDEs tooling and TypeScript)

Hosted on unpkg.com CDN:

 - [index.js](https://unpkg.com/@servicestack/client/src/index.js) (`https://unpkg.com/@servicestack/client/src/index.js`)
 - [index.d.ts](https://unpkg.com/@servicestack/client/src/index.d.ts) (`https://unpkg.com/@servicestack/client/src/index.d.ts`)

The npm-free [Vue and React lite Templates](/templates-lite) are some examples that makes use of the stand-alone `@servicestack/client` libraries.

### Using TypeScript JsonServiceClient in JavaScript projects

Despite its name the TypeScript JsonServiceClient can also be used in non-TypeScript projects. 
The [/@servicestack/client](https://www.npmjs.com/package/@servicestack/client) follows the recommended guidance for TypeScript modules which doesn't 
bundle any TypeScript `.ts` source files, just the generated [index.js](https://unpkg.com/@servicestack/client/src/index.js) and 
[index.d.ts](https://unpkg.com/@servicestack/client/src/index.d.ts) Type definitions which can be imported the same way in both JavaScript and TypeScript
npm projects as any other module, e.g:


```js
import { JsonServiceClient } from "@servicestack/client";
```

Which can then be used with the generated DTOs from your API at [/types/typescript](https://techstacks.io/types/typescript) that can either be downloaded
and saved to a local file e.g. `dtos.ts` or preferably downloaded using the [@servicestack/cli][4] npm tool:

    $ npm install -g @servicestack/cli

Then download the DTOs of a remote ServiceStack API with:

    $ typescript-ref http://yourdomain.org dtos.ts

For JavaScript projects that haven't configured transpilation of TypeScript, you'll need to use TypeScript to generate the `dtos.js` JavaScript version
which can be used instead:

    $ tsc dtos.ts 

Use the [--module compiler flag](https://www.typescriptlang.org/docs/handbook/compiler-options.html) if needing to generate a specific module version, e.g:

    $ tsc -m ES6 dtos.ts

The generated `dtos.js` can then be used with the `JsonServiceClient` to provide a succinct Typed API:

```js
import { GetConfig } from './dtos';

let client = new JsonServiceClient('/');

let response = await client.get(new GetConfig());
```

#### Updating DTOs

To update your generated DTOs when your server API changes, run `typescript-ref` without any arguments:

    $ typescript-ref 

Which will update to the latest version of `dtos.ts`. This can be easily automated with an [npm script][5], e.g:

```json
{
  "scripts": {
    "dtos": "cd path/to/dtos && typescript-ref && tsc -m ES6 dtos.ts",
    }
}
```

Which will let you update and compile the dtos with:

    $ npm run dtos

The [TechStacks][6] (Vue/Nuxt) and [React Native Mobile App][7] (React) are examples of JavaScript-only projects using the TypeScript `JsonServiceClient` in this way.


### jQuery JsonServiceClient

We also provide our older jQuery JsonServiceClient which mimics the [.NET Clients](/clients-overview) in functionality that we make use of in our [Redis Admin UI](http://www.servicestack.net/RedisAdminUI/AjaxClient/) and suitable for use when needing to support older browsers without W3C's fetch or a polyfill:

  - [JsonServiceClient.js](https://github.com/ServiceStack/ServiceStack/blob/v5.4/lib/js/JsonServiceClient.js) - Pure JavaScript client
  - [JsonServiceClient.closure.js](https://github.com/ServiceStack/ServiceStack/blob/v5.4/lib/js/JsonServiceClient.closure.js) - a [Google Closure](https://developers.google.com/closure/) enabled version of the client allowing compilation and bundling within a Closure project

Although most dynamic languages like JavaScript already include support for HTTP and JSON where in most cases it's easier to just use the libraries already provided. Here are a couple of examples from [Backbones Todos](http://todos.netcore.io) and [Redis StackOverflow](http://redisstackoverflow.netcore.io) that uses jQuery to talk to back-end ServiceStack JSON services:

### Using jQuery Ajax APIs:

```javascript
$.getJSON("http://localhost/Backbone.Todo/todos", function(todos) {
    alert(todos.length == 1);
});

$.post("questions", { 
  UserId: authUser.Id, Title: title, Content: body, Tags: dtoTags 
}, refresh);
```

## JSV Service Client

In our pursuit to provide the fastest end-to-end communication we've also developed a JsvServiceClient in JavaScript that uses the [fast JSV Format](https://github.com/ServiceStackV3/mythz_blog/blob/master/pages/176.md):  

  - [JsvServiceClient.js](https://github.com/ServiceStack/ServiceStack/tree/master/lib/js/JSV.js)

JSV is marginally faster than **safe JSON** in modern browsers (marginally slower than Eval) but because of the poor JS and String Performance in IE7/8 it performs over **20x** slower than IE's native `eval()`.