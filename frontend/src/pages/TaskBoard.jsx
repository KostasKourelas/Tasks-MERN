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
                    <strong>Subject:</strong> {task.subject}<br />
                    <strong>Description:</strong> {task.description}<br />
                    <strong>Status:</strong> {task.status}<br />
                    <strong>Priority:</strong> {task.priority}<br />
                    <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                    <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                    <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
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
                    <strong>Subject:</strong> {task.subject}<br />
                    <strong>Description:</strong> {task.description}<br />
                    <strong>Status:</strong> {task.status}<br />
                    <strong>Priority:</strong> {task.priority}<br />
                    <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                    <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                    <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
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
                    <strong>Subject:</strong> {task.subject}<br />
                    <strong>Description:</strong> {task.description}<br />
                    <strong>Status:</strong> {task.status}<br />
                    <strong>Priority:</strong> {task.priority}<br />
                    <Link className="actions" to={`/tasks/details/${task._id}`}><AiOutlineBars /></Link>
                    <Link className="actions" to={`/tasks/delete/${task._id}`}><AiFillDelete /></Link>
                    <Link className="actions" to={`/tasks/edit/${task._id}`}><AiFillEdit /></Link>
                </li>
                )))}
            </ul>
      )}
        </div>
    </section>
  )
}

export default TaskBoard