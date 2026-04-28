const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"AuthFlow Support" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Welcome to AuthFlow — Registration Successful!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Welcome</title>
      </head>
      <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="520" cellpadding="0" cellspacing="0"
                style="background-color:#16161f;border:1px solid #2a2a3a;border-radius:16px;overflow:hidden;">

                <!-- Header -->
                <tr>
                  <td align="center"
                    style="background:linear-gradient(135deg,#7c6af7,#a78bfa);padding:36px 40px;">
                    <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-1px;">
                      Auth<span style="opacity:0.85;">Flow</span>
                    </h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:2px;text-transform:uppercase;">
                      Secure Authentication Platform
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#7c6af7;">
                      Welcome aboard
                    </p>
                    <h2 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#e8e8f0;">
                      Hey ${userName}! 👋
                    </h2>
                    <p style="margin:0 0 16px;font-size:15px;color:#a0a0c0;line-height:1.7;">
                      Thank you for joining <strong style="color:#e8e8f0;">AuthFlow</strong>.
                      Your account has been successfully created and you're all set to get started.
                    </p>
                    <p style="margin:0 0 28px;font-size:15px;color:#a0a0c0;line-height:1.7;">
                      Your account is secured with industry-standard bcrypt password hashing
                      and JWT session management. You're in safe hands.
                    </p>

                    <!-- CTA Button -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                      <tr>
                        <td align="center"
                          style="background:#7c6af7;border-radius:10px;padding:14px 32px;">
                          <a href="http://localhost:5173/login"
                            style="color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;display:block;">
                            Sign In to Your Account →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Info box -->
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#0a0a0f;border:1px solid #2a2a3a;border-radius:10px;margin-bottom:28px;">
                      <tr>
                        <td style="padding:20px;">
                          <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#7070a0;">
                            Account Details
                          </p>
                          <p style="margin:0;font-size:14px;color:#e8e8f0;">
                            📧 ${userEmail}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;font-size:13px;color:#7070a0;line-height:1.6;">
                      If you didn't create this account, please ignore this email or contact support.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center"
                    style="background:#111118;border-top:1px solid #2a2a3a;padding:20px 40px;">
                    <p style="margin:0;font-size:12px;color:#7070a0;">
                      © 2026 AuthFlow · Lab 22 · IIIT Allahabad
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendWelcomeEmail }
