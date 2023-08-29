const mongoose = require('mongoose')    

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB');
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name must be at least 3 characters long TEST'],
    },
    number: {
        type: String,
        required: [true, 'Phone number is required'],
        minLength: [8, 'Phone number must be at least 8 digits long TEST'],
        validate: {
            validator: (v) => {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema, 'persons')