CollectionView = require 'common/views/base/collection-view'
ItemView = require './domain-item-view'
DomainItem = require 'common/models/domain-item'
DownloadDomainModel = require 'common/models/download-domain'

module.exports = class DomainCollectionView extends CollectionView
  autoRender: true
  template: require './templates/domain-collection'
  itemView: ItemView
  listSelector: '.list'
  events:
    'click .add': 'add_dom'
    'submit form': 'add_domain'
    'click .cancel': 'cancel_add'
    'click .delete': 'delete_domain'
    'click .export': 'export_domain'

  initialize: =>
    super
    @collection.fetch
      data: @collection.options

  add_dom: =>
    $('<div>')
      .addClass('row')
      .addClass('entry')
      .html('''
        <form >
          <div class="col-md-3">
            <input class='form-control' name='domain' placeholder='请输入您的域名'/>
          </div>
          <button class='btn btn-primary'>确定</button>
          <button class='btn cancel'>取消</button>
        </form>
      ''')
      .prependTo(@$('.add-form-list'))

  add_domain: (e) =>
    $cur = $(e.currentTarget)
    data = $cur.serializeObject()
    domain = new DomainItem(data)
    domain.save()
      .success((rep) =>
        domain.set('name', data['domain'])
        @collection.unshift(domain)
        $cur.parent().remove()
      )
      .error((rep) ->
        messenger = new Messenger
        messenger.post
          type: 'error'
          message: rep.responseJSON['status']['message']
          hideAfter: 3
    )
    return false

  cancel_add: (e) ->
    $cur = $(e.currentTarget)
    $cur.parent().parent().remove()
    return false

  delete_domain: (e) =>
    $cur = $(e.currentTarget)
    msg = Messenger().post(
      message: "确定删除?",

      actions:
        delete:
          label: "删除",
          action: () =>
            item = @collection.get($cur.attr('data-id'))
            item.destroy()
            msg.hide()

        cancel:
          label: "亲我后悔了",
          action: () ->
            msg.hide()
    )

  export_domain: (e) =>
    download_domain = new DownloadDomainModel(@collection.options)
    url = download_domain.url()
    $.fileDownload(url)

