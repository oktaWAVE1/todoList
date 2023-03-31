import React, {useContext} from 'react';
import {Card, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchTasks, updateTasks} from "../http/taskAPI";
import Button from "../UI/Button/Button";

const TaskItem = observer(({t, ...props}) => {
    const {user, task} = useContext(Context)
    const updateTask = (taskText, done, id, edited) => {
        updateTasks(taskText, done, id, edited).then(() => fetchTasks(task.currentPage, task.order).then(data => task.setTasks(data.rows)))
    }
    const changeValue = (e) => {
        e.preventDefault()
        task.setEditTask({name: t.name, email: t.email, taskText: t.taskText, id: t.id, show: true})
    }

    return (

            <Card>
                    <h3>
                        {t.name}
                    </h3>
                    <h3>
                        {t.email}
                    </h3>
                    <p>
                        {t.taskText}
                    </p>

                <Form.Check
                    type="switch"
                    id={t.id}
                    label="Выполнено"
                    isValid={t.done}
                    checked={t.done}
                    onChange = {user.isAuth? () => updateTask(t.taskText, !t.done, t.id, t.edited) : () => {}}

                />

                {user.isAuth &&
                    <Button onClick={(e) => changeValue(e)}>Редактировать</Button>
                }
                {t.edited && <p className='edited'>Ортерадктировано администратором.</p>}
            </Card>

    );
});

export default TaskItem;