const mongoose = require('mongoose');
require('dotenv').config(); 

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
    .then((result) => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Name must be at least 3 characters long'],
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        minLength: 1,
    },
    url: {
        type: String,
        required: [true, 'URL is required'],
        minLength: 1,
    },
    likes: {
        type: Number,
        default: 0,
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
