---
slug: order-of-operations
---

## HTTP Custom hooks

This list shows the order in which any user-defined custom hooks are executed.

The first set of filters is used to return the matching `IHttpHandler` for the request:

  1. `HostContext.RawHttpHandlers` are executed before anything else, i.e. returning any ASP.NET `IHttpHandler` by-passes ServiceStack completely and processes your custom `IHttpHandler` instead.
  2. Request is checked if matches any registered routes or static files and directories
  3. If the Request doesn't match it will search `IAppHost.CatchAllHandlers` for a match
  4. `IAppHost.FallbackHandlers` is the last handler executed for finding a handler to handle the request

Any unmatched requests will not be handled by ServiceStack and either returns a 404 NotFound Response in **ASP.NET** or **HttpListener** AppHosts or 
executes the next middleware in-line in **.NET Core** Apps.

Requests handled by ServiceStack execute the custom hooks and filters in the following order:

  1. The `IAppHost.PreRequestFilters` gets executed before the Request DTO is deserialized
  2. Default Request DTO Binding or [Custom Request Binding][4] _(if registered)_
  3. Any [Request Converters](/customize-http-responses#request-converters) are executed
  4. [Request Filter Attributes][3] with **Priority < 0** gets executed
  5. Then any [Global Request Filters][1] get executed
  6. Followed by [Request Filter Attributes][3] with **Priority >= 0**
  7. Action Request Filters
  8. Then your **Service is executed** with the configured [Service Filters](/customize-http-responses#intercept-service-requests) and [Service Runner](/customize-http-responses#using-a-custom-servicerunner) **OnBeforeExecute**, **OnAfterExecute** and **HandleException** custom hooks are fired
  9. Action Response Filters
  10. Any [Response Converters](/customize-http-responses#response-converters) are executed
  11. Followed by [Response Filter Attributes][3] with **Priority < 0** 
  12. Then [Global Response Filters][1] 
  13. Followed by [Response Filter Attributes][3] with **Priority >= 0** 
  14. Finally at the end of the Request `IAppHost.OnEndRequest` and any `IAppHost.OnEndRequestCallbacks` are fired

Any time you close the Response in any of your filters, i.e. `httpRes.EndRequest()` the processing of the response is short-circuited and no further processing is done on that request.

## MQ (non-HTTP) Custom hooks

  1. Any [Global Request Filters](/request-and-response-filters#message-queue-endpoints) get executed
  2. Followed by [Request Filter Attributes][3] with **Priority >= 0**
  3. Action Request Filters
  4. Then your **Service is executed** with the configured [IServiceRunner](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Web/IServiceRunner.cs) and its **OnBeforeExecute**, **OnAfterExecute** and **HandleException** custom hooks are fired
  5. Action Response Filters
  6. Then [Global Response Filters](/request-and-response-filters#message-queue-endpoints) 
  7. Finally at the end of the Request `IAppHost.OnEndRequest` is fired

## Implementation architecture diagram

The [Implementation architecture diagram][2] shows a visual cue of the internal order of operations that happens in ServiceStack:

![ServiceStack Overview](/images/overview/servicestack-overview-01.png)

After the IHttpHandler is returned, it gets executed with the current ASP.NET or HttpListener request wrapped in a common [IHttpRequest](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/ServiceHost/IHttpRequest.cs) instance. 

The implementation of [RestHandler](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/WebHost.Endpoints/RestHandler.cs) shows what happens during a typical ServiceStack request:

![ServiceStack Request Pipeline](/images/overview/servicestack-overview-02.png)

  [1]: /request-and-response-filters
  [2]: /architecture-overview
  [3]: /filter-attributes
  [4]: /serialization-deserialization