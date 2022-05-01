---
slug: javascript-client
title: JavaScript Client
---

<script setup>
import RefServiceClient from './.vitepress/includes/ref-servicestack-client.md';
</script>

Whilst you can use any of the multitude of Ajax libraries to consume ServiceStack's pure JSON REST APIs, leveraging
the [integrated TypeScript](/typescript-add-servicestack-reference) support still offers the best development UX 
for calling ServiceStack's JSON APIs in JavaScript where you can use the TypeScript `JsonServiceClient` with 
[TypeScript Add ServiceStack Reference](/typescript-add-servicestack-reference#typescript-serviceclient)
DTO's to get the same productive end-to-end Typed APIs available in ServiceStack's Typed .NET Clients, e.g:

```ts
let client = new JsonServiceClient(baseUrl)

client.get(new Hello({ Name: 'World' }))
  .then(r => console.log(r.Result))
```

## Instant Typed JavaScript DTOs 🚀

Ultimately the key to maximizing productivity is avoiding things that interrupt your dev workflow. Since we use `JsonServiceClient` for all API requests one area that still interrupts us is regenerating TypeScript `dtos.ts` after adding new APIs, as it was the only way to generate typed DTOs for use in the generic `JsonServiceClient` in both Vanilla JS and TypeScript Apps.

For Vanilla JS Apps typically this means running the [x dotnet tool](/typescript-add-servicestack-reference#simple-command-line-utilities-for-typescript) to update `dtos.ts`, then using TypeScript to compile it to JavaScript:

```bash
$ x ts && tsc dtos.ts 
```

While not a great hindrance, it can frequently interrupt our workflow when developing new APIs. 

Although thanks to the **native JavaScript Language** support this can be avoided by referencing Typed JavaScript DTOs directly from **/types/js**

Since importing JavaScript doesn't require any tooling or build steps, it greatly simplifies calling ServiceStack APIs from **Vanilla JS** Apps which all our [.NET 6 Empty Project Templates](https://servicestack.net/start) take advantage of for its now optimal friction-less dev model.

Using **/types/js** has the same behavior as using `dtos.js` generated from `$ tsc dtos.ts` whose outputs are identical, i.e. both containing your API DTOs generated in CommonJS format. It's feasible to simulate the TypeScript compiler's output in this instance as ServiceStack only needs to generate DTO Types and Enums to enable its end-to-end API, and not any other of TypeScript's vast featureset.

## Using JavaScript Typed DTOs in Web Apps

To get started quickly you can use the `init` [mix gist](/mix-tool) to create an empty .NET project:

:::sh
mkdir ProjectName && cd ProjectName
:::

:::sh
x mix init
:::

That uses the built-in `@servicestack/client` library's `JsonServiceClient` in a dependency-free Web Page:

To make typed API Requests from web pages, you need only include `/js/require.js` containing a simple `require()` to load **CommonJS** libraries, `/js/servicestack-client.js` (production build of [@servicestack/client](https://github.com/ServiceStack/servicestack-client)) and `/types/js` containing your APIs typed JS DTOs - all built-in ServiceStack. 

After which you'll have access to full feature-set of the generic `JsonServiceClient` with your APIs Typed Request DTOs, e.g:

```html
<script src="/js/require.js"></script>
<script src="/js/servicestack-client.js"></script>
<script src="/types/js"></script>
```

Which utilizes the [JavaScript Add ServiceStack Reference](/javascript-add-servicestack-reference) **/types/js** to instantly generate JavaScript Types for all your APIs DTOs which can immediately be used with the [TypeScript JsonServiceClient](/typescript-add-servicestack-reference#typescript-serviceclient) to make Typed API requests:

```html
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

## JsonServiceClient

### API method

The `api` returns a typed `ApiResult<Response>` Value Result that encapsulates either a Typed Response or a 
structured API Error populated in `ResponseStatus` allowing you to handle API responses programmatically without
`try/catch` handling:

```ts
const api = client.api(new Hello({ name }))
if (api.failed) {
    console.log(`Greeting failed! ${e.errorCode}: ${e.errorMessage}`);
    return;
}

console.log(`API Says: ${api.response.result}`) //api.succeeded
```

### Simplified API Handling

Being able to treat errors as values greatly increases the ability to programmatically handle and genericise api handling
and greatly simplifies functionality needing to handle both successful and error responses like binding to UI components.

An example of this is below where we're able to concurrently fire off multiple unrelated async requests in parallel, 
wait for them all to complete, print out the ones that have succeeded or failed then access their strong typed responses: 

```ts
import { JsonServiceClient } from "@servicestack/client"

let requests:ApiRequest[] = [
    new AppOverview(),            // GET => AppOverviewResponse
    new DeleteTechnology(),       // DELETE => IReturnVoid (requires auth) 
    new GetAllTechnologies(),     // GET => GetAllTechnologiesResponse
    new GetAllTechnologyStacks(), // GET => GetAllTechnologyStacksResponse
]

let results = await Promise.all(requests.map(async (request) =>
    ({ request, api:await client.api(request) as ApiResponse}) ))

let failed = results.filter(x => x.api.failed)
console.log(`${failed.length} failed:`)
failed.forEach(x =>
    console.log(`    ${x.request.getTypeName()} Request Failed: ${failed.map(x => x.api.errorMessage)}`))

let succeeded = results.filter(x => x.api.succeeded)
console.log(`\n${succeeded.length} succeeded: ${succeeded.map(x => x.request.getTypeName()).join(', ')}`)

let r = succeeded.find(x => x.request.getTypeName() == 'AppOverview')?.api.response as AppOverviewResponse
if (r) console.log(`Top 5 Technologies: ${r.topTechnologies.slice(0,4).map(tech => tech.name).join(', ')}`)
```

Output:

```
1 failed
DeleteTechnology Request Failed: Unauthorized

3 succeeded: AppOverview, GetAllTechnologies, GetAllTechnologyStacks
Top 5 Technologies: Redis, MySQL, Amazon EC2, Nginx
```

Being able to treat Errors as values has dramatically reduced the effort required to accomplish the same feat if needing 
to handle errors with `try/catch`.

### Ideal Typed Message-based API

The TypeScript `JsonServiceClient` enables the same productive, typed API development experience available 
in ServiceStack's other [1st-class supported client platforms](http://docs.servicestack.net/typescript-add-servicestack-reference). 

The `JsonServiceClient` leverages the additional type hints ServiceStack embeds in each TypeScript Request DTO 
to achieve the ideal typed, message-based API - so all API requests benefit from a succinct, boilerplate-free 
Typed API. 

Here's a quick look at what it looks like. The example below shows how to create a 
[C# Gist in Gistlyn](https://github.com/ServiceStack/Gistlyn) 
after adding a [TypeScript ServiceStack Reference](http://docs.servicestack.net/typescript-add-servicestack-reference)
to `gistlyn.com` and installing the [@servicestack/client](https://www.npmjs.com/package/@servicestack/client) 
npm package: 

```ts
import { JsonServiceClient } from '@servicestack/client';
import { StoreGist, GithubFile } from './dtos';

const client = new JsonServiceClient("https://gistlyn.com");

const request = new StoreGist({
    files: { 
        [file.filename]: new GithubFile({
            filename: 'main.cs',
            content: 'var greeting = "Hi, from TypeScript!";' 
        }) 
    }
})

const api = client.api(request); //response:StoreGistResponse
if (api.succeeded) {
    console.log(`New C# Gist was created with id: ${r.gist}`);
    location.href = `https://gist.cafe/${r.gist}`;
} else {
    console.log("Failed to create Gist: ", e.errorMessage);
}
```

Where the `response` param is typed to `StoreGistResponse` DTO Type.

### Sending additional arguments with Typed API Requests

Many AutoQuery Services utilize 
[implicit conventions](http://docs.servicestack.net/autoquery-rdbms#implicit-conventions) 
to query fields that aren't explicitly defined on AutoQuery Request DTOs, these can now be queried by specifying additional arguments with the typed Request DTO, e.g:

```ts
//typed to QueryResponse<TechnologyStack> 
const response = await client.get(new FindTechStacks(), { VendorName: "ServiceStack" });
```

Which will [return TechStacks](http://techstacks.io/ss_admin/autoquery/FindTechStacks) developed by ServiceStack.

### Calling APIs with Custom URLs

You can call Services using relative or absolute urls, e.g:

```ts
client.get<GetTechnologyResponse>("/technology/ServiceStack")

client.get<GetTechnologyResponse>("http://techstacks.io/technology/ServiceStack")

// GET http://techstacks.io/technology?Slug=ServiceStack
client.get<GetTechnologyResponse>("/technology", { Slug: "ServiceStack" }) 
```

as well as POST Request DTOs to custom urls:

```ts
client.postToUrl("/custom-path", request, { Slug: "ServiceStack" });

client.putToUrl("http://example.org/custom-path", request);
```

### Raw Data Responses

The `JsonServiceClient` also supports Raw Data responses like `string` and `byte[]` which also get a Typed API 
once declared on Request DTOs using the `IReturn<T>` marker:

```csharp
public class ReturnString : IReturn<string> {}
public class ReturnBytes : IReturn<byte[]> {}
```

Which can then be accessed as normal, with their Response typed to a JavaScript `string` or `Uint8Array` for 
raw `byte[]` responses:

```ts
let str:string = await client.get(new ReturnString());

let data:Uint8Array = await client.get(new ReturnBytes());
```

### Authenticating using Basic Auth

Basic Auth support is implemented in `JsonServiceClient` and follows the same API made available in the C# 
Service Clients where the `userName/password` properties can be set individually, e.g:

```ts
var client = new JsonServiceClient(baseUrl);
client.userName = user;
client.password = pass;

const response = await client.get(new SecureRequest());
```

Or use `client.setCredentials()` to have them set both together.

### Authenticating using Credentials

Alternatively you can authenticate using userName/password credentials by 
[adding a TypeScript Reference](http://docs.servicestack.net/typescript-add-servicestack-reference#add-typescript-reference) 
to your remote ServiceStack Instance and sending a populated `Authenticate` Request DTO, e.g:

```ts
const response = await client.post(new Authenticate({
    provider: "credentials", userName, password, rememberMe: true }));
```

This will populate the `JsonServiceClient` with 
[Session Cookies](http://docs.servicestack.net/sessions#cookie-session-ids) 
which will transparently be sent on subsequent requests to make authenticated requests.

### Authenticating using JWT

Use the `bearerToken` property to Authenticate with a [ServiceStack JWT Provider](http://docs.servicestack.net/jwt-authprovider) using a JWT Token:

```ts
client.bearerToken = jwtToken;
```

Alternatively you can use a [Refresh Token](http://docs.servicestack.net/jwt-authprovider#refresh-tokens) instead:

```ts
client.refreshToken = refreshToken;
```

### Authenticating using an API Key

Use the `bearerToken` property to Authenticate with an [API Key](http://docs.servicestack.net/api-key-authprovider):

```ts
client.bearerToken = apiKey;
```

### Transparently handle 401 Unauthorized Responses

If the server returns a 401 Unauthorized Response either because the client was Unauthenticated or the 
configured Bearer Token or API Key used had expired or was invalidated, you can use `onAuthenticationRequired`
callback to re-configure the client before automatically retrying the original request, e.g:

```ts
client.onAuthenticationRequired = async () => {
    const authClient = new JsonServiceClient(authBaseUrl);
    authClient.userName = userName;
    authClient.password = password;
    const response = await authClient.get(new Authenticate());
    client.bearerToken = response.bearerToken;
};

//Automatically retries requests returning 401 Responses with new bearerToken
var response = await client.get(new Secured());
```

### Automatically refresh Access Tokens

With the [Refresh Token support in JWT](http://docs.servicestack.net/jwt-authprovider#refresh-tokens) 
you can use the `refreshToken` property to instruct the Service Client to automatically fetch new 
JWT Tokens behind the scenes before automatically retrying failed requests due to invalid or expired JWTs, e.g:

```ts
//Authenticate to get new Refresh Token
const authClient = new JsonServiceClient(authBaseUrl);
authClient.userName = userName;
authClient.password = password;
const authResponse = await authClient.get(new Authenticate());

//Configure client with RefreshToken
client.refreshToken = authResponse.RefreshToken;

//Call authenticated Services and clients will automatically retrieve new JWT Tokens as needed
const response = await client.get(new Secured());
```

Use the `refreshTokenUri` property when refresh tokens need to be sent to a different ServiceStack Server, e.g:

```ts
client.refreshToken = refreshToken;
client.refreshTokenUri = authBaseUrl + "/access-token";
```

### [ServerEvents Client](http://docs.servicestack.net/typescript-server-events-client)

The [TypeScript ServerEventClient](http://docs.servicestack.net/typescript-server-events-client) 
is an idiomatic port of ServiceStack's 
[C# Server Events Client](http://docs.servicestack.net/csharp-server-events-client) 
in native TypeScript providing a productive client to consume ServiceStack's 
[real-time Server Events](http://docs.servicestack.net/server-events) that can be used in TypeScript 
[Web, Node.js Server and React Native iOS and Android Mobile Apps](https://github.com/ServiceStackApps/typescript-server-events).

```ts
const channels = ["home"];
const client = new ServerEventsClient("/", channels, {
    handlers: {
        onConnect: (sub:ServerEventConnect) => {  // Successful SSE connection
            console.log("You've connected! welcome " + sub.displayName);
        },
        onJoin: (msg:ServerEventJoin) => {        // User has joined subscribed channel
            console.log("Welcome, " + msg.displayName);
        },
        onLeave: (msg:ServerEventLeave) => {      // User has left subscribed channel
            console.log(msg.displayName + " has left the building");
        },
        onUpdate: (msg:ServerEventUpdate) => {    // User channel subscription was changed
            console.log(msg.displayName + " channels subscription were updated");
        },        
        onMessage: (msg:ServerEventMessage) => {},// Invoked for each other message
        //... Register custom handlers
        announce: (text:string) => {},            // Handle messages with simple argument
        chat: (chatMsg:ChatMessage) => {},        // Handle messages with complex type argument
        CustomMessage: (msg:CustomMessage) => {}, // Handle complex types with default selector
    },
    receivers: { 
        //... Register any receivers
        tv: {
            watch: function (id) {                // Handle 'tv.watch {url}' messages 
                var el = document.querySelector("#tv");
                if (id.indexOf('youtu.be') >= 0) {
                    var v = splitOnLast(id, '/')[1];
                    el.innerHTML = templates.youtube.replace("{id}", v);
                } else {
                    el.innerHTML = templates.generic.replace("{id}", id);
                }
                el.style.display = 'block'; 
            },
            off: function () {                    // Handle 'tv.off' messages
                var el = document.querySelector("#tv");
                el.style.display = 'none';
                el.innerHTML = '';
            }
        }
    },
    onException: (e:Error) => {},                 // Invoked on each Error
    onReconnect: (e:Error) => {}                  // Invoked after each auto-reconnect
})
.addListener("theEvent",(e:ServerEventMessage) => {}) // Add listener for pub/sub event trigger
.start();                                             // Start listening for Server Events!
```

When publishing a DTO Type for your Server Events message, your clients will be able to benefit from the generated DTOs in [TypeScript ServiceStack References](http://docs.servicestack.net/typescript-add-servicestack-reference).

## Rich intelli-sense support

Even pure HTML/JS Apps that don't use TypeScript or any external dependencies will still benefit from the Server 
generated `dtos.ts` and `servicestack-client.d.ts` definitions as Smart IDEs like 
[Rider](https://www.jetbrains.com/rider/) can make use of them to provide a rich productive development UX
on both the built-in `/js/servicestack-client.js` library:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/init-rider-ts-client.png)

As well as your App's server generated DTOs:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/init-rider-ts-dto.png)

Including their typed partial constructors:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/mix/init-rider-ts-dto-props.png)

So even simple Apps without complex bundling solutions or external dependencies can still benefit from a rich typed authoring 
experience without any additional build time or tooling complexity.

### CDN Resources

An CDN alternative to using the `@servicestack/client` built into `ServiceStack.dll` is to reference it from unpkg.com:

 - [https://unpkg.com/@servicestack/client](https://unpkg.com/@servicestack/client)
 - [servicestack-client.min.js](https://unpkg.com/@servicestack/client/dist/servicestack-client.min.js) (minified)

If needed for IDE intelli-sense, the TypeScript definition for the `@servicestack/client` is available from:

 - [https://unpkg.com/@servicestack/client/dist/index.d.ts](https://unpkg.com/@servicestack/client/dist/index.d.ts)

The npm-free [Vue and React lite Templates](/templates-lite) are some examples that makes use of the stand-alone `@servicestack/client` libraries.

### Using TypeScript JsonServiceClient in npm projects

The [/@servicestack/client](https://www.npmjs.com/package/@servicestack/client) follows the recommended guidance for TypeScript modules which doesn't 
bundle any TypeScript `.ts` source files, just the generated [index.js](https://unpkg.com/@servicestack/client) and 
[index.d.ts](https://unpkg.com/@servicestack/client@1.0.31/dist/index.d.ts) Type definitions which can be imported the same way in both JavaScript and TypeScript npm projects as any other module, e.g:

```js
import { JsonServiceClient } from "@servicestack/client"
```

Which can then be used with the generated DTOs from your API at [/types/typescript](https://techstacks.io/types/typescript) that can either be downloaded and saved to a local file e.g. `dtos.ts` or preferably downloaded using the [x dotnet tool](/dotnet-tool)
to download the DTOs of a remote ServiceStack API with:

:::sh
dotnet tool install --global x 
:::

Then generate DTOs with:

:::sh
`x typescript http://yourdomain.org`
:::

For JavaScript projects that haven't configured transpilation of TypeScript, you'll need to use TypeScript to generate the `dtos.js` JavaScript version
which can be used instead:

:::sh
tsc dtos.ts 
:::

Use the [--module compiler flag](https://www.typescriptlang.org/docs/handbook/compiler-options.html) if needing to generate a specific module version, e.g:

:::sh
tsc -m ES6 dtos.ts
:::

The generated `dtos.js` can then be used with the `JsonServiceClient` to provide a succinct Typed API:

```js
import { GetConfig } from './dtos';

let client = new JsonServiceClient('/');

let response = await client.get(new GetConfig());
```

#### Updating DTOs

To update your generated DTOs when your server API changes, run `x typescript` or its shorter `x ts` alias without any arguments:

:::sh
x ts
:::

Which will update to the latest version of `dtos.ts`. This can be easily automated with an [npm script][5], e.g:

```json
{
  "scripts": {
    "dtos": "cd path/to/dtos && x ts && tsc -m ES6 dtos.ts",
    }
}
```

Which will let you update and compile the dtos with:

:::sh
npm run dtos
:::

The [TechStacks][6] (Vue/Nuxt) and [React Native Mobile App][7] (React) are examples of JavaScript-only projects using the TypeScript `JsonServiceClient` in this way.

## Install

<RefServiceClient/>