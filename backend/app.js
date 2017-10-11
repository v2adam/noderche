/* eslint-disable import/no-unresolved */

// idegen dependency-k behúzása

const express = require('express');
// ezzel lehet hivatkozni a könyvtárakban
const path = require('path');
// az fs-el lehet elérni a filerendszert, csak szerver oldalon használd
// const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
// parserek kellenek, hogy az adatokat normálisan beolvashassa
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// beépített http biztonsági dolgok
const helmet = require('helmet');
// rate limit, hogy ne lehessen ledögleszteni a végpontokat
const RateLimit = require('express-rate-limit');

// saját fájlok behúzása
const index = require('./routes/index');
const users = require('./routes/users');
const dummyData = require('./routes/dummyData');

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// api végpontokra alkalmazok egy egyszerű ratelimiter-t
const apiLimiter = new RateLimit({
  windowMs: 1000 * 60 * 15, // ezen időablakban vannak értelmezve a szabályok
  delayAfter: 10000, // a 10000-ik után kezd el várakoztatni
  delayMs: 3 * 1000, // 3 mp-ig várakoztat, ha túllépte a a delayAfter limitet
  max: 100000, // 1 IP-ről ennyi után kezd el 429-et dobni
  message: 'Too many request created from this IP, please try again later'
});


// view engine setup
// backend szervernek ez lesz a template engine-je
// a views-ban keresi a sabolonokat
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// azért, hogy fel tudja olvasni a http-ből jövő adatokat normálisan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// public fájlok útvonala
app.use(express.static(path.join(__dirname, 'public')));


// végpontok, mire a backend szerver reagál
// számít a sorrend
// api végpontokat érdemes verziózni
app.use('/api/v1/users', apiLimiter, users);

app.use('/api/v1/dummy', apiLimiter, dummyData);

// főoldal a gyökérre passzol
app.use('/', index);

// ha egyik route se passzol, akkor 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  // továbbadja az általános hibakezelőnek
  next(err);
});

// általános hibakezelő
// ez az egyetlen 4 paraméteres
app.use((err, req, res, next) => {
  // ha dev mód van, akkor kirakja a stack-et
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
