from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'dnspod_homework.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'', include('auth.urls')),
    url(r'', include('domain.urls')),
    url(r'', include('record.urls')),
    url(r'', include('file_in_out.urls')),
)
