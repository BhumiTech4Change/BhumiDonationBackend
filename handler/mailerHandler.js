const sendVerificationMail = (transporter, name, fromEmail, toEmail, link) =>
  transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: 'Bhumi Fundraiser App Verification Email',
    html: `Hi ${name}<br/><br/>Thank you for signing up on the Bhumi Fundraiser App! Please take just a moment to verify your email address, in order to complete your registration. As a verified user, we will enjoy a greater level of trust in our interactions. <br/><br/> Just click the link below, and you're all set to start your journey as a Fundraiser: <br/> <a href="${link}">${link}</a> <br/><br/> Thank you! <br/> Team Bhumi`,
  })

module.exports = {
  sendVerificationMail,
}
