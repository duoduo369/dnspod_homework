config = require 'common/config'

module.exports = class Model extends Chaplin.Model
  apiRoot: config.apiRoot

  urlRoot: ->
    return "#{@apiRoot}#{@urlPath()}" if @id or not @collection
    return "#{@apiRoot}#{@collection.urlPath()}"

  initialize: (options={})=>
    super
    @options = options

  querystring: (params) ->
    params.access_token = localStorage.getItem 'access_token'
    _.map(params, (v, k) -> "#{k}=#{encodeURIComponent v}").join '&'

  queryParams: ->
    {}
