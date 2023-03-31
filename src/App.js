import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TodoList from './TodoList';
import WindRose from './WindRose';
import './App.css';
import TaskModal from './components/TaskModal'; // Import the TaskModal component at the top of the file

const defaultSkills = [
  { skill: 'Skill 1', value: 100 },
  { skill: 'Skill 2', value: 200 },
  { skill: 'Skill 3', value: 300 },
  { skill: 'Skill 4', value: 0 },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [skillsData, setSkillsData] = useState(defaultSkills);
  const [projects, setProjects] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);

  const addProject = (projectName) => {
    setProjects([...projects, { name: projectName, tasks: [] }]);
  };

  const updateProject = (index, projectName) => {
    const updatedProjects = [...projects];
    updatedProjects[index].name = projectName;
    setProjects(updatedProjects);
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addLabel = (labelName) => {
    setLabels([...labels, { name: labelName }]);
  };

  const updateLabel = (index, labelName) => {
    const updatedLabels = [...labels];
    updatedLabels[index].name = labelName;
    setLabels(updatedLabels);
  };

  const deleteLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const updateSkillsData = () => {
      const skillMap = {
        ...defaultSkills.reduce(
          (acc, skill) => ({
            ...acc,
            [skill.skill]: { ...skill, taskCount: 0 },
          }),
          {}
        ),
      };

      todos
    .filter((todo) => todo.skill || todo.project || todo.label)
    .forEach((todo) => {
      // ... existing code

      if (todo.project) {
        skillMap[todo.project].taskCount++;
        if (todo.completed) {
          skillMap[todo.project].value += 100;
        }
      }

      if (todo.label) {
        skillMap[todo.label].taskCount++;
        if (todo.completed) {
          skillMap[todo.label].value += 100;
        }
      }
    });

      const skills = Object.values(skillMap);
      //const maxValue = Math.max(...skills.map((skillData) => skillData.value));

      const normalizedSkills = skills.map((skillData) => ({
        ...skillData,
        value:
          skillData.taskCount === 0
            ? skillData.value
            : (skillData.value * 100) / (skillData.taskCount * 100),
      }));

      setSkillsData(normalizedSkills);
    };

    updateSkillsData();
  }, [todos]);

  const updateTodo = (index, field, value) => {
    const newTodos = [...todos];
    newTodos[index][field] = value;
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <div className="TodoList">
          <TodoList
            todos={todos}
            setTodos={setTodos}
            updateTodo={updateTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            projects={projects}
            labels={labels}
            setSelectedTaskIndex={setSelectedTaskIndex} // Add this line
          />
        </div>
        <div className="WindRose">
          <WindRose data={skillsData} />
        </div>
        <TaskModal
        selectedTaskIndex={selectedTaskIndex}
        todos={todos}
        setSelectedTaskIndex={setSelectedTaskIndex}
        updateTodo={updateTodo} // Add this line to pass the updateTodo function
        />
      </div>
    </div>
  );
}

export default App;
