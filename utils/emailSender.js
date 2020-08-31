const { SENDGRID_API, SENDGRID_WELCOME_TEMPLATE, SENDGRID_SENDER_EMAIL } = require('../config')

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API);

const sendWelcomeEmail = async (user) => {
  const msg = {
    to: user.email,
    from: SENDGRID_SENDER_EMAIL,
    subject: 'Thanks to register to OneEvent',
    templateId: SENDGRID_WELCOME_TEMPLATE,
    dynamic_template_data: {
      name: user.name
    }
  };
  sgMail.send(msg, (error, result) => {
    if (error) {
      return {
        success: false,
        error: error.response.body
      }
    }
    return true
  });
}


module.exports = sendWelcomeEmail