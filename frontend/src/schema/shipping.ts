import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(1, "Please select a country"),
  billingSame: z.boolean(),
});

export type ShippingSchemaType = z.infer<typeof shippingSchema>;
