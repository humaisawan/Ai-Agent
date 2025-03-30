const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const connectDb = require('./Config/db')
const startServer = require('./Helpers/StartServer')

connectDb()
startServer()
