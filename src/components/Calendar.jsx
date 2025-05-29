import React, { useState } from 'react';

const Calendar = ({ todos = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4)); // May 2025
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to check if a date has todos
  const hasTodos = (day, month, year) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return todos.some(todo => {
      const todoDate = new Date(todo.date);
      return (
        todoDate.getDate() === day &&
        todoDate.getMonth() === month &&
        todoDate.getFullYear() === year
      );
    });
  };

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      let week = [];
      
      // Fill empty days at start of month
      if (i === 0) {
        for (let j = 0; j < firstDay; j++) {
          week.push(<div key={`empty-${j}`} className="calendar-date empty"></div>);
        }
      }

      // Fill days of month
      for (let j = week.length; j < 7; j++) {
        if (day > daysInMonth) break;
        
        const hasTodo = hasTodos(day, month, year);
        
        week.push(
          <div 
            key={`day-${day}`} 
            className={`calendar-date ${hasTodo ? 'has-todo' : ''}`}
            onClick={() => console.log(`Selected date: ${months[month]} ${day}, ${year}`)}
          >
            {day}
            {hasTodo && <span className="todo-indicator">•</span>}
          </div>
        );
        day++;
      }
   
      // Fill empty days at end of month
      while (week.length < 7) {
        week.push(<div key={`empty-end-${week.length}`} className="calendar-date empty"></div>);
      }

      if (week.some(date => date.props.children !== '')) {
        calendar.push(
          <div key={`week-${i}`} className="calendar-week">
            {week}
          </div>
        );
      }
    }

    return calendar;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    ));
  };

  const toggleFullCalendar = () => {
    setShowFullCalendar(!showFullCalendar);
  };

  return (
    <div className="calendar-sidebar">
      <div className="calendar">
        {/* Calendar Header */}
        <div className="calendar-header">
          <div className="calendar-nav">
            <button onClick={() => navigateMonth(-1)}>&lt;</button>
            <span className="calendar-year-month">
              {currentDate.getFullYear()} {months[currentDate.getMonth()]}
            </span>
            <button onClick={() => navigateMonth(1)}>&gt;</button>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="calendar-week day-names">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>TH</div>
            <div>F</div>
            <div>S</div>
          </div>
          {generateCalendar(currentDate.getFullYear(), currentDate.getMonth())}
        </div>

        <button className="show-all-btn" onClick={toggleFullCalendar}>
          {showFullCalendar ? 'HIDE' : 'SHOW ALL'}
        </button>

        {showFullCalendar && (
          <div className="full-calendar">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mini-month">
                <h4>{months[i]} {currentDate.getFullYear()}</h4>
                {generateCalendar(currentDate.getFullYear(), i)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;