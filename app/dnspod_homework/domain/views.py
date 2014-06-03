# -*- coding: utf-8 -*-
from __future__ import absolute_import
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_406_NOT_ACCEPTABLE
from dnspod.apicn import DomainList, DomainCreate
from auth.views import login_required, get_login_pair

class DomainListView(APIView):

    @login_required
    def get(self, request):
        '''
            获得domain列表
        '''
        api = DomainList(**get_login_pair(request))
        return Response(api().get('domains'))

    @login_required
    def post(self, request):
        try:
            domain = request.DATA['domain']
        except KeyError as e:
            return Response('need domain', HTTP_400_BAD_REQUEST)
        api = DomainCreate(domain, **get_login_pair(request))
        try:
            rep = api()
        except Exception as e:
            rep = e.message
            return Response(rep, HTTP_406_NOT_ACCEPTABLE)
        return Response(rep)

class DomainView(APIView):

    def get(self, request, ):
        ''
