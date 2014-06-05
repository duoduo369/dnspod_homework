from __future__ import absolute_import
from django.conf.urls import patterns, url

from file_in_out import views

urlpatterns = patterns('',
    url(r'^download/domains$', views.OutDomainListView.as_view()),
)
