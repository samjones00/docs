---
slug: admin-ui
title: Admin UI
---

Admin UI provides user management functionality at `/admin-ui` path when the `AdminUsersFeature` plugin is added to your application.

## Installation

```csharp
Plugins.Add(new AdminUsersFeature());
```

<a href="https://blazor-wasm-api.jamstacks.net/admin-ui">
    <h3 class="text-center font-medium text-3xl mb-3">/admin-ui</h3>
    <div class="block p-4 rounded shadow hover:shadow-lg">
        <img src="/images/admin-ui/dashboard.png">
    </div>
</a>

By default, it also shows some simple API stats on your Admin UI dashboard, linked to the [API Explorer](./api-explorer.md).

The Admin UI was designed with room to grow. You can let us know what features you would find most valuable on our [GitHub Discussions](https://github.com/ServiceStack/Discuss/discussions/2).

::: info
An `IAuthRepository` is required to be a registered dependency to use the `AdminUsersFeature` plugin.
:::

## Managing Users

By default, the Add and Edit Users forms contains the default layout of common properties in [UserAuth.cs](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/UserAuth.cs)

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/admin-ui/users?edit=2">
        <img src="/images/admin-ui/users-edit-default.png" style="max-width:800px;">
    </a>
</div>

## Customization

To customize this user interface to accommodate custom properties, the `UserFormLayout` needs to be overridden.

For example, below we have a custom `UserAuth` called `AppUser` with additional properties.

```csharp
// Custom User Table with extended Metadata properties
public class AppUser : UserAuth
{
    public Department Department { get; set; }
    public string? ProfileUrl { get; set; }
    public string? LastLoginIp { get; set; }

    public bool IsArchived { get; set; }
    public DateTime? ArchivedDate { get; set; }

    public DateTime? LastLoginDate { get; set; }
}

public enum Department
{
    None,
    Marketing,
    Accounts,
    Legal,
    HumanResources,
}
```

The `AdminUsersFeature` has multiple fiends that can be used to customize the UI including.

| Property Name             | Description                                                        |
|---------------------------|--------------------------------------------------------------------|
| `QueryUserAuthProperties` | Columns visible in query results for users.                        |
| `QueryMediaRules`         | Which columns *start* appearing at different screen sizes.         |
| `UserFormLayout`          | Control which fields are used for Create/Edit and their placement. |

Similar to the [API Explorer](./api-explorer.md#formlayout) `FormLayout` customization, `UserFormLayout` is used to control placement and details about individual fields.

```csharp
appHost.Plugins.Add(new ServiceStack.Admin.AdminUsersFeature {
    // Show custom fields in Search Results
    QueryUserAuthProperties = new() {
        nameof(AppUser.Id),
        nameof(AppUser.Email),
        nameof(AppUser.DisplayName),
        nameof(AppUser.Department),
        nameof(AppUser.CreatedDate),
        nameof(AppUser.LastLoginDate),
    },

    QueryMediaRules = new()
    {
        MediaRules.ExtraSmall.Show<AppUser>(x => new { x.Id, x.Email, x.DisplayName }),
        MediaRules.Small.Show<AppUser>(x => x.Department),
    },

    // Add Custom Fields to Create/Edit User Forms
    UserFormLayout = new() {
        new()
        {
            Input.For<AppUser>(x => x.Email),
        },
        new()
        {
            Input.For<AppUser>(x => x.DisplayName),
        },
        new()
        {
            Input.For<AppUser>(x => x.Company),
            Input.For<AppUser>(x => x.Department),
        },
        new() {
            Input.For<AppUser>(x => x.PhoneNumber, c => c.Type = Input.Types.Tel)
        },
        new() {
            Input.For<AppUser>(x => x.Nickname, c => {
                c.Help = "Public alias (3-12 lower alpha numeric chars)";
                c.Pattern = "^[a-z][a-z0-9_.-]{3,12}$";
                //c.Required = true;
            })
        },
        new() {
            Input.For<AppUser>(x => x.ProfileUrl, c => c.Type = Input.Types.Url)
        },
        new() {
            Input.For<AppUser>(x => x.IsArchived), Input.For<AppUser>(x => x.ArchivedDate),
        },
    }
});
```

Enabling the use of custom properties as well as formatting for ease of use. `UserFormLayout` updates the `Create` and `Edit` screens in the Admin UI.

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/admin-ui/users?edit=2">
        <img src="/images/admin-ui/users-edit-custom.png" style="max-width:800px;">
    </a>
</div>

## Limitations

As of the first release of **Admin UI**, it requires the use of `camelCase` serialization which is the default in ASP.NET Core.

.NET Framework projects can switch to camelCase serialization with:

```csharp
JsConfig.Init(new Config {
    TextCase = TextCase.CamelCase
});
```