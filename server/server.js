require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');
const path = require('path');

const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

app.use(session(sess));

// Set up CORS
app.use(cors({ credentials: true }));

app.use(express.urlencoded( { extended: true }))
app.use(express.json());

app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));

const syncOptions = { force: false };

// If the environment is not production, 'force' is set to false to avoid dropping and recreating all tables
if (process.env.NODE_ENV !== "production") {
  syncOptions.force = false;
}

sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
}).catch((error) => {
  console.error('Unable to sync database:', error);
});

