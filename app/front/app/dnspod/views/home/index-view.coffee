View = require 'common/views/base/view'

module.exports = class IndexView extends View

  autoRender: true
  noWrap: true
  className: 'row'
  template: require './templates/index'

  regions:
    'content': '#content'
