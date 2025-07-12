const readmeSectionsTitles = [
  "header", // implicit
  "table of contents",
  "about the project",
  "download installation",
  "usage",
  "api documentation",
  "disclaimer",
] as const;

export type ReadmeSectionTitle = typeof readmeSectionsTitles[number];

export type ReadmeSections = {
  [key in ReadmeSectionTitle]?: string;
};

/**
  * Cleans all the sections that are not included in the sections array.
**/
export default function sectionsParserAndCleaner(markdown: string): ReadmeSections {
  // Table of contents is a special section that needs to be removed separately
  const payload = removeTableOfContents(markdown).split("\n")

  var referenceStyles = ""

  type reduceType = { sections: ReadmeSections, keepSection: boolean, lastTitle: ReadmeSectionTitle };
  const sections = payload.reduce<reduceType>(({ sections, keepSection, lastTitle }, line) => {

    const normalizedLine = line
      .replace(/[^a-zA-Z0-9 ]/g, '') // Filter just to alphanumeric characters and spaces
      .trim().split(" ").filter(e => e).join(" ") // Remove extra spaces
      .toLowerCase()

    const isTitle = line.startsWith("## ");
    const isReferenceStyleLink = /^\[[^\]]+\]:\s+.+$/.test(line);

    if (isTitle) {
      keepSection = readmeSectionsTitles.some(section => normalizedLine.includes(section))
      if (keepSection) {
        lastTitle = normalizedLine as ReadmeSectionTitle;
      }
    }

    if (keepSection && !isReferenceStyleLink) {
      sections[lastTitle] = (sections[lastTitle] || "") + line + "\n";
    }

    else if (isReferenceStyleLink) {
      referenceStyles += line + "\n";
    }

    return { sections, keepSection, lastTitle };

  }, { sections: {}, keepSection: true, lastTitle: "header" }).sections;

  // Add the reference styles to the sections
  readmeSectionsTitles.forEach(section => {
    if (sections[section])
      sections[section] += referenceStyles;
  });

  return sections;
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
