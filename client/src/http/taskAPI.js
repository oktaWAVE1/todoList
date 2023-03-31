import {$host, $authHost} from './index'


export const createTask = async({name, email, taskText}) => {
    const {data} = await $host.post('api/task', {name, email, taskText})
    return data
}

export const fetchTasks = async(page, order, orderDirection) => {
    const {data} = await $host.get('api/task', {params: {
            page, order, orderDirection
        }})
    return data
}

export const updateTasks = async(taskText, done, id, edited) => {
    const {data} = await $authHost.put('api/task', {taskText, done, id, edited})
    return data
}
