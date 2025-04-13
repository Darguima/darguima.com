export type ProjectCategory = "Pinned" | "Uni" | "All";

export interface Project {
  name: string; // Defaults to the repo name
  description: string; // Defaults to the repo description | "No description available."
  image: string; // Defaults to '/project_covers/default.svg'

  github_repo_owner: string; // Defaults to GITHUB_USERNAME 
  github_repo_name: string;
  githubMasterBranch: string | undefined; // Defaults to the same of the GitHub repo
  githubReadmeBasePath: string | undefined; // Defaults to the same of the GitHub repo

  githubUrl: string, // Default to `https://github.com/${github_repo_owner}/${github_repo_name}`;
  websiteUrl?: string; // Defaults to repo homepage | undefined

  categories: ProjectCategory[]; // Always include "All" at the minimum

  readmeContent: string | undefined; // If exists, will be fetched from the GitHub API
}

export const categories: ProjectCategory[] = [
  "Pinned",
  "Uni",
];
