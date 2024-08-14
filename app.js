const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const tasks = require('./routes/task');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
// static files and middleware

app.use(express.json());
app.use(express.static('./public'));



// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 3000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();

