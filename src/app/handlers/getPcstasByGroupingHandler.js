const PcstaDao = require('../models/daos/PcstaDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { grouping } = req.query
    if (!grouping) throw new GenericError('missing groupings', 'PcstaError', 400)
    const pcstas = await PcstaDao.findByGrouping(grouping)
    res.status(200).json(pcstas)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
