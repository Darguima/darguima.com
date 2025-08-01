import { ClassAttributes, ComponentType, HTMLAttributes, createElement } from 'react';

import ReactMarkdown, { Components, ExtraProps } from 'react-markdown'
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm'
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebsiteIcon from '@mui/icons-material/Language';

import LogoBackground from "@/components/LogoBackground";
import GoToTopButton from '@/components/GoToTopButton';
import Header from "@/components/Header";

import styles from './page.module.css'

import { getProject } from "@/data/projects-cache";
import { ReadmeSectionTitle } from '@/utils/readmeParser/sectionsParserAndCleaner';
import getLinkAttributes from '@/utils/getLinkAttributes';

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

  img: (props) => (
    <img
      {...props}
      style={{
        maxHeight: '400px',
        width: props.width || props.style?.width || 'auto',
        height: props.height || props.style?.height || 'auto',
        ...props.style
      }}
    />
  ),

  video: (props) => (
    <video
      {...props}
      style={{
        maxHeight: '400px',
        width: props.width || props.style?.width || 'auto',
        height: props.height || props.style?.height || 'auto',
        ...props.style
      }}
      controls
    />
  ),

  a: ({ href, ...props }) => {
    const linkAttributes = href ? getLinkAttributes(href) : {};

    // TODO: Replace <a> with <Link>. The problem was on anchors with special unicode characters on href that were not being handled correctly (ex.: download project)
    return <a href={href || "./"} {...props} {...linkAttributes} />
  }
};


export default async function ProjectPage({ params }: { params: Promise<{ projectName: string }> }) {
  const { projectName } = await params
  const project = await getProject(projectName);
  const readmeSections = project?.readmeSections;

  return (
    <>
      <LogoBackground />

      <GoToTopButton />

      <Header
        navigationItems={[
          { label: <HomeIcon />, href: "/" },
          { label: <GitHubIcon />, href: project?.githubUrl },
          { label: <WebsiteIcon />, href: project?.websiteUrl },
        ].filter(e => e.href !== undefined) as { label: React.ReactNode; href: string }[]}
        selectedItemIndex={-1}
      />

      <main id='project' className="mt-16">
        {
          readmeSections ? (
            <div className={`${styles.markdownBody}`}>
              {(Object.keys(readmeSections) as Array<ReadmeSectionTitle>).map((title) => {
                let containerStyle: string = "mb-16 "

                switch (title) {
                  case "header":
                    containerStyle += " mb-[0px] py-8 px-2 bg-background-level-0.5 rounded-lg";
                    break;

                  default:
                    break;
                }

                return (
                  <div key={title} className={containerStyle}>
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw, remarkGfm, () => rehypeSanitize(rehypeSchema)]}
                      urlTransform={url => {
                        const isUrlValid = url.startsWith('http') || url.startsWith('#')

                        return isUrlValid ? url : `${project.githubReadmeBasePath}/${url}`
                      }}
                      components={components}
                    >
                      {readmeSections[title] || ''}
                    </ReactMarkdown>
                  </div>
                )
              })}

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