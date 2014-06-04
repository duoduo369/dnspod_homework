RecordCollection = require 'common/models/record-collection'
Controller = require 'common/controllers/base/controller'
HeaderView = require 'dnspod/views/common/header-view'
HomeView = require 'dnspod/views/home/home-view'
IndexView = require 'dnspod/views/home/index-view'
RecordCollectionView = require 'dnspod/views/record/record-collection-view'

module.exports = class DomainController extends Controller

  beforeAction: (params, route, options) ->
    super
    @reuse 'home', HomeView
    @reuse 'index', IndexView, region: 'container'
    @reuse 'header', HeaderView, region: 'header'

  records: (params, route, options) ->
    domain_id = params['domain_id']
    @recordCollectionView = new RecordCollectionView
      collection: new RecordCollection
        domain_id: domain_id
      region: 'content'
