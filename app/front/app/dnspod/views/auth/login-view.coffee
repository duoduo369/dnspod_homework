View = require 'common/views/base/view'
publish = Chaplin.mediator.publish

module.exports = class LoginView extends View

  autoRender: true
  template: require './templates/login'
  events:
    'submit': 'authenticate'

  authenticate: =>
    data = @$('form').serializeObject()
    publish('authenticate', data)
    return false
