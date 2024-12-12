import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';

function App() {
  const [allProjects, setAllProjects] = useState({
    allProjectsId: undefined,
    allProjectsContent: [],
  });

  function handleCreateProject() {
    setAllProjects((prev) => ({
      ...prev,
      allProjectsId: null,
    }));
  }

  function handleAddProject(project) {
    setAllProjects((prev) => {
      const newProject = {
        projectDate: project,
        id: Math.random(),
      };
      return {
        ...prev,
        allProjectsId: undefined,
        allProjectsContent: [...prev.allProjectsContent, newProject],
      };
    });
  }

  console.log(allProjects);

  let conent;
  if (allProjects.allProjectsId === null) {
    conent = <NewProject onAdd={handleAddProject} />;
  } else if (allProjects.allProjectsId === undefined) {
    conent = <NoProjectSelected handleCreateProject={handleCreateProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        allProjects={allProjects}
        handleCreateProject={handleCreateProject}
      />
      {conent}
    </main>
  );
}

export default App;
