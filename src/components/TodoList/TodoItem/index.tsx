import React, {useState} from 'react';
import Rodal from 'rodal';
import {Task} from '../../../models/task.model';
import {
    useDeleteTaskMutation,
    useCloseTaskMutation,
    useReopenTaskMutation,
    useUpdateTaskMutation
} from '../../../feature/task';

type AppProps = {
    task: Task
}

const TodoItem = ({task}: AppProps) => {
    const [DeleteTask] = useDeleteTaskMutation();
    const [CloseTask] = useCloseTaskMutation();
    const [ReopenTask] = useReopenTaskMutation();
    const [UpdateTask] = useUpdateTaskMutation();
    const [checked, setChecked] = useState(task.completed || (task.completed_date ? true : false));
    const [showModal, setShowModal] = useState(false);
    const [editedtask, setEditedTask] = useState('');

    const onCloseTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        CloseTask(task.id);
    }

    const onShow = () => setShowModal(true);
    const onHide = () => setShowModal(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask(e.currentTarget.value)
    }

    const onUpdate = () => {
        if (editedtask) {
            UpdateTask({id: task.id, content: editedtask})
            onHide();
        }
    }

    return (
        <>
            {task.completed_date ?
                <li className="task-list-item" aria-disabled="true">
                    <label className="task-list-item-label">
                        <input type="checkbox" className="checkbox" disabled defaultChecked={checked}/>
                        <span>{task.content}</span>
                    </label>
                </li> :
                <li className="task-list-item">
                    <label className="task-list-item-label">
                        <input type="checkbox" className="checkbox" defaultChecked={checked} onChange={onCloseTask}/>
                        <span>{task.content}</span>
                    </label>

                    <div onClick={onShow} className="edit-btn fa fa-pencil"></div>
                    <Rodal visible={showModal} onClose={onHide}>
                        <h4 style={{margin: '0'}}>Edit Task</h4>
                        <div className="modal">
                            <input type="text" defaultValue={task.content} onChange={onChange}/>
                            <button type="button" onClick={onUpdate}>Submit</button>
                        </div>
                    </Rodal>

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