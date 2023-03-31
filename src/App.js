import React, { useState } from 'react';
import Navbar from './Navbar';
import TodoList from './TodoList';
import WindRose from './WindRose';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <div className="TodoList">
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
        <div className="WindRose">
          <WindRose data={todos} />
        </div>
      </div>
    </div>
  );
}

export default App;