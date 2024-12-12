import React from 'react';
import Button from './Button';

const ProjectsSidebar = ({ handleCreateProject, allProjects }) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="">Your Projects</h2>
      <div>
        <Button onClick={handleCreateProject}>+ Add Project</Button>
      </div>
      <ul className="mt-4">
        {allProjects.allProjectsContent.map((project) => (
          <li
            className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            key={project.id}
          >
            {project.projectDate.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ProjectsSidebar;
