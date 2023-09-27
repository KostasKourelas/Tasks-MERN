import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiOutlineBars, AiFillPlusSquare } from "react-icons/ai";
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


  return (
    <>
    <Link className="actions plus" to={`/tasks/create/`}><AiFillPlusSquare /></Link>
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
                        <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                        <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                        <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
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
                        <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                        <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                        <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
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
                    <div className="actions-container">
                        <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                        <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                        <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
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