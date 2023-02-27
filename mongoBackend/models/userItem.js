const mongoose = require('mongoose')

const userItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
	tags: [String],
    nutrition: [{
	    name: {type: String, unique: false},
	    value: {type: Number, unique: false}
    }],
    user:{
	    type: String
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
