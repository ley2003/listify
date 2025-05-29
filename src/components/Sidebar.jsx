import React, { useState } from 'react';

const Sidebar = ({ lists, activeList, setActiveList, addNewList, removeList }) => {
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleAddListClick = () => {
    setIsAddingNewList(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      addNewList(newListName);
      setNewListName('');
      setIsAddingNewList(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingNewList(false);
    setNewListName('');
  };

  return (
    <div className="sidebar">
      <h1>Listify</h1>
      <h3>My Lists</h3>
      <ul>
        {lists.map(list => (
          <li 
            key={list} 
            className={list === activeList ? 'active' : ''}
            onClick={() => setActiveList(list)}
          >
            {list}
            {list === activeList && (
              <button 
                className="remove-list-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeList(list);
                }}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
      
      {isAddingNewList ? (
        <div className="new-list-form-container">
          <form className="new-list-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              autoFocus
              placeholder="Enter list name"
              className="new-list-input"
            />
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={handleCancelAdd}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Add List
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button className="new-list-btn" onClick={handleAddListClick}>
          <span className="plus-icon">+</span> New List
        </button>
      )}
    </div>
  );
};

export default Sidebar;