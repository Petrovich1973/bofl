const Task = require('../models/Task')

const job = async () => {
    console.log('job start')
    // await Task.updateMany({ taskStatus: { $gt: 2 } }, { $set: { taskStatus: 0 } })
    // const tasks = await Task.find({taskDate: {$eq: new Date(1635615363422)}}).countDocuments()
    const tasks = await Task.find({'creationParameters.reportTpl': 'vkl-29'})
    await Task.updateMany({ 'creationParameters.reportTpl': 'vkl-29' }, { $set: { 'creationParameters.reportTpl': 'vkl-31' } })

    console.log('job stop')


}

module.exports = job
