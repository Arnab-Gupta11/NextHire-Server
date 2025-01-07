import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .max(100, 'Full name cannot exceed 100 characters'),
    email: z
      .string()
      .email('Invalid email format')
      .max(255, 'Email cannot exceed 255 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password cannot exceed 100 characters'),
    confirmedPassword: z
      .string()
      .min(8, 'Confirmed password must be at least 8 characters long')
      .max(100, 'Confirmed password cannot exceed 100 characters'),
    role: z.enum(['jobSeeker', 'recruiter'], {
      errorMap: () => ({
        message: 'Role must be either jobSeeker or recruiter',
      }),
    }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
