const express = require('express');
const connectDB = require('./config/db');

const path = require('path');

const app = express();

//connect database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

const PORT = process.env.PORT || 5000;

const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

// app.get('/', (req, res) => res.json({ msg: "Welcome tothe ContactKepper API..." }))

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

// Serve static assets in producton 
if (process.env.NODE_ENV === "production") {
    // Set Static Folder 

    //Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'))
    })

}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))