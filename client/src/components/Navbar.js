import React, {useContext, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <header>
            <div className="container">
                <div className="wrapper-flex">
                    <h2>Отчеты по вкладам и счетам физ лиц</h2>
                    <ul className="nav wrapper-flex">
                        <li><NavLink to="/create">Создать</NavLink></li>
                        <li><NavLink to="/tasks">Задачи</NavLink></li>
                    </ul>
                    <a href="/" onClick={logoutHandler}>Выйти</a>
                </div>
            </div>
        </header>
    )
}
