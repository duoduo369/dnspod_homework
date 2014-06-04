from __future__ import absolute_import
from django.conf.urls import patterns, url

from auth import views

urlpatterns = patterns('',
    url(r'^authenticate$', views.AuthenticateView.as_view()),
    url(r'^logout$', views.LogoutView.as_view()),
)

