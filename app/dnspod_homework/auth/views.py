# -*- coding: utf-8 -*-
from __future__ import absolute_import
from rest_framework.views import APIView
from dnspod.apicn import UserDetail
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from functools import wraps
import base64

def login_required(func):
    '''
        need登录装饰器

        如果之前没有登录，则返回401

        TODO:
            use db, use django auth
    '''
    @wraps(func)
    def __wrapper(*args, **kwargs):
        request = args[1]
        if not request.DATA.get('access_token', None) and \
            not request.GET.get('access_token', None):
            return Response('need login', HTTP_401_UNAUTHORIZED)
        return func(*args, **kwargs)
    return __wrapper

def get_login_pair(request):
    '''
        返回登录属性组, 需要之前已经登录
        不使用数据库，因此用base64加密了密码

        {
            email: 'XXX',
            password: 'XXX',
        }
    '''
    access_token = request.DATA.get('access_token', None) or \
             request.GET.get('access_token', None)
    email, password = base64.decodestring(access_token).split('&&')
    return dict(email=email, password=password)

class LogoutView(APIView):

    def get(self, request):
        login_pair_key = ('email', 'password')
        for key in login_pair_key:
            if key in request.session:
                del request.session[key]
        return Response('logout success')


class AuthenticateView(APIView):

    def post(self, request):
        '''
            验证登录

            require
                email -- 邮箱
                password -- 密码
        '''
        params = request.DATA
        email = params.get('email', '')
        password = params.get('password', '')
        api = UserDetail(email=email, password=password)
        try:
            rep = api()['info']['user']
            request.session['email'] = email
            request.session['password'] = password
        except Exception as e:
            rep = e.message
            return Response(e.message, HTTP_401_UNAUTHORIZED)
        return Response(rep)
