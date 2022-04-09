import React from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
    return (
        <ul className="task-list">
            <TodoItem/>
        </ul>
    );
};

export default TodoList;