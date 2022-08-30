const sendVerificationMail = (transporter, name, fromEmail, toEmail, link) =>
  transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: 'Bhumi Fundraiser App Verification Email',
    html: `Hello ${name}, <br/><br/> This email is being sent to you as part of the signup process at Bhumi Fundraiser App and was initiated by you. Your registration is incomplete until you have verified your email address. <br/><br/> Please click <a href='${link}'>here</a> to verify your email and start your journey as Fundraiser.`,
  })

module.exports = {
  sendVerificationMail,
}
