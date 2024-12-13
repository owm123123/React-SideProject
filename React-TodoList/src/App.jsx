import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';
import SelectedProject from './components/SelectedProject';

function App() {
  const [allProjects, setAllProjects] = useState({
    selectedProjectId: undefined,
    allProjectsContent: [],
    tasks: [],
  });

  function handleAddTasks(taskData) {
    if (taskData.trim() === '') {
      return;
    }
    setAllProjects((prev) => {
      const newTask = {
        taskData: taskData,
        id: Math.random(),
      };
      return {
        ...prev,
        tasks: [newTask, ...prev.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setAllProjects((prev) => ({
      ...prev,
      tasks: allProjects.tasks.filter((task) => task.id !== id),
    }));
  }

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
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTasks}
      onDeleteTask={handleDeleteTask}
      tasks={allProjects.tasks}
    />
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
