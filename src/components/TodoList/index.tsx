import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TodoItem from './TodoItem';
import {useGetTasksQuery} from '../../feature/task'
import {Task} from '../../models/task.model';

const TodoList = () => {
    const {data, error, isLoading, isSuccess, isError} = useGetTasksQuery(0);
    return (
        <ul className="task-list">
            <Tabs>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>Completed</Tab>
                </TabList>

                <TabPanel>
                    {!isLoading && [...data].reverse().map((task: Task) => (
                        <TodoItem key={task.id} task={task}/>
                    ))}
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </ul>
    );
};

export default TodoList;