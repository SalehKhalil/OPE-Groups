const GenericError = require('../utils/errors/GenericError')
const GroupDao = require('../models/daos/GroupDao')
const { generateEntranceCode } = require('../utils/entranceCodeGenerator')

const handler = async (req, res) => {
  try {
    const { groupId } = req.query
    if (!groupId) throw new GenericError('missing groupId', 'GroupError', 400)
    const groupUpdated = await GroupDao.updateGroupByQuery({ _id: groupId }, { entranceCode: generateEntranceCode() })
    res.status(200).json({ groupUpdated })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
