Model         = require './model'
config        = require "common/config"

module.exports = class Collection extends Chaplin.Collection

  apiRoot: config.apiRoot

  # Use the project base model per default, not Chaplin.Model
  model: Model

  initialize: (options={})=>
    super
    @options = options

  url: =>
    "#{@apiRoot}#{@urlPath()}?#{@querystring(@queryParams())}"

  querystring: (params) ->
    params.access_token = localStorage.getItem 'access_token'
    _.map(params, (v, k) -> "#{k}=#{encodeURIComponent v}").join '&'

  queryParams: ->
    {}
