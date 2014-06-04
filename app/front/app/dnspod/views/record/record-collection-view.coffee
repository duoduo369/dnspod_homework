CollectionView = require 'common/views/base/collection-view'
ItemView = require './record-item-view'
DomainItem = require 'common/models/record-item'

module.exports = class RecordCollectionView extends CollectionView
  autoRender: true
  template: require './templates/record-collection'
  itemView: ItemView
  listSelector: '.list'
  events:
    'click .add': 'add_dom'
    'submit form': 'add_domain'
    'click .cancel': 'cancel_add'

  initialize: =>
    super
    @collection.fetch()

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

  add_domain: (e)=>
    $cur = $(e.currentTarget)
    data = $cur.serializeObject()
    domain = new DomainItem(data)
    domain.save()
      .success((rep)=>
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

  cancel_add: (e)->
    cur = e.currentTarget
    $(cur).parent().parent().remove()
    return false
