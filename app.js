const express = require('express');
const app = express();
const { getUsers, getThings } = require('./db');
const morgan = require('morgan');

app.use(morgan('dev'));

//Direct Client side traffic to the index.html
app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

//Point the app.js to the webpack created main.js
app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js'))
);

//Redirect to the default which is users
app.get('/', (req, res, next) => {
  res.redirect('/users');
});

app.get('/users', (req, res, next) => {
  getUsers()
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

app.get('/things', (req, res, next) => {
  getThings()
    .then(things => res.send(things))
    .catch(next);
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

module.exports = app;
