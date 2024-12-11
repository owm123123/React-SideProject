import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectsSidebar from './components/ProjectsSidebar';

function App() {
  const [projectState, setProjectState] = useState({
    projectId: undefined,
    projectContent: [],
  });

  function handleCreateProject() {
    setProjectState((prev) => ({
      ...prev,
      projectId: null,
    }));
  }

  let conent;
  if (projectState.projectId === null) {
    conent = <NewProject />;
  } else if (projectState.projectId === undefined) {
    conent = <NoProjectSelected handleCreateProject={handleCreateProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar handleCreateProject={handleCreateProject} />
      {conent}
    </main>
  );
}

export default App;
