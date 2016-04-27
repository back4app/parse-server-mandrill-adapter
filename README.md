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
      verificationBody: 'Hi,\n\nYou are being asked to confirm the e-mail address *|email|* with *|appname|*\n\nClick here to confirm it:\n*|link|*',
      // Password reset email subject
      passwordResetSubject: 'Password Reset Request for *|appname|*',
      // Password reset email body
      passwordResetBody: 'Hi,\n\nYou requested a password reset for *|appname|*.\n\nClick here to reset it:\n*|link|*'
    }
  }
  ...
});
```

Developers groups:
https://groups.google.com/forum/#!forum/back4app

Parse hosting:
https://www.back4app.com