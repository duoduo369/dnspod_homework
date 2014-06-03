from __future__ import absolute_import
from django.conf.urls import patterns, url 

from domain import views

urlpatterns = patterns('',
    url(r'^domains$', views.DomainListView.as_view()),
    url(r'^domains/(?P<domain_id>[0-9]+)$', views.DomainView.as_view()),
)
