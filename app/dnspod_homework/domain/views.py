# -*- coding: utf-8 -*-
from __future__ import absolute_import

from dnspod.apicn import (DomainCreate, DomainInfo, DomainList, DomainRemove,
                          DomainStatus)
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_406_NOT_ACCEPTABLE
from rest_framework.views import APIView

from auth.views import get_login_pair, login_required


class DomainListView(APIView):

    @login_required
    def get(self, request):
        '''
            获得domain列表
        '''
        domain_type = request.GET.get('type', 'all')
        offset = request.GET.get('offset', 0)
        length = request.GET.get('length', 100)

        kwargs = get_login_pair(request)
        kwargs['type'] = domain_type
        kwargs['offset'] = offset
        kwargs['length'] = length

        api = DomainList(**kwargs)
        try:
            rep = api().get('domains')
        except Exception as e:
            rep = e.message
            # 没有域名时返回空列表
            if rep['status']['code'] == '9':
                return Response([])
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

    @login_required
    def post(self, request):
        try:
            domain = request.DATA['domain']
        except KeyError as e:
            return Response('need domain', HTTP_400_BAD_REQUEST)
        api = DomainCreate(domain, **get_login_pair(request))
        try:
            rep = api().get('domain')
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

class DomainView(APIView):

    @login_required
    def get(self, request, domain_id):
        api = DomainInfo(domain_id, **get_login_pair(request))
        try:
            rep = api().get('domain')
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

    @login_required
    def put(self, request, domain_id):
        try:
            status = request.DATA['status']
        except KeyError as e:
            return Response('need status {enable, disable}', HTTP_400_BAD_REQUEST)
        kwargs = get_login_pair(request)
        kwargs['domain_id'] = domain_id
        api = DomainStatus(status, **kwargs)
        try:
            rep = api()
            rep = {'status': status}
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

    @login_required
    def delete(self, request, domain_id):
        api = DomainRemove(domain_id, **get_login_pair(request))
        try:
            rep = api()
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)
