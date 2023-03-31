import React, {useContext} from 'react';
import {Alert, Container, Form, Modal, Row} from "react-bootstrap";
import Input from "../UI/Input/Input";
import {observer} from "mobx-react-lite";
import Button from "../UI/Button/Button";
import {validate} from "email-validator";
import {Context} from "../index";
import {createTask, fetchTasks} from "../http/taskAPI";

const AddTask = observer(({onHide, show}) => {

    const {task, message} = useContext(Context)
    const addNewTask = (e) => {
        e.preventDefault()
        if (task.newTask.name === '' || task.newTask.email === '' || task.newTask.taskText === '') {
            message.setMessage({text: 'Заполните все поля', show: true, variant: 'danger'})
            setTimeout(() => {
                message.setMessage({text: '', show: false, variant: 'danger'})
            }, 5000)
        } else if(!validate(task.newTask.email)) {
            message.setMessage({text: 'Проверьте email', show: true, variant: 'danger'})
            setTimeout(() => {
                message.setMessage({text: '', show: false, variant: 'danger'})
            }, 5000)
        } else {
            createTask({
                taskText: task.newTask.taskText,
                email: task.newTask.email,
                name: task.newTask.name
            }).then(() => {fetchTasks(task.currentPage, task.order).then(data => {
                task.setTasks(data.rows);
                task.setPagesCount(Math.ceil(parseInt(data.count)/3))
                task.setPages([])
                for (let i=1; i<=task.pagesCount; i++) {
                    task.setPages([...task.pages, i])
                }

            })})
            message.setMessage({text: 'Задача успешно добавлена', show: true, variant: 'success'})
            setTimeout(() => {
                message.setMessage({text: '', show: false, variant: 'danger'})
                task.setNewTask({show: false, name: '', email: '', text: ''})
                onHide()
            }, 2000)

        }

    }
    return (
        <Modal
            className='modal'
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >{message.message.show &&
            <Alert variant={message.message.variant} onClose={() => message.setMessage({text: '', show: false})} dismissible>
                <p>
                    {message.message.text}
                </p>
            </Alert>
        }
            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter ">
                    <h1>Добавить задачу: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='newTaskContainer'>
                    <Form>

                        <Row className='p-2'>
                            <Input type='text' placeholder='Имя пользователя'
                                          value={task.newTask.name}
                                          onChange={e => task.setNewTask({...task.newTask, name: e.target.value})}
                            />
                            <Input type='text' placeholder='Email'
                                   value={task.newTask.email}
                                   onChange={e => task.setNewTask({...task.newTask, email: e.target.value})}
                            />
                            <textarea
                                type='text' placeholder='Текст задачи'
                                value={task.newTask.taskText}
                                onChange={e => task.setNewTask({...task.newTask, taskText: e.target.value})}
                            />
                        </Row>
                        <Row className='p-2'>
                            <Button onClick={(e) => addNewTask(e)}>ДОБАВИТЬ ЗАДАЧУ</Button>
                        </Row>

                    </Form>
                </Container>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddTask;