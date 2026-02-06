const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();
const routes = require('./routes/route.js');
const requireAuth = require('./middlewares/requireAuth.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// IMPORTANTE para leer formularios HTML (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: false }));

// Sesiones (para login)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-clase-login',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Rutas
app.get('/', routes.home);
app.get('/login', routes.login);
app.post('/login', routes.loginPost);
app.post('/logout', routes.logoutPost);
app.get('/contacto', requireAuth, routes.contactoGet);
app.post('/contacto', requireAuth, routes.contactoPost);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
