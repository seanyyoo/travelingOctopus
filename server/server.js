const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const databaseController = require('./controllers/databaseControllers');

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  //change return filepath to login screen
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/login', databaseController.verifyAccount, (req, res) => {
  // user attempts to login, verify info is accurate, then redirect to user's home page
  // return res.locals.passwords
  res.redirect('/');
});

//when user (get) requests signup page, then render signup page
app.get('/signup', (req, res) => {
  res.render('./../client/signup', {error: null});
});

//user posts request on signup page, create user and return 'home' page
app.post('/signup', databaseController.bcrypt, databaseController.addAccount, (req, res) => {
  // when user successfully signs up, need to save account, then redirect them to home page
  res.redirect('/');
});

//global error handler
app.use((err, req, res, next) => {
  return res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})