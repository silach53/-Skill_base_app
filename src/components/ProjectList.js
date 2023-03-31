import React, { useState } from 'react';

const ProjectList = ({ projects, addProject, updateProject, deleteProject }) => {
  const [input, setInput] = useState('');

  const handleAddProject = (event) => {
    event.preventDefault();
    addProject(input);
    setInput('');
  };

  return (
    <div className="ProjectList">
      <h2>Projects</h2>
      <form onSubmit={handleAddProject}>
        <input
          placeholder="Project name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <input
              value={project.name}
              onChange={(e) => updateProject(index, e.target.value)}
            />
            <button onClick={() => deleteProject(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;