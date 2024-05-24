const nodemailer = require("nodemailer");

const sendEmail = (body) => {
  const { email, link } = body 

  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgot your password?",
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>Your One Time Password</title>
        
      
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div>
            <a href="" style="font-size:1.4em;color: #ADD8E6;text-decoration:none;font-weight:600">Seeker</a>
          </div>
          <br />
          <h2 style="margin: 0 auto;width: max-content;white-space: pre-line;text-align: center;">Forgot your password? It happens to 
          the best of us.</h2>
          <p style="margin: 0 auto;width: max-content;">To reset your password, click the button below. The link will expire in a few days.</p>
          <br />
          <div style="display: flex; justify-content: center;">
            <a href=${link} style="border:3px solid #000000;width: max-content;padding: 5px 35px;color: #000000;font-weight:700;border-radius: 5px;font-size: 1.4em;text-decoration: none;">Reset your password</a>
          </div>
          <br />
          <p style="margin: 0 auto 5em auto;width: max-content;font-size:0.9em;text-align: center;">If you do not want to change your password or didn't request a reset, you can ignore and delete this email.</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;line-height:1;font-weight:700"> 
            <a href="" style="color:#000000;font-size:0.7em;text-decoration:none;">Seeker</a>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfully" });
    });
  });
}

module.exports = {
  sendEmail,
};