const GroupDao = require('../models/daos/GroupDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { groupId } = req.query
    if (!groupId) throw new GenericError('missing groupId', 'GroupError', 400)
    const group = await GroupDao.findGroupById(groupId)
    res.status(200).json({ group })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
