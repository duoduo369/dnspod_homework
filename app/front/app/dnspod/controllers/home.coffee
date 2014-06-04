Controller = require 'common/controllers/base/controller'
ListView = require 'dnspod/views/home/list-view'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'

module.exports = class HomeController extends Controller

  beforeAction: ->
    @reuse 'home', HomeView
    @reuse 'header', HeaderView, region: 'header'

  index: ->
    new ListView
      region: 'content'
