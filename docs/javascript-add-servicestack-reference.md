---
slug: javascript-add-servicestack-reference
title: Typed JavaScript DTOs
---

In addition to [TypeScript](./typescript-add-servicestack-reference.md) support for generating typed Data Transfer Objects (DTOs), JavaScript is now supported.

Unlike TypeScript, JavaScript generated DTOs can be used directly from the browser, removing the need to keep your DTOs in sync with extra tooling.

To make typed API Requests from web pages, you need only include `/js/require.js` containing a simple `require()` to load **CommonJS** libraries, `/js/servicestack-client.js` (production build of [@servicestack/client](https://github.com/ServiceStack/servicestack-client)) and `/types/js` containing your APIs typed JS DTOs - all built-in ServiceStack.

After which you'll have access to the generic `JsonServiceClient` with your APIs Typed Request DTOs, e.g:

```html
<script src="/js/require.js"></script>
<script src="/js/servicestack-client.js"></script>
<script src="/types/js"></script>

<script>
var { JsonServiceClient, Hello } = exports

var client = new JsonServiceClient()
client.api(new Hello({ name }))
    .then(api => console.log(api.response))
</script>    
```

Using **/types/js** has the same behavior as using `dtos.js` generated from `$ tsc dtos.ts` whose outputs are identical, i.e. both containing your API DTOs generated in CommonJS format. It's feasible to simulate the TypeScript compiler's output in this instance as ServiceStack only needs to generate DTO Types and Enums to enable its end-to-end API, and not any other of TypeScript's vast feature set.

### Enhanced Dev Time productivity with TypeScript

Even when no longer using TypeScript DTOs in your Apps, it's still useful to have TypeScript's `dtos.ts` included in your project (inc. Vanilla JS projects) to serve as optional type annotations enabling rich intelli-sense and static analysis in IDEs that support it, but as it's no longer used at runtime you're free to generate it at optimal times that don't interrupt your dev workflow.

### Change Default Server Configuration

The above defaults are also overridable on the ServiceStack Server by modifying the default config on the `NativeTypesFeature` Plugin, e.g:

```csharp
var nativeTypes = this.GetPlugin<NativeTypesFeature>();
nativeTypes.MetadataTypesConfig.MakeVirtual = false;
...
```

### Customize DTO Type generation

Additional TypeScript specific customization can be statically configured like `PreTypeFilter`, `InnerTypeFilter` & `PostTypeFilter` (available in all languages) can be used to inject custom code in the generated DTOs output.

Use the `PreTypeFilter` to generate source code before and after a Type definition, e.g. this will append the `[Validate]` attribute on non enum & interface types:

```csharp
TypeScriptGenerator.PreTypeFilter = (sb, type) => {
    if (!type.IsEnum.GetValueOrDefault() && !type.IsInterface.GetValueOrDefault())
    {
        sb.AppendLine("@Validate()");
    }
};
```

The `InnerTypeFilter` gets invoked just after the Type Definition which can be used to generate common members for all Types and interfaces, e.g:

```csharp
TypeScriptGenerator.InnerTypeFilter = (sb, type) => {
    sb.AppendLine("id:string = `${Math.random()}`.substring(2);");
};
```

There's also `PrePropertyFilter` & `PostPropertyFilter` for generating source before and after properties, e.g:

```csharp
TypeScriptGenerator.PrePropertyFilter = (sb , prop, type) => {
    if (prop.Name == "Id")
    {
        sb.AppendLine("@IsInt()");
    }
};
```

### Emit custom code

To enable greater flexibility when generating complex Typed DTOs, you can use `[Emit{Language}]` attributes to generate code before each type or property.

These attributes can be used to generate different attributes or annotations to enable client validation for different validation libraries in different languages, e.g:

```csharp
[EmitTypeScript("@Validate()")]
[EmitCode(Lang.TypeScript | Lang.Swift | Lang.Dart, "// App User")]
public class User : IReturn<User>
{
    [EmitTypeScript("@IsNotEmpty()", "@IsEmail()")]
    [EmitCode(Lang.Swift | Lang.Dart, new[]{ "@isNotEmpty()", "@isEmail()" })]
    public string Email { get; set; }
}
```

Which will generate `[EmitTypeScript]` code in TypeScript DTOs:

```typescript
@Validate()
// App User
export class User implements IReturn<User>
{
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    public constructor(init?: Partial<User>) { (Object as any).assign(this, init); }
    public createResponse() { return new User(); }
    public getTypeName() { return 'User'; }
}
```

Whilst the generic `[EmitCode]` attribute lets you emit the same code in multiple languages with the same syntax.

### Update ServiceStack Reference

If your server has been updated and you want to update the client DTOs, simply **right-click** on the DTO file
within VS.NET and select **Update ServiceStack Reference** for **ServiceStackVS** to download a fresh update.

### TypeScript Reference Example

Lets walk through a simple example to see how we can use ServiceStack's TypeScript DTO annotations in our
JavaScript clients. Firstly we'll need to add a TypeScript Reference to the remote ServiceStack Service by
**right-clicking** on your project and clicking on `Add > TypeScript Reference...`
(as seen in the above screenshot).

This will import the remote Services dtos into your local project which looks similar to:

```ts
/* Options:
Date: 2016-08-11 22:23:24
Version: 4.061
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://techstacks.io

//GlobalNamespace: 
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

// @Route("/technology/{Slug}")
export class GetTechnology implements IReturn<GetTechnologyResponse>
{
    Slug: string;
    createResponse() { return new GetTechnologyResponse(); }
    getTypeName() { return "GetTechnology"; }
}

export class GetTechnologyResponse
{
    Created: string;
    Technology: Technology;
    TechnologyStacks: TechnologyStack[];
    ResponseStatus: ResponseStatus;
}
```

In keeping with idiomatic style of local `.ts` sources, generated types are not wrapped within a module
by default. This lets you reference the types you want directly using normal import destructuring syntax:

```ts
import { GetTechnology, GetTechnologyResponse } from './dtos';
```

Or import all Types into your preferred variable namespace with:

```ts
import * as dtos from './dtos';

const request = new dtos.GetTechnology();
```

Or if preferred, you can instead have the types declared in a module by specifying a `GlobalNamespace`:

```ts
/* Options:
...

GlobalNamespace: dtos
*/
```

Looking at the types we'll notice the DTO's are plain TypeScript Types with any .NET attributes
added in comments using AtScript's proposed
[meta-data annotations format](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/mobilebasic?viewopt=127).
This lets you view helpful documentation about your DTO's like the different custom routes available
for each Request DTO.

By default DTO properties are optional but can be made a required field by annotating the .NET property
with the `[Required]` attribute or by uncommenting `MakePropertiesOptional: False` in the header comments
which instead defaults to using required properties.

Properties always reflect to match the remote servers JSON Serialization configuration,
i.e. will use **camelCase** properties when the `AppHost` is configured with:

```csharp
JsConfig.Init(new Config { TextCase = TextCase.CamelCase });
```

### Making Typed API Requests

Making API Requests in TypeScript is the same as all other
[ServiceStack's Service Clients](/clients-overview)
by sending a populated Request DTO using a `JsonServiceClient` which returns typed Response DTO.

So the only things we need to make any API Request is the `JsonServiceClient` from the `@servicestack/client`
package and any DTO's we're using from generated TypeScript ServiceStack Reference, e.g:

```ts
import { JsonServiceClient } from '@servicestack/client';
import { GetTechnology } from './dtos';

const client = new JsonServiceClient("https://techstacks.io");

const request = new GetTechnology();
request.Slug = "ServiceStack";

var r = await client.get(request);  // typed to GetTechnologyResponse
cont tech = r.Technology;           // typed to Technology

console.log(`${tech.Name} by ${tech.VendorName} (${tech.ProductUrl})`);
console.log(`${tech.Name} TechStacks:`, r.TechnologyStacks);
```

### Partial Constructors

All TypeScript Reference DTOs also includes support for **Partial Constructors**
making them much nicer to populate using object initializer syntax we're used to in C#, so instead of:

```ts
const request = new Authenticate();
request.provider = 'credentials'
request.userName = this.userName;
request.password = this.password;
request.rememberMe = this.rememberMe;
const response = await client.post(request);
```

You can populate DTOs with object literal syntax without any loss of TypeScript's Type Safety benefits:

```ts
const response = await client.post(new Authenticate({
    provider: 'credentials',
    userName: this.userName,
    password: this.password,
    rememberMe: this.rememberMe,
}));
```

### Sending additional arguments with Typed API Requests

Many AutoQuery Services utilize [implicit conventions](/autoquery-rdbms#implicit-conventions) to
query fields that aren't explicitly defined on AutoQuery Request DTOs, these can be queried by specifying
additional arguments with the typed Request DTO, e.g:

```ts
const request = new FindTechStacks();

var r = client.get(request, { VendorName: "ServiceStack" }); // typed to QueryResponse<TechnologyStack>
```

### Making API Requests with URLs

In addition to making Typed API Requests you can also call Services using relative or absolute urls, e.g:

```ts
client.get<GetTechnologyResponse>("/technology/ServiceStack")

client.get<GetTechnologyResponse>("https://techstacks.io/technology/ServiceStack")

// https://techstacks.io/technology?Slug=ServiceStack
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

### Access Request / Response Headers

You can use [JsonServiceClient](https://github.com/ServiceStack/servicestack-client/blob/master/src/index.d.ts) instance
`requestFilter` and `responseFilter` to inspect the underlying
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API's:

```ts
export declare class JsonServiceClient {
    //...
    requestFilter: (req: IRequestInit) => void;
    responseFilter: (res: Response) => void;
}
```

To inspect the underlying W3C
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
API's [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and
[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects, e.g:

```js
let client = new JsonServiceClient()
client.responseFilter = res => {
    console.log(res.headers)
}

var response = await client.get(new MyRequest())
```

### TypeScript Nullable properties

The default TypeScript generated for a C# DTO like:

```csharp
public class Data
{
    [Required]
    public int Value { get; set; }
    public int? OptionalValue { get; set; }
    public string Text { get; set; }
}
```

Will render the DTO with optional properties:

```csharp
export class Data
{
    // @Required()
    public value: number;

    public optionalValue?: number;
    public text?: string;

    public constructor(init?: Partial<Data>) { (Object as any).assign(this, init); }
}
```

This behavior can be changed to emit nullable properties instead with:

```csharp
TypeScriptGenerator.UseNullableProperties = true;
```

Where it will instead emit nullable properties:

```ts
export class Data
{
    public value: number|null;
    public optionalValue: number|null;
    public text: string|null;

    public constructor(init?: Partial<Data>) { (Object as any).assign(this, init); }
}
```

If finer-grained customization is needed to control which type and property should be nullable, you can
use the customizable `TypeScriptGenerator` filters (which `UseNullableProperties` defaults to):

```csharp
TypeScriptGenerator.IsPropertyOptional = (generator, type, prop) => false;

TypeScriptGenerator.PropertyTypeFilter = (gen, type, prop) => 
    gen.GetPropertyType(prop, out var isNullable) + "|null";
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
[adding a TypeScript Reference](https://docs.servicestack.net/typescript-add-servicestack-reference#add-typescript-reference)
to your remote ServiceStack Instance and sending a populated `Authenticate` Request DTO, e.g:

```ts
let request = new Authenticate();
request.provider = "credentials";
request.userName = userName;
request.password = password;
request.rememberMe = true;

const response = await client.post(request);
```

This will populate the `JsonServiceClient` with
[Session Cookies](https://docs.servicestack.net/sessions#cookie-session-ids)
which will transparently be sent on subsequent requests to make authenticated requests.

### Authenticating using JWT

Use the `bearerToken` property to Authenticate with a [ServiceStack JWT Provider](https://docs.servicestack.net/jwt-authprovider) using a JWT Token:

```ts
client.bearerToken = jwtToken;
```

Alternatively you can use a [Refresh Token](https://docs.servicestack.net/jwt-authprovider#refresh-tokens) instead:

```ts
client.refreshToken = refreshToken;
```

### Authenticating using an API Key

Use the `bearerToken` property to Authenticate with an [API Key](/api-key-authprovider):

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

With the [Refresh Token support in JWT](https://docs.servicestack.net/jwt-authprovider#refresh-tokens)
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

## DTO Customization Options

In most cases you'll just use the generated JavaScript DTO's as-is, however you can further customize how
the DTO's are generated by overriding the default options.

The header in the generated DTOs show the different options JavaScript types support with their
defaults. Default values are shown with the comment prefix of `//`. To override a value, remove the `//`
and specify the value to the right of the `:`. Any uncommented value will be sent to the server to override
any server defaults.

The DTO comments allows for customizations for how DTOs are generated. The default options that were used
to generate the DTO's are repeated in the header comments of the generated DTOs, options that are preceded
by a TypeScript comment `//` are defaults from the server, any uncommented value will be sent to the server
to override any server defaults.

```js
/* Options:
Date: 2022-01-28 02:10:26
Version: 6.00
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://blazor-wasm-api.jamstacks.net

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/
```

We'll go through and cover each of the above options to see how they affect the generated DTO's:

### Change Default Server Configuration

The above defaults are also overridable on the ServiceStack Server by modifying the default config on the
`NativeTypesFeature` Plugin, e.g:

```csharp
//Server example in CSharp
var nativeTypes = this.GetPlugin<NativeTypesFeature>();
nativeTypes.MetadataTypesConfig.IgnoreTypesInNamespaces = "test";
...
```

We'll go through and cover each of the above options to see how they affect the generated DTO's:

### AddResponseStatus

Automatically add a `ResponseStatus` property on all Response DTO's, regardless if it wasn't already defined:

```ts
interface GetAnswers extends IReturn<GetAnswersResponse>
{
    ...
    ResponseStatus: ResponseStatus;
}
```

### AddImplicitVersion

Lets you specify the Version number to be automatically populated in all Request DTO's sent from the client:

```ts
interface GetAnswers extends IReturn<GetAnswersResponse>
{
    Version: number; //1
    ...
}
```

This lets you know what Version of the Service Contract that existing clients are using making it easy
to implement ServiceStack's [recommended versioning strategy](http://stackoverflow.com/a/12413091/85785).

### IncludeTypes

Is used as a Whitelist to specify only the types you would like to have code-generated:

```
/* Options:
IncludeTypes: GetTechnology,GetTechnologyResponse
```

Will only generate `GetTechnology` and `GetTechnologyResponse` DTO's:

```csharp
export class class GetTechnology { ... }
export class class GetTechnologyResponse { ... }
```

#### Include Generic Types

Use .NET's Type Name to include Generic Types, i.e. the Type name separated by the backtick followed by the number of generic arguments, e.g:

```
IncludeTypes: IReturn`1,MyPair`2
```

#### Include Request DTO and its dependent types

You can include a Request DTO and all its dependent types with a `.*` suffix on the Request DTO, e.g:

```
/* Options:
IncludeTypes: GetTechnology.*
```

Which will include the `GetTechnology` Request DTO, the `GetTechnologyResponse` Response DTO and all Types that they both reference.

#### Include All Types within a C# namespace

If your DTOs are grouped into different namespaces they can be all included using the `/*` suffix, e.g:

```
/* Options:
IncludeTypes: MyApp.ServiceModel.Admin/*
```

This will include all DTOs within the `MyApp.ServiceModel.Admin` C# namespace.

#### Include All Services in a Tag Group

Services [grouped by Tag](/api-design#group-services-by-tag) can be used in the `IncludeTypes` where tags can be specified using braces in the format `{tag}` or `{tag1,tag2,tag3}`, e.g:

```
/* Options:
IncludeTypes: {web,mobile}
```

Or individually:

```
/* Options:
IncludeTypes: {web},{mobile}
```

### ExcludeTypes
Is used as a Blacklist to specify which types you would like excluded from being generated:

```
/* Options:
ExcludeTypes: GetTechnology,GetTechnologyResponse
```

Will exclude `GetTechnology` and `GetTechnologyResponse` DTOs from being generated.

### DefaultImports

The `Symbol:module` short-hand syntax can be used for specifying additional imports in your generated TypeScript DTOs, e.g:

```ts
/* Options:
...
DefaultImports: Symbol:module,Zip:./ZipValidator
*/
```

Which will generate the popular import form of:

```ts
import { Symbol } from "module";
import { Zip } from "./ZipValidator";
```


