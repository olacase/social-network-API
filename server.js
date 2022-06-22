const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-API', 
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });
// logs mongoDB queries being executed!
mongoose.set('debug', true);


app.listen(PORT, () => console.log(`You are Connected on localhost:${PORT}`));