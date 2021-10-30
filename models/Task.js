const {Schema, model, Types} = require('mongoose')

function generateDateminusOneDay() {
    var date = new Date();
    return date.setDate(date.getDate() - 1);
    // new Date(res).toLocaleString();
}

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    group: {type: Types.ObjectId, ref: 'Group'},
    creationParameters: {
        reportTpl: {type: String, required: true},
        reportDate: {type: Date, required: true, default: generateDateminusOneDay()}, // timestamp, example: 1635321829808
        unit: {
            tb: {type: String}, // string, example: "38", по всему ТБ
            osb: {type: String}, // string, example: "7978", по всему ОСБ
            vsp: {type: String}, // string, example: "0002", по конкретному ВСП
        }
    },
    cron: {type: String, default: null},
    lifeTimeLimit: {type: Number, default: 1},
    taskDate: {type: Date, required: true, default: Date.now}, // timestamp, example: 1635321829808
    taskDateStart: {type: Date, required: true, default: Date.now},
    taskStatus: {type: Number, required: true, default: 0}, // codeStatus, example: 0 | 1 | 2 | 3 | 4 | 5 ...
    // taskAuthor: [login], // string, example: "Tanko1-IP"
    // roleGroup: [group], // string, example: "dep_web_reports"
})

module.exports = model('Task', schema)
