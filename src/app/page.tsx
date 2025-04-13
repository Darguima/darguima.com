import LogoBackground from "@/components/LogoBackground";
import Header from "@/components/Header";
import Projects from "./Projects";
import HoverAnchor from "@/components/HoverAnchor";

import Image from "next/image";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

import { getProjects } from "@/data/projects-cache";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <LogoBackground />

      <Header
        navigationItems={[
          { label: "About", href: "#about" },
          { label: "Projects", href: "#projects" },
        ]}
      />

      <main className="flex flex-col justify-center items-center gap-4">
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

        <Projects
          id="projects"
          projects={projects}
        />
      </main >
    </>
  );
}
