import React from 'react';
import {TodoistApi} from '@doist/todoist-api-typescript'
import { useDispatch } from 'react-redux'
import AddInput from '../../components/AddInput';
import TodoList from '../../components/TodoList';
import {tasksApi} from '../../feature/task';

const Home = () => {
    const dispatch = useDispatch()
    const onTest = () => {
        const api = new TodoistApi('fa4c4d985338afd0c42932fce0ad3cddbdee5862');

        // api.updateTask(5745324443, { content: 'Buy Coffee' })
        //     .then((isSuccess) => console.log(isSuccess))
        //     .catch((error) => console.log(error))

        // api.addTask({
        //     content: 'Buy Tea',
        //     dueString: 'tomorrow at 12:00',
        //     dueLang: 'en',
        //     priority: 4
        // })
        //     .then((task) => console.log(task))
        //     .catch((error) => console.log(error))
        const body = {
            content: 'Buy lipstick',
            dueString: 'tomorrow at 12:00',
            dueLang: 'en',
            priority: 4
        }

        // const result = dispatch(tasksApi.endpoints.addTask.initiate(body));
        // console.warn('result', result);

        // api.updateTask(5745324443, { content: 'edit1 Coffee', completed: true })
        //     .then((isSuccess) => console.log(isSuccess))
        //     .catch((error) => console.log(error))

        api.closeTask(2995104339)
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