require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/connection');
const path = require('path');
const { Comment, Post, User, DirectMessage, Like } = require('./models');

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

const sessionStore = new SequelizeStore({ db: sequelize });

app.use(session(sess));

// Set up CORS
app.use(cors());

app.use(express.urlencoded( { extended: true }))
app.use(express.json());

app.use(routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));


//! =====! Deleting tables section!
//* This will not delete the database ever
const syncOptions = { force: false };


//* This will delete the database in development but not production
// const syncOptions = process.env.NODE_ENV === "production" ? { force: false } : { force: true };

//! =================================================


// If the environment is not production, 'force' is set to false to avoid dropping and recreating all tables
if (process.env.NODE_ENV !== "production") {
  syncOptions.force = false;
}


// sequelize.sync(syncOptions).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// }).catch((error) => {
//   console.error('Unable to sync database:', error);
// });

// User.sync(syncOptions)
// .then(() => Post.sync(syncOptions))
// .then(() => Comment.sync(syncOptions))
// .then(() => DirectMessage.sync(syncOptions))
// .then(() => Like.sync(syncOptions))
// .then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// })
// .catch((error) => {
//   console.error('Unable to sync database:', error);
// });

const syncDatabase = async () => {
  try {
    await User.sync(syncOptions);
    await Post.sync(syncOptions);
    await Comment.sync(syncOptions);
    await DirectMessage.sync(syncOptions);
    await Like.sync(syncOptions);
    await sessionStore.sync();
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

syncDatabase();

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
