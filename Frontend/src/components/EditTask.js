import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function EditTask({ task, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handlesubmit in EditTask.js")
    ///const token =localStorage.getItem('token')
    ///console.log("at edittask",token)
    ///if(token){
    try {
      const response = await axios.put(`http://localhost:5000/api/taskedit/${task._id}`, {
        title,
        description
      }
      ///,{
        ///headers: { Authorization: `Bearer ${token}`},
      ///}
    );
      console.log(response?.data);
      console.log(response?.data?.updatedtask);
      onUpdate(response?.data?.updatedtask);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
    ///}else{
      ///console.log("no token")
    ///}
  };

  return (
    <div className='container' style={{boxShadow:'2 0 10px black', borderRadius:'5px', }}>
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