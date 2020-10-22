const GroupDao = require('../models/daos/GroupDao')
const queryBuilder = require('../utils/getGroupsQueryBuilder')

const handler = async (req, res) => {
  try {
    const params = req.query
    const query = await queryBuilder(params)
    const groups = await GroupDao
      .findGroupsByQuery(query, params.sort, params.order, params.limit, params.page)
    res.status(200).json({ groups })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
