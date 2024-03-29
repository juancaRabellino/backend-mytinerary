const express = require('express') // importo librería express
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/index')
require('./config/database') // ejecuta el archivo

const app = express() // App es una instancia de express

// MIDDLEWARES funciones que se ejecutan antes de llegar a la ruta
app.use(cors())
app.use(express.json()) // para toda petición que le entre a la api usá el traductor


app.use('/api', router) // cuando te hagan un pedido de cualquier tipo

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'
app.listen(port, host, () => console.log('App listening on port 4000'))