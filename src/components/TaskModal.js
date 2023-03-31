import React, { useState, useEffect } from 'react';

const TaskModal = ({
  selectedTaskIndex,
  todos,
  setSelectedTaskIndex,
  updateTodo,
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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="task-modal-overlay"
        onClick={handleCloseModal}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '400px',
            width: '90%',
          }}
          className="task-modal"
          onClick={(event) => event.stopPropagation()} // Prevent click event from propagating to the overlay div
        >
          {/* Render the task details here */}
          <form>
            <label>
              Task:
              <input
                type="text"
                name="text"
                value={editedTask.text || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editedTask.description || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Due Date:
              <input
                type="text"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleChange}
              />
            </label>
            <label>
              Skill:
              <input
                type="text"
                name="skill"
                value={editedTask.skill}
                onChange={handleChange}
              />
            </label>
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
            <label>
              Project:
              <input
                type="text"
                name="project"
                value={editedTask.project}
                onChange={handleChange}
              />
            </label>
            <label>
              Label:
              <input
                type="text"
                name="label"
                value={editedTask.label}
                onChange={handleChange}
              />
            </label>
          </form>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
    )
  );
};
export default TaskModal;