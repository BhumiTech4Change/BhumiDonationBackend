const sendVerificationMail = (transporter, fromEmail, toEmail, link) =>
  transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: 'Verify your email',
    html: `Click <a href='${link}'>here</a> to verify your email.`,
  })

module.exports = {
  sendVerificationMail,
}
