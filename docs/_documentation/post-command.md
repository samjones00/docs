---
slug: post-command
title: Post Command - HTTP API Command Line Utils
---

Post Command is a collection of command line utils that lets you easily discover, inspect and invoke ServiceStack endpoints from a single command.

All command line utils are available in the latest [dotnet tool](/dotnet-tool) which can be installed from:

    $ dotnet tool install --global x 

Or if you had a previous version installed, update with:

    $ dotnet tool update -g x

## inspect command

The `inspect` command lets you inspect features and APIs available on a remote ServiceStack endpoint including the version of ServiceStack 
running, the App's registered Content Types, Plugins and Auth Providers as well as its public APIs, their routes and Response Types.

Use `x inspect` to display usage examples and available options:

```
Usage: x inspect <base-url>
       x inspect <base-url> <request>
       x inspect <base-url> <request> -lang <csharp|python|typescript|dart|java|kotlin|swift|fsharp|vbnet>
       x inspect <base-url> <request> -lang <cs|py|ts|da|ja|kt|sw|fs|vb>
```

### inspect ServiceStack App

This this command to display high-level information about the endpoint in a human-friendly format, e.g:

    $ x inspect https://techstacks.io

Output:

```
Base URL:           https://techstacks.io
Name:               TechStacks!
Version:            5.111

Content Types:      application/json, application/xml, application/jsv, text/html, text/jsonreport, text/csv
Plugins:            html, csv, autoroutes, metadata, ssref, httpcache, svg, sharp, auth, sitemap, cors, validation, autoquerymeta, autoquery, openapi, session
Auth Providers:     twitter (oauth), github (oauth), jwt (Bearer), servicestack (credentials)

| #   | Api                                | Routes                                                    | Response                                   |
|-----|------------------------------------|-----------------------------------------------------------|--------------------------------------------|
| 1   | Ping                               | /ping                                                     |                                            |
| 2   | GetOrganization                    | GET:/orgs/{Id}                                            | GetOrganizationResponse                    |
| 3   | GetOrganizationBySlug              | GET:/organizations/{Slug}                                 | GetOrganizationResponse                    |
| 4   | GetOrganizationMembers             | GET:/orgs/{Id}/members                                    | GetOrganizationMembersResponse             |
| 5   | GetOrganizationAdmin               | GET:/orgs/{Id}/admin                                      | GetOrganizationAdminResponse               |
| 6   | CreateOrganizationForTechnology    | POST:/orgs/posts/new                                      | CreateOrganizationForTechnologyResponse    |
| 7   | CreateOrganization                 | POST:/orgs                                                | CreateOrganizationResponse                 |
| 8   | UpdateOrganization                 | PUT:/orgs/{Id}                                            | UpdateOrganizationResponse                 |
| 9   | DeleteOrganization                 | DELETE:/orgs/{Id}                                         |                                            |
| 10  | LockOrganization                   | PUT:/orgs/{Id}/lock                                       |                                            |
| 11  | AddOrganizationLabel               | POST:/orgs/{OrganizationId}/labels                        | OrganizationLabelResponse                  |
| 12  | UpdateOrganizationLabel            | PUT:/orgs/{OrganizationId}/members/{Slug}                 | OrganizationLabelResponse                  |
| 13  | RemoveOrganizationLabel            | DELETE:/orgs/{OrganizationId}/labels/{Slug}               |                                            |
| 14  | AddOrganizationCategory            | POST:/orgs/{OrganizationId}/categories                    | AddOrganizationCategoryResponse            |
| 15  | UpdateOrganizationCategory         | PUT:/orgs/{OrganizationId}/categories/{Id}                | UpdateOrganizationCategoryResponse         |
| 16  | DeleteOrganizationCategory         | DELETE:/orgs/{OrganizationId}/categories/{Id}             |                                            |
| 17  | AddOrganizationMember              | POST:/orgs/{OrganizationId}/members                       | AddOrganizationMemberResponse              |
| 18  | UpdateOrganizationMember           | PUT:/orgs/{OrganizationId}/members/{Id}                   | UpdateOrganizationMemberResponse           |
| 19  | RemoveOrganizationMember           | DELETE:/orgs/{OrganizationId}/members/{UserId}            |                                            |
| 20  | SetOrganizationMembers             | POST:/orgs/{OrganizationId}/members/set                   | SetOrganizationMembersResponse             |
| 21  | GetOrganizationMemberInvites       | GET:/orgs/{OrganizationId}/invites                        | GetOrganizationMemberInvitesResponse       |
| 22  | RequestOrganizationMemberInvite    | POST:/orgs/{OrganizationId}/invites                       | RequestOrganizationMemberInviteResponse    |
| 23  | UpdateOrganizationMemberInvite     | PUT:/orgs/{OrganizationId}/invites/{UserId}               | UpdateOrganizationMemberInviteResponse     |
| 24  | QueryPosts                         | GET:/posts                                                | QueryResponse<Post>                        |
| 25  | GetPost                            | GET:/posts/{Id}                                           | GetPostResponse                            |
| 26  | CreatePost                         | POST:/posts                                               | CreatePostResponse                         |
| 27  | UpdatePost                         | PUT:/posts/{Id}                                           | UpdatePostResponse                         |
| 28  | DeletePost                         | DELETE:/posts/{Id}                                        | DeletePostResponse                         |
| 29  | LockPost                           | PUT:/posts/{Id}/lock                                      |                                            |
| 30  | HidePost                           | PUT:/posts/{Id}/hide                                      |                                            |
| 31  | ChangeStatusPost                   | PUT:/posts/{Id}/status/{Status}                           |                                            |
| 32  | ActionPostReport                   | POST:/posts/{PostId}/report/{Id}                          |                                            |
| 33  | CreatePostComment                  | POST:/posts/{PostId}/comments                             | CreatePostCommentResponse                  |
| 34  | UpdatePostComment                  | PUT:/posts/{PostId}/comments/{Id}                         | UpdatePostCommentResponse                  |
| 35  | DeletePostComment                  | DELETE:/posts/{PostId}/comments/{Id}                      | DeletePostCommentResponse                  |
| 36  | ActionPostCommentReport            | POST:/posts/{PostId}/comments/{PostCommentId}/report/{Id} |                                            |
| 37  | GetUserPostCommentVotes            | /user/comments/votes                                      | GetUserPostCommentVotesResponse            |
| 38  | PinPostComment                     | PUT:/posts/{PostId}/comments/{Id}/pin                     | PinPostCommentResponse                     |
| 39  | GetUsersByEmails                   | /users/by-email                                           | GetUsersByEmailsResponse                   |
| 40  | GetUserPostActivity                | /user/posts/activity                                      | GetUserPostActivityResponse                |
| 41  | GetUserOrganizations               | /user/organizations                                       | GetUserOrganizationsResponse               |
| 42  | UserPostVote                       | PUT:/posts/{Id}/vote                                      | UserPostVoteResponse                       |
| 43  | UserPostFavorite                   | PUT:/posts/{Id}/favorite                                  | UserPostFavoriteResponse                   |
| 44  | UserPostReport                     | PUT:/posts/{Id}/report                                    | UserPostReportResponse                     |
| 45  | UserPostCommentVote                | GET:/posts/{PostId}/comments/{Id}                         | UserPostCommentVoteResponse                |
| 46  | UserPostCommentReport              | PUT:/posts/{PostId}/comments/{Id}/report                  | UserPostCommentReportResponse              |
| 47  | StorePreRender                     | PUT:/prerender/{Path*}                                    |                                            |
| 48  | GetPreRender                       | GET:/prerender/{Path*}                                    | string                                     |
| 49  | SessionInfo                        | /my-session                                               | SessionInfoResponse                        |
| 50  | SubscribeToOrganization            | PUT:/orgs/{OrganizationId}/subscribe                      |                                            |
| 51  | SubscribeToPost                    | PUT:/posts/{PostId}/subscribe                             |                                            |
| 52  | DeleteOrganizationSubscription     | DELETE:/orgs/{OrganizationId}/subscribe                   |                                            |
| 53  | DeletePostSubscription             | DELETE:/posts/{PostId}/subscribe                          |                                            |
| 54  | GetTechnologyPreviousVersions      | GET:/technology/{Slug}/previous-versions                  | GetTechnologyPreviousVersionsResponse      |
| 55  | GetAllTechnologies                 | GET:/technology                                           | GetAllTechnologiesResponse                 |
| 56  | FindTechnologies                   | /technology/search                                        | QueryResponse<TechnologyView>              |
| 57  | QueryTechnology                    | /technology/query                                         | QueryResponse<TechnologyView>              |
| 58  | GetTechnology                      | /technology/{Slug}                                        | GetTechnologyResponse                      |
| 59  | GetTechnologyFavoriteDetails       | /technology/{Slug}/favorites                              | GetTechnologyFavoriteDetailsResponse       |
| 60  | CreateTechnology                   | POST:/technology                                          | CreateTechnologyResponse                   |
| 61  | UpdateTechnology                   | PUT:/technology/{Id}                                      | UpdateTechnologyResponse                   |
| 62  | DeleteTechnology                   | DELETE:/technology/{Id}                                   | DeleteTechnologyResponse                   |
| 63  | GetTechnologyStackPreviousVersions | GET:/techstacks/{Slug}/previous-versions                  | GetTechnologyStackPreviousVersionsResponse |
| 64  | GetPageStats                       | /pagestats/{Type}/{Slug}                                  | GetPageStatsResponse                       |
| 65  | ClearCache                         | /cache/clear                                              | string                                     |
| 66  | HourlyTask                         | /tasks/hourly                                             | HourlyTaskResponse                         |
| 67  | FindTechStacks                     | /techstacks/search                                        | QueryResponse<TechnologyStackView>         |
| 68  | QueryTechStacks                    | /techstacks/query                                         | QueryResponse<TechnologyStackView>         |
| 69  | Overview                           | /overview                                                 | OverviewResponse                           |
| 70  | AppOverview                        | /app-overview                                             | AppOverviewResponse                        |
| 71  | GetAllTechnologyStacks             | GET:/techstacks                                           | GetAllTechnologyStacksResponse             |
| 72  | GetTechnologyStack                 | GET:/techstacks/{Slug}                                    | GetTechnologyStackResponse                 |
| 73  | GetTechnologyStackFavoriteDetails  | /techstacks/{Slug}/favorites                              | GetTechnologyStackFavoriteDetailsResponse  |
| 74  | GetConfig                          | /config                                                   | GetConfigResponse                          |
| 75  | CreateTechnologyStack              | POST:/techstacks                                          | CreateTechnologyStackResponse              |
| 76  | UpdateTechnologyStack              | PUT:/techstacks/{Id}                                      | UpdateTechnologyStackResponse              |
| 77  | DeleteTechnologyStack              | DELETE:/techstacks/{Id}                                   | DeleteTechnologyStackResponse              |
| 78  | GetFavoriteTechStack               | GET:/favorites/techtacks                                  | GetFavoriteTechStackResponse               |
| 79  | AddFavoriteTechStack               | PUT:/favorites/techtacks/{TechnologyStackId}              | FavoriteTechStackResponse                  |
| 80  | RemoveFavoriteTechStack            | DELETE:/favorites/techtacks/{TechnologyStackId}           | FavoriteTechStackResponse                  |
| 81  | GetFavoriteTechnologies            | GET:/favorites/technology                                 | GetFavoriteTechnologiesResponse            |
| 82  | AddFavoriteTechnology              | PUT:/favorites/technology/{TechnologyId}                  | FavoriteTechnologyResponse                 |
| 83  | RemoveFavoriteTechnology           | DELETE:/favorites/technology/{TechnologyId}               | FavoriteTechnologyResponse                 |
| 84  | GetUserFeed                        | /my-feed                                                  | GetUserFeedResponse                        |
| 85  | GetUsersKarma                      | GET:/users/karma                                          | GetUsersKarmaResponse                      |
| 86  | GetUserInfo                        | /userinfo/{UserName}                                      | GetUserInfoResponse                        |
| 87  | UserAvatar                         | GET:/users/{UserName}/avatar                              | Task<TResult>                              |
| 88  | MqStart                            | /mq/start                                                 | string                                     |
| 89  | MqStop                             | /mq/stop                                                  | string                                     |
| 90  | MqStats                            | /mq/stats                                                 | string                                     |
| 91  | MqStatus                           | /mq/status                                                | string                                     |
| 92  | SyncDiscourseSite                  | /sync/discourse/{Site}                                    | SyncDiscourseSiteResponse                  |
| 93  | LogoUrlApproval                    | /admin/technology/{TechnologyId}/logo                     | LogoUrlApprovalResponse                    |
| 94  | LockTechStack                      | /admin/techstacks/{TechnologyStackId}/lock                | LockStackResponse                          |
| 95  | LockTech                           | /admin/technology/{TechnologyId}/lock                     | LockStackResponse                          |
| 96  | DummyTypes                         | /json/oneway/DummyTypes                                   |                                            |
| 97  | EmailTest                          | /email/post/{PostId}                                      | EmailTestRespoonse                         |
| 98  | ImportUser                         | /json/reply/ImportUser                                    | ImportUserResponse                         |
| 99  | ImportUserVoiceSuggestion          | /import/uservoice/suggestion                              | ImportUserVoiceSuggestionResponse          |
| 100 | Authenticate                       | /auth /auth/{provider}                                    | AuthenticateResponse                       |
| 101 | AssignRoles                        | /assignroles                                              | AssignRolesResponse                        |
| 102 | UnAssignRoles                      | /unassignroles                                            | UnAssignRolesResponse                      |
| 103 | ConvertSessionToToken              | /session-to-token                                         | ConvertSessionToTokenResponse              |
| 104 | GetAccessToken                     | /access-token                                             | GetAccessTokenResponse                     |
| 105 | QueryPostComments                  | GET:/posts/comment                                        | QueryResponse<PostComment>                 |
```

