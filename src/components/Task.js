import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, updateTask, deleteTask }) => {
  // toggle button to set iscomplete class of html element to completed-True or blank-False
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => updateTask(id, isComplete)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={() => deleteTask(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTask: PropTypes.func.isRequired, 
  deleteTask: PropTypes.func.is
};

export default Task;
