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
const TASK_API = 'https://esef-task-list.onrender.com/tasks';
const getTaskApi = () => {
  axios.get(TASK_API)
    .then((response) =>{
      const taskCopy = response.data.map((task)=> {
        return {
          id: task.id,
          title: task.title,
          isComplete: task.is_complete,
        };  
      });
      setTasks(taskCopy);
    })
    .catch((error)=>{
      console.log('error', error);
    });
};

useEffect(getTaskApi, []);


  // created updatedTask function, that then creates a copy of task list
  // matches task to be updated with id, and return an updated lis of tasks, including task changed. 
  const updateTask = (taskId, completedStatus) => {
    console.log('inside update task');
    const taskCompletionStatus = completedStatus ? 'mark_incomplete':'mark_complete';
    axios.patch(`${TASK_API}/${taskId}/${taskCompletionStatus}`)
      .then( () => {
        const newTasks = tasks.map((task) => {
          if (task.id === taskId) {
            const updatedStatusTask = {... task};
            updatedStatusTask.isComplete = !completedStatus;
            console.log(updatedStatusTask);
            return updatedStatusTask;
          }return {...task};
        });
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log('error', error);
      })
    
  };

  const deleteTask = (taskId) => {
    console.log('inside delete')
    axios.delete(`${TASK_API}/${taskId}`)
    .then((response) => {
      console.log(response);
      const newTasks = tasks.filter((task) => task.id !== taskId); 
      setTasks(newTasks);
    })    
    .catch((error) => {
      console.log('error', error);
    });  
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
