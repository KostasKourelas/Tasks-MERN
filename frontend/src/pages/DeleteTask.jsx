import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteTask() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
  
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          navigate('/');
        } else {
          return response.json().then((data) => {
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  
  return (
    <div >
      <h1>Delete Book</h1>
      {loading ? <span className='loader'></span> : ''}
      <div>
        <h3>Are You Sure You want to delete this book?</h3>
        <button onClick={handleDeleteBook}>Yes, Delete it</button>
      </div>
    </div>
  )
}

export default DeleteTask