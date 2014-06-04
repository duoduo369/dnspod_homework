CollectionView = require 'common/views/base/collection-view'
ItemView = require './domain-item-view'

module.exports = class DomainCollectionView extends CollectionView
  autoRender: true
  template: require './templates/domain-collection'
  itemView: ItemView
  listSelector: '.list'

  initialize: =>
    super
    console.log 'abc'
    @collection.fetch
      success: ->
        console.log 'success'
