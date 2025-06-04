const urlSolver: Record<string, string> = {
  "https://github.com/user-attachments/assets/78010aa9-616c-42fc-99f1-5bc43e8f5e59": "https://raw.githubusercontent.com/Darguima/Trivial-Brick-LI4/refs/heads/master/readme/demo.mp4"
}

export default function videoResolver(markdown: string): string {
  const markdownWithFixedLinks = replaceBrokenLinks(markdown);
  const markdownWithVideos = addVideoTag(markdownWithFixedLinks);

  return markdownWithVideos;
}

function addVideoTag(markdown: string) {
  const patterns = [
    /https:\/\/[a-zA-Z0-9.-]+\.githubusercontent\.com\/[^\s)]+\.mp4/g,
    /https:\/\/github\.com\/user-attachments\/assets\/[^\s)\]]+/g,
    /https:\/\/github\.com\/[^/]+\/[^/]+\/assets\/[^\s)\]]+/g
  ];

  // The search is done line by line to avoid issues where two separated and not related lines match the same pattern
  const lines = markdown.split('\n');

  const processedLines = lines.map(line => {
    for (const pattern of patterns) {
      line = line.replace(pattern, (url) => `
<video controls src="${url}" type="video/mp4">
  Your browser does not support the video tag.
</video>
`);
    }
    return line;
  });

  return processedLines.join('\n');
};

function replaceBrokenLinks(markdown: string): string {
  for (const [key, value] of Object.entries(urlSolver)) {
    markdown = markdown.replaceAll(key, value);
  }

  return markdown;
}
