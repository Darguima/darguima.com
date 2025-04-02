export interface ProjectSchema {
  name: string;
  description?: string;
  github_owner: string;
  github_repo: string;
  image: string;
  websiteUrl?: string;
}

export const projects: ProjectSchema[] = [
  {
    name: "SpotHack",
    github_owner: "darguima",
    github_repo: "spothack",
    image: "/projects/spothack.svg",
  },

  {
    name: " Meo WiFi Auto Login",
    github_owner: "darguima",
    github_repo: "meo-wifi-auto-login",
    image: "/projects/meo-wifi-auto-login.svg",
  },

  {
    name: "Find Your Friend University",
    github_owner: "darguima",
    github_repo: "FindYourFriendUniversity",
    image: "/projects/find-your-friend-university.png",
    websiteUrl: "https://dsgdevbraga.ddns.net/fyfu"
  },

  {
    name: "Inovar Proxy",
    github_owner: "darguima",
    github_repo: "inovarAlunos_proxy",
    image: "/projects/inovar-alunos-proxy.png",
  },

  {
    name: "Fridrich Trainer",
    github_owner: "darguima",
    github_repo: "FridrichTrainer",
    image: "/projects/fridrich-trainer.svg",
  },

  {
    name: "TUB Bus Tracker",
    github_owner: "darguima",
    github_repo: "TUB-Bus-Tracker",
    image: "/projects/tub-bus-tracker.jpg",
    websiteUrl: "https://darguima.github.io/TUB-Bus-Tracker/"
  },
];