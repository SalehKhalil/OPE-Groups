const PcstaDao = require('../models/daos/PcstaDao')
const GroupDao = require('../models/daos/GroupDao')
const GenericError = require('../utils/errors/GenericError')
const AuthService = require('../services/AuthService')
const queryBuilder = require('../utils/getGroupsQueryBuilder')

const checkPcstaAndCreateIfNecessary = async (pcsta, courseId) => {
  const exists = await PcstaDao.findByTitle(pcsta)

  if (!exists) {
    const belongsToGroupOne = (pcsta.includes('3'))
    const belongsToGroupTwo = (pcsta.includes('4') && (pcsta.includes('ADS') || pcsta.includes('BD') || pcsta.includes('GTI')))
    const belongsToGroupThree = (pcsta.includes('SI') && (pcsta.includes('4') || pcsta.includes('8')))

    if (belongsToGroupOne) {
      await PcstaDao.createPcsta({ title: pcsta, courseId: parseInt(courseId), grouping: 'groupOne' })
    }
    if (belongsToGroupTwo) {
      await PcstaDao.createPcsta({ title: pcsta, courseId: parseInt(courseId), grouping: 'groupTwo' })
    }
    if (belongsToGroupThree) {
      await PcstaDao.createPcsta({ title: pcsta, courseId: parseInt(courseId), grouping: 'groupThree' })
    }
  }
}

const checkIfGroupNameExists = async (groupName) => {
  const query = queryBuilder({ groupName: groupName.trim() })
  const group = await GroupDao.findGroupsByQuery(query)
  if (group && group.length > 0) throw new GenericError(`O nome '${groupName}' já está sendo utilizado no momento!`, 'GroupError', 403)
}

const handler = async (req, res) => {
  try {
    const { group, pcsta, courseId } = req.body
    if (!pcsta || !courseId) throw new GenericError('missing pcsta or courseId', 'PcstaError', 400)

    await checkIfGroupNameExists(group.groupName)
    const newGroup = await GroupDao.createGroup({ ...group, pcsta })

    await AuthService.updateUser({ email: newGroup.owner, groupId: newGroup._id })
    await checkPcstaAndCreateIfNecessary(pcsta, courseId)

    res.status(201).json({ group: newGroup })
  } catch (error) {
    await GroupDao.deleteGroupById(error.groupId)
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
