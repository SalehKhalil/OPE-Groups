const PcstaDao = require('../models/daos/PcstaDao')

const handler = async (req, res) => {
  try {
    const pcstas = await PcstaDao.findAll()
    res.status(200).json({ pcstas })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
