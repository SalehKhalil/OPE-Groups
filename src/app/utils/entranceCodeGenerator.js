const generateEntranceCode = () => {
  // Generate a unique number based on time
  return new Date().valueOf()
}

module.exports = {
  generateEntranceCode
}
