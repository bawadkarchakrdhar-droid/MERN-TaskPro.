import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // UPDATE: Apni backend URL yahan dalo
  const API_URL = "https://mern-taskpro-final.vercel.app/api/tasks";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL);
        setTasks(res.data);
      } catch (err) { console.log("Fetch error:", err); }
    };
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault(); // Sabse important line: Page reload nahi hoga
    if (!task) return;

    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const dateToday = new Date().toLocaleDateString('en-IN', options);

    try {
      const res = await axios.post(API_URL, { text: task, date: dateToday });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      alert("Error: Backend se connection nahi ho raha!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) { console.log("Delete error:", err); }
  };

  return (
    <div className="main-wrapper">
      <div className="task-box-clean">
        <h1>My TaskPro 🚀</h1>
        <p className="sub-text">Aaj ke tasks manage karein</p>
        
        <form className="input-row" onSubmit={handleAdd}>
          <input 
            type="text"
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Kuch naya likho..." 
          />
          <button type="submit" className="btn-add">Add</button>
        </form>
        
        <div className="list-container">
          {tasks.map((t) => (
            <div key={t._id} className="task-row">
              <div className="content">
                <span className="task-name">{t.text}</span>
                <span className="task-dt">{t.date}</span>
              </div>
              <button onClick={() => handleDelete(t._id)} className="btn-del">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;