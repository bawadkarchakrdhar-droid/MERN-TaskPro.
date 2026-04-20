import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Shuruat mein tasks ko empty array [] rakho
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const API_URL = "https://mern-taskpro-2.onrender.com";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      // Agar res.data array hai toh hi set karo
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        setTasks([]); // Varna empty array rakho
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setTasks([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task) return;

    const dateToday = new Date().toLocaleDateString('en-IN', { 
      weekday: 'long', day: 'numeric', month: 'short' 
    });

    try {
      const res = await axios.post(API_URL, { text: task, date: dateToday });
      // Yahan bhi check karo ki res.data sahi hai
      setTasks(prev => [...prev, res.data]);
      setTask("");
    } catch (err) {
      alert("Add fail ho gaya!");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="task-box-clean">
        <h1>My TaskPro 🚀</h1>
        <form className="input-row" onSubmit={handleAdd}>
          <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Kuch naya likho..." />
          <button type="submit" className="btn-add">Add</button>
        </form>
        
        <div className="list-container">
          {/* SAFE MAP CHECK */}
          {Array.isArray(tasks) && tasks.length > 0 ? tasks.map((t) => (
            <div key={t._id} className="task-row">
              <div className="content">
                <span className="task-name">{t.text}</span>
                <span className="task-dt">{t.date}</span>
              </div>
            </div>
          )) : <p className="no-task">Abhi koi tasks nahi hain.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;