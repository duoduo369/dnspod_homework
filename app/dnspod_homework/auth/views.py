from __future__ import absolute_import
from rest_framework.views import APIView
from dnspod.apicn import UserDetail
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

class AuthenticateView(APIView):

    def post(self, request):
        params = request.DATA
        email = params.get('email', '')
        password = params.get('password', '')
        api = UserDetail(email=email, password=password)
        try:
            rep = api()
        except Exception as e:
            rep = e.message
            return Response(e.message, HTTP_401_UNAUTHORIZED)
        return Response(rep)
