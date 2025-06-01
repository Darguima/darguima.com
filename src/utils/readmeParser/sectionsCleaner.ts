const sections = [
  "table of contents",
  "about the project",
  "glossary",
  "download installation",
  "usage",
  "api documentation",
  "disclaimer",
]

/**
  * Cleans all the sections that are not included in the sections array.
**/
export default function sectionsCleaner(markdown: string) {
  // Table of contents is a special section that needs to be removed separately
  const payload = removeTableOfContents(markdown).split("\n")

  return payload.reduce(({ markdown, keepSection }, line) => {

    const normalizedLine = line
      .replace(/[^a-zA-Z0-9 ]/g, '') // Filter just to alphanumeric characters and spaces
      .trim().split(" ").filter(e => e).join(" ") // Remove extra spaces
      .toLowerCase()

    const isTitle = line.startsWith("## ");
    const isReferenceStyleLink = /^\[[^\]]+\]:\s+.+$/.test(line);

    if (isTitle) {
      keepSection = sections.some(section => normalizedLine.includes(section))
    }

    if (keepSection || isReferenceStyleLink) {
      markdown += line + "\n";
    }

    return { markdown, keepSection };

  }, { markdown: "", keepSection: true }).markdown.trim();
}

/**
 * Removes the table of contents section from the markdown content.
 * The table of contents is expected to be wrapped in a <details> block
 * and contain a header with "## * Table of Contents".
 * 
 * Table of contents is a special section that needs to be handled separately
 *
 * @param {string} markdown - The markdown content to clean.
 * @returns {string} - The cleaned markdown content without the table of contents.
 */
function removeTableOfContents(markdown: string): string {
  // Regex to match the <details> block containing "## * Table of Contents"
  const tocRegex = /<details>[\s\S]*?## .*table of contents[\s\S]*?<\/details>/gi;

  // Replace the matched block with an empty string
  return markdown.replace(tocRegex, '').trim();
}
