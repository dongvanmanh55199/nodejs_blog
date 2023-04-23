import express from 'express'
import path from 'path'
import morgan from 'morgan'
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import { fileURLToPath } from 'url'
import route from './routes/index.js'

import * as db from './config/db/index.js'
import sortMiddleware from './app/middlewares/sortMiddleware.js'
import { helpers } from './helpers/handlebars.js'
db.connect()

const app = express()
app.use(morgan('combined'))

app.engine(
   'hbs',
   engine({
      extname: '.hbs',
      helpers,
   }),
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine', 'hbs')
// app.set('views', path.join(`${__dirname}/resources/views`))
app.set('views', path.join(__dirname, 'resources', 'views'))

// app.use(express.static(path.join(`${__dirname}/public`)))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
   express.urlencoded({
      extended: true,
   }),
)
app.use(express.json())
app.use(methodOverride('_method'))

app.use(sortMiddleware)

route(app)

app.listen(3333)
