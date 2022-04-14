import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import TodoItem from './TodoItem';
import {useGetTasksQuery, useGetCompletedTasksQuery} from '../../feature/task'
import {Task} from '../../models/task.model';
import Loading from '../../components/Loading';

const TodoList = () => {
    const {data: allTask, isLoading: isAllTaskLoading,} = useGetTasksQuery(0);
    const {data: completedTask, isLoading: isCompletedTaskLoading,} = useGetCompletedTasksQuery(0);

    return (
        <ul className="task-list">
            <Tabs>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>Completed</Tab>
                </TabList>

                <TabPanel>
                    {isAllTaskLoading ? <Loading/> :
                        [...allTask].reverse().map((task: Task) => (
                            <TodoItem key={task.id} task={task}/>
                        ))}
                </TabPanel>

                <TabPanel>
                    {isCompletedTaskLoading ? <Loading/> :
                        [...completedTask.items].reverse().map((task: Task) => (
                            <TodoItem key={task.id} task={task}/>
                        ))}
                </TabPanel>
            </Tabs>
        </ul>
    );
};

export default TodoList;