import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {

//setting my "tasks" default state as TASKS array
const [tasks, setTasks] = useState([]);

//UseEffect to make an API call
const TASK_API = 'https://task-list-api-c17.onrender.com/tasks';
const getTaskApi = () => {
  axios.get(TASK_API)
    .then((response) =>{
      const taskCopy = response.data.map((task)=> {
        return {
          ...task,
          isComplete: task.is_complete,
        };  
      });
      setTasks(taskCopy);
    })
    .catch((error)=>{
      console.long('error', error);
    });
};

useEffect(getTaskApi, []);


  // created updatedTask function, that then creates a copy of task list
  // matches task to be updated with id, and return an updated lis of tasks, including task changed. 
  const updateTask = (taskId, completedStatus) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedStatusTask = {... task};
        updatedStatusTask.isComplete = !completedStatus;
        return updatedStatusTask;
      }return {...task};
    });
    setTasks(newTasks);
  };
 
  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);     
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        {/* settign prop name update task to function we created on line 19, also make sure your original data prop is set to the state data*/}
        <div>
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
          </div>
      </main>
    </div>
  );
};

export default App;
