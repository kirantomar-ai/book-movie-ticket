const mongodb = require('mongodb');
const mongoose = require('mongoose');
const { bookMovieSchema } = require('./schema')

const dbName ='bookMovie'
// const mongoURI = "mongodb://127.0.0.1:27017/" + dbName + "?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1" 
const mongoURI = "mongodb+srv://kt_kiran:8766292313@cluster0.dk6wjwu.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
    
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema)


exports.connection = collection_connection;

