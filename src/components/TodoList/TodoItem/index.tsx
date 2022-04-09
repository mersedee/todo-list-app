import React from 'react';

const TodoItem = () => {
    return (
        <li className="task-list-item">
            <label className="task-list-item-label">
                <input type="checkbox"/>
                <span>name</span>
            </label>
            <span className="delete-btn" title="Delete Task"/>
        </li>
    );
};

export default TodoItem;