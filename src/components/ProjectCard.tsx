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
    <div className="flex flex-col bg-background-level-1 shadow-xl rounded-xl h-full w-full max-w-sm overflow-hidden">

      <div className="flex items-center justify-center w-full aspect-video bg-background-level-0.5">
        <Image src={image} alt={name} width={96} height={96} className="rounded-lg" />
      </div>

      <div className="flex flex-col items-center justify-around flex-1 gap-6 m-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="flex-1 my-2">{finalDescription}</p>

        <div className="flex justify-between w-full">

          {/* TODO: Improve this part */}
          <div className="flex gap-1">
            <CardButton href={githubUrl}>
              <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} className="inline-block" />
            </CardButton>

            <CardButton href={websiteUrl} visible={!!websiteUrl}>
              <Image src="/icons/web.svg" alt="Web" width={24} height={24} className="inline-block" />
            </CardButton>
          </div>

          <CardButton href={`/project?project_id=${github_repo}`}>
            <span className="text-primary">Read More</span>
          </CardButton>
        </div>
      </div>

    </div>
  );
}

const CardButton = ({ children, href, visible = true }: { children: React.ReactNode; href: string | undefined; visible?: boolean; }) => {
  return (
    <a
      href={href}
      // target="_blank"
      rel="noopener noreferrer"
      className={`rounded-2xl p-2 hover:bg-primary/0 ${visible ? "" : "hidden"}`}
    >
      {children}
    </a>
  );
}

