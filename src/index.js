import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import route from './routes/index.js';

const app = express();
app.use(morgan('combined'));

app.engine(
    'hbs',
                   engine({
                  extname: '.hbs',
    }),
);

const       __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.set('views', path.join(`${__dirname}/resources/views`));

app.use(express.static(path.join(`${__dirname}/public`)));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

route(app);

app.listen(3333);
