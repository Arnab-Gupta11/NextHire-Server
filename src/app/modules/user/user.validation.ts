import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required.')
      .max(50, 'Name cannot exceed 50 characters.')
      .trim(),
    userName: z
      .string()
      .min(1, 'Username is required.')
      .max(30, 'Username cannot exceed 30 characters.')
      .trim(),
    email: z
      .string()
      .email('Invalid email format.')
      .min(1, 'Email is required.')
      .trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .max(100, 'Password cannot exceed 100 characters.')
      .trim(),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
