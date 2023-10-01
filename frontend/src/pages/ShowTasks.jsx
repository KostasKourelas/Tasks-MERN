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
    <h2 style={{textAlign: "center"}}>Task Details</h2>
    <div className="list-container">
      <ul>
        <li>
          <strong>Subject:</strong> {task.subject}
        </li>
        <li>
          <strong>Description:</strong> {task.description}
        </li>
        <li>
        <span className="priority" style={{
                        backgroundColor:
                        task.priority === 1
                            ? '#4caf50'
                            : task.priority === 2
                            ? '#00bcd4'
                            : task.priority === 3
                            ? '#ffde7d'
                            : task.priority === 4
                            ? '#f6416c'
                            : 'gray'
                    }}> 
                    {task.priority === 1 ? "Low" :
                    task.priority === 2 ? "Normal" :
                    task.priority === 3 ? "Urgent" :
                    task.priority === 4 ? "High" :
                    "Unknown"} Priority</span>
        </li>
        <li>
          <strong >Status: </strong> 
              {task.status === 1 ? "To-Do" :
              task.status === 2 ? "In Progress" :
              task.status === 3 ? "Completed" :
              "Unknown"}
        </li>
        <li>
        <span className="date"> {new Date(task.updatedAt).toLocaleString()}</span><br />
        </li>
      </ul>
    </div>
  </>
  )
}

export default ShowTasks