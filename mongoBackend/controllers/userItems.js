const useritemsRouter = require('express').Router()
const UserItem = require('../models/userItem')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

useritemsRouter.get('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
	  return response.status(401).json({ error: 'token invalid' })  
  }  
  const user = await User.findById(decodedToken.id)
  
  const userItems = await UserItem
    .find({user:user.username})

  response.json(userItems)
})

useritemsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
try{
  const user = await User.findById(decodedToken.id)
  if(!user){
	  return response.status(401).json({error: "user not found"})
  }
  
  const useritem = new UserItem({
    name: body.name,
    nutrition: body.nutrition,
    tags: body.tags,
    user: user.username
  })
  const savedUserItem = await useritem.save()
  user.items = user.items.concat(savedUserItem.id)

  const bulkOps = body.nutrition.map(i => {
	  //console.log(i)
	  return{
		  updateOne:{
			  filter: {_id: decodedToken.id, 'trackedNutrients.name': {'$ne': i.name} },
	  update: { $addToSet: {'trackedNutrients': {'name': i.name, 'unit': i.measurement}}},
	  function(err) {
              if(err) {
		      console.log('fail')
              } else {
		      console.log('pass')
	      }}}}})
User.bulkWrite(bulkOps)
await user.save()
  //user.trackedNutrients = user.trackedNutrients.concat({'name': body.nutrition[0].name, 'unit': body.nutrition[0].measurement})
//	console.log(rp)
  response.json(savedUserItem)
}catch(error){
  console.log(error)
  response.json(error)
}
})

useritemsRouter.get('/:id', async (request, response) => {
  const useritem = await UserItem.findById(request.params.id)
  if (useritem) {
    response.json(useritem)
  } else {
    response.status(404).end()
  }
})

useritemsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = token === null
  ? false
  : jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const selectedItem = await UserItem.findById(request.params.id)
  
  if(user._id.equals(selectedItem.user)){ 
    await UserItem.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(400).json({error: 'only the creator of the item may delete it.'})
  }
})

useritemsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const useritem = {
    name: body.name,
    tags: body.tags,
    nutrition: body.nutrition,
    user: user._id
  }

  UserItem.findByIdAndUpdate(request.params.id, useritem, { new: true })
    .then(updatedUserItem => {
      response.json(updatedUserItem)
    })
    .catch(error => next(error))
})

module.exports = useritemsRouter
