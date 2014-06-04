module.exports = class Controller extends Chaplin.Controller

  beforeAction: (params, route, options) ->
    return location.href = '/!/login' if not localStorage.access_token
