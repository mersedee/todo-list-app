import React from 'react';
import {TodoistApi} from '@doist/todoist-api-typescript'
import { useDispatch } from 'react-redux'
import AddInput from '../../components/AddInput';
import TodoList from '../../components/TodoList';
import {tasksApi} from '../../feature/task';

const Home = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <div className="app-container" id="taskList">
                <h1 className="app-header">TO DO LIST</h1>

                <AddInput/>

                <TodoList/>
            </div>
        </div>
    );
};

export default Home;