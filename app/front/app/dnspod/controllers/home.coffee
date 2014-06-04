DomainCollection = require 'common/models/domain-collection'
Controller = require 'common/controllers/base/controller'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'
DomainCollectionView = require 'dnspod/views/domain/domain-collection-view'

module.exports = class HomeController extends Controller

  beforeAction: ->
    @reuse 'home', HomeView
    @reuse 'header', HeaderView, region: 'header'

  index: ->
    @domainCollectionView = new DomainCollectionView
      collection: new DomainCollection
      region: 'content'