Routes with an associated HTTP Verb, e.g. `GET:/technology` only allows access with that specific verb, if unspecified any verb can be used.

### inspect API

Adding an API Name to the command will let you describe a specific API Endpoint to learn more about its features, restrictions & capabilities, e.g:

    $ x inspect https://techstacks.io LockTechStack

Which will output the APIs description, any tags it was annotated with, its defined routes as well as any Auth Requirements along with all the 
available Auth Providers registered, e.g:

```
# LockTechStack
Limit updates to TechStack to Owner or Admin users

Tags:               [TechStacks]
Routes:             /admin/techstacks/{TechnologyStackId}/lock

# Requires Auth
Auth Providers:     twitter (oauth), github (oauth), jwt (Bearer), servicestack (credentials)
Roles:              Admin


# C# DTOs:


using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;


public partial class LockStackResponse
{
}

///<summary>
///Limit updates to TechStack to Owner or Admin users
///</summary>
[Route("/admin/techstacks/{TechnologyStackId}/lock")]
public partial class LockTechStack
    : IReturn<LockStackResponse>, IPut
{
    [Validate("GreaterThan(0)")]
    public virtual long TechnologyStackId { get; set; }

    public virtual bool IsLocked { get; set; }
}
```

Whilst the C# code defines the API Service Contract including any user-defined routes, its Response Type including all referenced DTO Types, what HTTP Verb it should be called with as well as any declarative validation rules when defined. The properties on the Request DTO define the Typed Inputs that the API Accepts whilst the Response DTO describes what a successful Response will return.

