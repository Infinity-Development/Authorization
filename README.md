# Infinity OAuth

Custom Library for Infinity Bot List made to interact with [Discord](https://discord.com) OAuth2.0, using passport strategy. 

## Usage

Add the following to your Package.json

### Github Install
```shell
"infinity-oauth": "https://github.com/InfinityBotList/Authorization"
```

### NPM Install
```shell
npm install --save infinity-oauth
```

#### Configure Strategy

The Discord authentication strategy authenticates users via a Discord user account and OAuth 2.0 token(s). A Discord API client ID, secret and redirect URL must be supplied when using this strategy. The strategy also requires a `verify` callback, which receives the access token and an optional refresh token, as well as a `profile` which contains the authenticated Discord user's profile. The `verify` callback must also call `cb` providing a user to complete the authentication.

```js
const DiscordStrategy = require('infinity-oauth').Strategy;

const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: '815553000470478850',
    clientSecret: '-SomeSuperSecretClientSecret',
    callbackURL: 'https://somesite.com/api/auth/callback',
    scope: scopes
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ discordId: profile.id }, function(err, user) {
        return cb(err, user);
    });
}));
```

#### Authentication Requests
Use `passport.authenticate()`, and specify the `'discord'` strategy to authenticate requests.

For example, as a route middleware in an Express app:

```js
app.get('/auth/discord', passport.authenticate('discord')); // Redirects to Discord oauth page.

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/profile') // Successful auth
});
```

If using the `bot` scope, the `permissions` option can be set to indicate
specific permissions your bot needs on the server ([permission codes](https://discord.com/developers/docs/topics/permissions)):

```javascript
app.get("/auth/discord", passport.authenticate("discord", { permissions: 66321471 }));
```

#### Refresh Token Usage
In some use cases where the profile may be fetched more than once or you want to keep the user authenticated, refresh tokens may wish to be used. A package such as `passport-oauth2-refresh` 
can assist in doing this.

Example:

```shell
npm install passport-oauth2-refresh --save
```

```javascript
var DiscordStrategy = require('infinity-oauth').Strategy, 
    refresh = require('passport-oauth2-refresh');

var discordStrat = new DiscordStrategy({
    clientID: '815553000470478850',
    clientSecret: '-SomeSuperSecretClientSecret',
    callbackURL: 'https://somesite.com/api/auth/callback',
},
function(accessToken, refreshToken, profile, cb) {
    profile.refreshToken = refreshToken; // store this for later refreshes
    User.findOrCreate({ discordId: profile.id }, function(err, user) {
        if (err)
            return done(err);

        return cb(err, user);
    });
});

passport.use(discordStrat);
refresh.use(discordStrat);
```

... then if we require refreshing when fetching an update or something ...

```javascript
refresh.requestNewAccessToken('discord', profile.refreshToken, function(err, accessToken, refreshToken) {
    if (err)
        throw; // boys, we have an error here.
    
    profile.accessToken = accessToken; // store this new one for our new requests!
});
```
## Examples
An Express server example can be found in the `/examples` directory. Be sure to `npm install` in that directory to get the dependencies.