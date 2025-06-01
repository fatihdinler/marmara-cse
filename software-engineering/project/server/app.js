const express = require('express')
const http = require('http')
const mqtt = require('mqtt')
const { createLogger, transports, format } = require('winston')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const config = require('./src/config')

const authRoutes = require('./src/routes/auth.js')
const excuseRoutes = require('./src/routes/excuse.js')
const generatorRoutes = require('./src/routes/generator.js')
const voteRoutes = require('./src/routes/vote.js')
const connectDB = require('./src/config/db.js')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const port = config.DEMIRTECH_APPLICATION_PORT || 3000

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

connectDB()
const client = mqtt.connect('mqtt://broker.emqx.io', { username: 'emqx', password: 'password' })
global.mqttClient = client

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.File({ filename: 'logs/app.log' }),
    new transports.Console()
  ]
})
global.logger = logger

server.listen(port, async () => {
  try {
    console.log(`>>> DEMIRTECH API IS RUNNING ON http://localhost:${port}`)
  } catch (error) {
    console.error(`Error in app.js: ${error.message}`)
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/excuses', excuseRoutes)
app.use('/api/generator', generatorRoutes)
app.use('/api/votes', voteRoutes)


app.use((err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})
