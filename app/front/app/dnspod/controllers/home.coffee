DomainCollection = require 'common/models/domain-collection'
Controller = require 'common/controllers/base/controller'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'
IndexView = require 'dnspod/views/home/index-view'
DomainCollectionView = require 'dnspod/views/domain/domain-collection-view'

module.exports = class HomeController extends Controller

  beforeAction: ->
    super
    @reuse 'home', HomeView
    @reuse 'index', IndexView, region: 'container'
    @reuse 'header', HeaderView, region: 'header'

  index: ->
    @domainCollectionView = new DomainCollectionView
      collection: new DomainCollection
      region: 'content'
