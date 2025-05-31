import { ClassAttributes, ComponentType, HTMLAttributes, createElement } from 'react';
import ReactMarkdown, { Components, ExtraProps } from 'react-markdown'
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import styles from './page.module.css'

import LogoBackground from "@/components/LogoBackground";
import GoToTopButton from '@/components/GoToTopButton';
import Header from "@/components/Header";

import { getProject } from "@/data/projects-cache";
import videoResolver from './videoResolver';

const rehypeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'video'],
  attributes: {
    ...defaultSchema.attributes,
    video: ['src', 'type', 'controls'],
  }
}

const generateSlug = (text: string) => {
  return encodeURIComponent(
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\uFE0F]/g, '')
  );
};

type HeaderSlugProps = ComponentType<ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps>
const setHeaderSlug: HeaderSlugProps = ({ node, children, ...props }) => {

  const tagName = node?.tagName as string || '';

  const text = children?.valueOf().toString() || '';

  const id = generateSlug(text); // Generate the slug

  return createElement(tagName, { id, ...props }, children);
}

const components: Components = {
  h1: setHeaderSlug,
  h2: setHeaderSlug,
  h3: setHeaderSlug,
  h4: setHeaderSlug,
  h5: setHeaderSlug,
  h6: setHeaderSlug,
};


export default async function ProjectPage({ params }: { params: Promise<{ projectName: string }> }) {
  const { projectName } = await params
  const project = await getProject(projectName);
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
                rehypePlugins={[rehypeRaw, () => rehypeSanitize(rehypeSchema)]}
                urlTransform={url => {
                  const isUrlValid = url.startsWith('http') || url.startsWith('#')

                  return isUrlValid ? url : `${project.githubReadmeBasePath}/${url}`
                }}
                components={components}
              >
                {videoResolver(readmeContent)}
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