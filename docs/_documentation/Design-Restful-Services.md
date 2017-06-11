---
title: Design RESTful Services with ServiceStack
slug: design-rest-services
---

### Service implementations are de-coupled from their Custom Routes

ServiceStack encourages a message-based design so each Service should have its own distinct message / Request DTO. Another thing to keep in mind is how you define and design your services in ServiceStack are de-coupled in how you expose them as Services can be exposed under any custom route. 

### Use a logical / hierarchical Url structure

We recommend using a logical Url structure that represents the identifier of a noun, which is hierarchically structured, i.e. the parent path categorizes your resource and gives it meaningful context. So if you needed to design an API that maintained **Events** and their **Reviews** you could adopt the following url structure:

    /events             //all events
    /events/1           //event #1
    /events/1/reviews   //event #1 reviews

Each of these resource identifiers can have any HTTP Verb applied to them.

### Implementation

For their implementation ServiceStack encourages a message-based design that groups all related operations based on Response type and call context. For an Events and Reviews system it could look something like:

```csharp
[Route("/events", "GET")]
[Route("/events/category/{Category}", "GET")] //*Optional top-level views
public class SearchEvents : IReturn<SearchEventsResponse>
{
    //resultset filter examples, e.g. ?Category=Tech&Query=servicestack
    public string Category { get; set; } 
    public string Query { get; set; }
}

[Route("/events", "POST")]
public class CreateEvent : IReturn<Event>
{
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
}

[Route("/events/{Id}", "GET")]
[Route("/events/code/{EventCode}", "GET")] // Alternative Id
public class GetEvent : IReturn<Event>
{
    public int Id { get; set; }
    public string EventCode { get; set; } // Alternative way to fetch an Event
}

[Route("/events/{Id}", "PUT")]
public class UpdateEvent : IReturn<Event>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
}
```

Event reviews follows a similar pattern
    
```csharp
[Route("/events/{EventId}/reviews", "GET")]
public class GetEventReviews : IReturn<GetEventReviewsResponse>
{
    public int EventId { get; set; }
}

[Route("/events/{EventId}/reviews/{Id}", "GET")]
public class GetEventReview : IReturn<EventReview>
{
    public int EventId { get; set; }
    public int Id { get; set; }
}

[Route("/events/{EventId}/reviews", "POST")]
public class CreateEventReview : IReturn<EventReview>
{
    public int EventId { get; set; }
    public string Comments { get; set; }
}
```

### Notes

The implementation of each Services then becomes straight-forward based on these messages, which (depending on code-base size) we'd recommend organizing in 2 **EventsService** and **EventReviewsService** classes.

Although `UpdateEvent` and `CreateEvent` are seperate Services here, if the use-case permits they can instead be handled by a single idempotent `StoreEvent` Service.

## [Physical Project Structure](/physical-project-structure)

Ideally the root-level **AppHost** project should be kept lightweight and implementation-free. Although for small projects or prototypes with only a few services it's ok for everything to be in a single project and to simply grow your architecture when and as needed. 

For medium-to-large projects we recommend the physical structure below which for the purposes of this example we'll assume our Application is called **Events**. 

The order of the projects also show its dependencies, e.g. the top-level `Events` project references **all** sub projects whilst the last `Events.ServiceModel` project references **none**:

    /Events
        AppHost.cs              // ServiceStack Web or Self Host Project

    /Events.ServiceInterface    // Service implementations (akin to MVC Controllers)
        EventsService.cs
        EventsReviewsService.cs

    /Events.Logic               // For large projects: pure C# logic, data models, etc
        IGoogleCalendarGateway  // E.g of a external dependency this project could use

    /Events.ServiceModel        // Service Request/Response DTOs and DTO types
        Events.cs               // SearchEvents, CreateEvent, GetEvent DTOs 
        EventReviews.cs         // GetEventReviews, CreateEventReview
        Types/
          Event.cs              // Event type
          EventReview.cs        // EventReview type

With the `Events.ServiceModel` DTO's kept in their own separate implementation and dependency-free dll, you're freely able to share this dll in any .NET client project as-is - which you can use with any of the generic [C# Service Clients](/csharp-server-events-client) to provide an end-to-end typed API without any code-gen.

## More Info

 - This recommended project structure is embedded in all [ServiceStackVS VS.NET Templates](/templates-overview).
 - The [Simple Customer REST Example](/why-servicestack#simple-customer-database-rest-services-example) is a small self-contained, real-world example of creating a simple REST Service utilizing an RDBMS.
