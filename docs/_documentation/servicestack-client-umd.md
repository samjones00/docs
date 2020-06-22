---
slug: servicestack-client-umd
title: Embedded UMD @servicestack/client
---

A UMD version of the [https://github.com/ServiceStack/servicestack-client](@servicestack/client) JavaScript client library 
that contains the [TypeScript Service and SSE Clients](/typescript-add-servicestack-reference) is now embedded in **ServiceStack.dll**.
It's the modern, dependency-free replacement to [ss-utils.js](/ss-utils-js) which requires jQuery which is used instead in all
SPA Project Templates.

The embedded UMD version allows for the creation of stand-alone pages that accesses your ServiceStack JSON APIs 
without any external file references with the single `<script/>` reference:

```html
<script src="/js/servicestack-client.js"></script>
```

This is used by the updated [mix init](/mix-tool#mix-usage) gists when generating its empty Web Apps:

    $ md web && cd web
    $ x mix init
    $ dotnet run

Where its dep-free [/index.html](https://gist.github.com/gistlyn/58030e271595520d87873c5df5e4c2eb#file-wwwroot-index-html) use its
`JsonServiceClient` to call its **/hello** API:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/v5.9/init.png)

To call APIs you'll need to include the JS transpiled DTOs of your Services [TypeScript DTOs](/typescript-add-servicestack-reference):

```html
<script src="/js/servicestack-client.js"></script>
<script>
    Object.assign(window, window['@servicestack/client']); //import into global namespace

    // generate typed dtos with /typescript-add-servicestack-reference
    var Hello = /** @class */ (function () {
        function Hello(init) { Object.assign(this, init); }
        Hello.prototype.createResponse = function () { return new HelloResponse(); };
        Hello.prototype.getTypeName = function () { return 'Hello'; };
        return Hello;
    }());
    var HelloResponse = /** @class */ (function () {
        function HelloResponse(init) { Object.assign(this, init); }
        return HelloResponse;
    }());

    var client = new JsonServiceClient();
    client.get(new Hello({ name: val }))
        .then(function(r) {
            document.getElementById('result').innerHTML = r.result;
        });
</script>
```

Although modern browsers (as well as any TypeScript or Webpack project) let you use the much nicer async/await syntax:

```js
let r = await client.get(new Hello({ name: val }))
```

### CDN unpkg

A CDN hosted version of UMD @servicestack/client is available on unpkg.com:

```html
<script src="https://unpkg.com/@servicestack/client/dist/servicestack-client.min.js"></script>
```
