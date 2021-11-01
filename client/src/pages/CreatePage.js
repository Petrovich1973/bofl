import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [form, setForm] = useState({
        creationParameters: {
            reportTpl: 'vkl-29',
            reportDate: new Date().setDate(new Date().getDate() - 1),
            unit: {
                tb: "43",
                osb: "3023",
                vsp: "0003",
            }
        }
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const onSend = async event => {
        try {
            const data = await request('/api/task/generate', 'POST', {form}, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.task._id}`)
        } catch (e) {
        }
    }

    const handleChangeField = (value) => {
        const newForm = {creationParameters: {...form.creationParameters, ...value}}
        setForm(newForm)
    }

    return (
        <div className="form">
            <h3>Создание задачи</h3>
            <div className="input-field">
                <label>reportTpl</label>
                <input
                    placeholder="reportTpl"
                    type="text"
                    value={form.creationParameters.reportTpl}
                    onChange={e => handleChangeField({reportTpl: e.target.value})}
                />
            </div>
            <div className="input-field">
                <label>reportDate</label>
                <input
                    placeholder="reportDate"
                    type="text"
                    value={new Date(form.creationParameters.reportDate).toLocaleString("ru").split(',')[0]}
                    onChange={e => {
                        const newValue = e.target.value.split(',')[0].split('.')//.join(' ')
                        const formatDate = new Date([newValue[1], newValue[0], newValue[2]].join(' ')).getTime()
                        if (formatDate) {
                            console.log(formatDate)
                            const reportDate = formatDate
                            handleChangeField({reportDate})
                        }
                    }}
                />
            </div>
            <div className="input-field">
                <label>tb</label>
                <input
                    placeholder="tb"
                    type="text"
                    value={form.creationParameters.unit.tb}
                    onChange={e => handleChangeField({
                        unit: {
                            ...form.creationParameters.unit,
                            tb: e.target.value
                        }
                    })}
                />
            </div>
            <div className="input-field">
                <label>osb</label>
                <input
                    placeholder="osb"
                    type="text"
                    value={form.creationParameters.unit.osb}
                    onChange={e => handleChangeField({
                        unit: {
                            ...form.creationParameters.unit,
                            osb: e.target.value
                        }
                    })}
                />
            </div>
            <div className="input-field">
                <label>vsp</label>
                <input
                    placeholder="vsp"
                    type="text"
                    value={form.creationParameters.unit.vsp}
                    onChange={e => handleChangeField({
                        unit: {
                            ...form.creationParameters.unit,
                            vsp: e.target.value
                        }
                    })}
                />
            </div>
            <div className="form-send">
                <button onClick={onSend}>Создать</button>
            </div>
        </div>
    )
}
