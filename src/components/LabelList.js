import React, { useState } from 'react';

const LabelList = ({ labels, addLabel, updateLabel, deleteLabel }) => {
  const [input, setInput] = useState('');

  const handleAddLabel = (event) => {
    event.preventDefault();
    addLabel(input);
    setInput('');
  };

  return (
    <div className="LabelList">
      <h2>Labels</h2>
      <form onSubmit={handleAddLabel}>
        <input
          placeholder="Label name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {labels.map((label, index) => (
          <li key={index}>
            <input
              value={label.name}
              onChange={(e) => updateLabel(index, e.target.value)}
            />
            <button onClick={() => deleteLabel(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelList;