import React, { useState } from 'react';

const TodoCard = ({
  todo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  index,
  projects,
  labels,
}) => {
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [skill, setSkill] = useState(todo.skill);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdateTodo = (field, value) => {
    if (field === 'dueDate') {
      setDueDate(value);
    } else if (field === 'skill') {
      setSkill(value);
    }
    updateTodo(index, field, value);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleAddSubtask = (event) => {
    event.preventDefault();
    const subtask = {
      text: input,
      description: description,
      dueDate: '',
      skill: '',
      completed: false,
    };
    updateTodo(index, 'subtasks', [...todo.subtasks, subtask]);
    setInput('');
    setDescription('');
  };

  return (
    <div
      className={`todo-card-container${todo.completed ? ' completed' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <table className="todo-card">
        <tbody>
          <tr>
            <td className="task-text">{todo.text}</td>
          </tr>
          <tr>
            <td className="description">
              {isOpen
                ? todo.description
                : todo.description.length > 20
                ? todo.description.slice(0, 20) + '...'
                : todo.description}
            </td>
          </tr>
          <tr>
            <td className="due-date">
              {isOpen && (
                <input
                  placeholder="Due Date"
                  value={dueDate}
                  onChange={(e) => handleUpdateTodo('dueDate', e.target.value)}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className="skill">
              {isOpen && (
                <input
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleUpdateTodo('skill', e.target.value)}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className="priority">
              {isOpen && (
                <select
                  value={todo.priority}
                  onChange={(e) =>
                    handleUpdateTodo('priority', parseInt(e.target.value, 10))
                  }
                >
                  <option value="1">P1</option>
                  <option value="2">P2</option>
                  <option value="3">P3</option>
                  <option value="4">P4</option>
                </select>
              )}
            </td>
          </tr>
          <tr>
            <td className="project">
              {isOpen && (
                <select
                  value={todo.project}
                  onChange={(e) => handleUpdateTodo('project', e.target.value)}
                >
                  <option value="">No project</option>
                  {projects.map((project, i) => (
                    <option key={i} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              )}
            </td>
          </tr>
          <tr>
            <td className="label">
              {isOpen && (
                <select
                  value={todo.label}
                  onChange={(e) => handleUpdateTodo('label', e.target.value)}
                >
                  <option value="">No label</option>
                  {labels.map((label, i) => (
                    <option key={i} value={label.name}>
                      {label.name}
                    </option>
                  ))}
                </select>
              )}
            </td>
          </tr>
          {isOpen && (
            <tr>
              <td>
                <button onClick={() => toggleTodo(index)}>Toggle</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isOpen && (
        <div className="subtasks">
          <form onSubmit={handleAddSubtask}>
            <input
              placeholder="Subtask"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Subtask</button>
          </form>
          <ul>
            {todo.subtasks.map((subtask, idx) => (
              <li key={idx}>
                {/* Render subtasks similar to parent tasks */}
                {/* You can create a reusable component for this */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const TodoList = ({
  todos,
  setTodos,
  updateTodo,
  toggleTodo,
  deleteTodo,
  projects,
  labels,
}) => {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        text: input,
        description: description,
        dueDate: '',
        skill: '',
        priority: 1,
        project: '',
        label: '',
        subtasks: [],
        completed: false,
      },
    ]);
    setInput('');
    setDescription('');
  };

  return (
    <div className="TodoList">
      <h2>Todo List</h2>
      <form onSubmit={addTodo}>
        <input
          placeholder="Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <TodoCard
              index={index}
              todo={todo}
              updateTodo={updateTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              projects={projects}
              labels={labels}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
