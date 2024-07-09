const { uuid } = require('uuidv4');
const nodemailer = require("nodemailer");
const { findAll, updateUser } = require('../models/userModel');

const sendEmail = (body) => {
  const { email, link } = body

  if (!email) throw new Error("No email provided");
  if (!link) throw new Error("No link provided");

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
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <title>Your One Time Password</title>
      
      
      </head>
      
      <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="display:grid;margin:50px auto;width:70%;padding:20px 0">
            <div>
              <a href="" style="font-size:1.4em;color: #ADD8E6;text-decoration:none;font-weight:600">Seeker</a>
            </div>
            <br />
            <h2 style="margin: 0 auto;width: max-content;white-space: pre-line;text-align: center;">Forgot your password? It happens to
              the best of us.</h2>
            <p style="margin: 0 auto;width: max-content;">To reset your password, click the button below. The link will expire
              in a few days.</p>
            <br />
            <a href=${link}
              style="margin: 0 auto;border:3px solid #000000;width: max-content;padding: 10px 35px;color: #000000;font-weight:700;border-radius: 5px;font-size: 1.4em;text-decoration: none;">Reset
              your password
            </a>
          </div>
          <br />
          <p style="margin: 0 auto 5em auto;width: max-content;font-size:0.9em;text-align: center;">If you do not want to
            change your password or didn't request a reset, you can ignore and delete this email.</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;line-height:1;font-weight:700">
            <a href="" style="color:#000000;font-size:0.7em;text-decoration:none;">Seeker</a>
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

const sendSuggestion = (body, files) => {
  const data = {};
  for (const [key, value] of Object.entries(body)) {
    if (key !== "pictures") { // get rid of the pictures key, we don't need it anymore
      data[key] = JSON.parse(value);
    }
  }

  if (!data) throw new Error("No data provided");

  return new Promise(async (resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "STUDY SPOT SUGGESTION",
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <title>Study Spot Suggestion Data</title>
      </head>
      
      <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          data is attached below:
        </div>
        <!-- partial -->
      
      </body>
      
      </html>`,
      attachments: [
        {
          filename: 'study-spot-suggestion.json',
          content: JSON.stringify(data, null, 2),
        },
        ...files.map(file => ({ // pictures
          filename: file.originalname,
          content: file.buffer,
        }))
      ]
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

const sendSuggestionConfirmation = (body) => {
  const user = JSON.parse(body);

  if (!user) throw new Error("No user provided");

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
      to: user.email,
      subject: "Study spot suggestion confirmation",
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <title>Study spot suggestion confirmation</title>
      
      
      </head>
      
      <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="display:grid;margin:50px auto;width:70%;padding:20px 0">
            <div>
              <a href="" style="font-size:1.4em;color: #ADD8E6;text-decoration:none;font-weight:600">Seeker</a>
            </div>
            <br />
            <h2 style="margin: 0 auto;width: max-content;white-space: pre-line;text-align: center;">Study spot suggestion confirmation</h2>
            <p style="margin: 0 auto;width: auto;text-align:center;">If you have recieved this message, then that means you have successfully submitted a suggestion! Thank you so much for your contribution, our team and your fellow students will remember this forever and ever and ever! ;)</p>
          </div>
          <br />
          <p style="margin: 0 auto 5em auto;width: max-content;font-size:0.9em;text-align: center;">If you did not submit a suggestion, you can ignore and delete this email.</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;line-height:1;font-weight:700">
            <a href="" style="color:#000000;font-size:0.7em;text-decoration:none;">Seeker</a>
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
  sendSuggestion,
  sendSuggestionConfirmation,
};