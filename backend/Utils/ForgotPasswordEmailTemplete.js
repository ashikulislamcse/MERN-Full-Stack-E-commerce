const ForgotPasswordEmailTemplate = ({ name, otp }) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
      background-color: #ecf0f1;
      padding: 10px 20px;
      display: inline-block;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #7f8c8d;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Password Reset Request</h2>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
    </div>
    <div style="text-align: center;">
      <div class="otp">${otp}</div>
    </div>
    <p>If you didn't request this, you can safely ignore this email. This OTP is valid for 30 minutes.</p>
    <p>Thank you,<br>The CholoKinbo.com Team</p>
    <div class="footer">
      &copy; ${Date().toString()} CholoKinbo.com. All rights reserved.
    </div>
  </div>
</body>
</html>

  `;
};

export default ForgotPasswordEmailTemplate;
