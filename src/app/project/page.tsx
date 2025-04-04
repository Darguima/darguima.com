export default async function ProjectPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const projectId = (await searchParams).project_id;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-level-1 text-foreground">
      <h1 className="text-4xl font-bold">Project Details</h1>
      {projectId ? (
        <p className="mt-4 text-lg">You are viewing details for project ID: <strong>{projectId}</strong></p>
      ) : (
        <p className="mt-4 text-lg">No project selected.</p>
      )}
    </div>
  );
}