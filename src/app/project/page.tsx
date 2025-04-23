import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import styles from './page.module.css'

import Header from "@/components/Header";
import LogoBackground from "@/components/LogoBackground";

import { getProject } from "@/data/projects-cache";
import { GoToTopButton } from '@/components/GoToTopButton';

export default async function ProjectPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const repoName = (await searchParams).repo_name as string || "undefined";
  const project = await getProject(repoName);
  const readmeContent = project?.readmeContent;

  return (
    <>
      <LogoBackground />

      <GoToTopButton />

      <Header />

      <main className="mt-16">
        {
          project && readmeContent ? (
            <div className={`${styles.markdownBody}`}>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                urlTransform={url => {
                  const isUrlValid = url.startsWith('http') || url.startsWith('#')

                  return isUrlValid ? url : `${project.githubReadmeBasePath}/${url}`
                }}
              >
                {readmeContent}
              </ReactMarkdown>
            </div>
          ) : (
            <div className='flex justify-center items-center w-full h-full p-16'>
              <h1 className='text-2xl'>Please use a valid project.</h1>
            </div>
          )}
      </main >
    </>
  )
}