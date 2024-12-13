import React from 'react';
import Button from './Button';

const ProjectsSidebar = ({
  handleCreateProject,
  allProjects,
  handleSelectedProject,
}) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-4">Your Projects</h2>
      <div>
        <Button onClick={handleCreateProject}>+ Add Project</Button>
      </div>
      <ul className="mt-4">
        {allProjects.allProjectsContent.map((project) => {
          let cssClasses =
            'w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800';
          if (project.id === allProjects.selectedProjectId) {
            cssClasses += ' text-stone-200 bg-stone-800';
          } else {
            cssClasses += ' text-stone-400';
          }
          return (
            <li className={cssClasses} key={project.id}>
              <button onClick={() => handleSelectedProject(project.id)}>
                {project.projectData.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProjectsSidebar;
