import React, {useState} from 'react';
import {Task} from '../../../models/task.model';
import {useDeleteTaskMutation, useCloseTaskMutation, useReopenTaskMutation} from '../../../feature/task';


type AppProps = {
    task: Task
}

const TodoItem = ({task}: AppProps) => {
    const [DeleteTask] = useDeleteTaskMutation();
    const [UpdateTask] = useCloseTaskMutation();
    const [ReopenTask] = useReopenTaskMutation();
    const [checked, setChecked] = useState(task.completed || (task.completed_date ? true : false));

    const onCloseTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        UpdateTask(task.id);
    }

    return (
        <>
            {task.completed_date ?
                <li className="task-list-item" aria-disabled="true">
                    <label className="task-list-item-label">
                        <input type="checkbox" disabled defaultChecked={checked}/>
                        <span>{task.content}</span>
                    </label>
                </li> :
                <li className="task-list-item">
                    <label className="task-list-item-label">
                        <input type="checkbox" defaultChecked={checked} onChange={onCloseTask}/>
                        <span>{task.content}</span>
                    </label>
                    <span
                        className="delete-btn"
                        title="Delete Task"
                        onClick={() => DeleteTask(task.id)}
                    />
                </li>
            }
        </>
    );
};

export default TodoItem;