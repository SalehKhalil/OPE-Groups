const GenericError = require('../utils/errors/GenericError')
const AuthService = require('../services/AuthService')
const GroupDao = require('../models/daos/GroupDao')

const handler = async (req, res) => {
  try {
    const { email, groupId } = req.body
    if (!email || !groupId) throw new GenericError('missing email or groupId', 'GroupError', 400)
    const { data: { members } } = await AuthService.getMembersByGroupId(groupId)
    const user = await AuthService.updateUser({ email, groupId: null })
    if (members.length <= 1) await GroupDao.deleteGroupById(groupId)
    else {
      const otherMembers = members.filter(member => member.email !== user.email)
      const newOwnerEmail = otherMembers[0].email
      await GroupDao.updateGroupByQuery({ _id: groupId }, { owner: newOwnerEmail })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error(error + '')
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
