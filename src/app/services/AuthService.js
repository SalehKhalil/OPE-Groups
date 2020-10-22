const { API_AUTH_URL } = process.env
const axios = require('axios')
const AuthError = require('../utils/errors/AuthError')

class AuthService {
  async updateUser(payload) {
    try {
      const response = await axios.patch(`${API_AUTH_URL}/updateUser`, { data: payload })
      const { data } = response
      return data
    } catch (error) {
      error.groupId = payload.groupId
      throw new AuthError('updateUser error', 'AuthServiceError', payload.groupId, 500)
    }
  }

  async getMembersByGroupId(groupId) {
    try {
      return axios.get(`${API_AUTH_URL}/getMembersByGroupId`, { params: { groupId } })
    } catch (error) {
      throw new AuthError('getMembersByGroupId error', 'AuthServiceError', groupId, 500)
    }
  }
}

module.exports = new AuthService()
