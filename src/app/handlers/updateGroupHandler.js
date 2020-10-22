const GenericError = require('../utils/errors/GenericError')
const GroupDao = require('../models/daos/GroupDao')

const handler = async (req, res) => {
  try {
    const { group } = req.body
    if (group && group._id) {
      const groupUpdated = await GroupDao.updateGroupByQuery({ _id: group._id }, group)
      res.status(200).json({ groupUpdated })
    } else {
      throw new GenericError('missing _id', 'GroupError', 400)
    }
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
