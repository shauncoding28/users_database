require('dotenv').config();


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const pool = require('./db');
const db = require('./querries');
require('dotenv').config();




app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true,
})
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});



app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);


app.use((req, res, next) => {
    const error = new Error('Something went wrong');
    next(error);
});
// Error-handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
});



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});



