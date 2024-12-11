import React from 'react';
import Button from './Button';

const ProjectsSidebar = ({ handleCreateProject }) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="">Your Projects</h2>
      <div>
        <Button onClick={handleCreateProject}>+ Add Project</Button>
      </div>
      <ul></ul>
    </aside>
  );
};

export default ProjectsSidebar;
