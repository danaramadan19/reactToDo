
import Checkbox from '@mui/material/Checkbox';
import React from 'react';


const ToDoRow = (props) => {
    const { title, createdAt, isDone, handleItemCheckboxClick, id } = props;

    const handleChange = (event) => {
        handleItemCheckboxClick(id, event.target.checked);
    }

    return (
        <div className="ToDoRow">
            <div>
                <p className='title'> {title}</p>
                <p className='date'>{new Date(createdAt).toDateString()}</p>
            </div>
            <Checkbox color="secondary"
                checked={isDone}
                onChange={handleChange}
            />
        </div>
    )
}

export default ToDoRow;