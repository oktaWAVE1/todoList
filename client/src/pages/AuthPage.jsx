import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {Alert} from "react-bootstrap";

const AuthPage = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === "/login"
    const {user, message} = useContext(Context)
    const navigate = useNavigate()
    const doAuth = async (event) => {
        event.preventDefault();
        let data
        try {
            if (isLogin){
                data = await login(user.authData.name, user.authData.password)
                user.setUser(data)
                user.setIsAuth(true)
                navigate('/')
            }
            else{
                    data = await registration(user.authData.name, user.authData.email, user.authData.password)
                    user.setUser(data)
                    message.setMessage({text: 'Успешная регистрация. Перенаплавляю на страницу авторизации...', show: true, variant: 'success'})
                    navigate('/login')

            }

        } catch (e) {
            message.setMessage({text: e.response.data.message, show: true, variant: 'danger'})
            setTimeout(()=> {
                message.setMessage({text: '', show: false, variant: 'danger'})
            }, 5000)
        }
    }

    return (
        <div>
            {message.message.show &&
                <Alert variant={message.message.variant} onClose={() => message.setMessage({text: '', show: false})} dismissible>
                    <p>
                        {message.message.text}
                    </p>
                </Alert>
            }
            <form className="authForm" onSubmit={doAuth}>

                <Input
                    type="text"
                    value={user.authData.name}
                    onChange={e => user.setAuthData({...user.authData, name: e.target.value})}
                    placeholder={isLogin? "Имя или email" : "Имя"}
                />
                {!isLogin && <Input
                    type="text"
                    value={user.authData.email}
                    onChange={e => user.setAuthData({...user.authData, email: e.target.value})}
                    placeholder="Email"
                />}
                <Input
                    type="password"
                    value={user.authData.password}
                    onChange={e => user.setAuthData({...user.authData, password: e.target.value})}
                    placeholder="Пароль"
                />
                <Button type="submit">{isLogin ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}</Button>
                <div className="authSwitch">{isLogin ? <Link to={'/reg'}>Регистрация</Link> : <Link to={'/login'}>Вход</Link>}</div>
            </form>
        </div>
    );
});

export default AuthPage;