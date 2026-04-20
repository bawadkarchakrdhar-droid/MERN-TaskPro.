import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Apni Backend URL yahan check kar lena
  const API_URL = "https://mern-taskpro-final.vercel.app/api/tasks"; 

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
    
    // Date/Day Logic (Monday, 20 Apr)
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const dateToday = new Date().toLocaleDateString('en-IN', options);

    try {
      const res = await axios.post(API_URL, {
        text: task,
        date: dateToday
      });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) { 
      alert("Backend terminal check karo!"); 
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) { console.log(err); }
  };

  return (
    <div className="main-container">
      <div className="task-box">
        <h1 className="title">My TaskPro 🚀</h1>
        <p className="subtitle">Aaj ke tasks manage karein</p>
        
        <div className="input-section">
          <input 
            type="text"
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Kuch naya likho..." 
          />
          <button className="add-button" onClick={addTask}>Add</button>
        </div>
        
        <div className="task-container">
          {tasks.length > 0 ? tasks.map((t) => (
            <div key={t._id} className="task-card">
              <div className="text-area">
                <p className="task-val">{t.text}</p>
                <span className="task-time">{t.date}</span>
              </div>
              <button className="del-btn" onClick={() => deleteTask(t._id)}>Delete</button>
            </div>
          )) : <p className="no-task">Koi task nahi hai! 😎</p>}
        </div>
      </div>
    </div>
  );
}

export default App;