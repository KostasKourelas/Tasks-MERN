import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiOutlineBars, AiFillPlusSquare, AiOutlineArrowRight } from "react-icons/ai";
import EditTask from "./EditTask";
import "../index.css";

function TaskBoard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { id } = useParams();
    

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


    const handleStatusChange = async (id, newStatus) => {
        try {
          const response = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          });
    
          if (response.ok) {
            // Update the task status in the frontend
            const updatedTasks = tasks.map((task) => {
              if (task._id === id) {
                return { ...task, status: newStatus };
              }
              return task;
            });
    
            setTasks(updatedTasks);
          } else {
            console.error("Failed to update task status");
          }
        } catch (error) {
          console.error("Error updating task status:", error);
        }
      };
    
  return (
    <>
    <Link className="plus" to={`/tasks/create/`}><AiFillPlusSquare />  Add Task</Link>
    <section>
        <div className="board one">
            <h3>To-Do</h3>
        {loading ? ( 
        <span className="loader"></span>
      ) : (
            <ul>
                {tasks.map((task) => (
                    task.status === 1 && (
                <li className="task-wrapper" key={task.id}>
                    <span> {task.subject}</span><br />
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
                    "Unknown"} Priority</span> <br />
                    <span className="date"> {new Date(task.updatedAt).toLocaleString()}</span><br />
                    <div className="actions-container">
                        <div>
                            <button className="status-btn"  onClick={() => handleStatusChange(task._id, 2)}>
                                In Progress <AiOutlineArrowRight /></button>
                        </div>
                        <div className="actions-wrapper">
                            <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                            <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link> 
                            <Link className="actions delete" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                        </div>
                    </div>
                </li>
                )))}
            </ul>
      )}
        </div>
        <div className="board two">
        <h3>In Progress</h3>
        {loading ? ( 
        <span className="loader"></span>
      ) : (
            <ul>
                {tasks.map((task) => (
                    task.status === 2 && (
                <li className="task-wrapper" key={task.id}>
                    <span> {task.subject}</span><br />
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
                    "Unknown"} Priority</span> <br />
                    <span className="date"> {new Date(task.updatedAt).toLocaleString()}</span><br />
                    <div className="actions-container">
                        <div>
                            <button className="status-btn"  onClick={() => handleStatusChange(task._id, 3)}>
                                Completed <AiOutlineArrowRight /></button>
                        </div>
                        <div className="actions-wrapper">
                            <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                            <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link> 
                            <Link className="actions  delete" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                        </div>
                    </div>
                </li>
                )))}
            </ul>
      )}
        </div>
        <div className="board three">
        <h3>Completed</h3>
        {loading ? ( 
        <span className="loader"></span>
      ) : (
            <ul>
                {tasks.map((task) => (
                    task.status === 3 && (
                <li className="task-wrapper" key={task.id}>
                   <span> {task.subject}</span><br />
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
                    "Unknown"} Priority</span> <br />
                    <span className="date"> {new Date(task.updatedAt).toLocaleString()}</span><br />
                    <div className="actions-wrapper">
                        <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                        <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
                        <Link className="actions  delete" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                    </div>
                </li>
                )))}
            </ul>
      )}
        </div>
    </section>
    </>
  )
}

export default TaskBoard