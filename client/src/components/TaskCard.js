import React from 'react'
import {Link} from "react-router-dom";

export const TaskCard = ({ task }) => {
    return (
        <>
            <h2>Заявка</h2>

            <table>
                <tbody>
                <tr>
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
                </tr>
                </tbody>
            </table>
        </>
    )
}
