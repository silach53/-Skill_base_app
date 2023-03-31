import React, { useState, useEffect } from 'react';

const TaskModal = ({
  selectedTaskIndex,
  todos,
  setSelectedTaskIndex,
  updateTodo,
  toggleTodo, // Add this line
  deleteTodo, // Add this line
  // other necessary props
}) => {
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    if (selectedTaskIndex !== -1) {
      setEditedTask(todos[selectedTaskIndex]);
    } else {
      setEditedTask({});
    }
  }, [selectedTaskIndex, todos]);

  const handleCloseModal = (event) => {
    // Prevent propagation of click event to child elements
    event.stopPropagation();
    setSelectedTaskIndex(-1);
  };

  const handleChange = (event) => {
    setEditedTask({ ...editedTask, [event.target.name]: event.target.value });
  };

  const handleSaveChanges = () => {
    Object.keys(editedTask).forEach((key) => {
      if (todos[selectedTaskIndex][key] !== editedTask[key]) {
        updateTodo(selectedTaskIndex, key, editedTask[key]);
      }
    });
    setSelectedTaskIndex(-1);
  };

  return (
    selectedTaskIndex !== -1 && (
      <div className="task-modal-overlay" onClick={handleCloseModal}>
        <div className="task-modal" onClick={(event) => event.stopPropagation()}>
          <form>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label>
                  Task:
                  <input
                    type="text"
                    name="text"
                    value={editedTask.text || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Due Date:
                  <input
                    type="text"
                    name="dueDate"
                    value={editedTask.dueDate}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
              <label>
  Description:
  <textarea
    name="description"
    value={editedTask.description || ''}
    onChange={handleChange}
    className="description-input"
  />
</label>
              </div>
              <div>
                <label>
                  Skill:
                  <input
                    type="text"
                    name="skill"
                    value={editedTask.skill}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div />
              <div>
                <label>
                  Priority:
                  <input
                    type="number"
                    name="priority"
                    min="1"
                    max="4"
                    value={editedTask.priority}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div />
              <div>
                <label>
                  Project:
                  <input
                    type="text"
                    name="project"
                    value={editedTask.project}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div />
              <div>
                <label>
                  Label:
                  <input
                    type="text"
                    name="label"
                    value={editedTask.label}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </form>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={() => toggleTodo(selectedTaskIndex)}>Toggle</button> 
          <button onClick={() => deleteTodo(selectedTaskIndex)}>Delete</button> 
        </div>
      </div>
    )
);
    }
export default TaskModal;