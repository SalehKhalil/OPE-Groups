const mongoose = require('mongoose')

// PCSTA = Periodo, Curso, Semestre, Turma e Ano
const PcstaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  courseId: {
    type: Number,
    required: true
  },
  grouping: {
    type: String,
    required: true
  }
})

module.exports = {
  Pcsta: mongoose.model('Pcsta', PcstaSchema)
}
