import React, {useState} from 'react';
import Rodal from 'rodal';
import {Task} from '../../../models/task.model';
import {
    useDeleteTaskMutation,
    useCloseTaskMutation,
    useReopenTaskMutation,
    useUpdateTaskMutation
} from '../../../services/task';

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
            UpdateTask({id: task.id, content: editedtask}).then(() => {
                onHide();
            })
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
                    <label className="task-list-item-label" data-testid="task-label">
                        <input
                            type="checkbox"
                            className="checkbox"
                            defaultChecked={checked}
                            onChange={onCloseTask}
                            data-testid="checkbox"
                        />
                        <span data-testid="task-content">{task.content}</span>
                    </label>

                    <div onClick={onShow} className="edit-btn fa fa-pencil" data-testid="modal-trigger"/>
                    {showModal ?
                        <Rodal visible={showModal} onClose={onHide} data-testid="test">
                            <h4 style={{margin: '0'}}>Edit Task</h4>
                            <div className="modal">
                                <input type="text" placeholder="Edit task" defaultValue={task.content} onChange={onChange}/>
                                <button type="button" onClick={onUpdate}>Submit</button>
                            </div>
                        </Rodal>
                        : null}

                    <span
                        className="delete-btn"
                        title="Delete Task"
                        data-testid="delete-trigger"
                        onClick={() => DeleteTask(task.id)}
                    />
                </li>
            }
        </>
    );
};

export default TodoItem;