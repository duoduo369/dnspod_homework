View = require 'common/views/base/view'

module.exports = class RecordItemView extends View
  autoRender: true
  noWrap: true
  template: require './templates/record-item'
