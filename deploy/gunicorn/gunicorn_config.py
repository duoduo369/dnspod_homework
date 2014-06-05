# -*- coding: utf-8 -*-
import multiprocessing
BASE_PATH = '/opt/dnspod_homework'
bind = "0:9100"
# workers = multiprocessing.cpu_count()
# demo项目 1个worker
workers = 1

max_requests = 5000

user = 'deployer'
group = 'sudo'

accesslog = BASE_PATH + '/deploy/gunicorn/log/gunicorn_access.log'
errorlog = BASE_PATH + '/deploy/gunicorn/log/gunicorn_error.log'
chdir = BASE_PATH + '/app/dnspod_homework'
print 'accesslog:', accesslog
print 'errorlog:', errorlog
print 'chdir:', chdir
