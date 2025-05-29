import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [activeList, setActiveList] = useState('Life');
  const [lists, setLists] = useState(['Life', 'School', 'Projects']);
  const [todos, setTodos] = useState([
    { 
      id: 1, 
      text: 'My diary', 
      completed: false, 
      date: '2025-05-31',
      priority: 'Mid',
      list: 'Life'
    },
    { 
      id: 2, 
      text: 'Join me on', 
      completed: false, 
      date: '2025-05-01',
      priority: 'High',
      list: 'School'
    },
    { 
      id: 3, 
      text: 'Visit me on', 
      completed: false, 
      date: '2025-05-15',
      priority: 'Low',
      list: 'Projects'
    }
  ]);

  const getMonth = () => {
    return new Date().toLocaleString('default', { month: 'long' });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning.';
    if (hour < 18) return 'Good afternoon.';
    return 'Good evening.';
  };

  if (!showApp) {
    return <LandingPage onProceed={() => setShowApp(true)} />;
  }

  const addNewList = (listName) => {
    setLists([...lists, listName]);
    setActiveList(listName);
  };

  const removeList = (listName) => {
    const newLists = lists.filter(list => list !== listName);
    setLists(newLists);
    if (activeList === listName && newLists.length > 0) {
      setActiveList(newLists[0]);
    }
  };

  const addTodo = (text, date, priority = 'Mid') => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      date,
      priority,
      list: activeList 
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <Sidebar 
        lists={lists} 
        activeList={activeList} 
        setActiveList={setActiveList}
        addNewList={addNewList}
        removeList={removeList}
      />
      <div className="main-content">
        <div className="todo-section">
          {/* Greeting section */}
          <div className="greeting" style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 'bold', fontSize: 32 }}>
              {getMonth()} {new Date().getDate()}
            </div>
            <div style={{ fontSize: 18, marginTop: 4 }}>
              {getGreeting()}
            </div>
            <div style={{ fontSize: 18, marginTop: 4 }}>
              What's cooking for today?
            </div>
          </div>

          {/* AddTodo input always directly below greeting */}
          <AddTodo addTodo={addTodo} />

          {/* Todo list section */}
          <TodoList 
            todos={todos.filter(todo => todo.list === activeList)}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
        <Calendar todos={todos} />
      </div>
    </div>
  );
}

export default App;