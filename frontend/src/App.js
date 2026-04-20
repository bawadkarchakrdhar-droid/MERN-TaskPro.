import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Date and Day Logic
  const getCurrentDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date().toLocaleDateString('en-IN', options);
  };

  const addTask = async () => {
    if (!task) return;
    try {
      const res = await axios.post('TERI_BACKEND_URL/api/tasks', {
        text: task,
        date: getCurrentDate() // Yahan se date bhej rahe hain
      });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>My TaskPro 🚀</h1>
        <div className="input-group">
          <input 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Add a new task..." 
          />
          <button onClick={addTask}>Add</button>
        </div>
        
        <div className="task-list">
          {tasks.length > 0 ? tasks.map((t, index) => (
            <div key={index} className="task-item">
              <p className="task-text">{t.text}</p>
              <span className="task-date">{t.date}</span>
            </div>
          )) : <p>Koi task nahi hai! 😎</p>}
        </div>
      </div>
    </div>
  );
}

export default App;