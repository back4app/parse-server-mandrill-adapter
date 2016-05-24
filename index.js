var mandrill = require('mandrill-api/mandrill');

var MandrillAdapter = mandrillOptions => {
  if (
      !mandrillOptions ||
      !mandrillOptions.apiKey ||
      !mandrillOptions.fromEmail
  ) {
    throw 'MandrillAdapter requires an API Key and a From Email Address.';
  }

  mandrillOptions.replyTo =
      mandrillOptions.replyTo ||
      mandrillOptions.fromEmail;
  mandrillOptions.displayName =
      mandrillOptions.displayName ||
      mandrillOptions.replyTo;
  mandrillOptions.verificationSubject =
      mandrillOptions.verificationSubject ||
      'Please verify your e-mail for *|appname|*';
  mandrillOptions.verificationBody =
      mandrillOptions.verificationBody ||
      'Hi,\n\nYou are being asked to confirm the e-mail address *|email|* ' +
      'with *|appname|*\n\nClick here to confirm it:\n*|link|*';
  mandrillOptions.passwordResetSubject =
      mandrillOptions.passwordResetSubject ||
      'Password Reset Request for *|appname|*';
  mandrillOptions.passwordResetBody =
      mandrillOptions.passwordResetBody ||
      'Hi,\n\nYou requested a password reset for *|appname|*.\n\nClick here ' +
      'to reset it:\n*|link|*';

  var mandrill_client = new mandrill.Mandrill(mandrillOptions.apiKey);

  var sendVerificationEmail = options => {
    var message = {
      from_email: mandrillOptions.fromEmail,
      from_name: mandrillOptions.displayName,
      headers: {
        'Reply-To': mandrillOptions.replyTo
      },
      to: [{
        email: options.user.get("email")
      }],
      subject: mandrillOptions.verificationSubject,
      text: mandrillOptions.verificationBody,
      global_merge_vars: [
        { name: 'appname', content: options.appName},
        { name: 'username', content: options.user.get("username")},
        { name: 'email', content: options.user.get("email")},
        { name: 'link', content: options.link}
      ]
    }

    return new Promise((resolve, reject) => {
        mandrill_client.messages.send(
          {
            message: message,
            async: true
          },
          resolve,
          reject
        )
    });
  }

  var sendPasswordResetEmail = options => {
    var message = {
      from_email: mandrillOptions.fromEmail,
      from_name: mandrillOptions.displayName,
      headers: {
        'Reply-To': mandrillOptions.replyTo
      },
      to: [{
        email: options.user.get("email")
      }],
      subject: mandrillOptions.passwordResetSubject,
      text: mandrillOptions.passwordResetBody,
      global_merge_vars: [
        { name: 'appname', content: options.appName},
        { name: 'username', content: options.user.get("username")},
        { name: 'email', content: options.user.get("email")},
        { name: 'link', content: options.link}
      ]
    }

    return new Promise((resolve, reject) => {
        mandrill_client.messages.send(
        {
          message: message,
          async: true
        },
        resolve,
        reject
      )
    });
  }

  var sendMail = options => {
    var message = {
      from_email: mandrillOptions.fromEmail,
      from_name: mandrillOptions.displayName,
      headers: {
        'Reply-To': mandrillOptions.replyTo
      },
      to: [{
        email: options.to
      }],
      subject: options.subject,
      text: options.text
    }

    return new Promise((resolve, reject) => {
      mandrill_client.messages.send(
        {
          message: message,
          async: true
        },
        resolve,
        reject
      )
  });
}

  return Object.freeze({
    sendVerificationEmail: sendVerificationEmail,
    sendPasswordResetEmail: sendPasswordResetEmail,
    sendMail: sendMail
  });
}

module.exports = MandrillAdapter;
