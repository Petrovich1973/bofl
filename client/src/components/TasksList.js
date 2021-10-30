import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const TasksList = ({deleteOne, tasks}) => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    if (!tasks.length) {
        return <p className="center">Ссылок пока нет</p>
    }

    const onDelete = async id => {
        try {
            const data = await request(`/api/task/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            })
            deleteOne(data)
        } catch (e) {
        }
    }

    return (
        <table>
            <thead>
            <tr>
                <th>group</th>
                <th>owner</th>
                <th>reportTpl</th>
                <th>reportDate</th>
                <th>unit</th>
                <th>Открыть</th>
                <th>Удалить</th>
            </tr>
            </thead>

            <tbody>
            {tasks.map((task, index) => {
                return (
                    <tr key={task._id}>
                        <td>{task.group}</td>
                        <td>{task.owner}</td>
                        <td>{task.creationParameters.reportTpl}</td>
                        <td>{new Date(task.creationParameters.reportDate).toLocaleString("ru")}</td>
                        <td>{Object.keys(task.creationParameters.unit)
                            .map(key => {
                                return task.creationParameters.unit[key]
                            })
                            .filter(el => el)
                            .join('/')}</td>
                        <td>
                            <Link to={`/detail/${task._id}`}>Открыть</Link>
                        </td>
                        <td>
                            <button onClick={() => onDelete(task._id)}>delete</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
