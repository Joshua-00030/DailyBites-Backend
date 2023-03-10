const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

usersRouter.get("/:username", async (request, response) => {
  // response.send(request.params.username)
  const decodedToken = jwt.verify(getTokenFrom(request), "test")
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
    const user = await User.findById(decodedToken.id) 
    console.log(user.calorieTotal)
    response.json(user.calorieTotal)
})

// maybe find user first then update?
usersRouter.put("/:username", async (request, response) => {
  const newCalorie = request.body.updateCalorie
  const username = request.body.myusername
  await User.updateOne({username: username}
    , { $set: {
      calorieTotal: newCalorie
    }}).then(
      response.status(200)
    )
  })

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

usersRouter.put('/addItemToHistory', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), "test")
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
try{
	const newItem = {itemId:request.body.id, date:request.body.date}
	User.updateOne(
		{_id: decodedToken.id},
		{$push: { history: newItem }}
	).then((rp =>{
 		response.status(201).json(rp)}
	))
}
catch(error){
  console.log(error)
}
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('userItem', { name: 1, nutrition: 1, tags: 1 })
  response.json(users)
})

usersRouter.post('/getHistory', async (request, response) => {

  const decodedToken = jwt.verify(getTokenFrom(request), "test")
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
try{
  const user = await User.findById(decodedToken.id)
  if(!user){
          return response.status(401).json({error: "user not found"})
  }
const id = mongoose.Types.ObjectId(decodedToken.id)
const sd = new Date(request.body.sdate)
const ed = new Date(request.body.edate)

const rp = await User.aggregate([
    { $match: {_id: id }},

    { $project: { 
	    hist:{$filter: {
		    input: "$history",
		    as: "h",
		    cond: { $and:[
		    {$gte: ["$$h.date", sd]},
		    { $lt: ["$$h.date", ed]}
		    ]}
	    }}
    }},
{$lookup:
	{
		from: "useritems",
		localField: "hist.itemId",
		foreignField: "_id",
		as: "data"
	}},
	{$project: {data: 1, hist: 1}}
  ], function(err, rep) {
            if (err){
                    return err
            }
            else{
  let results = []
for(var i = 0; i < rep[0].hist.length; i++){
	for(var j = 0; j < rep[0].data.length; j++){
		if( String(rep[0].hist[i].itemId) === String(rep[0].data[j]._id)){
			var item = {...rep[0].hist[i], ...rep[0].data[j]}
			results.push(item)
			break
			}
		}
	}
                response.status(201).json(results)}
    })

}
catch(error){
console.log(error)
}
})


module.exports = usersRouter
