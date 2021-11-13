const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ccai89:codesmith@codesmith.b6x9g.mongodb.net/toDoList?retryWrites=true&w=majority'

const taskController = require('./TaskController');

const PORT = 3000;

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  dbName: 'toDoList' });
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../' )));

app.get('/', (req,res) => {
  console.log('serving homepage');
  return res.status(200).sendFile(path.resolve(__dirname, './index.html'));
});

// Create a task in the database
// http://localhost:3000/
app.post('/submit', taskController.createTask);

// Get all tasks from the database
app.get('/all', taskController.getTasks);

// // Change a task name
// // http://localhost:3000/student/"name"
// app.patch('/:subject', taskController.updateTask);

// Delete a task from the database
// http://localhost:3000/student/"name"
app.delete('/delete/:id', taskController.deleteTask);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
