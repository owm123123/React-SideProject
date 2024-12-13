import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import SelectedProject from './components/SelectedProject';

function App() {
  const [allProjects, setAllProjects] = useState({
    selectedProjectId: undefined,
    allProjectsContent: [],
  });

  function handleEntryCreateProject() {
    setAllProjects((prev) => ({
      ...prev,
      selectedProjectId: null,
    }));
  }

  function handleCancelProject() {
    setAllProjects((prev) => ({
      ...prev,
      selectedProjectId: undefined,
    }));
  }

  function handleDeleteProject() {
    setAllProjects((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      allProjectsContent: allProjects.allProjectsContent.filter(
        (product) => product.id !== selectedProject.id
      ),
    }));
  }

  function handleSelectedProject(id) {
    setAllProjects((prev) => ({
      ...prev,
      selectedProjectId: id,
    }));
  }

  function handleAddProject(project) {
    setAllProjects((prev) => {
      const newProject = {
        projectData: project,
        id: Math.random(),
      };
      return {
        ...prev,
        selectedProjectId: undefined,
        allProjectsContent: [...prev.allProjectsContent, newProject],
      };
    });
  }

  const selectedProject = allProjects.allProjectsContent.find(
    (project) => project.id === allProjects.selectedProjectId
  );
  let conent = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />
  );

  if (allProjects.selectedProjectId === null) {
    conent = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
    );
  } else if (allProjects.selectedProjectId === undefined) {
    conent = (
      <NoProjectSelected handleCreateProject={handleEntryCreateProject} />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        allProjects={allProjects}
        handleCreateProject={handleEntryCreateProject}
        handleSelectedProject={handleSelectedProject}
      />
      {conent}
    </main>
  );
}

export default App;
