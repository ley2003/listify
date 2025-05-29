import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  const sortByPriority = (a, b) => {
    const priorityOrder = { High: 1, Mid: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>No todos for this date</p>
      ) : (
        <ul>
          {todos.sort(sortByPriority).map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;