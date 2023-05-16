require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');
const path = require('path');

const routes = require('./routes');
// const helpers = require('./utils/helpers');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

//Creating the proper port
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Creating a session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

//Uses the session we have
app.use(session(sess));

app.use(express.urlencoded( { extended: true }))
app.use(express.json());

//Make sure your routes are declared AFTER your sessions
app.use(routes);

// Importing some necessary middleware
app.use(express.static(path.join(__dirname, 'public')));


//! For when I get Sequelize stuff running
//^ The "force: true" here forces the database to drop all existing tables and recreate them. When deployed, change this value to "false"

const forceValue = (process.env.NODE_ENV === "production") ? false : false;

sequelize.sync({ force: forceValue }).then(() => {
    //Also can import the Seeds file then change the above to "true"
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });


