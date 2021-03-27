import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

app.listen(3000, () => console.log(new Date()))
