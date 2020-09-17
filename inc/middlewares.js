exports.configureResponses = function(req, res, next){
  res.success = function(payload){
    return res.json({
      success: true,
      data: payload
    })
  }
  res.fail = function(http_code = 500, payload){
    return res.status(http_code).json({
      success: false,
      data: payload
    })
  }

  next()
}