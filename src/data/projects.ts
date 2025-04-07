import { Endpoints as GitHubEndpoints } from "@octokit/types";

type Repo = GitHubEndpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

export type ProjectCategory = "Pinned" | "Uni" | "All";

export const categories: ProjectCategory[] = [
  "Pinned",
  "Uni",
];

export interface Project {
  github_repo_name: string;
  name: string; // Defaults to the repo name
  description: string; // Defaults to the repo description | "No description available."
  image: string; // Defaults to '/project_covers/default.svg'
  github_repo_owner: string; // Defaults to githubUsername
  githubUrl?: string, // Default to `https://github.com/${github_repo_owner}/${github_repo_name}`;
  websiteUrl?: string; // Defaults to repo homepage | undefined
  categories: ProjectCategory[]; // Always include "All" at the minimum
}

interface BasicProjectInfo extends Partial<Project> {
  github_repo_name: string; // Only required field
}

export const githubUsername = "darguima";
export const githubName = "Dário Guimarães";

export const basicProjectsInfo: BasicProjectInfo[] = [
  {
    github_repo_name: "SpotHack",
    image: "/project_covers/spothack.svg",
    categories: ["Pinned"],
  },

  {
    name: "Meo WiFi Auto Login",
    github_repo_name: "meo-wifi-auto-login",
    image: "/project_covers/meo-wifi-auto-login.svg",
    categories: ["Pinned"],
  },

  {
    name: "Find Your Friend University",
    github_repo_name: "FindYourFriendUniversity",
    image: "/project_covers/find-your-friend-university.svg",
    websiteUrl: "https://dsgdevbraga.ddns.net/fyfu",
    categories: ["Pinned"],
  },

  {
    name: "Inovar Proxy",
    github_repo_name: "inovarAlunos_proxy",
    image: "/project_covers/inovar-alunos-proxy.jpg",
    categories: ["Pinned"],
  },

  {
    name: "Fridrich Trainer",
    github_repo_name: "FridrichTrainer",
    image: "/project_covers/fridrich-trainer.svg",
    categories: ["Pinned"],
  },

  {
    name: "TUB Bus Tracker",
    github_repo_name: "TUB-Bus-Tracker",
    image: "/project_covers/tub-bus-tracker.svg",
    websiteUrl: "https://darguima.github.io/TUB-Bus-Tracker/",
    categories: ["Pinned"],
  },

  {
    name: "Trivial Road LI1",
    github_repo_name: "Trivial-Road-LI1",
    image: "/project_covers/trivial-road-li1.png",
    categories: ["Uni"],
  },

  {
    name: "Trivial Like LI2",
    github_repo_name: "Trivial-Like-LI2",
    image: "/project_covers/trivial-like-li2.png",
    categories: ["Uni"],
  },

  {
    name: "Trivial Brick LI4",
    github_repo_name: "Trivial-Brick-LI4",
    image: "/project_covers/trivial-brick-li4.png",
    categories: ["Uni"],
  },
];

export const getProjects = async function (): Promise<Project[]> {
  const projects = basicProjectsInfo.map(async (project) => {
    const repoName = project.github_repo_name;
    const repoOwner = project.github_repo_owner || githubUsername;

    const githubInfo = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, {
      next: { revalidate: 86400 }, // will cache the response for 1 day
    })
      .then(res => res.json())
      .then((data: Repo) => {
        if (data === undefined) {
          console.error("GitHub repo not found or invalid response:", data);
        }

        return data;
      })
      .catch((error) => {
        console.error("Error fetching GitHub repo info:", error);
        return undefined;
      }
      );

    const completeProjectInfo: Project = {
      github_repo_name: repoName,
      name: project.name || repoName,
      description: project.description || githubInfo?.description || "No description available.",
      image: project.image || "/project_covers/default.svg",
      github_repo_owner: repoOwner,
      githubUrl: project.githubUrl || `https://github.com/${repoOwner}/${repoName}`,
      websiteUrl: project.websiteUrl || githubInfo?.homepage || undefined,
      categories: Array.from(new Set([...(project.categories || []), "All"])),
    };

    return completeProjectInfo;
  })

  return await Promise.all(projects);
}