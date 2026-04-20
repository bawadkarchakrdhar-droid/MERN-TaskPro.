import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // API URL - Apni Render wali URL yahan dalo
  const API_URL = "https://mern-taskpro-backend.onrender.com/api/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) { console.log(err); }
  };

  const addTask = async () => {
    if (!task) return;

    // Date and Day Logic
    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    const formattedDate = now.toLocaleDateString('en-IN', dateOptions);

    try {
      const res = await axios.post(API_URL, {
        text: task,
        date: formattedDate // Date bhej rahe hain
      });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) { alert("Network Error: Backend check karo!"); }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) { console.log(err); }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>My TaskPro 🚀</h1>
        <p>Aaj ke tasks manage karein</p>
        
        <div className="input-group">
          <input 
            type="text"
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Kuch naya likho..." 
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>
        
        <div className="task-list">
          {tasks.map((t) => (
            <div key={t._id} className="task-item">
              <div className="task-content">
                <p className="task-text">{t.text}</p>
                <span className="task-date">{t.date}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(t._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;