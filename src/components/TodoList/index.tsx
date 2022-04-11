import React from 'react';
import TodoItem from './TodoItem';
import {useGetTasksQuery} from '../../feature/task'
import {Task} from '../../models/task.model';

const TodoList = () => {
    const {data, error, isLoading, isSuccess, isError} = useGetTasksQuery(0);
    return (
        <ul className="task-list">
            {!isLoading && [...data].reverse().map((task: Task) => (
                <TodoItem key={task.id} task={task}/>
            ))}
        </ul>
    );
};

export default TodoList;