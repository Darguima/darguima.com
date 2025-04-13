import Markdown from 'react-markdown'

import Header from "@/components/Header";
import LogoBackground from "@/components/LogoBackground";

import { getProject } from "@/data/projects-cache";

export default async function ProjectPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const repoName = (await searchParams).repo_name as string || "undefined";
  const project = await getProject(repoName);
  const readmeContent = project?.readmeContent;

  return (
    <>
      <LogoBackground />

      <Header
        navigationItems={[
          { label: "About", href: "#about" },
          // { label: "Projects", href: "#projects" },
        ]}
      />

      <main className="flex flex-col justify-center items-center gap-4">
        {
          project ? (
            <>
              <div id="project-header">
                <h1 className="text-4xl font-bold">{project.name}</h1>
              </div>
              <div id="documentation" className='flex flex-col gap-8'>
                <p>{project.description}</p>
                {
                  readmeContent
                    ?
                    <div className='w-full overflow-hidden'>
                      <Markdown>{readmeContent}</Markdown>
                    </div>
                    :
                    <p>No README available.</p>
                }
              </div>
            </>
          ) : (
            <div className='flex justify-center items-center w-full h-full'>
              <p className="mt-4 text-lg">No project selected.</p>
            </div>
          )}
      </main >
    </>
  )
}