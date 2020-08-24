---
slug: vbnet
title: VB.NET Resources
---

There are some nostalgic developers who prefer not to leave their VB.NET days behind them, luckily they blog so other VB.NET developers can easily follow in their footsteps:

### VB .NET Core Project

You can create a new VB .NET Core project in a new empty directory using the [x dotnet tool](https://docs.servicestack.net/dotnet-tool) with:

    $ dotnet tool install --global x 
    $ md ProjectName && cd ProjectName
    $ x mix init-vb
    $ dotnet run

Which will download the [init-vb Gist](https://gist.github.com/gistlyn/88f2792fc4820de7dc4e68c0c5d76126) to your local directory 
where you can use its dep-free [/index.html](https://gist.github.com/gistlyn/88f2792fc4820de7dc4e68c0c5d76126#file-wwwroot-index-html) and its
`JsonServiceClient` to call its **/hello** API:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/v5.9/init.png)

# Community Resources

<!-- Commenting out as all links are crusty and no longer working.
  - [How to set up a VB.Net REST service on ServiceStack](http://fafx.wordpress.com/2013/02/09/how-to-set-up-a-vb-net-rest-service-on-servicestack/) by [The FAfx Project](http://fafx.wordpress.com/)
  - [Servicestack, VB.Net and some easyhttp](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/VBNET/servicestack-vb-net-and-some) by [@chrissie1](https://twitter.com/chrissie1)
  - [Redis and VB.Net](http://blogs.lessthandot.com/index.php/DataMgmt/DBProgramming/redis-and-vb-net) by [@chrissie1](https://twitter.com/chrissie1)

-->