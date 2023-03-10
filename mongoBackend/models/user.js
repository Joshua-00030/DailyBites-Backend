const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  passwordHash: String,
  calorieTotal: {
    type: Number,
    required: true,
    default: 2000
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserItem'
    }
  ],
  history: [
    {
      itemId:{
      	type: mongoose.Schema.Types.ObjectId,
      	ref: 'UserItem'},
      date: {type: Date, required: true}
    }
  ],
  trackedNutrients: [{
            name: {type: String, unique: false, required: true},
            unit: {type: String, unique: false, required: true}
    }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
