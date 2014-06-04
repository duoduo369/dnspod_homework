Collection = require './base/collection'
Item = require './record-item'

module.exports = class RecordCollection extends Collection

  urlPath: => "/domains/#{@options['domain_id']}/records"

  model: Item
