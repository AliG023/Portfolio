import express from 'express'
import 'dotenv/config'
import config from './config/config.js' 
import app from './express.js'
import mongoose from 'mongoose'
import ProjectRouter from './routes/project.route.js'
import UserRouter from './routes/user.route.js'
import QualificationsRouter from './routes/qualification.route.js'
import ContactsRouter from './routes/contacts.route.js'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { } )
    .then(() => {
        console.log("Connected to MongoDB!");
    })

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to MongoDB: ${config.mongoUri}`)
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to My Portfolio application." });
});

// ROUTES
app.use(express.json());
app.use('/', ProjectRouter);
app.use('/', UserRouter);  
app.use('/', QualificationsRouter);
app.use('/', ContactsRouter);


app.listen(config.port, (err) => { 
    if (err) {
        console.log(err) 
    }
    console.info('Server started on port %s.', config.port)  // This should print the actual number
});

