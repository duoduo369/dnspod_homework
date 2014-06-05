View = require 'common/views/base/view'

module.exports = class RecordItemView extends View
  autoRender: true
  tagName: 'tr'
  className: ''
  template: require './templates/record-item'

  getTemplateData: =>
    attr = _.clone(@model.attributes)
    attr['sub_domain'] = attr['name'] if attr['name']?
    attr['type'] = attr['record_type'] if attr['record_type']?
    attr['line'] = attr['record_line'] if attr['record_line']?
    attr
