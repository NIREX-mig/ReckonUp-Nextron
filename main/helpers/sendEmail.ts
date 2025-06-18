import nodemailer from "nodemailer";
import EventResponse from "./EventResponse";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jarvis14220@gmail.com", // Your email address
    pass: "npjbzqmynvkbsjok", // Your email password or app password
  },
});

const sendForgotPasswordEmail = async (otp) => {
  try {
    const mailOptions = {
      from: "jarvis14220@gmail.com",
      to: "akay93796@gmail.com",
      subject: "Forgot Password",
      html: `
            <h2>HI ReckonUp Devloper,</h2>
            <p>There was a request to Forgot Password of ReckonUp</p>
            <p>If you did not Want to forgot password then please ignor the email</p>
            <p>Otherwise, share this OTP By user</p>
            <br>
            <p style="font-weight:bold; font-size: large; ">OTP : ${otp}</p>
            `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new EventResponse(
      false,
      "Something Went Wrong! Or Check Internet Connection.",
      error
    );
  }
};

export const sendFeedbackEmail = async (message) => {
  try {
    const mailOptions = {
      from: "jarvis14220@gmail.com",
      to: "akay93796@gmail.com", // Replace with your email address
      subject: "Feedback Or Bug Report",
      html: `
            <h2>Hello App Devloper,</h2>
            <p>Message : ${message}</p>
            `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new EventResponse(
      false,
      "Something Went Wrong! Or Check Internet Connection.",
      error
    );
  }
};

export const changePassword = async (email, otp) => {
  try {
    const mailOptions = {
      from: "jarvis14220@gmail.com",
      to: email,
      subject: "Feedback Or Bug Report",
      html: `
            <h2>HI ReckonUp User,</h2>
            <p>There was a request to change your password!</p>
            <p>If you did not make this request then may someone tempring with the softeware </p>
            <p>Otherwise, Do not share the OTP.</p>
            <br>
            <p style="font-weight:bold; font-size: large; ">OTP : ${otp}</p>
            `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new EventResponse(
      false,
      "Something Went Wrong! Or Check Internet Connection.",
      error
    );
  }
};

export default sendForgotPasswordEmail;
