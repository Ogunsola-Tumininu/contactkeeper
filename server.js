const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const users = require('./routes/users');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

app.get('/', (req, res) => res.json({ msg: "Welcome tothe ContactKepper API..." }))

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))