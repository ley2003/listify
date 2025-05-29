import React, { useState } from 'react';

function AddTodo({ addTodo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text, date, priority);
    setText('');
    setDate('');
    setPriority('');
    setIsOpen(false);
  };

  return (
    <div className="add-todo-container">
      {!isOpen ? (
        <div 
          className="add-todo-trigger" 
          onClick={() => setIsOpen(true)}
        >
          + Add To Do
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="add-todo-form">
          <div className="form-content">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              className="todo-input"
            />
            
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-input"
              />
            </div>
            
            <div className="form-group">
              <label>Priority</label>
              <div className="priority-options">
                <label className={`priority-option ${priority === 'High' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === 'High'}
                    onChange={() => setPriority('High')}
                  />
                  <span className="high-dot">●</span> High
                </label>
                <label className={`priority-option ${priority === 'Mid' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="priority"
                    value="Mid"
                    checked={priority === 'Mid'}
                    onChange={() => setPriority('Mid')}
                  />
                  <span className="mid-dot">●</span> Mid
                </label>
                <label className={`priority-option ${priority === 'Low' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={priority === 'Low'}
                    onChange={() => setPriority('Low')}
                  />
                  <span className="low-dot">●</span> Low
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">Add</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTodo;