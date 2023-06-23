import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

const INITIAL_FORM_DATA = {
    title: "",
    description: "",
  };

export default function NewTaskForm(props) {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
}

    const changeData = (evt) => {
        const newData = {
            ...formData,
            [evt.target.name]: evt.target.value
        };
        setFormData(newData);
    }

    const submitForm = (evt) => {
        evt.preventDefault();
        props.addTask(formData);
        setFormData(INITIAL_FORM_DATA);
    }
    return (

        <div className="NewTaskForm">
            <h2>Add A new Task</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="TaskTitle">Title:</label>

                    <input 
                        type="text"
                        id=""
                        name="title"
                        value={formData.title}
                        onChange={changeData}
                    />
                    <input type="submit" value="Add Task" />
            </form>
        
        </div>

    )

    NewTaskForm.propTypes = {
        addTask: PropTypes.func.isRequired
      }
      
      