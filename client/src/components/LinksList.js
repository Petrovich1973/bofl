import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const LinksList = ({deleteOne, links}) => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    if (!links.length) {
        return <p className="center">Ссылок пока нет</p>
    }

    const onDelete = async id => {
        try {
            const data = await request(`/api/link/${id}`, 'DELETE', null, {
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
                <th>Дата</th>
                <th>_id</th>
                <th>origin</th>
                <th>Сокращенная</th>
                <th>Открыть</th>
                <th>Удалить</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{new Date(link.date).toLocaleString("ru")}</td>
                        <td>{link._id}</td>
                        <td>
                            <div style={{
                                maxWidth: 240,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}>{link.from}</div>
                        </td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Открыть</Link>
                        </td>
                        <td>
                            <button onClick={() => onDelete(link._id)}>delete</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
