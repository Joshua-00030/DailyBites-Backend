const mongoose = require('mongoose')
/*
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })
*/
const userItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    nutrition: [
        {
            name: { type: String, unique: true, required: true },
            value: { type: Number, required: true, }
        }
    ],
    tags: [String],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

userItemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('UserItem', userItemSchema)
