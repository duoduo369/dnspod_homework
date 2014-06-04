DomainCollection = require 'common/models/domain-collection'
Controller = require 'common/controllers/base/controller'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'
IndexView = require 'dnspod/views/home/index-view'
DomainCollectionView = require 'dnspod/views/domain/domain-collection-view'

module.exports = class HomeController extends Controller

  beforeAction: (params, route, options) ->
    super
    @reuse 'home', HomeView
    @reuse 'index', IndexView, region: 'container'
    @reuse 'header', HeaderView, region: 'header'

  index: (params, route, options) ->
    type = 'all'
    if options['query']['type']
      type = options['query']['type']
    @domainCollectionView = new DomainCollectionView
      collection: new DomainCollection
        type: type
      region: 'content'
