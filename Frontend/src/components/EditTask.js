import React, { useState } from 'react';
import axios from 'axios';

function EditTask({ task, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token =localStorage.getItem('token')
      const response = await axios.put(`http://localhost:5000/api/taskedit/${task._id}`, {
        title,
        description
      },{
        headers: { Authorization: `Bearer ${token}`},
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Update Todo</button>
    </form>
  );
}

export default EditTask;