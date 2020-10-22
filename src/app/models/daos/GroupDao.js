const { Group } = require('../schemas/Group')
const GenericError = require('../../utils/errors/GenericError')

class GroupDao {
  findGroupById(id) {
    return Group.findOne({ _id: id })
  }

  findGroupByEntranceCode(entranceCode) {
    return Group.findOne({ entranceCode })
  }

  findGroupsByQuery(query, sort = 'groupName', order = 1, limit = 100, page = 0) {
    return Group
      .find(query)
      .sort({ [sort]: order })
      .limit(parseInt(limit))
      .skip(parseInt(page > 0 ? (page * limit) : page))
      .lean()
  }

  createGroup(group) {
    try {
      return Group.create(group)
    } catch (error) {
      throw new GenericError('missing some group information', 'GroupError', 400)
    }
  }

  updateGroupByQuery(query, data) {
    try {
      return Group.findOneAndUpdate(query, data, { new: true })
    } catch (error) {
      throw new GenericError('missing some group information', 'GroupError', 400)
    }
  }

  deleteGroupById(groupId) {
    try {
      return Group.deleteOne({ _id: groupId })
    } catch (error) {
      throw new GenericError(error.message, 'GroupError', 400)
    }
  }
}

module.exports = new GroupDao()
