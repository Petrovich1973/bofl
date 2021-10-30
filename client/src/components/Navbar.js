import React, {useContext, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const onClickMenu = event => {
        event.preventDefault()
        setIsMenu(!isMenu)
    }

    const onHideMenu = () => {
        setIsMenu(false)
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo" style={{padding: '0 2rem', whiteSpace: 'nowrap'}}>Сокращение ссылок</span>
                <span onClick={onClickMenu} className="sidenav-trigger right" data-target="mobile-nav">
                    <span className="large" style={{fontSize: '140%'}}>{isMenu ? <span>&#10005;</span> :
                        <span>&#9776;</span>}</span>
                </span>
                <ul id="nav-mobile" onClick={onHideMenu} className={`right hide-on-med-and-down ${isMenu ? 'isMenu' : ''}`}>
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/tasks">Задачи</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}
