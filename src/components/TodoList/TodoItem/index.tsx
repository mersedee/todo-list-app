import React, {useState} from 'react';
import {Task} from '../../../models/task.model';
import {useDeleteTaskMutation, useUpdateTaskMutation} from '../../../feature/task';


type AppProps = {
    task: Task
}

const TodoItem = ({task}: AppProps) => {
    const [DeleteTask] = useDeleteTaskMutation();
    const [UpdateTask] = useUpdateTaskMutation();
    const [checked, setChecked] = useState(task.completed);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        UpdateTask(task.id);
    }

    return (
        <li className="task-list-item">
            <label className="task-list-item-label">
                <input type="checkbox" defaultChecked={checked} onChange={onChange}/>
                <span>{task.content}</span>
            </label>
            <span
                className="delete-btn"
                title="Delete Task"
                onClick={() => DeleteTask(task.id)}
            />
        </li>
    );
};

export default TodoItem;