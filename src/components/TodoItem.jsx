import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  const getPriorityClass = () => {
    switch (todo.priority) {
      case 'High':
        return 'high-priority';
      case 'Mid':
        return 'mid-priority';
      case 'Low':
        return 'low-priority';
      default:
        return '';
    }
  };

  return (
    <li className={`todo-item ${getPriorityClass()} ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <div className="todo-meta">
        <span className="todo-date">{todo.date}</span>
        <span 
          className="priority-indicator"
          style={{ 
            backgroundColor: todo.priority === 'High' ? '#ff5c5c' : 
                          todo.priority === 'Mid' ? '#ffbb33' : 
                          todo.priority === 'Low' ? '#33cc33' : 'transparent'
          }}
        ></span>
        <button 
          className="delete-btn"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;