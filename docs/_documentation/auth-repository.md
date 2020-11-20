---
slug: auth-repository
title: Auth Repository
---

ServiceStack Auth supports using your own persistence back-ends but for the most part you should be able to reuse one of the existing [IAuthRepository](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/IAuthRepository.cs): 

  - **OrmLite**: `OrmLiteAuthRepository` in [ServiceStack.Server](https://nuget.org/packages/ServiceStack.Server)
    - [OrmLiteAuthRepositoryMultitenancy](/multitenancy#multitenancy-rdbms-authprovider)
  - **Redis**: `RedisAuthRepository` in [ServiceStack](https://nuget.org/packages/ServiceStack)
  - **Memory**: `InMemoryAuthRepository` in [ServiceStack](https://nuget.org/packages/ServiceStack)
  - **AWS DynamoDB**: `DynamoDbAuthRepository` in [ServiceStack.Aws](https://nuget.org/packages/ServiceStack.Aws)
  - **Mongo DB**: `MongoDBAuthRepository` in [ServiceStack.Authentication.MongoDB](https://nuget.org/packages/ServiceStack.Authentication.MongoDB)
  - **Raven DB**: `RavenUserAuthRepository` in [ServiceStack.Authentication.RavenDB](https://nuget.org/packages/ServiceStack.Authentication.RavenDB)
  - **Marten**: `MartenAuthRepository` in [ServiceStack.Authentication.Marten](https://www.nuget.org/packages/ServiceStack.Authentication.Marten) - [GitHub project](https://github.com/migajek/ServiceStack.Authentication.Marten)
  - **LiteDB**: `LiteDBAuthRepository` in [ServiceStack.Authentication.LiteDB](https://github.com/CaveBirdLabs/ServiceStack.Authentication.LiteDB)

#### Registering an Auth Repository

The `OrmLiteAuthRepository` is the most common Auth Repository which will let you persist User Info in any of the [RDBMS's that OrmLite supports](https://github.com/ServiceStack/ServiceStack.OrmLite#8-flavours-of-ormlite-is-on-nuget). All Auth Repositories are registered by adding a `IAuthRepository` dependency in your IOC, e.g:

```csharp
container.Register<IDbConnectionFactory>(c =>
    new OrmLiteConnectionFactory(connectionString, SqlServer2012Dialect.Provider));

container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()));

container.Resolve<IAuthRepository>().InitSchema();
```

Calling `InitSchema()` will create the necessary RDBMS `UserAuth` and `UserAuthDetails` tables if they don't already exist. By default the Users Roles and Permissions are blobbed on the `UserAuth` table, but if preferred they can optionally be maintained in a separate `UserAuthRole` table with:

```csharp
container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()) {
        UseDistinctRoleTables = true
    });
```

Like the [caching providers](/caching) the `async` Auth Repositories makes use of this existing `IAuthRepository` registration which you can use in your Services to access either `IAuthRepositoryAsync` or `IAuthRepository` APIs above even for your own sync Auth Repos that only implement `IAuthRepository` as it will return a `IAuthRepositoryAsync` wrapper API in its place.

### Mix in Auth Repository

The easiest way to configure a User Auth Repository in your [Modular Startup](/modular-startup) App that new ASP.NET Core templates support
is to [mix them in](/mix-tool#composable-features), e.g. you can configure to use an OrmLiteAuthRepository using SQL Server with:

    $ x mix auth-db sqlserver

You can view other Auth Repository "mix ins" available with:

    $ x mix #auth

and which RDBMS's and NoSQL Data Stores can be easily configured with a mix in:

    $ x mix #db

### Async Auth Repositories

All built-in ServiceStack Auth Repositories implement both `IUserAuthRepository` and `IUserAuthRepositoryAsync` which you can use inside ServiceStack Services with the `AuthRepositoryAsync` property, e.g:

```csharp
//async
public async Task<object> Post(GetUserAuth request)
{
    var userAuth = await AuthRepositoryAsync.GetUserAuthByUserNameAsync(request.UserName);
    if (userAuth == null)
        throw HttpError.NotFound(request.UserName);
    return userAuth;
}

//sync
public object Post(GetUserAuth request)
{
    var userAuth = AuthRepository.GetUserAuthByUserName(request.UserName);
    if (userAuth == null)
        throw HttpError.NotFound(request.UserName);
    return userAuth;
}
```

Outside of ServiceStack you can access it from the AppHost `GetAuthRepositoryAsync()` or `GetAuthRepository()` APIs, e.g:

```csharp
//async
var authRepo = HostContext.AppHost.GetAuthRepositoryAsync();
await using (authRepo as IAsyncDisposable)
{
    //...
}

//sync
var authRepo = HostContext.AppHost.GetAuthRepository();
using (authRepo as IDisposable)
{
    //...
}
```


## Extending UserAuth tables

There are a number of different extensibility options for extending ServiceStack Authentication by linking to external tables with its `RefId` and `RefIdStr` fields or storing custom info in the `Meta` Dictionaries. 

Most Auth Repositories like OrmLite also supports utilizing custom `UserAuth` tables with extended fields which can be configured using its generic Constructor, e.g:

```csharp
public class MyUserAuth : UserAuth { .... }
public class MyUserAuthDetails : UserAuthDetails { .... }
```

```csharp
container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository<MyUserAuth, MyUserAuthDetails>(c.Resolve<IDbConnectionFactory>()) {
        UseDistinctRoleTables = true
    });
```

The [Auth Repository mix gists](/mix-tool#mix-in-auth-repository) are configured with an example using a custom `AppUser` table which are populated using the [Session and Auth Events](/sessions#session-events) hooks, e.g:

```csharp
// Custom User Table with extended Metadata properties
public class AppUser : UserAuth
{
    public string ProfileUrl { get; set; }
    public string LastLoginIp { get; set; }
    public DateTime? LastLoginDate { get; set; }
}

public class AppUserAuthEvents : AuthEvents
{
    public override void OnAuthenticated(IRequest req, IAuthSession session, IServiceBase authService, 
        IAuthTokens tokens, Dictionary<string, string> authInfo)
    {
        var authRepo = HostContext.AppHost.GetAuthRepository(req);
        using (authRepo as IDisposable)
        {
            var userAuth = (AppUser)authRepo.GetUserAuth(session.UserAuthId);
            userAuth.ProfileUrl = session.GetProfileUrl();
            userAuth.LastLoginIp = req.UserHostAddress;
            userAuth.LastLoginDate = DateTime.UtcNow;
            authRepo.SaveUserAuth(userAuth);
        }
    }
}
```

#### Custom UserAuth Tables

If you want to add support for custom `UserAuth` and `UserAuthDetails` tables in your own custom Auth Repositories you'll need to implement the 
`ICustomUserAuth` interface by returning the concrete Type that should be used instead:

```csharp
public interface ICustomUserAuth
{
    IUserAuth CreateUserAuth();
    IUserAuthDetails CreateUserAuthDetails();
}
```

If implementing a generic class like `OrmLiteAuthRepository<TUserAuth,TUserAuthDetails>` you can return new instances of the Generic Type Arguments with:

```csharp
public IUserAuth CreateUserAuth() => (IUserAuth) typeof(TUserAuth).CreateInstance();

public IUserAuthDetails CreateUserAuthDetails() => (IUserAuthDetails) typeof(TUserAuthDetails).CreateInstance();
```

### Adding additional metadata to the Meta dictionary fields

For minor extensions you can use the **Meta** string dictionaries fields on the UserAuth tables to maintain custom metadata. 
They include useful `Get<T>` and `Set<T>` methods which can be used to blob additional complex types with each User, e.g:

```csharp
userAuth.Set(new Address { ... });
var address = userAuth.Get<Address>();
```

### Linking referential data with RefId and RefIdStr fields

The `UserAuth` and `UserAuthDetails` tables also include an `int? RefId` and a `string RefIdStr` fields which you can use to reference external data like your own custom tables against each User Auth record or User OAuth registration.

### Extend UserAuthSession with your own typed Custom Session

In addition to a Custom UserAuth tables you can also use a custom `AuthUserSession` for maintaining typed Users Sessions which get blobbed in a fast [Caching Provider](/caching) where its schema-less persistance characteristics, easily supports fast access to extended types.

```csharp
public class CustomUserSession : AuthUserSession { ... }

appHost.Plugins.Add(new AuthFeature(
    () => new CustomUserSession(), ...);
```

### IManageRoles API

The [IManageRoles API](https://github.com/ServiceStack/ServiceStack/blob/4398438e058851847033f2da923fe0221a75d3b3/src/ServiceStack/Auth/IAuthRepository.cs#L72) 
can be implemented by any `IAuthRepository` to provide an alternative strategy for querying and managing Users Roles and permissions. 

This API is being used in the `OrmLiteAuthRepository` to provide an alternative way to store Roles and Permission in their own distinct table rather than being blobbed with the rest of the User Auth data. 

This behavior can be enabled in `OrmLiteAuthRepository` by specifying `UseDistinctRoleTables=true` at registration, e.g:

```csharp
container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()) {
        UseDistinctRoleTables = true,
    });
```

When enabled, roles and permissions are persisted in the distinct **UserAuthRole** table instead of being blobbed on the UserAuth. The `IAuthSession.HasRole()` and `IAuthSession.HasPermission()` on the Users Session should be used to check if a User has a specified Role or Permission.
 
More examples of this are in [ManageRolesTests.cs](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.Common.Tests/ManageRolesTests.cs).

### Assigning Roles and Permissions

Super Users with the **Admin** role or Requests with an [AdminAuthSecret](/debugging#authsecret) can call the built-in `/assignroles` and `/unassignroles` Services to add Roles/Permissions to existing users from an external Request, e.g:

```csharp
var client = new JsonServiceClient(baseUrl);
var response = client.Post(new AssignRoles
{
    UserName = userName,
    Roles = new List<string> { "TheRole" },
    Permissions = new List<string> { "ThePermission" }
});
```

Inside ServiceStack you can use the `AssignRoles` API to add Roles and Permissions to an existing User:

```csharp
var userAuth = await AuthRepositoryAsync.GetUserAuthByUserNameAsync(userName);
if (userAuth == null)
    throw HttpError.NotFound(userName);

await AuthRepositoryAsync.AssignRolesAsync(userAuth, new[]{ "TheRole" }, new[]{ "ThePermission" });
```

Alternatively you can add Roles when creating a new User with:

```csharp
await AssignRolesAsync.CreateUserAuthAsync(new UserAuth
{
    UserName = userName,
    FirstName = "John",
    LastName = "Doe",
    DisplayName = "John Doe",
    Roles = new List<string> { "TheRole" }
}, userPassword);
```

### Customizing User Roles and Permissions

The default implementation of User Roles and Permissions on [AuthUserSession](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/AuthUserSession.cs) shows how ServiceStack's `[RequiredRole]` and `[RequiredPermission]` [Roles and Permission attributes](/authentication-and-authorization#the-requiredrole-and-requiredpermission-attributes) are validated:
 
```csharp
public virtual bool HasPermission(string permission)
{
    var managesRoles = HostContext.TryResolve<IAuthRepository>() as IManageRoles;
    if (managesRoles != null)
    {
        return managesRoles.HasPermission(this.UserAuthId, permission);
    }

    return this.Permissions != null && this.Permissions.Contains(permission);
}

public virtual bool HasRole(string role)
{
    var managesRoles = HostContext.TryResolve<IAuthRepository>() as IManageRoles;
    if (managesRoles != null)
    {
        return managesRoles.HasRole(this.UserAuthId, role);
    }

    return this.Roles != null && this.Roles.Contains(role);
}
```

These APIs are `virtual` so they can be overridden in both your Custom `AuthUserSession`. They default to looking at the `Roles` and `Permissions` collections stored on the Session. These collections are normally sourced from the `AuthUserRepository` when persisting the [UserAuth and UserAuthDetails POCO's](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/UserAuth.cs) and are used to populate the `UserAuthSession` on successful Authentication. These collections can be further customized by AuthProviders which is what `AspNetWindowsAuthProvider` does to add [Authenticated WindowsAuth Roles](https://github.com/ServiceStack/ServiceStack/blob/9773b7fccc31ac4d715a02221f396b46cd14d7db/src/ServiceStack/Auth/AspNetWindowsAuthProvider.cs#L126).

As seen above Roles/Permissions can instead be managed by AuthProviders that implement `IManageRoles` API which is what OrmLiteAuthProvider uses to look at distinct RDBMS tables to validate Roles/Permissions:

### PBKDF2 Password Hashing implementation

ServiceStack uses the same [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) password hashing algorithm ASP.NET Identity v3 by default for both new users and successful authentication logins where their password will automatically be re-hashed with the new implementation.

This also means if you wanted to switch, you'll be able to import ASP.NET Identity v3 User Accounts and their Password Hashes into ServiceStack.Auth's `UserAuth` tables and vice-versa.

#### Retain previous Password Hashing implementation

If preferred you can revert to using the existing `SaltedHash` implementation with:

```csharp
SetConfig(new HostConfig { 
    UseSaltedHash = true
});
```

This also supports "downgrading" passwords that were hashed with the new `IPasswordHasher` provider where it will revert to using the older/weaker `SaltedHash` implementation on successful authentication.

#### Override Password Hashing Strength

The new [PasswordHasher](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/PasswordHasher.cs) implementation can also be made to be computationally stronger or weaker by adjusting the iteration count (default 10000), e.g:

```csharp
container.Register<IPasswordHasher>(new PasswordHasher(1000));
```

#### Versionable Password Hashing

The new [IPasswordHasher](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Auth/IPasswordHasher.cs) interface includes support for versioning future Password Hashing algorithms and rehashing:

```csharp
public interface IPasswordHasher
{
    // First byte marker used to specify the format used. The default implementation uses format:
    // { 0x01, prf (UInt32), iter count (UInt32), salt length (UInt32), salt, subkey }
    byte Version { get; }

    // Returns a boolean indicating whether the providedPassword matches the hashedPassword
    // The needsRehash out parameter indicates whether the password should be re-hashed.
    bool VerifyPassword(string hashedPassword, string providedPassword, out bool needsRehash);

    // Returns a hashed representation of the supplied password
    string HashPassword(string password);
}
```

Which is implemented in all ServiceStack Auth Repositories where it will rehash passwords that used a different version or weaker strength, by utilizing the new API for verifying passwords:

```csharp
if (userAuth.VerifyPassword(password, out var needsRehash))
{
    this.RecordSuccessfulLogin(userAuth, needsRehash, password);
    return true;
}
```

If you're using a Custom Auth Repository it will need to use the new password verification APIs, please refer to [OrmLiteAuthRepository](https://github.com/ServiceStack/ServiceStack/blob/bed1d900de93f889cca05299df4c33a04b7ad7a7/src/ServiceStack.Server/Auth/OrmLiteAuthRepository.cs#L325-L359) for a complete concrete example.

#### Fallback PasswordHashers

The list of `Config.FallbackPasswordHashers` can be used for migrating to a new Password Hashing algorithm by registering older Password Hashing implementations that were previously used to hash Users passwords. Failed password verifications will fallback to see if the password was hashed with any of the registered `FallbackPasswordHashers`, if any are valid, the password attempt will succeed and the password re-hashed with the registered `IPasswordHasher` implementation.

### Digest Auth Hashes only created when needed

Digest Auth Hashes are only populated if the `DigestAuthProvider` is registered. If you ever intend to support Digest access authentication in future but don't want to register the DigestAuthProvider just yet, you can force ServiceStack to continue to maintain Digest Auth Hashes with:

```csharp
new AuthFeature {
    CreateDigestAuthHashes = true
}
```

Users that don't have Digest Auth Hashes will require logging in again in order to have it populated. If you don't intend to use Digest Auth you can clear the `DigestHa1Hash` column in your `UserAuth` table which is otherwise unused.
