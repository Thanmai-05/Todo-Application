import React, { useState } from 'react';
import axios from 'axios';

function EditTask({ task, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handlesubmit in EditTask.js")
    try {
        const token =localStorage.getItem('token')
      const response = await axios.put(`http://localhost:5000/api/taskedit/${task._id}`, {
        title,
        description
      },{
        headers: { Authorization: `Bearer ${token}`},
      });
      console.log(response.data);
      console.log(response.data.updatedtask);
      onUpdate(response.data.updatedtask);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className='container' style={{boxShadow:'2 0 10px black', borderRadius:'5px', backgroundColor:'#cacaca'}}>
    <form onSubmit={handleSubmit}>
      <div style={{display:'flex'}}>
      <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      </div>
      <div style={{display:'flex'}}>
        <button style={{margin:'10px',backgroundColor:'#007bff'}} type="submit">Update Task</button></div>
      </div>
    </form>
    </div>
  );
}

export default EditTask;