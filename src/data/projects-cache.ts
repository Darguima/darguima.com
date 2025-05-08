import { Endpoints as GitHubEndpoints } from "@octokit/types";
import { Project } from "./projects-types";

type Repo = GitHubEndpoints["GET /repos/{owner}/{repo}"]["response"]["data"];
type RepoFile = GitHubEndpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

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

const basicProjectsInfo: BasicProjectInfo[] = [
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

/** 
 * This function runs each time the fetch cache expires.
 * This ensures that the cache is always up to date and that the page rendering is always fast.
*/
function startCache() {
  console.log("[LOG] - 🗃️ Starting cache for projects...");
  getProjects()

  setInterval(() => {
    console.log("[LOG] - 🗃️ Updating cache for projects...");
    getProjects()
  }, (CACHE_TIMEOUT_IN_SECONDS + 30) * 1000); // 30 sec more than the cache timeout, to prevent clocks out of sync
}
startCache();

/** Returns all the projects */
export async function getProjects(): Promise<Project[]> {
  return Promise.all(basicProjectsInfo.map(getCompleteProjectInfo));
}

/** Returns the project with the given name */
export async function getProject(repoName: string): Promise<Project | undefined> {
  const basicProject = basicProjectsInfo.find(project => project.github_repo_name.toLowerCase() === repoName.toLowerCase());

  return basicProject !== undefined
    ? (await getCompleteProjectInfo(basicProject))
    : undefined;
}

/** Given a basic project info, fetch the complete project info from GitHub. */
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
        console.error(`[ERROR] - GitHub repo ${repoName} README.md file not found or invalid response:`, data);
        return undefined;
      }

      const binaryString = atob(data.content);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const decoder = new TextDecoder("utf-8");

      return decoder.decode(bytes)
    })
    .catch((error) => {
      console.error("[ERROR] - Error fetching GitHub repo info:", error);
      return undefined;
    })
  
  const githubDefaultBranch = githubInfo?.default_branch || undefined

  const completeProjectInfo: Project = {
    name: project.name || repoName,
    description: project.description || githubInfo?.description || "No description available.",
    image: project.image || "/project_covers/default.svg",

    github_repo_owner: repoOwner,
    github_repo_name: repoName,
    githubMasterBranch: githubDefaultBranch,
    githubReadmeBasePath: githubDefaultBranch ? `https://raw.githubusercontent.com/${repoOwner}/${repoName}/refs/heads/${githubDefaultBranch}/` : undefined,

    githubUrl: project.githubUrl || `https://github.com/${repoOwner}/${repoName}`,
    websiteUrl: project.websiteUrl || githubInfo?.homepage || undefined,

    categories: Array.from(new Set([...(project.categories || []), "All"])),

    readmeContent: readmeContent,
  };

  return completeProjectInfo;
}
