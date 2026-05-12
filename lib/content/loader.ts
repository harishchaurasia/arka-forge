import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { workFrontmatterSchema, type WorkFrontmatter } from "./schemas";

const contentDirectory = path.join(process.cwd(), "content");

export interface WorkPost {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

export async function getWork(): Promise<WorkPost[]> {
  const workDirectory = path.join(contentDirectory, "work");

  if (!fs.existsSync(workDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(workDirectory);
  const work = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const filePath = path.join(workDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        const frontmatter = workFrontmatterSchema.parse(data);

        return {
          slug: getSlugFromFilename(filename),
          frontmatter,
          content,
        };
      })
  );

  // Filter published and sort by date (newest first)
  return work
    .filter((w) => w.frontmatter.published)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });
}

export async function getWorkPost(slug: string): Promise<WorkPost | null> {
  const work = await getWork();
  return work.find((w) => w.slug === slug) || null;
}
