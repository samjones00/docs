### Built-in @servicestack/client

HTML and VanillaJS Web Apps can use the [built-in UMD @servicestack/client](/servicestack-client-umd) in **ServiceStack.dll** 
to call ServiceStack Services without any external dependencies, e.g:

```html
<script src="/js/require.js"></script>
<script src="/js/servicestack-client.js"></script>
<script src="/types/js"></script>
<script>
var { JsonServiceClient, Hello } = exports

var client = new JsonServiceClient();
function callHello(name) {
    client.get(new Hello({ name }))
        .then(function(r) {
            document.getElementById('result').innerHTML = r.result;
        });
}
</script>
```

Which utilizes the [JavaScript Add ServiceStack Reference](/javascript-add-servicestack-reference) **/types/js** to instantly generate JavaScript Types for all your APIs DTOs which can immediately be used with the [TypeScript JsonServiceClient](/typescript-add-servicestack-reference#typescript-serviceclient) to make Typed API requests.

### CDN unpkg

A CDN hosted version of UMD `@servicestack/client` is available on unpkg.com at:

```html
<script src="https://unpkg.com/@servicestack/client/dist/servicestack-client.min.js"></script>
```

### Reference in npm projects

If you started with any of the [SPA Project Templates](/dotnet-new) [@servicestack/client](https://www.npmjs.com/package/@servicestack/client) is already included, other TypeScript or ES6 projects can install `@servicestack/client` from npm with:

```bash
$ npm install @servicestack/client
```
