Model = require 'common/models/base/model'

module.exports = class LoginModel extends Model

  urlPath: -> "/authenticate"
