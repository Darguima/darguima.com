"use client";

import { useEffect, useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import HoverAnchor from "@/components/HoverAnchor";

import { categories, ProjectCategory, Project } from "@/data/projects";

interface ProjectsProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: Project[];
}

export default function Projects({ projects, className, ...rest }: ProjectsProps) {
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory>("Pinned");

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setFilteredProjects(projects.filter(project => project.categories.includes(categoryFilter)));
  }, [projects, categoryFilter]);

  return (
    <div className={`py-4 ${className}`} {...rest}>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <h2 className="text-3xl font-bold text-start">
          My Projects
        </h2>

        <div className="flex flex-wrap gap-2">
          {/* ToDo: Convert this anchors on buttons */}
          {categories.map((category: ProjectCategory) => (
            <HoverAnchor
              key={category}
              onClick={e => {
                e.preventDefault();
                setCategoryFilter(category);
              }}
              type="button"
              className={`px-5 ${category === categoryFilter ? "bg-primary" : "bg-background-level-1"}`}
            >
              {category}
            </HoverAnchor>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}