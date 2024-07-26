import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import EditTask from './EditTask';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  
  

  const handleCreateTask = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/tasks', { title, description }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTitle('');
    setDescription('');
    const response = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(response.data);
  };

  const handleDeleteTask = async (id) => {
    try{
      // eslint-disable-next-line no-restricted-globals
      if(confirm("do you want to delete")){
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/tasks/${id}`,{
        headers: { Authorization: `Bearer ${token}`},
      });
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}`
        },
        });
        setTasks(response.data);
      }
      }catch(error){
        console.log(error);
      }
  };
  const handleStatus = async (id) =>{
    try{
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/tasks',{id},{
          headers: { Authorization: `Bearer ${token}`},
      });
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}`},
      });
      setTasks(response.data);
    }catch(error){
      console.log(error);
    }
  };
  const handleUpdate = (updatedTask) =>
  {
    setTasks(tasks.map(task => task._id===updatedTask ? updatedTask : task))
    setEditTask(null)
  };
  
  return (
    <div className='container'>
      <h2>Task Manager</h2>
      <div style={{display:'flex'}}>
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" />
        </div>
        <div style={{display:'flex'}}>
          <button style={{margin:'10px'}} onClick={handleCreateTask}>Add Task</button>
        </div>
      </div>
      <div>
        <h2 style={{marginTop:'15px'}}>Your Tasks</h2>
        <ul className='task-list'>
          {tasks.map((task) => (
            
            <li key={task._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '10px',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px'
            }}>
              {editTask && editTask._id === task._id 
              ?
              (<EditTask task={task} onUpdate={handleUpdate}/>)
              :
              <></> }
              <div style={{display:'flex', alignItems:'center'}}>
                <Checkbox {...label}  color="success" checked= {task.status}
                onClick={() => handleStatus(task._id)}  />
              </div>
              <div style={{ flex: 1 }}>
                <strong>Task:</strong> {task.title}<br />
                <strong>Description:</strong> {task.description}
              </div>
              <EditIcon onClick={()=> setEditTodo(!editTodo)}/>
              <DeleteOutlineIcon 
                onClick={() => handleDeleteTask(task._id)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;
