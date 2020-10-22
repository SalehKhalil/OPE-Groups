const { Pcsta } = require('../schemas/Pcsta')
const GenericError = require('../../utils/errors/GenericError')

class PcstaDao {
  findByTitle(title) {
    return Pcsta.findOne({ title })
  }

  findByGrouping(grouping) {
    return Pcsta
      .find({ grouping })
      .lean()
  }

  findAll() {
    return Pcsta.find({})
  }

  createPcsta(pcsta) {
    try {
      return Pcsta.create(pcsta)
    } catch (error) {
      throw new GenericError('missing some pcsta information', 'PcstaError', 400)
    }
  }
}

module.exports = new PcstaDao()
