import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "../index.css";

function EditTask() {

  const { id } = useParams();
  const [task, setTask] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
        setLoading(false);
      });
  }, [id]);
  
  const handleUpdateTask = () => {
    const data = {
      subject, 
      description,
      status, 
      priority, 
    };
    setLoading(true);
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
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
          console.error("An error occurred while creating the book.");
          // You can log more details about the error using: console.error(response);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("An error occurred while creating the book:", error);
      });
  };

  return (
    <div>
    <h2>Edit Task</h2>
    <form>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder={task.subject}
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
          placeholder={task.description}
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
            <option value="">Select Status</option>
            <option value="1">Uncompleted</option>
            <option value="2">In progress</option>
            <option value="3">Completed</option>
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
        <button type="button" onClick={handleUpdateTask}>
          Update Task
        </button>
      </div>
    </form>
  </div>
  )
}

export default EditTask