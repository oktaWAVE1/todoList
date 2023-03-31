import React, {useContext} from 'react';
import {Alert, Container, Form, Modal, Row} from "react-bootstrap";
import Button from "../UI/Button/Button";
import {Context} from "../index";
import {fetchTasks, updateTasks} from "../http/taskAPI";
import {observer} from "mobx-react-lite";

const EditTask = observer(({onHide, show}) => {
    const {task, message} = useContext(Context)
    const saveChanges = (e) => {
        e.preventDefault()
        try {
            updateTasks(task.editTask.taskText, task.editTask.done, task.editTask.id, true).then(() => {
                fetchTasks(task.currentPage, task.order).then(data => task.setTasks(data.rows));
                message.setMessage({text: 'Задача успешно изменена', show: true, variant: 'success'})
                setTimeout(() => {
                    message.setMessage({text: '', show: false, variant: 'danger'})
                    onHide()
                }, 3000)
            })
        } catch (e) {
            message.setMessage({text: e.response.data.message, show: true, variant: 'danger'})
            setTimeout(()=> {
                message.setMessage({text: '', show: false, variant: 'danger'})
            }, 3000)
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
                    <h1>Изменить: </h1>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='newTaskContainer'>
                    <Form>

                        <Row className='p-2'>
                            <div>Имя: {task.editTask.name}</div>
                            <div>Email: {task.editTask.email}</div>
                            <textarea
                                type='text' placeholder='Текст'
                                value={task.editTask.taskText}
                                onChange={e => task.setEditTask({...task.editTask, taskText: e.target.value})}
                            />
                        </Row>
                        <Row className='p-2'>
                            <Button onClick={(e) => saveChanges(e)}>Сохранить изменения</Button>
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

export default EditTask;