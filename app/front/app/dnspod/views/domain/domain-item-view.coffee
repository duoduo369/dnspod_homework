View = require 'common/views/base/view'

module.exports = class DomainItemView extends View
  autoRender: true
  noWrap: true
  template: require './templates/domain-item'
