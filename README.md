# parse-server-mandrill-adapter
Used to send Parse Server password reset and email verification emails through Mandrill

How to install:
```
$ npm install parse-server-mandrill-adapter --save
```

How to use:
```
var server = ParseServer({
  ...
  // App Name
  appName: 'YourAppName',
  // Environment where the user can confirm his e-mail address or reset his password (most likely the same as your 'serverURL')
  publicServerURL: 'YourPublicServerURL',
  emailAdapter: {
    module: 'parse-server-mandrill-adapter',
    options: {
      // API key from Mandrill account
      apiKey: 'API-KEY',
      // From email address
      fromEmail: 'no-reply@yourdomain.com',
      // Display name
      displayName: 'no-reply@yourdomain.com',
      // Reply-to email address
      replyTo: 'no-reply@yourdomain.com',
      // Verification email subject
      verificationSubject: 'Please verify your e-mail for *|appname|*',
      // Verification email body
      verificationBody: 'Hi *|username|*,\n\nYou are being asked to confirm the e-mail address *|email|* with *|appname|*\n\nClick here to confirm it:\n*|link|*',
      // Password reset email subject
      passwordResetSubject: 'Password Reset Request for *|appname|*',
      // Password reset email body
      passwordResetBody: 'Hi *|username|*,\n\nYou requested a password reset for *|appname|*.\n\nClick here to reset it:\n*|link|*'
    }
  }
  ...
});
```

You can use the following variables in the subjects and bodies and they will be replaced with their appropriate values:

`*|appname|*` - your application's display name

`*|username|*` - the user's display name

`*|email|*` - the user's email address

`*|link|*` - the link the user must click to perform the requested action

Developers groups:
https://groups.google.com/forum/#!forum/back4app

Parse hosting:
https://www.back4app.com