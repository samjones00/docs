---
slug: create-your-first-webservice
title: Create your first WebService
---

This is a quick walkthrough of getting your first web service up and running whilst having a look at the how some of the different components work. 

## Step 1: Download and the x dotnet tool

First we want to install the [x dotnet tool](/dotnet-tool) 

    $ dotnet tool install --global x 

Which is ServiceStack's versatile companion giving you quick access to a lot of its high-level features including 
[Add ServiceStack Reference](/add-servicestack-reference) generating [gRPC Clients and proto messages](/grpc) or to
[quickly apply gists](/mix-tool) to your project taking advantage of ServiceStack's effortless [no-touch Modular features](/modular-startup), it even
includes a [lisp REPL](https://sharpscript.net/lisp/) should you need to quickly [explore your remote .NET Core App](https://sharpscript.net/lisp/#techstacks-tcp-lisp-repl-demo). 

## Step 2: Selecting a template

Importantly, the dotnet tools lets you create [.NET Core, .NET Framework](/dotnet-new) and [ASP.NET Core on .NET Framework](/templates-corefx) projects.
Unless you're restricted to working with .NET Framework you'll want to [start with a .NET Core project template](/dotnet-new#usage), for this example
we'll start with the Empty [web](https://github.com/NetCoreTemplates/web) template:

    $ x new web WebApp

## Step 3: Run your project

Press `Ctrl+F5` to run your project!

[![](https://raw.githubusercontent.com/ServiceStack/ServiceStackVS/master/Images/empty_project_run.png)](https://raw.githubusercontent.com/ServiceStack/ServiceStackVS/master/Images/empty_project_run.png)

#### Watched builds

An alternative to running your project in your IDE is to run a watched build using the `dotnet` tool on the command-line:

    $ dotnet watch run

Where it will automatically rebuild & restart your App when it detects any changes to your App's source files.

### How does it work?

Now that your new project is running, let's have a look at what we have. The template comes with a single web service route which comes from the request DTO (Data Transfer Object) which is located in the WebApplication1.ServiceModel project under `Hello.cs` file.

```csharp
[Route("/hello/{Name}")]
public class Hello : IReturn<HelloResponse>
{
    public string Name { get; set; }
}

public class HelloResponse
{
    public string Result { get; set; }
}
```

The `Route` attribute is specifying what path `/hello/{Name}` where `{Name}` binds its value to the public string property of **Name**.

Let's access the route to see what comes back. Go to the following URL in your address bar, where <root_path> is your server address.

    http://{BaseUrl}/hello/world

You will see a snapshot of the Result in a HTML response format. To change the return format to Json, simply add `?format=json` to the end of the URL. You'll learn more about formats, endpoints (URLs, etc) when you continue reading the documentation.

If we go back to the solution and find the WebApplication1.ServiceInterface and open the `MyServices.cs` file, we can have a look at the code that is responding to the browser, giving us the `Result` back.

```csharp
public class MyServices : Service
{
    public object Any(Hello request)
    {
        return new HelloResponse { Result = $"Hello, {request.Name}!" };
    }
}
```

If we look at the code above, there are a few things to note. The name of the method `Any` means the server will run this method for any of the valid HTTP Verbs. Service methods are where you control what returns from your service.

## Step 4: Exploring the ServiceStack Solution

The Recommended structure below is built into all ServiceStackVS VS.NET Templates where creating any new ServiceStack 
project will create a solution with a minimum of 4 projects below ensuring ServiceStack solutions starts off from an optimal 
logical project layout, laying the foundation for growing into a more maintainable, cohesive and reusable code-base:

<img align="right" src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/solution-layout.png" />

### Host Project

The Host project contains your AppHost which references and registers all your App's concrete dependencies in its IOC and is the central location where all App configuration and global behavior is maintained. It also references all Web Assets like Razor Views, JS, CSS, Images, Fonts, etc. that's needed to be deployed with the App. The AppHost is the top-level project which references all dependencies used by your App whose role is akin to an orchestrator and conduit where it decides what functionality is made available and which concrete implementations are used. By design it references all other (non-test) projects whilst nothing references it and as a goal should be kept free of any App or Business logic.

### ServiceInterface Project

The ServiceInterface project is the implementation project where all Business Logic and Services live which typically references every other project except the Host projects. Small and Medium projects can maintain all their implementation here where logic can be grouped under feature folders. Large solutions can split this project into more manageable cohesive and modular projects which we also recommend encapsulates any dependencies they might use.

### ServiceModel Project

The ServiceModel Project contains all your Application's DTOs which is what defines your Services contract, keeping them isolated from any Server implementation is how your Service is able to encapsulate its capabilities and make them available behind a remote facade. There should be only one ServiceModel project per solution which contains all your DTOs and should be implementation, dependency and logic-free which should only reference the impl/dep-free **ServiceStack.Interfaces.dll** contract assembly to ensure Service contracts are decoupled from its implementation, enforces interoperability ensuring that your Services don't mandate specific client implementations and will ensure this is the only project clients need to be able to call any of your Services by either referencing the **ServiceModel.dll** directly or downloading the DTOs from a remote ServiceStack instance using [Add ServiceStack Reference](/add-servicestack-reference):

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/dtos-role.png)

### Test Project

The Unit Test project contains all your Unit and Integration tests. It's also a Host project that typically references all other non-Host projects in the solution and contains a combination of concrete and mock dependencies depending on what's being tested. See the [Testing Docs](/testing) for more information on testing ServiceStack projects.

### ServiceStack Integration

ServiceStack's clean Web Services design makes it simple and intuitive to be able to call ServiceStack Services from any kind of client from a [simple Bootstrap Website using jQuery](https://github.com/ServiceStack/Templates/blob/master/src/ServiceStackVS/BootstrapWebApp/BootstrapWebApp/default.cshtml):

```html
<div>
    <div>
        <input class="form-control" id="Name" type="text" placeholder="Type your name">
        <p id="result"></p>
    </div>
</div>
<script>
    $('#Name').keyup(function () {
        var name = $(this).val();
        if (name) {
            $.getJSON('/hello/' + name)
                .success(function (response) {
                    $('#result').html(response.Result);
                });
        } else {
            $('#result').html('');
        }
    });
</script>
```

To sophisticated Single Page Apps using [TypeScript JsonServiceClient](/typescript-add-servicestack-reference#typescript-serviceclient), here's an 
[example using React](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/ReactApp1/ReactApp1/src/home/Hello.tsx):

```ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { client } from '../shared';
import { Hello } from '../dtos';

export default class HelloComponent extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
        this.state = { result: '' };
    }

    componentDidMount() {
        this.nameChanged(this.props.name);
    }

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

    render() {
        return (
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Your name"
                    defaultValue={this.props.name}
                    onChange={e => this.nameChanged((e.target as HTMLInputElement).value)} />
                <h3 className="result">{this.state.result}</h3>
            </div>);
    }
}
```

Compare and contrast with other major JavaScript Frameworks:

 - [Vue.js Home.vue](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/VueApp/VueApp/src/home/Home.vue)
 - [Angular4 hello.ts](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/Angular4App/Angular4App/src/modules/app/home/hello.ts)
 - [Aurelia hello.ts](https://github.com/ServiceStack/Templates/blob/master/src/SinglePageApps/AureliaApp/AureliaApp/src/resources/elements/hello.ts)
 - [Angular.js v1.5 using $http](https://github.com/ServiceStack/Templates/blob/master/src/ServiceStackVS/AngularJSApp/AngularJSApp/js/hello/controllers.js)

### Integrated with Major IDEs and most popular Mobile and Desktop platforms

ServiceStack Services are also [easily consumable from all major Mobile and Desktop platforms](/why-servicestack#generate-instant-typed-apis-from-within-all-major-ides) including native iPhone and iPad Apps on iOS with Swift, Mobile and Tablet Apps on Android with Java or Kotlin, OSX Desktop Appications as well as targetting the most popular .NET Mobile and Desktop platforms including Xamarin.iOS, Xamarin.Android, Windows Store, WPF, WinForms and Silverlight.

## [Create a WebService from scratch](/create-your-first-webservice)

If you prefer, you can instead [create a ServiceStack Web Service from a blank ASP.NET Web Application](/create-your-first-webservice) another popular option is to [Add ServiceStack to an existing ASP.NET MVC Application](/mvc-integration)

## [Explore more ServiceStack features](https://github.com/ServiceStackApps/EmailContacts/)

The [EmailContacts solution](https://github.com/ServiceStackApps/EmailContacts/) is a new guidance available that walks through the recommended setup and physical layout structure of typical medium-sized ServiceStack projects, including complete documentation of how to create the solution from scratch, whilst explaining all the ServiceStack features it makes use of along the way.

## Community Resources

  - [Creating A Simple Service Using ServiceStack](http://shashijeevan.net/2015/09/20/creating-a-simple-service-using-servicestack/) by [Shashi Jeevan](http://shashijeevan.net/author/shashijeevan/)
  - [Introducing ServiceStack](http://www.dotnetcurry.com/showarticle.aspx?ID=1056) by [@dotnetcurry](https://twitter.com/DotNetCurry)
  - [Create web services in .NET in a snap with ServiceStack](http://www.techrepublic.com/article/create-web-services-in-net-in-a-snap-with-servicestack/) by [@techrepublic](https://twitter.com/techrepublic)
  - [How to build web services in MS.Net using ServiceStack](http://kborra.wordpress.com/2014/07/29/how-to-build-web-services-in-ms-net-using-service-stack/) by [@kishoreborra](http://kborra.wordpress.com/about/)
  - [Creating a Web API using ServiceStack](http://blogs.askcts.com/2014/05/15/getting-started-with-servicestack-part-3/) by [Lydon Bergin](http://blogs.askcts.com/)
  - [Getting Started with ServiceStack: Part 1](http://blogs.askcts.com/2014/04/23/getting-started-with-servicestack-part-one/) by [Lydon Bergin](http://blogs.askcts.com/)
  - [Getting started with ServiceStack – Creating a service](http://dilanperera.wordpress.com/2014/02/22/getting-started-with-servicestack-creating-a-service/)
  - [ServiceStack Quick Start](http://mediocresoft.com/things/servicestack-quick-start) by [@aarondandy](https://github.com/aarondandy)
  - [Fantastic Step-by-step walk-thru into ServiceStack with Screenshots!](http://nilsnaegele.com/codeedge/servicestack.html) by [@nilsnagele](https://twitter.com/nilsnagele)
  - [Your first REST service with ServiceStack](http://tech.pro/tutorial/1148/your-first-rest-service-with-servicestack) by [@cyberzeddk](https://twitter.com/cyberzeddk)
  - [New course: Using ServiceStack to Build APIs](http://blog.pluralsight.com/2012/11/29/new-course-using-servicestack-to-build-apis/) by [@pluralsight](http://twitter.com/pluralsight)
  - [ServiceStack the way I like it](http://tonyonsoftware.blogspot.co.uk/2012/09/lessons-learned-whilst-using.html) by [@tonydenyer](https://twitter.com/tonydenyer)
  - [Generating a RESTful Api and UI from a database with LLBLGen](http://www.mattjcowan.com/funcoding/2013/03/10/rest-api-with-llblgen-and-servicestack/) by [@mattjcowan](https://twitter.com/mattjcowan)
  - [ServiceStack: Reusing DTOs](http://korneliuk.blogspot.com/2012/08/servicestack-reusing-dtos.html) by [@korneliuk](https://twitter.com/korneliuk)
  - [Using ServiceStack with CodeFluent Entities](http://blog.codefluententities.com/2013/03/06/using-servicestack-with-codefluent-entities/) by [@SoftFluent](https://twitter.com/SoftFluent)
  - [ServiceStack, Rest Service and EasyHttp](http://blogs.lessthandot.com/index.php/WebDev/ServerProgramming/servicestack-restservice-and-easyhttp) by [@chrissie1](https://twitter.com/chrissie1)
  - [Building a Web API in SharePoint 2010 with ServiceStack](http://www.mattjcowan.com/funcoding/2012/05/04/building-a-web-api-in-sharepoint-2010-with-servicestack)
  - [REST Raiding. ServiceStack](http://dgondotnet.blogspot.de/2012/04/rest-raiding-servicestack.html) by [Daniel Gonzalez](http://www.blogger.com/profile/13468563783321963413)
  - [JQueryMobile and ServiceStack: EventsManager tutorial](http://kylehodgson.com/2012/04/21/jquerymobile-and-service-stack-eventsmanager-tutorial-post-2/) / [Part 3](http://kylehodgson.com/2012/04/23/jquerymobile-and-service-stack-eventsmanager-tutorial-post-3/) by [+Kyle Hodgson](https://plus.google.com/u/0/113523377752095590770/posts)
  - [Like WCF: Only cleaner!](http://kylehodgson.com/2012/04/18/like-wcf-only-cleaner-9/) by [+Kyle Hodgson](https://plus.google.com/u/0/113523377752095590770/posts)
  - [ServiceStack I heart you. My conversion from WCF to SS](http://www.philliphaydon.com/2012/02/service-stack-i-heart-you-my-conversion-from-wcf-to-ss/) by [@philliphaydon](https://twitter.com/philliphaydon)
  - [ServiceStack vs WCF Data Services](http://codealoc.wordpress.com/2012/03/24/service-stack-vs-wcf-data-services/)
  - [Creating a basic catalogue endpoint with ServiceStack](http://blogs.7digital.com/dev/2011/10/17/creating-a-basic-catalogue-endpoint-with-servicestack/) by [7digital](http://blogs.7digital.com)
  - [Buildiing a Tridion WebService with jQuery and ServiceStack](http://www.curlette.com/?p=161) by [@robrtc](https://twitter.com/#!/robrtc)
  - [Anonymous type + Dynamic + ServiceStack == Consuming cloud has never been easier](http://www.ienablemuch.com/2012/05/anonymous-type-dynamic-servicestack.html) by [@ienablemuch](https://twitter.com/ienablemuch)
  - [Handful of examples of using ServiceStack based on the ServiceStack.Hello Tutorial](https://github.com/jfoshee/TryServiceStack) by [@82unpluggd](https://twitter.com/82unpluggd)
