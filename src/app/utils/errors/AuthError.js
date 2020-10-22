class AuthError extends Error {
  constructor(args, name, groupId, httpStatus = '') {
    super(args)
    this.name = name
    this.errorMessage = args
    this.httpStatus = httpStatus
    this.groupId = groupId
    console.error(this)
  }
}

module.exports = AuthError
