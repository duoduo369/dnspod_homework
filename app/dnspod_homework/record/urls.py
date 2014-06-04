from __future__ import absolute_import
from django.conf.urls import patterns, url 

from record import views

urlpatterns = patterns('',
    url(r'^domains/(?P<domain_id>[0-9]+)/records$', views.RecordListView.as_view()),
    url(r'^domains/(?P<domain_id>[0-9]+)/records/(?P<record_id>[0-9]+)$',
        views.RecordView.as_view()),
)
