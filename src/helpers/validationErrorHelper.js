module.exports =  function (error) {
  return error.errors.map(e => {
    return {
      message: e.message,
      type: e.type,
      path: e.path,
      value: e.value,
      origin: e.origin
    }
  })
}


