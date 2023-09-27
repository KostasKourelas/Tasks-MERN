import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../index.css";

function CreateTask() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveTask = () => {
    const data = {
      subject, 
      description,
      status, 
      priority, 
    };
    setLoading(true);
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          navigate("/");
        } else {
          setLoading(false);
          console.error("An error occurred while creating the task.");
          // You can log more details about the error using: console.error(response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("An error occurred while creating the task:", error);
      });
  };


  return (
    <div>
      <h2>Create Task</h2>
      <form>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="1">uncompleted</option>
            <option value="2">inprogress</option>
            <option value="3">completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select Priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">Urgent</option>
            <option value="4">High</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={handleSaveTask}>
            Save Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask