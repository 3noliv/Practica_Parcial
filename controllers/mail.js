const { sendEmail } = require("../utils/handleEmail");
const { matchedData } = require("express-validator");

const send = async (req, res) => {
  try {
    const info = matchedData(req);
    const emailOptions = {
      from: process.env.EMAIL,
      to: info.to,
      subject: info.subject,
      text: info.text,
    };
    const response = await sendEmail(emailOptions);
    res.send({ message: "Email sent successfully", response });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { send };
