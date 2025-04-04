const express = require('express')
const cors = require('cors')
const { port, host } = require('./config/config')
const router = require('./src/routes/studentRoutes')
const { error } = require('./src/utils/errorHandler')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(router)
app.use(error)

app.listen(port, () => {
  console.log(`running on port http://${host}:${port}`)
})
