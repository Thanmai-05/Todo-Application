const express = require('express');
const router = express.Router();
const { register, login, getAllTasks, createTask, deleteTask, changeTaskStatus, updateTask, validateToken } = require('./controllers');
const authenticateToken = require('./middleware');

// Auth Routes
router.post('/register', register);
router.post('/login', login);
router.get('/validate-token', authenticateToken, validateToken);
// Task Routes
router.get('/tasks', authenticateToken, getAllTasks);
router.post('/tasks', authenticateToken, createTask);
router.delete('/tasks/:id',authenticateToken, deleteTask);
router.put('/tasks', authenticateToken, changeTaskStatus);
router.put('/taskedit/:id', authenticateToken, updateTask);

module.exports = router;
