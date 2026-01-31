import { cp, mkdir, stat } from "node:fs/promises";
import path from "node:path";
const sourceDir = path.resolve("content/posts/attachments");
const outputDir = path.resolve("public/posts/attachments");

try {
  const stats = await stat(sourceDir);
  if (!stats.isDirectory()) {
    throw new Error("Attachments path is not a directory.");
  }
} catch (error) {
  console.log("No attachments directory found. Skipping copy.");
  process.exit(0);
}

await mkdir(outputDir, { recursive: true });
await cp(sourceDir, outputDir, { recursive: true });
console.log("Attachments copied to public/posts/attachments");
