import { ReadmeSections } from "@/utils/readmeParser/sectionsParserAndCleaner";

export type ProjectCategory = "Pinned" | "Uni" | "All";

export interface Project {
  name: string;                       // Defaults to the GitHub repo name || github_repo_name
  description: string;                // Defaults to the GitHub repo description || "No description available."
  image: string;                      // Defaults to '/project_covers/default.svg'

  github_repo_owner: string;         // Defaults to GITHUB_USERNAME
  github_repo_name: string;
  githubReadmeBranch: string;        // Defaults to the GitHub repo default branch | "master"
  githubCommitSha: string;           // Defaults to "HEAD"
  githubReadmeBasePath: string;      // Defaults to the same of the GitHub repo

  githubUrl: string;                 // Default to `https://github.com/${github_repo_owner}/${github_repo_name}`
  websiteUrl?: string;               // Defaults to GitHub repo homepage | undefined

  categories: ProjectCategory[];     // Always include "All" at the end of the array

  readmeSections: ReadmeSections | undefined; // If exists, will be fetched from the GitHub API
}

export const categories: ProjectCategory[] = [
  "Pinned",
  "Uni",
];
