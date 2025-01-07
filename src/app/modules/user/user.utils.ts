/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '../../config';
import { otpVerificationEmailTemplate } from '../../utils/emailTemplate';
import { sendEmail } from '../../utils/sendEmail';
import { EmailVerificationModel } from './emailVerification.model';

export const sendEmailVerificationOTP = async (user: any) => {
  try {
    // Generate a random 4-digit number
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Save OTP in Database
    await new EmailVerificationModel({ userId: user._id, otp: otp }).save();

    //  OTP Verification Link
    const otpVerificationLink = `${config.frontend_host}/account/verify-email`;
    await sendEmail({
      to: user.email,
      subject: 'OTP - Verify your account',
      html: otpVerificationEmailTemplate(otp, otpVerificationLink),
    });
    return otp;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
