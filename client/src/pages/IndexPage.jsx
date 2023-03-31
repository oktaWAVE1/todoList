import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Form} from "react-bootstrap";
import TaskItem from "../components/taskItem";
import Button from "../UI/Button/Button";
import AddTask from "../components/addTask";
import {fetchTasks} from "../http/taskAPI";
import EditTask from "../components/editTask";


const IndexPage = observer(() => {

    const {task} = useContext(Context)
    useEffect(()=> {
        fetchTasks(task.currentPage, task.order, task.orderDirection).then(data => {
            task.setTasks(data.rows);
            task.setPagesCount(Math.ceil(parseInt(data.count)/3))
            task.setPages([])
            for (let i=1; i<=task.pagesCount; i++) {
                task.setPages([...task.pages, i])
            }

        })
    },[task.currentPage, task.order, task.orderDirection])
    const changeOrder = (e) => {
        task.setOrder(e.target.value.split(' ')[0])
        task.setOrderDirection(e.target.value.split(' ')[1])
    }

    return (

        <div className='content'>

            <Button onClick={() => task.setNewTask({...task.newTask, show: true})}>Добавить задачу</Button>
            <h1>To Do List:</h1>
            <div className='orderBar'>
                <select onChange={e => changeOrder(e)}>
                    <option disabled>Сортировка</option>
                    <option value="name ASC">По имени ↑</option>
                    <option value="name DESC">По имени ↓</option>
                    <option value="email ASC">По email ↑</option>
                    <option value="email DESC">По email ↓</option>
                    <option value="done ASC">По статусу ↓</option>
                    <option value="done DESC">По статусу ↑</option>
                </select>
            </div>
                <Form>
                    {task.tasks.length >=0 && task.tasks.map((t) =>
                        <TaskItem key={t.id} t={t}/>
                    )
                    }
                </Form>
        <AddTask show={task.newTask.show} onHide={() => task.setNewTask({...task.newTask, show: false})}/>
        <EditTask show={task.editTask.show} onHide={() => task.setEditTask({...task.editTask, show: false})}/>
        <div className='taskPagination'>{task.pages.length >= 0 &&
            task.pages.map(p =>
                <div key={p}
                     onClick={() => task.setCurrentPage(p)}
                >{p}</div>
            )
        }</div>

        </div>
    );
});

export default IndexPage;