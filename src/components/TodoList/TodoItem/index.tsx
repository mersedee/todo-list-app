import React from 'react';
import {Task} from '../../../models/task.model';

type AppProps = {
    task: Task
}

const TodoItem = ({task} : AppProps) => {
    return (
        <li className="task-list-item">
            <label className="task-list-item-label">
                <input type="checkbox"/>
                <span>{task.content}</span>
            </label>
            <span className="delete-btn" title="Delete Task"/>
        </li>
    );
};

export default TodoItem;