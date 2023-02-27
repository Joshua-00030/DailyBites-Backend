const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, password, email } = request.body
  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({error: 'username must be unique'})
  }
  if(password.length < 3){
    return response.status(400).json({error: 'password must be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('userItem', { name: 1, nutrition: 1, tags: 1 })
  response.json(users)
})

module.exports = usersRouter
