import React, { useState,useEffect} from 'react';
import './App.css';


function App() {

    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Save tasks to local storage when they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTaskName.trim() === '') return;
        const newTask = {
            id: nextId,
            name: newTaskName,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString(),
            status: 'Pending'
        };
        setTasks([...tasks, newTask]);
        setNewTaskName('');
        setNextId(nextId + 1);
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const updateTaskStatus = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? {...task, status: task.status === 'Pending' ? 'Completed' : 'Pending'} : task
        ));
    };

    return (
        <div className="app-outer">
            <header className="app-header">
                ToDo Application
            </header>
            <div className='inner-top'>
                <div className='inner-top-input'>
                    <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}/>
                </div>
                <div className='inner-top-button'>
                    <button onClick={addTask} >Add</button>
                </div>
                <div className='table-data'>
                    <table id="todoTable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>{task.date}</td>
                                <td>{task.time}</td>
                                <td className={`status-${task.status.toLowerCase()} status-column`}>{task.status}</td>
                                <td>
                                    <button className='update' onClick={() => updateTaskStatus(task.id)}>Toggle Status</button>
                                    <button className='delete' onClick={() => deleteTask(task.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
