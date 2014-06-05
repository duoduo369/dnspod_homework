View = require 'common/views/base/view'

module.exports = class DomainItemView extends View
  autoRender: true
  noWrap: true
  template: require './templates/domain-item'
  events:
    'click .edit': 'update_domain'

  update_domain: (e) =>
    $cur = $(e.currentTarget)
    item = @model
    item.save({
      'status': $cur.attr('data-next-status')
    })
      .success((rep) =>
        # fixme, bachbone not auto reset
        data = @getTemplateData()
        @$('button.edit')
          .attr('data-next-status', data['next_status'])
          .html(data['button_text'])
      )
      .error( ->
        console.log 'DomainItemView error'
      )

  getTemplateData: =>
    attr = _.clone(@model.attributes)
    attr['domain_enabled'] = attr['status'] == 'enable'
    # button_text 如果enable -> 暂停
    #             如果否则 -> 启用
    attr['next_status'] = if attr['status'] == 'enable' then 'disable' else 'enable'
    attr['button_text'] = if attr['status'] == 'enable' then '暂停' else '启用'
    attr
