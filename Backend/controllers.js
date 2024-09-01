const { strict } = require('assert');
const Task = require('./models/Task')
const User = require('./models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found', status: 404 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id },`${process.env.Token_Secret_Key}`, { expiresIn: '1d' });
    res.cookie('token',token,{httpOnly: true, maxAge: 24*60*60*1000, sameSite:'strict'});
    res.cookie('user',username,{httpOnly:true, maxAge:24*60*60*1000, sameSite:'strict' });
    res.cookie('isauth',true,{expires: new Date(2147483647 * 1000)})
    res.json({message: "Logged in successfully"});
    //res.status(200).json({ token , username});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = async(req,res) =>{
  try{
    res.clearCookie('token');
    res.clearCookie('user');
    res.cookie('isauth',false, {expires: new Date(2147483647 * 1000)});
    res.json({message: "Logged out successfully"});
    }catch(error){
      console.error('Logout error:', error);
      res.status(500).json({error: error});
    }
}

const checkToken = async(req,res)=>{
  try{
    const token = req.cookies.token;
    if(!token){
      res.status(401).json({error: "Unauthorized"});
      }
    else{
      res.status(200).json({exists:true})
    }
  }catch(error){
    console.error('Check token error:', error);
  }
}

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ userId: req.user.userId, title, description });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const deleteTask = async(req,res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
};

const changeTaskStatus = async(req,res) =>{
  
  
  try {
    const { id } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    console.log("task.status befor:",task.status,"!task.status:",!task.status)
    await Task.findByIdAndUpdate(id,{status: !task.status} )
    await task.save();
    res.status(200).json({ message: 'Task status changed successfully' });
    } catch (error) {
      console.error('Error changing task status:', error);
      res.status(500).json({ error: 'Failed to change task status' });
    }
};

const updateTask = async(req,res) => {
  console.log("in controller.js uodateTask function")
  try{
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const updatedtask = await Task.findByIdAndUpdate(id,{title:title, description:description},{new:true})
    res.status(200).json({ message: 'Task updated successfully' ,updatedtask});
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
  }
}


const validateToken = async (req, res) => {
  //const token = req.headers.authorization.split(' ')[1];
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, 'secret-key'); // Ensure 'secret-key' matches the one used to sign the token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.cookie('isauth',true,{expires: new Date(2147483647 * 1000)})
    res.status(200).json({user:user.username, message: 'Token is valid' });
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { register, login, logout, checkToken, getAllTasks, createTask, deleteTask, changeTaskStatus, updateTask, validateToken };
