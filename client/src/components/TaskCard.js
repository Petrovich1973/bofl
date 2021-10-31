import React from 'react'

export const TaskCard = ({ task }) => {
    return (
        <>
            <h2>Задача</h2>

            <table>
                <tbody>
                <tr>
                    <td>{task.group}</td>
                    <td>{task.owner}</td>
                    <td>{task.creationParameters.reportTpl}</td>
                    <td>{new Date(task.creationParameters.reportDate).toLocaleString("ru").split(',')[0]}</td>
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
