const express = require('express')
const createGroupHandler = require('./app/handlers/createGroupHandler')
const getGroupByIdHandler = require('./app/handlers/getGroupByIdHandler')
const joinGroupByCodeHandler = require('./app/handlers/joinGroupByCodeHandler')
const updateGroupHandler = require('./app/handlers/updateGroupHandler')
const updateEntranceCodeHandler = require('./app/handlers/updateEntranceCodeHandler')
const exitFromGroupHandler = require('./app/handlers/exitFromGroupHandler')
const kickFromGroupHandler = require('./app/handlers/kickFromGroupHandler')
const getAllPcstaHandler = require('./app/handlers/getAllPcstaHandler')
const getGroupsHandler = require('./app/handlers/getGroupsHandler')
const getPcstasByGroupingHandler = require('./app/handlers/getPcstasByGroupingHandler')
const routes = express.Router()

// Server routes
routes.get('/', (req, res) => res.status(200).json({ message: 'Up and running!' }))
routes.post('/createGroup', createGroupHandler)
routes.get('/getGroupById', getGroupByIdHandler)
routes.post('/joinGroupByCode', joinGroupByCodeHandler)
routes.put('/updateGroup', updateGroupHandler)
routes.get('/updateEntranceCode', updateEntranceCodeHandler)
routes.patch('/exitFromGroup', exitFromGroupHandler)
routes.patch('/kickFromGroup', kickFromGroupHandler)
routes.get('/getAllPcsta', getAllPcstaHandler)
routes.get('/getGroups', getGroupsHandler)
routes.get('/getPcstasByGrouping', getPcstasByGroupingHandler)

module.exports = routes
