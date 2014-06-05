config = require 'common/config'

module.exports = class Model extends Chaplin.Model
  apiRoot: config.apiRoot

  initialize: (options={})=>
    super
    @options = options

  urlRoot: ->

    return "#{@apiRoot}#{@urlPath()}" if @id or not @collection
    return "#{@apiRoot}#{@collection.urlPath()}"

  url: ->
    "#{super}?#{@querystring(@queryParams())}"

  querystring: (params) ->
    params.access_token = localStorage.getItem 'access_token'
    _.map(params, (v, k) -> "#{k}=#{encodeURIComponent v}").join '&'

  queryParams: =>
    @options
