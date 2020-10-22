const validParameters = ['pcsta', 'groupName']

const queryBuilder = (params) => {
  const keys = Object.keys(params)
  if (keys.length > 0) {
    const query = {
      $and: []
    }

    keys.forEach(key => {
      if (validParameters.includes(key)) {
        switch (key) {
          case 'pcsta':
            const pcsta = params[key]
            query.$and.push({
              pcsta
            })
            break
          case 'groupName':
            const groupName = params[key]
            query.$and.push({
              groupName: {
                $regex: groupName,
                $options: 'i'
              }
            })
            break
        }
      }
    })

    return query.$and.length >= 1 ? query : {}
  } else {
    return {}
  }
}

module.exports = queryBuilder
