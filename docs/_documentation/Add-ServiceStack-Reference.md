---
slug: add-servicestack-reference 
title: Add ServiceStack Reference
---

ServiceStack's **Add ServiceStack Reference** feature allows adding generated Native Types for the most popular typed languages and client platforms directly from within most major IDE's starting with [ServiceStackVS](/create-your-first-webservice#step-1-download-and-install-servicestackvs) - providing a simpler, cleaner and more versatile alternative to WCF's legacy **Add Service Reference** feature built into VS.NET.

Add ServiceStack Reference now supports 
[Swift](/swift-add-servicestack-reference), 
[Java](/java-add-servicestack-reference), 
[Kotlin](/kotlin-add-servicestack-reference), 
[C#](/csharp-add-servicestack-reference), 
[TypeScript](/typescript-add-servicestack-reference), 
[F#](/fsharp-add-servicestack-reference) and 
[VB.NET](/vbnet-add-servicestack-reference)
including integration with most leading IDE's to provide a flexible alternative than sharing your DTO assembly with clients. Clients can now easily add a reference to a remote ServiceStack url and update DTOs directly from within VS.NET, Xamarin Studio, Xcode, Android Studio, IntelliJ and Eclipse. We plan on expanding on this foundation into adding seamless, typed, end-to-end integration with other languages - Add a [feature request for your favorite language](http://servicestack.uservoice.com/forums/176786-feature-requests) to prioritize support for it sooner!

Native Types provides an alternative for sharing DTO dlls, that can enable a better dev workflow for external clients who are now able to generate (and update) Typed APIs for your Services from a single remote url directly within their favorite IDE - reducing the burden and effort required to consume ServiceStack Services whilst benefiting from clients native language strong-typing feedback.

ServiceStackVS offers the generation and updating of these clients through the same context for all supported languages giving developers a consistent way of creating and updating your DTOs regardless of their preferred language of choice.

### Supported Languages

* [C# Add ServiceStack Reference](/csharp-add-servicestack-reference)
* [TypeScript Add ServiceStack Reference](/typescript-add-servicestack-reference)
* [Swift Add ServiceStack Reference](/swift-add-servicestack-reference)
* [Java Add ServiceStack Reference](/java-add-servicestack-reference)
* [Kotlin Add ServiceStack Reference](/kotlin-add-servicestack-reference)
* [F# Add ServiceStack Reference](/fsharp-add-servicestack-reference)
* [VB.NET Add ServiceStack Reference](/vbnet-add-servicestack-reference)

## Example Usage

> C# Xamarin.Android Example in VS.NET

![C# Android Client example](https://raw.githubusercontent.com/ServiceStack/ServiceStackVS/master/Images/android-add-ref-demo.gif)

Using C# to develop native Mobile and Desktop Apps provides a number of benefits including maximum reuse of your investments across multiple Client Apps where they're able to reuse shared functionality, libraries, knowledge, development workflow and environment in both Client and Server Apps. 

## C# Mobile and Desktop Apps

[![](https://raw.githubusercontent.com/ServiceStackApps/HelloMobile/master/screenshots/splash-900.png)](https://github.com/ServiceStackApps/HelloMobile)

The generated DTOs provides a highly productive development workflow and enables a succinct end-to-end Typed API that can be used in both **.NET Framework** and **.NET Standard 2.0** [Generic Service Clients](/csharp-client) to facilitate Rapid Development in .NET's most popular Mobile and Desktop platforms:

 - WPF
 - UWP
 - Xamarin.Android
 - Xamarin.iOS
 - Xamarin.OSX
 - Xamarin.Forms
   - iOS
   - Android
   - UWP

The [HelloMobile](https://github.com/ServiceStackApps/HelloMobile) project contains multiple versions of the same App in all the above platforms demonstrating a number of different calling conventions, service integrations and reuse possibilities.

ServiceStack also allows for the maximum reuse possible by letting you reuse the same POCO DTOs used to define the Services contract with, in Clients Apps to provide its end-to-end typed API without any additional custom build tools, code-gen or any other artificial machinery, using just the DTOs in the shared `ServiceModel.dll` with any of the available highly performant [.NET generic Service Clients](/csharp-client) that be design encourages development of [resilient message-based Services](/what-is-a-message-based-web-service) for enabling [highly decoupled](/service-gateway) and easily [substitutable and mockable](/csharp-client#built-in-clients) Service Integrations.

## Utilize Native SDKs and Languages

Add ServiceStack Reference lets you utilize the native SDK's and development environment whilst maintaining the same productive development experience made possible with native idiomatic Service Clients in Web and across the most popular Mobile and Desktop platforms. App Developers can generate Typed DTOs for any ServiceStack Service in Android Apps using either [Java](/java-add-servicestack-reference) and [Kotlin](/kotlin-add-servicestack-reference), or use the [Swift](/swift-add-servicestack-reference) for development of native iOS or OSX Apps or [TypeScript](/typescript-add-servicestack-reference) for calling Services from [React Native, Node.js or Web Apps](https://github.com/ServiceStackApps/typescript-server-events).

### Flexible Customizations

Options for the generated DTOs can be further customized by updating the commented section in the header of the file. Each language will have different options for leveraging features native to each Language. See the specific language documentation for details on available options:

* [C# Options](/csharp-add-servicestack-reference#change-default-server-configuration)
* [Swift Options](/swift-add-servicestack-reference#swift-configuration)
* [Java Options](/java-add-servicestack-reference#java-configuration)
* [Kotlin Options](/kotlin-add-servicestack-reference#kotlin-configuration)
* [TypeScript Options](/typescript-add-servicestack-reference#change-default-server-configuration)
* [F# Options](/fsharp-add-servicestack-reference#change-default-server-configuration)
* [VB.Net Options](/vbnet-add-servicestack-reference)

## Simple command-line utilities for ServiceStack

The `@servicestack/cli` provides simple command-line utilities to easily Add and Update ServiceStack References for all of ServiceStack's supported languages.

## Installation

Prerequisites: Node.js (>=4.x, 6.x preferred), npm version 3+.

    $ npm install -g @servicestack/cli

This will make the following utilities availble from your command-line which will let you download the Server DTO classes for a remote ServiceStack endpoint in your chosen language which you can use with ServiceStack's generic Service clients to be able to make end-to-end API calls.

<table class="table table-bordered">
    <tr>
        <th>Script</th>
        <th>Alias</th>
        <th>Language</th>
    </tr>
    <tr>
        <td>csharp-ref</td>
        <td>cs-ref</td>
        <td>C#</td>
    </tr>
    <tr>
        <td>typescript-ref</td>
        <td>ts-ref</td>
        <td>TypeScript</td>
    </tr>
    <tr>
        <td>java-ref</td>
        <td></td>
        <td>Java</td>
    </tr>
    <tr>
        <td>kotlin-ref</td>
        <td>kt-ref</td>
        <td>Kotlin</td>
    </tr>
    <tr>
        <td>swift-ref</td>
        <td></td>
        <td>Swift</td>
    </tr>
    <tr>
        <td>vbnet-ref</td>
        <td>vb-ref</td>
        <td>VB.NET</td>
    </tr>
    <tr>
        <td>fsharp-ref</td>
        <td>fs-ref</td>
        <td>F#</td>
    </tr>
</table>

## Usage

We'll walkthrough an example using TypeScript to download Server Types from the [techstacks.io](http://techstacks.io) ServiceStack Website to see how this works:

### Adding a ServiceStack Reference

To Add a TypeScript ServiceStack Reference just call `typescript-ref` with the URL of 
a remote ServiceStack instance:

    $ typescript-ref http://techstacks.io

Result:

    Saved to: techstacks.dtos.ts

Calling `typescript-ref` with just a URL will save the DTOs using the Host name, you can override this by specifying a FileName as the 2nd argument:

    $ typescript-ref http://techstacks.io Tech

Result:

    Saved to: Tech.dtos.ts

### Updating a ServiceStack Reference

To Update an existing ServiceStack Reference, call `typescript-ref` with the Filename:

    $ typescript-ref techstacks.dtos.ts

Result:

    Updated: techstacks.dtos.ts

Which will update the File with the latest TypeScript Server DTOs from [techstacks.io](http://techstacks.io). You can also customize how DTOs are generated by uncommenting the [TypeScript DTO Customization Options](http://docs.servicestack.net/typescript-add-servicestack-reference#dto-customization-options) and updating them again.

#### Updating all TypeScript DTOs

Calling `typescript-ref` without any arguments will update all TypeScript DTOs in the current directory:

    $ typescript-ref

Result:

    Updated: Tech.dtos.ts
    Updated: techstacks.dtos.ts

To make it more wrist-friendly you can also use the shorter `ts-ref` alias instead of `typescript-ref`.

### Installing Generic Service Client

Now we have our TechStacks Server DTOs we can use them with the generic `JsonServiceClient` in the [@servicestack/client](https://www.npmjs.com/package/@servicestack/client) npm package to make Typed API Calls.

#### Install @servicestack/client

    $ npm install @servicestack/client

#### TechStacks Example

Once installed create a `demo.ts` file with the example below using both the `JsonServiceClient` from the **@servicestack/client** npm package and the Server DTOs we 
want to use from our local `techstacks.dtos.ts` above:

```ts
import { JsonServiceClient } from '@servicestack/client';
import { GetTechnology, GetTechnologyResponse } from './techstacks.dtos';

var client = new JsonServiceClient("http://techstacks.io")

async function main() {
    let request = new GetTechnology()
    request.Slug = "ServiceStack"

    const response = await client.get(request)
    console.log(response.Technology.VendorUrl)
}

main()
```

The `JsonServiceClient` is populated with the **BaseUrl** of the remote ServiceStack instance we wish to call. Once initialized we can send populated Request DTOs and handle
the Typed Response DTOs in Promise callbacks.

To run our TypeScript example we just need to compile it with TypeScript:

    $ tsc demo.ts

Which will generate the compiled `demo.js` (and `typescript.dtos.js`) which we can then run with node:

    $ node demo.js

Result:

    https://servicestack.net

#### Enabling TypeScript async/await 

To make API requests using TypeScript's async/await feature we'll need to create a TypeScript `tsconfig.json` config file that imports ES6 promises and W3C fetch definitions:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": [ "es2015", "dom" ]
  }
}
```

## Advantages over WCF

 - **Simple** Server provides DTOs based on metadata and options provided. No heavy client side tools, just a HTTP request!
 - **Versatile** Clean DTOs works in all JSON, XML, JSV, MsgPack and ProtoBuf [generic service clients](/csharp-client#built-in-clients)
 - **Reusable** Generated DTOs are not coupled to any endpoint or format. Defaults are both partial and virtual for maximum re-use 
 - **Resilient** Messaging-based services offer a number of [advantages over RPC Services](/advantages-of-message-based-web-services)
 - **Flexible** DTO generation is customizable, Server and Clients can override built-in defaults
 - **Integrated** Rich Service metadata annotated on DTO's, [Internal Services](/restricting-services) are excluded when accessed externally

## In Contrast with WCF's Add Service Reference

WCF's **Add Service Reference** also allows generating a typed client from a single url, and whilst it's a great idea, the complexity upon what it's built-on and the friction it imposes were the primary reasons we actively avoided using it (pre-ServiceStack). We instead opted to reuse our server DTO types and created Generic WCF Proxies, to provide a cleaner and simpler solution when consuming our own WCF services. 

### Complexity of WCF's Add Service Reference

To achieve this feature WCF generates its client proxies using a remote services WSDL. A WSDL is basically a machine-readable XML definition language for describing SOAP Services. It's abstract enough to cover different styles of services and introduces a number of artificial concepts to facilitate it, including: Service, Port, Binding, PortType, Operation, Message and Types. As WSDL's are complex they mandate the use of heavy tooling to generate and maintain both the WSDL file, the generated client proxies and its necessary client configuration. Despite all this complexity it's coupled and limited into using the verbose SOAP protocol and XML wire format which when coupled with WCF's promotion of RPC method signatures meant even minor changes would break existing clients, resulting in a heavy and fragile solution for evolving web services.

### How Message based Services would benefit WCF

A small part of a WSDL is the XSD definitions of Types used in the Services. Had WCF only supported a message-based style it could dispense with the overhead of using a WSDL at all and just use XSD schema to generate the DTO's, eliminating the neeed for a SOAP envelope where it could just send [Plain Old XML](http://en.wikipedia.org/wiki/Plain_Old_XML) across the wire. As an added benefit it would've got JSON support for free by reusing the generated types in .NET's JSON DataContract Serializer. 

### Unnecessary Complexity of XSDs

Despite being much simpler, even XSD's by themselves are more complex than it needs to be. The XML Schema specification is itself several hundred pages long and contains many elements which make it a poor programmatic fit for any programming language. E.g. use of XML namespaces and attributes in addition to elements does not naturally map to any language type system and causes unnecessary friction and additional boilerplate to handle this mismatch during serialization. 

This is in stark contrast with the JSON spec which [fits on a single page](http://www.json.org/) yet manages to include most of the core elements required for data interchange consisting of `Arrays`, `Objects` and primitive `number`, `string`, `boolean` and `null` types. It's also a perfect fit for most languages where all valid JSON is always convertible to a valid JavaScript object. When more specialized types are required, you have access to the full power of the host programming language to perform custom conversions, providing a more flexible alternative than otherwise breaking clients requests on minor schema changes. 

## ServiceStack's Native Types Feature

As with any ServiceStack feature one of our primary goals is to [minimize unnecessary complexity](/autoquery#why-not-complexity) by opting for approaches that yield maximum value and minimal complexity, favoring re-use and simple easy to reason about solutions over opaque heavy black-box tools.

We can already see from the WCF scenario how ServiceStack already benefits from its message-based design, where as it's able to reuse any [Generic Service Client](/clients-overview), only application-specific DTO's ever need to be generated, resulting in a much cleaner, simpler and friction-less solution.

Code-first is another approach that lends itself to simpler solutions, which saves the effort and inertia from adapting to interim schemas/specs, often with impedance mismatches and reduced/abstract functionality. In ServiceStack your code-first DTOs are the master authority where all other features are projected off. 

C# also has great language support for defining POCO Data Models, that's as terse as a DSL but benefits from great IDE support and minimal boilerplate, e.g:

```csharp
[Route("/path")]
public class Request : IReturn<Response>
{
    public int Id { get; set; }
    public string Name { get; set; }
    ...
}
```

Starting from a C# model, whilst naturally a better programmatic fit also ends up being richer and more expressive than XSD's which supports additional metadata annotations like Attributes and Interfaces. 

### Enabled by default from v4.0.30+ ServiceStack Projects

Native Types is now available by default on all **v4.0.30+** ServiceStack projects. It can be disabled by removing the `NativeTypesFeature` plugin with:

```csharp
Plugins.RemoveAll(x => x is NativeTypesFeature);
```

### Generating Types from Metadata

Behind the scenes ServiceStack captures all metadata on your Services DTOs including Sub -classes, Routes, `IReturn` marker, C# Attributes, textual Description as well as desired configuration into a serializable object model accessible from `/types/metadata`: 

#### Live examples

  - [httpbenchmarks.servicestack.net/types/metadata](https://httpbenchmarks.servicestack.net/types/metadata) ([JSON](https://httpbenchmarks.servicestack.net/types/metadata.json))
  - [stackapis.servicestack.net/types/metadata](http://stackapis.servicestack.net/types/metadata) ([JSON](http://stackapis.servicestack.net/types/metadata.json))

This model is then used to generate the generated types, which for C# is at `/types/csharp`.

### Excluding Types from Add ServiceStack Reference

To remove a type from the metadata and code generation you can annotate Request DTOs with `[Exclude(Feature.Metadata)]`, e.g:

```csharp
[Exclude(Feature.Metadata)]
public class ExcludedFromMetadata
{
    public int Id { get; set; }
}
```

An alternative is it add it to the `IgnoreTypes` collection in the NativeTypes Feature Metadata Config in your AppHost:

```csharp
var nativeTypes = this.GetPlugin<NativeTypesFeature>();
nativeTypes.MetadataTypesConfig.IgnoreTypes.Add(typeof(TypeToIgnore));
```

If you only want to limit code generation based on where the reference is being added from you can use the 
[Restrict Attribute](/restricting-services), 
E.g you can limit types to only appear when the reference is added from localhost:

```csharp
[Restrict(LocalhostOnly = true)]
public class ResrtictedToLocalhost { }
```

Or when added from within an internal network:

```csharp
[Restrict(InternalOnly = true)]
public class RestrictedToInternalNetwork { }
```

There's also the rarer option when you only want a service accessible from external requests with:

```csharp
[Restrict(ExternalOnly = true)]
public class RestrictedToExternalRequests { }
```

### Enable Versioning

You can implement our [recommended Versioning strategy](http://stackoverflow.com/a/12413091/85785) 
and embed a version number to all generated Request DTOs by specifying an `AddImplicitVersion`, 
either globally on the Server in your AppHost:

```csharp
var nativeTypes = this.GetPlugin<NativeTypesFeature>();
nativeTypes.MetadataTypesConfig.AddImplicitVersion = 1;
```

Alternatively you can configure [AddImplicitVersion in client Options](/csharp-add-servicestack-reference#addimplicitversion).

### How it works

The Add ServiceStack Reference dialog just takes the URL provided and requests the appropriate route for the current project. Eg, for C#, the path used is at `/types/csharp`. The defaults are specified by the server and the resultant DTOs are saved and added the the project as {Name}.dtos.{LanguageExtension}. The `Update ServiceStack Reference` menu is available when any file matches same naming convention of {Name}.dtos.{LanguageExtension}. An update then looks at the comments at the top of the file and parses them to provide overrides when requesting new DTOs from the server. ServiceStackVS also watches these DTO files for updates, so just by saving them these files are updated from the server.

#### Language Paths

- `/types/csharp` - C# 
- `/types/swift` - Swift 
- `/types/java` - Java 
- `/types/kotlin` - Kotlin 
- `/types/typescript` - TypeScript 
- `/types/typescript.d` - Ambient TypeScript Definitions
- `/types/fsharp` - F# 
- `/types/vbnet` - VB.NET 
- `/types/metadata` - Metadata 

## Limitations

In order for Add ServiceStack Reference to work consistently across all supported languages without .NET semantic namespaces, DTOs includes an additional restriction where each Type must be uniquely named. You can get around this restriction by sharing the ServiceModel.dll where your DTOs are defined instead.

## Using with IIS Windows Authentication

If you have configured your NativeTypes service to run on IIS with Windows Authentication enabled, you need to ensure that the _/types_ routes are reachable and do not require the system-level authentication from IIS. To accomplish this, add the following to Web.config. 

```xml
<configuration>
    <location path="types">
        <system.web>
            <authorization>
                <allow users="?" />
            </authorization>
        </system.web>
    </location>
</configuration>
```
