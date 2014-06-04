# -*- coding: utf-8 -*-
from __future__ import absolute_import

from dnspod.apicn import (RecordCreate, RecordInfo, RecordList, RecordModify,
                          RecordRemove)
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_406_NOT_ACCEPTABLE
from rest_framework.views import APIView

from auth.views import get_login_pair, login_required

RECORD_NEED_MAPPER = {
    'sub_domain': u'@',
    'record_type': None,
    'record_line': u'默认',
    'value': None,
    'ttl': u'600'
}

class RecordListView(APIView):

    @login_required
    def get(self, request, domain_id):
        '''
            获得domain列表
        '''
        offset = request.GET.get('offset', 0)
        length = request.GET.get('length', 100)
        sub_domain = request.GET.get('sub_domain', None)

        kwargs = get_login_pair(request)
        kwargs['offset'] = offset
        kwargs['length'] = length
        if sub_domain:
            kwargs['sub_domain'] = sub_domain

        api = RecordList(domain_id, **kwargs)
        try:
            rep = api().get('records')
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

    @login_required
    def post(self, request, domain_id):
        # 必填项
        params = {}
        for attr, default in RECORD_NEED_MAPPER.iteritems():
            params[attr] = request.DATA.get(attr, default)
            if not params[attr]:
                return Response(u'need {args}'.format(args=e.message),
                                HTTP_400_BAD_REQUEST)
        if params['record_type'] == 'MX':
            request.DATA['mx']

        # 添加登录参数
        kwargs = get_login_pair(request)
        kwargs['domain_id'] = domain_id
        need_list = ('sub_domain', 'record_type', 'record_line', 'value', 'ttl')
        args = (params[need] for need in need_list)
        api = RecordCreate(*args, **kwargs)
        try:
            rep = api()
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

class RecordView(APIView):

    @login_required
    def get(self, request, domain_id, record_id):
        kwargs = get_login_pair(request)
        kwargs['domain_id'] = domain_id

        api = RecordInfo(record_id, **kwargs)
        try:
            rep = api().get('record')
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

    @login_required
    def put(self, request, domain_id, record_id):
        # 必填项
        kwargs = {}
        for attr, default in RECORD_NEED_MAPPER.iteritems():
            kwargs[attr] = request.DATA.get(attr, default)
            if not kwargs[attr]:
                return Response(u'need {args}'.format(args=e.message),
                                HTTP_400_BAD_REQUEST)
        if kwargs['record_type'] == 'MX':
            request.DATA['mx']

        # 添加登录参数
        kwargs.update(get_login_pair(request))
        kwargs['domain_id'] = domain_id
        api = RecordModify(record_id, **kwargs)
        try:
            rep = api()
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

    @login_required
    def delete(self, request, domain_id, record_id):
        kwargs = get_login_pair(request)
        kwargs['domain_id'] = domain_id

        api = RecordRemove(record_id, **kwargs)
        try:
            rep = api()
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)
