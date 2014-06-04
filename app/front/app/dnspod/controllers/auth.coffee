LoginModel = require 'common/models/login'
Controller = require 'common/controllers/base/controller'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'
LoginView = require 'dnspod/views/auth/login-view'
subscribe = Chaplin.mediator.subscribe

module.exports = class AuthController extends Controller

  beforeAction: (params, route, options) ->
    @reuse 'home', HomeView

  login: (params, route, options) ->
    @loginView = new LoginView
      region: 'container'
    subscribe('authenticate', (data) ->
      loginModel = new LoginModel
      loginModel.save(data).success((res) ->
        localStorage.setItem('user', res)
        access_token = data['email'] + '&&' + data['password']
        localStorage.setItem('access_token', $.base64.btoa(access_token))
        location.href = '/'
      ).error((res)->
        messenger = new Messenger
          extraClasses: 'messenger-fixed messenger-on-left messenger-on-top messenger-theme-flat'
        messenger.post
          type: 'error'
          message: '用户名或密码错误'
          hideAfter: 3
      )
    )
