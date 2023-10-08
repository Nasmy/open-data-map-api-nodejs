const mongoose = require('mongoose');

const connectDb = async () => {
    let connectionURI = null;
    try {
        if (process.env.APP_ENV === 'local') {
            connectionURI = process.env.DB_CONNECTION_LOCAL;
        } else {
            connectionURI = `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?authSource=admin`;
            console.log(connectionURI);
        }

        await mongoose.connect(connectionURI, () => {
            console.log('connected to db');
        })

    } catch (err) {
        console.log("Database connection failed")
    }
}

module.exports = connectDb;