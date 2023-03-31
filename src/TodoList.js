import React, { useState } from 'react';

const TodoCard = ({ todo, toggleTodo, deleteTodo, index }) => {
    const [dueDate, setDueDate] = useState(todo.dueDate);
    const [skill, setSkill] = useState(todo.skill);
    const [isOpen, setIsOpen] = useState(false);
  
    const updateTodo = (field, value) => {
      if (field === 'dueDate') {
        setDueDate(value);
      } else if (field === 'skill') {
        setSkill(value);
      }
      todo[field] = value;
    };
  
    const handleMouseEnter = () => {
      setIsOpen(true);
    };
  
    const handleMouseLeave = () => {
      setIsOpen(false);
    };
  
    return (
  <div
    className="todo-card-container"
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
              : todo.description.slice(0, 20) + '...'}
          </td>
        </tr>
        <tr>
          <td className="due-date">
            {isOpen && (
              <input
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => updateTodo('dueDate', e.target.value)}
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
                onChange={(e) => updateTodo('skill', e.target.value)}
              />
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
  </div>
);

const TodoList = ({ todos, setTodos }) => {
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
        completed: false,
      },
    ]);
    setInput('');
    setDescription('');
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
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;