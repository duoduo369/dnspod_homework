Collection = require './base/collection'
Item = require './domain-item'

module.exports = class DomainCollection extends Collection

  urlPath: -> "/domains"

  model: Item
