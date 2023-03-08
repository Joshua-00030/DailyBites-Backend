const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

const userItemSchema = new mongoose.Schema({
    name:{
        type: String,
	unique: true,
        required: true,
        minlength: 2
    },
	tags: [String],
    nutrition: [{
	    name: {type: String, unique: false, required: true},
	    value: {type: Number, unique: false, required: true}
    }],
    user:{
	    type: String
    }
})

//userItemSchema.plugin(uniqueValidator)

userItemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('UserItem', userItemSchema)
