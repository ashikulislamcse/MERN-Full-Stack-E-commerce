const VerifyEmailTemplete = ({name, url}) => {
  return `
    <p>Dear ${name}</p>
    <p>Thank You For Registering CholoKinbo</p>
    <a href=${url} style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
    Verify Email
    </a>
    `;
};


export default VerifyEmailTemplete;