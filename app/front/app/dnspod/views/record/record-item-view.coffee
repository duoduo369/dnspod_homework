View = require 'common/views/base/view'

module.exports = class RecordItemView extends View
  autoRender: true
  tagName: 'tr'
  className: ''
  template: require './templates/record-item'
