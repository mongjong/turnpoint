import { z } from 'zod';

export const clientSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name exceeds maximum length'),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
    funding: z.string().min(1, 'Funding is required'),
});

export const clientDetailsSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255, 'Name exceeds maximum length'),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
});

export const clientFundingSchema = z.object({
    funding: z.string().min(1, 'Funding is required'),
});

export type ClientFormData = z.infer<typeof clientSchema>;