Thanks to ServiceStack's [unique message-based design](https://youtu.be/Vae0ALalIP0) the code contract used to define the Service is also all that's needed to invoke the API along with the generic ServiceStack Client library which for .NET is available in the **ServiceStack.Client** NuGet package:

    $ dotnet add package ServiceStack.Client

Which together with the above C# DTOs enables its optimal end-to-end typed API:

```csharp
var client = new JsonServiceClient("https://techstacks.io");

client.Send(new LockTechStack { TechnologyStackId = id, IsLocked = true });
```

Request DTOs annotated with an `IVerb` interface marker (e.g. `IPut`) can instead use `Send()` to invoke the API with that HTTP Verb.

This same simplified usage scenario is also available in each of [Add ServiceStack Reference](/add-servicestack-reference) supported Languages:

 - [C#](/csharp-add-servicestack-reference)
 - [Python](/python-add-servicestack-reference)
 - [TypeScript](/typescript-add-servicestack-reference)
 - [Dart](/dart-add-servicestack-reference)
 - [Java](/java-add-servicestack-reference)
 - [Kotlin](/kotlin-add-servicestack-reference)
 - [Swift](/swift-add-servicestack-reference)
 - [F#](/fsharp-add-servicestack-reference)
 - [VB.NET](/vbnet-add-servicestack-reference)

Where the `-lang` option can be used to change what language to return the DTO Types in:

```
Usage: x inspect <base-url> <request> -lang <csharp|python|typescript|dart|java|kotlin|swift|fsharp|vbnet>
       x inspect <base-url> <request> -lang <cs|py|ts|da|ja|kt|sw|fs|vb>
```

For example to view the DTOs in Swift run:

    $ x inspect https://techstacks.io LockTechStack -lang swift

Output:

```
# LockTechStack
Limit updates to TechStack to Owner or Admin users

Tags:               [TechStacks]
Routes:             /admin/techstacks/{TechnologyStackId}/lock

# Requires Auth
Auth Providers:     twitter (oauth), github (oauth), jwt (Bearer), servicestack (credentials)
Roles:              Admin


# Swift DTOs:


import Foundation
import ServiceStack

/**
* Limit updates to TechStack to Owner or Admin users
*/
// @Route("/admin/techstacks/{TechnologyStackId}/lock")
public class LockTechStack : IReturn, IPut, Codable
{
    public typealias Return = LockStackResponse

    // @Validate(Validator="GreaterThan(0)")
    public var technologyStackId:Int?

    public var isLocked:Bool?

    required public init(){}
}

public class LockStackResponse : Codable
{
    required public init(){}
}
```

## send - Invoking APIs

In addition to being able to invoke ServiceStack APIs natively in each supported language, they can also be invoked with just a single command-line.

Running `x send` will display different example usage of this versatile tool which supports most of 
[ServiceStack's Authentication options](/authentication-and-authorization):

```
Usage: x <send|GET|POST|PUT|DELETE|PATCH> <base-url> <request>
       x <send|GET|POST|PUT|DELETE|PATCH> <base-url> <request> {js-object}
       x <send|GET|POST|PUT|DELETE|PATCH> <base-url> <request> < body.json

Options:
 -raw                   Show raw HTTP Headers and Body
 -token <token>         Use JWT or API Key Bearer Token
 -basic <user:pass>     Use HTTP Basic Auth
 -authsecret <secret>   Use Admin Auth Secret
 -ss-id <session-id>    Use ss-id Session Id Cookie
 -cookies <file>        Store and Load Cookies from file
```

HTTP APIs can be invoked with a specific HTTP Verb or **send** which will use the APIs preferred HTTP Method when it can be inferred e.g. Request DTO is annotated with `IVerb` interface marker or its implementation uses a HTTP Verb method name instead of `Any()`.

### Invoking APIs without arguments

APIs that don't require arguments can be invoked with just their names, e.g. we can invoke the [GetLocations](https://covid-vac-watch.netcore.io/json/metadata?op=GetLocations)
Covid 19 Vaccine Watch API with either:

    $ x send https://covid-vac-watch.netcore.io GetLocations
    $ x GET https://covid-vac-watch.netcore.io GetLocations

Output:

```
locations:
  Alabama
  Alaska
  American Samoa
  Arizona
  Arkansas
  Bureau of Prisons
  California
  Colorado
  Connecticut
  Delaware
  Dept of Defense
  District of Columbia
  Federated States of Micronesia
  Florida
  Georgia
  ...
```

By default APIs return a human friendly text output optimal for reading at a glance. 

If preferred you can instead view the full HTTP Response including HTTP Headers by adding the `-raw` flag, e.g:

    $ x send https://covid-vac-watch.netcore.io GetLocations -raw

Output:

```
GET /json/reply/GetLocations HTTP/1.1
Host: covid-vac-watch.netcore.io
Accept: application/json

HTTP/1.1 200 OK
Server: nginx/1.19.3
Date: Wed, 28 Jul 2021 07:39:34 GMT
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept
X-Powered-By: ServiceStack/5.111 NetCore/Linux
Strict-Transport-Security: max-age=31536000
Content-Type: application/json; charset=utf-8

{"locations":["Alabama","Alaska","American Samoa","Arizona","Arkansas","Bureau of Prisons","California","Colorado","Connecticut","Delaware","Dept of Defense","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indian Health Svc","Indiana","Iowa","Kansas","Kentucky","Long Term Care","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York State","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Republic of Palau","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","United States","Utah","Vermont","Veterans Health","Virgin Islands","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]}
```

### Invoking APIs with Arguments

To invoke an API with arguments we can use a JavaScript Object Literal which allows a wrist-friendly syntax for invoking any API including rich [AutoQuery APIs](https://servicestack.net/autoquery) which thanks to its human friendly output allows quickly inferring Query result-sets from a glance, e.g:

#### Quote Arguments in Unix Shells

Since JavaScript operators have special meaning in Unix shells you'd need to wrap the object literal in double quotes to have the shell pass it verbatim to the command tool without evaluating it, e.g:

Windows / Linux / macOS:

    $ x send https://techstacks.io FindTechnologies "{Ids:[1,2,6],VendorName:'Google',Take:1}"

Windows Only:

    $ x send https://techstacks.io FindTechnologies {Ids:[1,2,6],VendorName:'Google',Take:1}

So requests that doesn't use any special batch characters can be sent with or without quotes. An alternative way to by pass the shell is to redirect a JSON Request body instead, e.g:

    $ x send https://techstacks.io FindTechnologies < FindTechnologies.json

#### Last 5 Recorded Dates of Vaccinated people in Alaska

    $ x send https://covid-vac-watch.netcore.io QueryVaccinationRates {Location:'Alaska',orderBy:'-date',take:5,Fields:'id,date,peopleVaccinated',include:'total'}

Output:

```
offset:   0
total:    195

results:
| # | id    | date                        | peopleVaccinated |
|---|-------|-----------------------------|------------------|
| 1 | 12308 | 2021-07-25T00:00:00.0000000 |           372940 |
| 2 | 12307 | 2021-07-24T00:00:00.0000000 |           372902 |
| 3 | 12306 | 2021-07-23T00:00:00.0000000 |           372132 |
| 4 | 12305 | 2021-07-22T00:00:00.0000000 |           371514 |
| 5 | 12304 | 2021-07-21T00:00:00.0000000 |           371062 |
```

#### Multi conditional TechStacks query

    $ x send https://techstacks.io FindTechnologies {Ids:[1,2,6],VendorName:'Google',Take:10,Fields:'Id,Name,VendorName,Tier,FavCount,ViewCount'}

Output:

```
offset:   0
total:    18

results:
| #  | id | name                   | vendorName   | tier                   | viewCount | favCount |
|----|----|------------------------|--------------|------------------------|-----------|----------|
| 1  |  1 | ServiceStack           | ServiceStack | Server                 |      4204 |        5 |
| 2  |  2 | PostgreSQL             | PostgreSQL   | Data                   |      2291 |        4 |
| 3  |  6 | AWS RDS                | Amazon       | Data                   |       625 |        1 |
| 4  |  7 | AngularJS              | Google       | Client                 |      5012 |        1 |
| 5  | 13 | Google Closure Library | Google       | Client                 |       390 |        1 |
| 6  | 15 | Dart                   | Google       | ProgrammingLanguage    |       320 |        2 |
| 7  | 18 | Go                     | Google       | ProgrammingLanguage    |      3865 |        2 |
| 8  | 57 | LevelDB                | Google       | Data                   |       325 |        1 |
| 9  | 61 | Firebase               | Google       | Data                   |       722 |        1 |
| 10 | 72 | Google Cloud Platform  | Google       | HardwareInfrastructure |       269 |        1 |
```

### Invoking Complex APIs

As ServiceStack APIs supports [nested complex types in query strings](https://docs.servicestack.net/routing#populating-complex-type-properties-on-querystring) the JS Object Request body will be able to scale to execute even deeply complicated API requests in both HTTP Methods without Request Bodies, e.g:

#### Example GET Request

    $ x GET http://test.servicestack.net StoreLogs {Loggers:[{Id:786,Devices:[{Id:5955,Type:'Panel',TimeStamp:1,Channels:[{Name:'Temperature',Value:'58'},{Name:'Status',Value:'On'}]}]}]} -raw

Where they're sent on the query string:

```
GET /json/reply/StoreLogs?Loggers=%5b%7bId%3a786,Devices%3a%5b%7bId%3a5955,Type%3aPanel,TimeStamp%3a1,Channels%3a%5b%7bName%3aTemperature,Value%3a58%7d,%7bName%3aStatus,Value%3aOn%7d%5d%7d%5d%7d%5d HTTP/1.1
Host: test.servicestack.net
Accept: application/json

HTTP/1.1 200 OK
Server: nginx/1.18.0, (Ubuntu)
Date: Wed, 28 Jul 2021 07:40:26 GMT
Transfer-Encoding: chunked
Connection: keep-alive
Set-Cookie: ss-id=nt6W8DDHatjwf0kToEUa; path=/; samesite=strict; httponly, ss-pid=GsP8tmccacQn0fH8vOAD; expires=Sun, 28 Jul 2041 07:40:26 GMT; path=/; samesite=strict; httponly
Vary: Accept
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, Allow, Authorization, X-Args
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
X-Powered-By: ServiceStack/5.111 NetCore/Linux
Content-Type: application/json; charset=utf-8

{"existingLogs":[{"id":786,"devices":[{"id":5955,"type":"Panel","timeStamp":1,"channels":[{"name":"Temperature","value":"58"},{"name":"Status","value":"On"}]}]}]}
```

#### Example POST Request

As well as HTTP Requests with Request bodies where only the method used needs to change whilst the Request JS Object literal stays exactly the same, e.g:

    $ x POST http://test.servicestack.net StoreLogs {Loggers:[{Id:786,Devices:[{Id:5955,Type:'Panel',TimeStamp:1,Channels:[{Name:'Temperature',Value:'58'},{Name:'Status',Value:'On'}]}]}]} -raw

Where instead of being sent on the query string it's posted inside a JSON Request body, irrespective of how its sent a ServiceStack API supporting any HTTP Method by being implemented with the `Any()` method name will result in an identical response:

```
POST /json/reply/StoreLogs HTTP/1.1
Host: test.servicestack.net
Accept: application/json
Content-Type: application/json
Content-Length: 157

{"Loggers":[{"Id":786,"Devices":[{"Id":5955,"Type":"Panel","TimeStamp":1,"Channels":[{"Name":"Temperature","Value":"58"},{"Name":"Status","Value":"On"}]}]}]}

HTTP/1.1 200 OK
Server: nginx/1.18.0, (Ubuntu)
Date: Wed, 28 Jul 2021 07:40:54 GMT
Transfer-Encoding: chunked
Connection: keep-alive
Set-Cookie: ss-id=X1BmXXrr9vr5DIpAoxFM; path=/; samesite=strict; httponly, ss-pid=J8kDBiJ37WEOnywRdGMS; expires=Sun, 28 Jul 2041 07:40:54 GMT; path=/; samesite=strict; httponly
Vary: Accept
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, Allow, Authorization, X-Args
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
X-Powered-By: ServiceStack/5.111 NetCore/Linux
Content-Type: application/json; charset=utf-8

{"existingLogs":[{"id":786,"devices":[{"id":5955,"type":"Panel","timeStamp":1,"channels":[{"name":"Temperature","value":"58"},{"name":"Status","value":"On"}]}]}]}
```

#### Redirected Input Example 

For requests that get significantly large it may be more convenient to maintain the request body in a separate file that you can pipe into the command instead, e.g:

    $ x send http://test.servicestack.net StoreLogs -raw < StoreLogs.json

Output:
```
POST /json/reply/StoreLogs HTTP/1.1
Host: test.servicestack.net
Accept: application/json
Content-Type: application/json
Content-Length: 157

{"Loggers":[{"Id":786,"Devices":[{"Id":5955,"Type":"Panel","TimeStamp":1,"Channels":[{"Name":"Temperature","Value":"58"},{"Name":"Status","Value":"On"}]}]}]}

HTTP/1.1 200 OK
Server: nginx/1.18.0, (Ubuntu)
Date: Wed, 28 Jul 2021 07:41:38 GMT
Transfer-Encoding: chunked
Connection: keep-alive
Set-Cookie: ss-id=kScY3mYF06e3iuPaCnaD; path=/; samesite=strict; httponly, ss-pid=hpbimtl9dIWA1IbJPMXN; expires=Sun, 28 Jul 2041 07:41:38 GMT; path=/; samesite=strict; httponly
Vary: Accept
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, Allow, Authorization, X-Args
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
X-Powered-By: ServiceStack/5.111 NetCore/Linux
Content-Type: application/json; charset=utf-8

{"existingLogs":[{"id":786,"devices":[{"id":5955,"type":"Panel","timeStamp":1,"channels":[{"name":"Temperature","value":"58"},{"name":"Status","value":"On"}]}]}]}
```

Remove the `-raw` option to display the response in a more human-friendly readable format:

    $ x send http://test.servicestack.net StoreLogs < StoreLogs.json

Output:
```
[existingLogs]
id:       786

[devices]
id:         5955
type:       Panel
timeStamp:  1

channels:
| # | name        | value |
|---|-------------|-------|
| 1 | Temperature | 58    |
| 2 | Status      | On    |
```

## Authentication

To support making Authenticated Requests most of ServiceStack's built-in Authentication Options are supported from the options below:

```
Options:
 -token <token>         Use JWT or API Key Bearer Token
 -basic <user:pass>     Use HTTP Basic Auth
 -authsecret <secret>   Use Admin Auth Secret
 -ss-id <session-id>    Use ss-id Session Id Cookie
 -cookies <file>        Store and Load Cookies from file
```

Since Username/Password Credentials Auth is a normal ServiceStack API we can invoke it like normal, e.g:

    $ x send http://test.servicestack.net Authenticate {provider:'credentials',username:'admin',password:'test'}

However to hide your credentials from command history logs you'll likely want to maintain your credentials in a separate file, e.g:

    $ x send http://test.servicestack.net Authenticate < auth.json

Which if successful will return a populated human-friendly `AuthenticateResponse`:

```
userId:          2
sessionId:       QfJLhmd8XQxeuAIqvoCY
userName:        admin
displayName:     admin DisplayName
bearerToken:     eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjNuLyJ9.eyJzdWIiOjIsImlhdCI6MTYyNzM4MjY5NiwiZXhwIjoxNjI4NTkyMjk2LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJGaXJzdCBhZG1pbiIsImZhbWlseV9uYW1lIjoiTGFzdCBhZG1pbiIsIm5hbWUiOiJhZG1pbiBEaXNwbGF5TmFtZSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQWRtaW4iXSwianRpIjozfQ.j80f1KYsNRDhygO817NSaqYg7DIR1ptLZQUB1mZd_R8
refreshToken:    eyJ0eXAiOiJKV1RSIiwiYWxnIjoiSFMyNTYiLCJraWQiOiIzbi8ifQ.eyJzdWIiOjIsImlhdCI6MTYyNzM4MjY5NiwiZXhwIjoxNjU4OTE4Njk2LCJqdGkiOi0zfQ.nkwDYvmB5_QHm6hmVv8Thfl2Iz8W_LUDf6bspb-Nu2c
profileUrl:      data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3E .path%7B%7D %3C/style%3E %3Cg id='male-svg'%3E%3Cpath fill='%23556080' d='M1 92.84V84.14C1 84.14 2.38 78.81 8.81 77.16C8.81 77.16 19.16 73.37 27.26 69.85C31.46 68.02 32.36 66.93 36.59 65.06C36.59 65.06 37.03 62.9 36.87 61.6H40.18C40.18 61.6 40.93 62.05 40.18 56.94C40.18 56.94 35.63 55.78 35.45 47.66C35.45 47.66 32.41 48.68 32.22 43.76C32.1 40.42 29.52 37.52 33.23 35.12L31.35 30.02C31.35 30.02 28.08 9.51 38.95 12.54C34.36 7.06 64.93 1.59 66.91 18.96C66.91 18.96 68.33 28.35 66.91 34.77C66.91 34.77 71.38 34.25 68.39 42.84C68.39 42.84 66.75 49.01 64.23 47.62C64.23 47.62 64.65 55.43 60.68 56.76C60.68 56.76 60.96 60.92 60.96 61.2L64.74 61.76C64.74 61.76 64.17 65.16 64.84 65.54C64.84 65.54 69.32 68.61 74.66 69.98C84.96 72.62 97.96 77.16 97.96 81.13C97.96 81.13 99 86.42 99 92.85L1 92.84Z'/%3E%3C/g%3E%3C/svg%3E

[roles]
Admin
```

### Authentication -cookies

Likely the easiest and most versatile authentication option would be to use a separate cookies file where it will load and save cookies after each request allowing each request to be made within the context of the same authenticated session as done in browsers, e.g:

    $ x send -cookies cookies.xml http://test.servicestack.net Authenticate < auth.json

We can test that it's working by first trying to call an Authentication protected Service without any Authentication options, e.g:

    $ x send http://test.servicestack.net HelloSecure {name:'World'}

Output:

```
The remote server returned an error: (401) Not Authenticated.
```

Then re-trying the request, providing the **cookies.xml** that was populated after the success Authentication:

    $ x send -cookies cookies.xml http://test.servicestack.net HelloSecure {name:'World'}

Output:

```
result:  Hello, World!
```

The `-cookies` Authentication option is the most versatile as it supports standard [Server Sessions](/sessions) as well as stateless Authentication options like [JWT Auth configured with Token Cookies](/jwt-authprovider#enable-server-cookies) where the JWT Bearer Token is maintained in a cookie.

### Authentication -token

The `-token` Authentication option should be used when authenticating with Bearer Tokens like [JWT](/jwt-authprovider) or [API Key](/api-key-authprovider) Auth Providers. 
When the `JwtAuthProvider` is configured a successful Authentication Response will return a populated **bearerToken** which we can use to authenticate with instead. As Bearer Tokens can become quite verbose you may want to choose to save in a shell environment variable instead, e.g:

**Windows:**

    $ set TOKEN=...
    $ x send -token %TOKEN% http://test.servicestack.net HelloSecure {name:'World'}

**Linux / macOS:**

    $ TOKEN=...
    $ x send -token $TOKEN http://test.servicestack.net HelloSecure "{name:'World'}"


Output:

```
result:  Hello, World!
```

### Inspect JWTs

When working with JWTs it can be useful to quickly inspect its contents which we can do with `inspect-jwt`:

```
Usage: x inspect-jwt <jwt>
       x inspect-jwt < file.txt
```

Which we can use with the populated **bearerToken** above to inspect the contents of the JWT in a human-friendly format, e.g:

    $ x inspect-jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjNuLyJ9.eyJzdWIiOjIsImlhdCI6MTYyNjg0OTEzMCwiZXhwIjoxNjI4MDU4NzMwLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJGaXJzdCBhZG1pbiIsImZhbWlseV9uYW1lIjoiTGFzdCBhZG1pbiIsIm5hbWUiOiJhZG1pbiBEaXNwbGF5TmFtZSIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQWRtaW4iXSwianRpIjo5fQ.uLp_QkmBo6J6TlXiUPl0Iq6TkTbF0xzncbUI1HmDro4

Output:

```
[JWT Header]
typ:  JWT
alg:  HS256
kid:  3n/


[JWT Payload]
sub:                 2
iat:                 1626849130 (Wed, 21 Jul 2021 06:32:10 GMT)
exp:                 1628058730 (Wed, 04 Aug 2021 06:32:10 GMT)
email:               admin@gmail.com
given_name:          First admin
family_name:         Last admin
name:                admin DisplayName
preferred_username:  admin

[roles]
Admin

jti:                 9
```

### Authentication -basic

When the `BasicAuthProvider` is configured we can authenticate with HTTP Basic Auth using the `-basic` command line option which supports both clear text:

    $ x send -basic admin:test http://test.servicestack.net HelloSecure {name:'World'}

Output:

    $ x send -basic admin:test http://test.servicestack.net HelloSecure {name:'World'}

As well as Base64 encoded credentials which we can convert using the `x base64` tool, e.g:

    $ x base64 admin:test

Output:

```
YWRtaW46dGVzdA==
```

    $ x send -basic YWRtaW46dGVzdA== http://test.servicestack.net HelloSecure {name:'World'}

Output:

```
result:  Hello, World!
```

Although a Base64 encoded password does not offer much protection for your password (e.g. it can be decoded with `x unbase64 YWRtaW46dGVzdA==`), to avoid your password from being captured in shell command history we can instead read it from a plain text file, e.g:

    $ set /P basic=<credentials.txt
    $ x send -basic %basic% http://test.servicestack.net HelloSecure {name:'World'}

Output:

```
result:  Hello, World!
```

### Authentication -authsecret

If the remote ServiceStack App is [configured with an Admin Auth Secret](/debugging#authsecret), i.e:

```csharp
SetConfig(new HostConfig { AdminAuthSecret = "secretz" });
```

It can be used to authenticated with using the `-authsecret` option:

    $ x send -authsecret secretz http://test.servicestack.net HelloSecure {name:'World'}


Output:

```
result:  Hello, World!
```

### Authentication -ss-id

When the remote ServiceStack App is configured to use Server Sessions you can impersonate a pre-authenticated Users Session using the `-ss-id` Authentication option which is useful for impersonating an existing Users Session by copying their `ss-id` or `ss-pid` Cookie which you can find in Web Inspector's **Application** page:

![](../images/auth/webinspector-cookies.png)

If Users were authenticated with **Remember Me** checked their Session will be stored against the `ss-pid` Cookie otherwise it will use the `ss-id` Session Cookie.

Making a `GET` request to the `Authenticate` API is another way you can test which user you're authenticated as, e.g:

    $ x GET -ss-id FoCHJK9Apl9mrcaq3ceE https://vue-spa.web-templates.io Authenticate

Output:

```
userId:          1
sessionId:       FoCHJK9Apl9mrcaq3ceE
userName:        admin@email.com
displayName:     Admin User
profileUrl:      data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3E .path%7B%7D %3C/style%3E %3Cg id='male-svg'%3E%3Cpath fill='%23556080' d='M1 92.84V84.14C1 84.14 2.38 78.81 8.81 77.16C8.81 77.16 19.16 73.37 27.26 69.85C31.46 68.02 32.36 66.93 36.59 65.06C36.59 65.06 37.03 62.9 36.87 61.6H40.18C40.18 61.6 40.93 62.05 40.18 56.94C40.18 56.94 35.63 55.78 35.45 47.66C35.45 47.66 32.41 48.68 32.22 43.76C32.1 40.42 29.52 37.52 33.23 35.12L31.35 30.02C31.35 30.02 28.08 9.51 38.95 12.54C34.36 7.06 64.93 1.59 66.91 18.96C66.91 18.96 68.33 28.35 66.91 34.77C66.91 34.77 71.38 34.25 68.39 42.84C68.39 42.84 66.75 49.01 64.23 47.62C64.23 47.62 64.65 55.43 60.68 56.76C60.68 56.76 60.96 60.92 60.96 61.2L64.74 61.76C64.74 61.76 64.17 65.16 64.84 65.54C64.84 65.54 69.32 68.61 74.66 69.98C84.96 72.62 97.96 77.16 97.96 81.13C97.96 81.13 99 86.42 99 92.85L1 92.84Z'/%3E%3C/g%3E%3C/svg%3E

[roles]
Admin
```
