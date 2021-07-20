import mongoose = require('mongoose');

export function configureDatabase() {
    mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('connected to database');
    }).catch(err => {
        console.log(err);
    });
}
