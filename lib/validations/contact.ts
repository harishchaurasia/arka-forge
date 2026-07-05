import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().max(0).optional(), // Honeypot field for spam protection
  resumeName: z.string().max(255).optional(), // Optional resume filename
  resumeContent: z.string().optional(), // Optional resume, base64-encoded
  formType: z.enum(["contact", "careers"]).optional(), // Routes to the right inbox
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
