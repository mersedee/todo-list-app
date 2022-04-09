import React from 'react';
import AddInput from '../../components/AddInput';
import TodoList from '../../components/TodoList';

const Home = () => {
    return (
        <div>
            <div className="app-container" id="taskList">
                <h1 className="app-header">TO DO LIST</h1>

                <AddInput />

                <TodoList />
            </div>
        </div>
    );
};

export default Home;