const GenericError = require('../utils/errors/GenericError')
const AuthService = require('../services/AuthService')

const handler = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) throw new GenericError('missing email', 'GroupError', 400)
    await AuthService.updateUser({ email, groupId: '' })
    res.status(200).json({ message: 'Integrante excluido com sucesso!' })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
