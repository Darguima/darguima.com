import Image from "next/image";
import { ProjectSchema } from "@/data/projects";

export default async function ProjectCard({ name, description, image, github_owner, github_repo, websiteUrl }: ProjectSchema) {

  const repoInfo = await fetch(`https://api.github.com/repos/${github_owner}/${github_repo}`, {
    next: { revalidate: 604800 },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data;
      } else {
        return {};
      }
    })
    .catch((error) => {
      console.error("Error fetching GitHub repo info:", error);
      return {};
    });

  const finalDescription = description || repoInfo.description || "No description available";
  const githubUrl = `https://github.com/${github_owner}/${github_repo}`;

  return (
    <div className="flex flex-col items-center justify-around gap-6 p-6 bg-card-background shadow-xl rounded-lg w-full h-full max-w-sm">

      <div className="flex items-center aspect-square mb-4">
        <Image src={image} alt={name} width={96} height={96} className="rounded-lg" />
      </div>

      <h3 className="text-xl font-bold">{name}</h3>
      <p className="flex-1 my-2 overflow-hidden">{finalDescription}</p>

      <div className="flex justify-around w-full">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-secondary rounded-2xl py-1 px-4">
          <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} className="inline-block mr-2" />
          GitHub
        </a>

        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`border-2 border-secondary rounded-2xl py-1 px-4 ${!websiteUrl ? "opacity-0" : ""}`}>
          <Image src="/icons/web.svg" alt="Web" width={24} height={24} className="inline-block mr-2" />
          Website
        </a>
      </div>

    </div>
  );
}

