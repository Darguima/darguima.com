import Image from "next/image";
import WebsiteIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';

import HoverAnchor from "./HoverAnchor";

import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { name, description, image, github_repo_name, githubUrl, websiteUrl } = project

  return (
    <div className="flex flex-col bg-background-level-1 shadow-xl rounded-xl h-full w-sm max-w-full overflow-hidden">

      <div className="flex items-center justify-center w-full aspect-video bg-background-level-0.5">
        {/* To Do: Image placeholder + fix imag dimensions */}
        <Image src={image} alt={name} width={96} height={96} className="rounded-lg" />
      </div>

      <div className="flex flex-col items-center justify-around flex-1 gap-6 m-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="flex-1 my-2 text-foreground-secondary">{description}</p>

        <div className="flex justify-between w-full">

          <div className="flex gap-1">
            <HoverAnchor href={githubUrl}>
              <GitHubIcon color="inherit" />
            </HoverAnchor  >

            <HoverAnchor href={websiteUrl} visible={!!websiteUrl}>
              <WebsiteIcon color="inherit" />
            </HoverAnchor >
          </div>

          <HoverAnchor href={`/project?project_id=${github_repo_name}`} className="px-4">
            Read More
          </HoverAnchor >
        </div>
      </div>

    </div>
  );
}
