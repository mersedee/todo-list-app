import React from 'react';
import {TodoistApi} from '@doist/todoist-api-typescript'
import AddInput from '../../components/AddInput';
import TodoList from '../../components/TodoList';

const Home = () => {
    const onTest = () => {
        const api = new TodoistApi('fa4c4d985338afd0c42932fce0ad3cddbdee5862');

        api.updateTask(5745324443, { content: 'Buy Coffee' })
            .then((isSuccess) => console.log(isSuccess))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <div className="app-container" id="taskList">
                <h1 className="app-header">TO DO LIST</h1>
                <button onClick={onTest}>click me</button>

                <AddInput/>

                <TodoList/>
            </div>
        </div>
    );
};

export default Home;