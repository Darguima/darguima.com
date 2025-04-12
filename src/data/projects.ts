import { Endpoints as GitHubEndpoints } from "@octokit/types";

type Repo = GitHubEndpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type RepoFile = GitHubEndpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

export type ProjectCategory = "Pinned" | "Uni" | "All";

export interface Project {
  name: string; // Defaults to the repo name
  description: string; // Defaults to the repo description | "No description available."
  image: string; // Defaults to '/project_covers/default.svg'

  github_repo_owner: string; // Defaults to GITHUB_USERNAME 
  github_repo_name: string;

  githubUrl: string, // Default to `https://github.com/${github_repo_owner}/${github_repo_name}`;
  websiteUrl?: string; // Defaults to repo homepage | undefined

  categories: ProjectCategory[]; // Always include "All" at the minimum

  readmeContent: string | undefined; // If exists, will be fetched from the GitHub API
}

interface BasicProjectInfo extends Partial<Project> {
  github_repo_name: string; // Only required field
}

const GITHUB_USERNAME = "darguima";

const CACHE_TIMEOUT_IN_SECONDS = 86400; // 1 day in seconds
const FETCH_OPTIONS = {
  next: {
    revalidate: CACHE_TIMEOUT_IN_SECONDS,
  },
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
};

export const categories: ProjectCategory[] = [
  "Pinned",
  "Uni",
];

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
    name: "Inovar Proxy",
    github_repo_name: "inovarAlunos_proxy",
    image: "/project_covers/inovar-alunos-proxy.svg",
    categories: ["Pinned"],
  },

  {
    name: "Find Your Friend University",
    github_repo_name: "FindYourFriendUniversity",
    image: "/project_covers/find-your-friend-university.jpg",
    websiteUrl: "https://dsgdevbraga.ddns.net/fyfu",
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
    name: "Fridrich Trainer",
    github_repo_name: "FridrichTrainer",
    image: "/project_covers/fridrich-trainer.svg",
    categories: ["Pinned"],
  },

  {
    name: "Trivial Road LI1",
    github_repo_name: "Trivial-Road-LI1",
    image: "/project_covers/trivial-road-li1.jpg",
    categories: ["Uni"],
  },

  {
    name: "Trivial Like LI2",
    github_repo_name: "Trivial-Like-LI2",
    image: "/project_covers/trivial-like-li2.jpg",
    categories: ["Uni"],
  },

  {
    name: "Trivial Brick LI4",
    github_repo_name: "Trivial-Brick-LI4",
    image: "/project_covers/trivial-brick-li4.svg",
    categories: ["Uni"],
  },
];

function startCache() {
  console.log("[LOG] - 🗃️ Starting cache for projects...");
  getProjects()

  setInterval(() => {
    console.log("[LOG] - 🗃️ Updating cache for projects...");
    getProjects()
  }, (CACHE_TIMEOUT_IN_SECONDS + 30) * 1000); // 30 sec more than the cache timeout, to prevent clocks out of sync
}
if (typeof window === 'undefined') {
  startCache();
}

export async function getProjects(): Promise<Project[]> {
  return Promise.all(basicProjectsInfo.map(getCompleteProjectInfo));
}

export async function getProject(repoName: string): Promise<Project | undefined> {
  return (await getProjects()).find(project => project.github_repo_name === repoName);
}

async function getCompleteProjectInfo(project: BasicProjectInfo): Promise<Project> {
  // console.log("[LOG] - 🗃️ Fetching project info for:", project.github_repo_name);

  const repoName = project.github_repo_name;
  const repoOwner = project.github_repo_owner || GITHUB_USERNAME;

  const githubInfo = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`, FETCH_OPTIONS)
    .then(res => res.json())
    .then((data: Repo) => {
      if (data === undefined) {
        console.error("[ERROR] - GitHub repo not found or invalid response:", data);
      }

      return data;
    })
    .catch((error) => {
      console.error("[ERROR] - Error fetching GitHub repo info:", error);
      return undefined;
    }
    );

  const readmeContent = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/README.md`, FETCH_OPTIONS)
    .then(res => res.json())
    .then((data: RepoFile) => {
      if (data === undefined || !("content" in data) || data.content === undefined) {
        console.error("[ERROR] - GitHub repo README.md file not found or invalid response:", data);
        return undefined;
      }

      const decodedContent = atob(data.content);
      return decodedContent;
    })
    .catch((error) => {
      console.error("[ERROR] - Error fetching GitHub repo info:", error);
      return undefined;
    })

  const completeProjectInfo: Project = {
    name: project.name || repoName,
    description: project.description || githubInfo?.description || "No description available.",
    image: project.image || "/project_covers/default.svg",

    github_repo_owner: repoOwner,
    github_repo_name: repoName,

    githubUrl: project.githubUrl || `https://github.com/${repoOwner}/${repoName}`,
    websiteUrl: project.websiteUrl || githubInfo?.homepage || undefined,

    categories: Array.from(new Set([...(project.categories || []), "All"])),

    readmeContent: readmeContent,
  };

  return completeProjectInfo;
}
