import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

import Header from "@/components/Header";
import LogoBackground from "@/components/LogoBackground";

import { getProject } from "@/data/projects";

export default async function ProjectPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const repoName = (await searchParams).repo_name as string || "undefined";
  const project = await getProject(repoName);

  const readmeContent = await fetch(`https://raw.githubusercontent.com/${project?.github_repo_owner}/${project?.github_repo_name}/refs/heads/master/README.md`)
    .then((res) => res.text())
    .catch(() => "No README found.");

  const matterResult = matter(readmeContent);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="w-fit mx-auto">
      <LogoBackground />

      <Header
        navigationItems={[
          { label: "About", href: "#about" },
          // { label: "Projects", href: "#projects" },
        ]}
      />

      <main className="flex flex-col justify-center items-center max-w-5xl gap-4 mx-8">

        <div id="links">
          <h1 className="text-4xl font-bold">Project Details</h1>
          {project ? (
            <>
              <p className="mt-4 text-lg">You are viewing details for project ID: <strong>{project.name}</strong></p>
              <p>{project.description}</p>
              <p>{project.github_repo_name}</p>
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </>
          ) : (
            <p className="mt-4 text-lg">No project selected.</p>
          )}
        </div>


      </main >
    </div>
  )
}