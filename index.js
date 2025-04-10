
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const path = require('path');
const db = require("./models/index.js");
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/image/restaurants', express.static(path.join(__dirname, '/public/image/restaurants'))); // esta linea sirve para servir archivos estaticos como css, js, imagenes, etc
app.use(express.static('public'))

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

db.sequelize.sync({
 //force: true // drop tables and recreate
}).then(() => {
    console.log('db resync');
});

app.use(session({
  secret: 'eldiavlo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', require('./routes/guest.routes.js'));
app.use('/admin', require('./routes/admin.routes.js'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });

