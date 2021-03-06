const express = require('express')
const cors = require('cors')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

const cron = require('node-cron')
const jobScheduled = require('./jobs/scheduled')

cron.schedule('*/10 * * * * *', async () => {

  console.log('running a task 1 minutes')
  jobScheduled()

})

app.use(cors())
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/group', require('./routes/group.routes'))
app.use('/api/task', require('./routes/task.routes'))
app.use('/t', require('./routes/redirect.routes'))
app.set('etag', false)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

