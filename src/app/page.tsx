import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

import Image from "next/image";

import { categories, projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex justify-center">
        <div className="flex flex-col justify-center items-center max-w-5xl gap-8 mx-8">

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 my-24">
            <Image src={"https://github.com/darguima.png"} alt="Github Avatar" width={384} height={384} className="rounded-full" />

            {/* 
            <h1 className="text-4xl font-bold text-left">
              <div className="flex flex-col gap-6">
                <span className="opacity-20">printf("</span>
                <span className="ml-8">I'm <span className="text-primary">Dário Guimarães</span></span>
                <span className="opacity-20">");</span>
              </div>
            </h1>
            */}

            <h1 className="text-4xl font-bold text-center">
              I'm <span className="text-primary">Dário Guimarães</span>
            </h1>

          </div>

          <div >
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
              <h2 className="text-3xl font-bold text-start">
                My Projects
              </h2>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <a href={"/"} key={category} target="_blank" rel="noopener noreferrer" className={`rounded-2xl py-2 px-5 ${category === "Pinned" ? "bg-primary" : "bg-background-level-1 hover:bg-primary/50"}`}>
                    {category}
                  </a>
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

        </div >
      </main >
    </>
  )
    ;
}
