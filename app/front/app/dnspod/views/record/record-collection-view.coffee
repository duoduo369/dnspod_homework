CollectionView = require 'common/views/base/collection-view'
ItemView = require './record-item-view'
RecordItem = require 'common/models/record-item'

module.exports = class RecordCollectionView extends CollectionView
  autoRender: true
  template: require './templates/record-collection'
  itemView: ItemView
  listSelector: '.list'
  events:
    'click .add': 'add_dom'
    'submit form': 'add_record'
    'click .cancel': 'cancel_add'

  initialize: =>
    super
    @collection.fetch()

  add_dom: =>
    $('<form class="form">')
      .addClass('entry')
      .html('''
        <div class='row'>
          <div class='col-md-2'>
            <select class="form-control" name='name'>
              <option value='www'>www</option>
              <option value='@'>@</option>
              <option value='*'>*</option>
            </select>
          </div>
          <div class='col-md-2'>
            <select class="form-control" name='record_type'>
              <option value='A'>A</option>
              <option value='CNAME'>CNAME</option>
              <option value='MX'>MX</option>
              <option value='TXT'>TXT</option>
              <option value='NS'>NS</option>
              <option value='AAAA'>AAAA</option>
              <option value='SRV'>SRV</option>
              <option value='URL'>URL</option>
            </select>
          </div>
          <div class='col-md-2'>
            <select class="form-control" name='line'>
              <option value='默认'>默认</option>
              <option value='电信'>电信</option>
              <option value='联通'>联通</option>
              <option value='教育网'>教育网</option>
              <option value='百度'>百度</option>
              <option value='搜索引擎'>搜索引擎</option>
            </select>
          </div>
          <div class='col-md-2'>
            <input class='form-control' name='value' placeholder='记录值'/>
          </div>
          <div class='col-md-1'>
            <input class='form-control' name='mx' placeholder='MX优先级' value='1'/>
          </div>
          <div class='col-md-1'>
            <input class='form-control' name='ttl' placeholder='TTL' value='600'/>
          </div>
          <div class='col-md-2'>
            <button type='submit' class='btn btn-sm btn-primary'>确定</button>
            <button class='btn btn-sm cancel'>取消</button>
          </div>
        </div>
      ''')
      .prependTo(@$('.add-form-list'))

  add_record: (e)=>
    $cur = $(e.currentTarget)
    data = $cur.serializeObject()
    data['domain_id'] = @collection.options['domain_id']
    item = new RecordItem(data)
    console.log item
    item.save()
      .success((rep)=>
        @collection.unshift(item)
        $cur.parent().remove()
        console.log 'su'
      )
      .error((rep) ->
        console.log 'error'
        if rep.responseJSON['status']?
          message = rep.responseJSON['status']['message']
        else
          message = rep.responseJSON
        messenger = new Messenger
        messenger.post
          type: 'error'
          message: message
          hideAfter: 3
    )
    return false

  cancel_add: (e)->
    cur = e.currentTarget
    $(cur).parent().parent().remove()
    return false
