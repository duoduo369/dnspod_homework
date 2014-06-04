Controller = require 'common/controllers/base/controller'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'
LoginView = require 'dnspod/views/auth/login-view'

module.exports = class HomeController extends Controller

  beforeAction: ->
    @reuse 'home', HomeView

  login: ->
    @loginView = new LoginView
      region: 'container'
