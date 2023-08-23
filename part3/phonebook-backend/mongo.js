const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://uizykim:${password}@cluster0.idegc5r.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Person = mongoose.model('Person', personSchema)