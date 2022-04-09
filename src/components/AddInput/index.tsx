import React from 'react';

const AddInput = () => {
    return (
        <div className="add-task">
            <input type="text" placeholder="Add New Task" className="task-input"/>
            <input type="submit" value="" className="submit-task" title="Add Task"/>
        </div>
    );
};

export default AddInput;