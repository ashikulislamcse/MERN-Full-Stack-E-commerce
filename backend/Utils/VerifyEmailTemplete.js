const verifyEmailTemplate = ({ name, url }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to CholoKinbo.com</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f8fa;
      margin: 0;
      padding: 20px;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
    }
    .btn {
      display: inline-block;
      padding: 12px 20px;
      margin: 20px 0;
      background-color: #28a745;
      color: #fff;
      text-decoration: none;
      border-radius: 6px;
    }
    .footer {
      font-size: 12px;
      color: #888;
      margin-top: 30px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Welcome to CholoKinbo.com 🎉</h1>
    <p>Hi Dear ${name},</p>
    <p>Thank you for signing up! We're thrilled to have you join us.</p>
    
    <p>Before you get started, please verify your email address by clicking the button below:</p>

    <a href="${url}" 
   style="
     display: inline-block;
     padding: 12px 24px;
     background-color: #28a745;
     color: #ffffff;
     text-decoration: none;
     border-radius: 6px;
     font-weight: bold;
     font-size: 16px;
     margin-top: 20px;
     text-align: center;
   ">
   Verify Email Address
</a>

    <p style="margin-top: 30px;">If the button above doesn't work, you can also verify your email by copying and pasting the link below into your browser:</p>
<p style="word-break: break-all; color: #007bff;">${url}</p>

    <p>If you didn't sign up for this account, please ignore this email.</p>

    <div class="footer">
      <p>© ${Date().toString()} CholoKinbo.com.. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`;
};

export default verifyEmailTemplate;
