import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ShowTasks() {

  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <span className="loader"></span>;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }
  return (
    <>
    <h2>Task Details</h2>
    <div className="list-container">
      <ul>
        <li>
          <strong>Subject:</strong> {task.subject}
        </li>
        <li>
          <strong>Description:</strong> {task.description}
        </li>
        <li>
          <strong>Status:</strong> {task.status}
        </li>
        <li>
          <strong>Priority: </strong> 
              {task.priority === 1 ? "Low" :
              task.priority === 2 ? "Normal" :
              task.priority === 3 ? "Urgent" :
              task.priority === 4 ? "High" :
              "Unknown"}
        </li>
        <li>
          <strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}
        </li>
        <li>
          <strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
        </li>
      </ul>
    </div>
  </>
  )
}

export default ShowTasks