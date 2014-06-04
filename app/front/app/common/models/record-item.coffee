Model = require 'common/models/base/model'

module.exports = class RecordItem extends Model

  urlPath: => "/domains/#{@options['domain_id']}/records"
