const GroupDao = require('../models/daos/GroupDao')
const GenericError = require('../utils/errors/GenericError')
const AuthService = require('../services/AuthService')

const handler = async (req, res) => {
  try {
    const { entranceCode, email } = req.body
    if (!entranceCode || !email) throw new GenericError('missing request information', 'GroupError', 400)
    const group = await GroupDao.findGroupByEntranceCode(entranceCode)
    if (!group) throw new GenericError('Group does not exist', 'GroupError', 404)
    if (!group.isOpen) throw new GenericError('O grupo está fechado', 'GroupError', 401)
    await AuthService.updateUser({ email, groupId: group._id })
    res.status(200).json({ group })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
