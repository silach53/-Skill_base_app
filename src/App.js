import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TodoList from './TodoList';
import WindRose from './WindRose';
import './App.css';

const defaultSkills = [
  { skill: 'Skill 1', value: 100 },
  { skill: 'Skill 2', value: 200 },
  { skill: 'Skill 3', value: 300 },
  { skill: 'Skill 4', value: 0 },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [skillsData, setSkillsData] = useState(defaultSkills);

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
        .filter((todo) => todo.skill) // Filter out tasks without skills
        .forEach((todo) => {
          if (!skillMap[todo.skill]) {
            skillMap[todo.skill] = {
              skill: todo.skill,
              value: 0,
              taskCount: 0,
            };
          }
          skillMap[todo.skill].taskCount++;
    
          if (todo.completed) {
            skillMap[todo.skill].value += 100;
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
          />
        </div>
        <div className="WindRose">
          <WindRose data={skillsData} />
        </div>
      </div>
    </div>
  );
}

export default App;
