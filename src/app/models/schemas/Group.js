const mongoose = require('mongoose')
const { generateEntranceCode } = require('../../utils/entranceCodeGenerator')

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true
  },
  entranceCode: {
    type: String,
    required: true,
    default: generateEntranceCode()
  },
  owner: {
    type: String,
    required: true
  },
  pcsta: {
    type: String,
    required: true
  }
})

module.exports = {
  Group: mongoose.model('Group', GroupSchema)
}
