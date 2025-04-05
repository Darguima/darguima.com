import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import HoverAnchor from "@/components/HoverAnchor";

import Image from "next/image";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

import { categories, projects } from "@/data/projects";

import LogoBackground from "@/components/LogoBackground";

export default function Home() {
  return (
    <div className="w-fit mx-auto">
      <LogoBackground />

      <Header />

      <main className="flex flex-col justify-center items-center max-w-5xl gap-4 mx-8">

        <div
          id="about"
          className="flex flex-col md:flex-row justify-center items-center gap-16 h-screen py-4"
        >
          <Image src={"https://github.com/darguima.png"} alt="Github Avatar" width={256} height={256} className="rounded-full" />

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center">
              I&apos;m <span className="text-primary">Dário Guimarães</span>
            </h1>

            <h2 className="text-3xl font-bold text-center">
              <span className="text-white">Software Developer</span>
            </h2>

            <h3 className="text-2xl font-bold text-center">
              <span className="text-white">Braga, Portugal</span>
            </h3>

            <h4 className="text-3xl font-bold text-center">
              <div className="flex flex-row gap-4 justify-center">
                <HoverAnchor href="https://github.com/darguima">
                  <GitHubIcon fontSize="inherit" />
                </HoverAnchor>

                <HoverAnchor href="https://pt.linkedin.com/in/darguima" >
                  <LinkedinIcon fontSize="inherit" />
                </HoverAnchor>

                <HoverAnchor href="mailto:dsgdevbraga@gmail.com" isExternal={true} >
                  <MailIcon fontSize="inherit" />
                </HoverAnchor>
              </div>
            </h4>
          </div>
        </div>

        <div id="projects" className="py-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <h2 className="text-3xl font-bold text-start">
              My Projects
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <HoverAnchor href={`/?projectsCategory=${category}`} key={category} className={`px-5 ${category === "Pinned" ? "bg-primary" : "bg-background-level-1"}`}>
                  {category}
                </HoverAnchor>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                image={project.image}
                github_owner={project.github_owner}
                github_repo={project.github_repo}
                websiteUrl={project.websiteUrl}
              />
            ))}

          </div>
        </div>

      </main >
    </div>
  )
    ;
}
