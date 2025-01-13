export const otpVerificationEmailTemplate = (
  otp: number,
  otpVerificationLink: string,
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - NextHire</title>
</head>
<body style="font-family: 'Arial', sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9;">
  <div style="background: linear-gradient(to right, #4CAF50, #2d8640); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; font-size: 28px; margin: 0;">Welcome to <span style="color: #FFD700;">NextHire</span></h1>
  </div>
  <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #555; margin-bottom: 20px;">Hello,</p>
    <p style="font-size: 16px; color: #555;">Thank you for signing up with <strong>NextHire</strong>! To complete your registration, please follow the steps below:</p>
    <ol style="padding-left: 20px; color: #555; font-size: 16px;">
      <li style="margin-bottom: 10px;">Click the verification link below to open the verification page.</li>
      <li>Enter the one-time password (OTP) provided below on the verification page.</li>
    </ol>
    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; background: #f9f9f9; padding: 10px 20px; border-radius: 8px; border: 2px dashed #4CAF50;">${otp}</span>
    </div>
    <p style="font-size: 16px; text-align: center;">Click the link below to go to the verification page:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a
        href="${otpVerificationLink}"
        style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color: #4CAF50; border-radius: 8px; text-decoration: none; font-weight: bold; transition: background 0.3s ease; cursor: pointer;"
        onmouseover="this.style.backgroundColor='#45a049';"
        onmouseout="this.style.backgroundColor='#4CAF50';"
      >
        Verify Email
      </a>
    </div>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">This OTP and verification link will expire in <strong>15 minutes</strong> for security reasons. If you didn’t create an account with us, you can safely ignore this email.</p>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">Best regards,<br><strong>The NextHire Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 14px;">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;
};

export const passwordResetEmailTemplate = (resetPasswordLink: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - NextHire</title>
</head>
<body style="font-family: 'Arial', sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f9;">
  <div style="background: linear-gradient(to right, #4CAF50, #2d8640); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; font-size: 28px; margin: 0;">Password Reset Request</h1>
  </div>
  <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 18px; color: #555; margin-bottom: 20px;">Hello,</p>
    <p style="font-size: 16px; color: #555;">We received a request to reset your password for your <strong>NextHire</strong> account. If you didn’t make this request, you can ignore this email.</p>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a
        href="${resetPasswordLink}"
        style="display: inline-block; padding: 12px 25px; font-size: 16px; color: white; background-color: #4CAF50; border-radius: 8px; text-decoration: none; font-weight: bold; transition: background 0.3s ease; cursor: pointer;"
        onmouseover="this.style.backgroundColor='#45a049';"
        onmouseout="this.style.backgroundColor='#4CAF50';"
      >
        Reset Password
      </a>
    </div>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">For security reasons, this password reset link will expire in <strong>15 minutes</strong>.</p>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">If you continue to have issues, please contact our support team.</p>
    <p style="font-size: 16px; color: #555; margin: 20px 0;">Best regards,<br><strong>The NextHire Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 14px;">
    <p>This is an automated message; please do not reply to this email.</p>
  </div>
</body>
</html>
`;
};
