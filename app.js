require('dotenv').config();
const express = require('express');
const cors = require('cors');

const auth = require('./routes/auth');
const recipe = require('./routes/recipe');
const authenticate = require('./middleware/authenticate');
const db = require('./db/seq');

const app = express();

// test database
/**
 * postgres database
db.authenticate()
  .then(() => { console.log('Database connected...'); })
  .catch(() => { console.log('Database error: ' + (err)) });
*/

// mongodb connection
require('./db/mongodb')();

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//
app.use('/api/auth', auth)
app.use('/api/recipe', recipe);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server on port ${port}`)
});

// update user model, add roles