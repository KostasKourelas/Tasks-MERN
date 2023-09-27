import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiOutlineBars, AiFillPlusSquare } from "react-icons/ai";
import "../index.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <Link to={`/tasks/board/`}>Dashboard</Link>
      <Link className="actions plus" to={`/tasks/create/`}><AiFillPlusSquare /></Link>
      {loading ? ( 
        <span className="loader"></span>
      ) : (
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.subject}</td>
                <td>{task.description}</td>
                <td>
                    {task.status === 1 ? "uncompleted" :
                    task.status === 2 ? "inprogress" :
                    task.status === 3 ? "completed" :
                    "Unknown"}
                </td>
                <td>
                    {task.priority === 1 ? "Low" :
                    task.priority === 2 ? "Normal" :
                    task.priority === 3 ? "Urgent" :
                    task.priority === 4 ? "High" :
                    "Unknown"}
                </td>
                <td className="actions-container">
                  <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                  <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                  <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;