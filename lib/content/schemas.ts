import { z } from "zod";

export const workFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  hero: z.string().optional(),
  client: z.string().optional(),
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
