import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import TodoItem from './TodoItem';
import {useGetTasksQuery, useGetCompletedTasksQuery} from '../../services/task'
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
                    {isAllTaskLoading ? <div data-testid="loading-1"><Loading/></div> :
                        [...allTask].reverse().map((task: Task, index: number) => (
                            <div key={task.id} data-testid={`todo-item-${index}`}>
                                <TodoItem task={task}/>
                            </div>
                        ))
                    }
                </TabPanel>

                <TabPanel>
                    {isCompletedTaskLoading ? <div data-testid="loading-2"><Loading/></div> :
                        [...completedTask.items].reverse().map((task: Task, index: number) => (
                            <div key={task.id} data-testid={`completed-item-${index}`}>
                                <TodoItem key={task.id} task={task}/>
                            </div>
                        ))}
                </TabPanel>
            </Tabs>
        </ul>
    );
};

export default TodoList;