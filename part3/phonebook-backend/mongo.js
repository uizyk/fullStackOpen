const mongoose = require('mongoose');

if (process.argv.length<3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://uizykim:${password}@cluster0.idegc5r.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema, 'persons');

const person = new Person({
    name: 'Save test',
    number: '123-456-7890',
})

person.save().then(result => {
    console.log('person saved!');
    mongoose.connection.close();
})
