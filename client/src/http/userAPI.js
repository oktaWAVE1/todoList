import {$authHost, $host} from './index'
import jwtDecode from "jwt-decode";

export const registration = async(name, email, password) => {
    const {data} = await $host.post('api/user/registration' , {email, password, name})
    return jwtDecode(data)
}

export const login = async(authData, password) => {
    const {data} = await $host.post('api/user/login', {authData, password})
    localStorage.setItem('token', data)
    return jwtDecode(data)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}