import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const API_URL = "https://mern-taskpro-2.onrender.com/api/tasks";

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${API_URL}/add`, { title });
      setTitle('');
      fetchTasks();
    } catch (err) {
      alert("Network Error: Backend terminal check karo!");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Direct call with the MongoDB _id
      await axios.delete(`${API_URL}/${taskId}`);
      fetchTasks(); 
    } catch (err) {
      alert("Delete failed! Check if server is running.");
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="app-main-wrapper">
      <div className="app-container">
        <header>
          <h1>My TaskPro 🚀</h1>
          <p>Aaj ke tasks manage karein</p>
        </header>
        
        <div className="input-group">
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Kuch naya likho..." 
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        <div className="task-list">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task._id} className="task-item">
                <span className="task-text">{task.title}</span>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="empty-msg">Koi task nahi hai! 😎</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;