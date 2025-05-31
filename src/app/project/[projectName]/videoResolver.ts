const urlSolver: Record<string, string> = {
  "https://github.com/user-attachments/assets/78010aa9-616c-42fc-99f1-5bc43e8f5e59": "https://raw.githubusercontent.com/Darguima/Trivial-Brick-LI4/refs/heads/master/readme/demo.mp4"
}

export default function videoResolver(markdown: string): string {
  const markdownWithVideos = addVideoTag(markdown);
  const markdownWithFixedLinks = replaceBrokenLinks(markdownWithVideos);

  return markdownWithFixedLinks;
}

function addVideoTag(markdown: string) {
  const patterns = [
    /https:\/\/user-images\.githubusercontent\.com\/[^\s)]+\.mp4/g,
    /https:\/\/github\.com\/user-attachments\/assets\/[^\s)\]]+/g
  ];

  for (const pattern of patterns) {
    markdown = markdown.replace(pattern, (url) => `
<video controls src="${url}" type="video/mp4">
  Your browser does not support the video tag.
</video>
`);
  }

  return markdown;
};

function replaceBrokenLinks(markdown: string): string {
  const pattern = /"https:\/\/github\.com\/user-attachments\/assets\/[^\s)"]+"/g;


  const resolvedMarkdown = markdown.replace(pattern, (url) => {
    url = url.replace(/"/g, '');
    url = urlSolver[url] || url;

    return `"${url}"`;
  });

  return resolvedMarkdown;
}
