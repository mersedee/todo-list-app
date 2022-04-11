import React, {useState} from 'react';
import {useAddTaskMutation} from '../../feature/task';

const AddInput = () => {
    const [task, setTask] = useState('');
    const [AddTask, {isLoading}] = useAddTaskMutation();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
    }

    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const onAddTask = () => {
        const body = {
            content: task,
            dueString: 'tomorrow at 12:00',
            dueLang: 'en',
            priority: getRandomInt(1, 20)
        }

        AddTask(body)
    }

    return (
        <div className="add-task">
            <input
                type="text"
                placeholder="Add New Task"
                className="task-input"
                onChange={onChange}
            />

            <input
                type="submit"
                value=""
                className="submit-task"
                onClick={onAddTask}
            />
        </div>
    );
};

export default AddInput;