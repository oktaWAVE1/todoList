import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Navbar = observer(() => {
    const {user} = useContext(Context)
    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    return (
        <div className='navBar'>
            <Link to='/login'>Log in</Link>
            <Link to='/'>Список задач</Link>

            {user.isAuth &&
                <div onClick={() => logout()} className='logout'>ВЫЙТИ</div>
            }


        </div>
    );
});

export default Navbar;