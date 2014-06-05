# -*- coding: utf-8 -*-
from __future__ import absolute_import

from django.http import HttpResponse

from auth.views import login_required
from domain.views import DomainListView
from utils.make_excel import make_excel


class OutDomainListView(DomainListView):

    @login_required
    def get(self, request):
        rep = super(OutDomainListView, self).get(request)

        def gen_row(data, header):
            for each in data:
                row = [each[key] for key in header]
                yield row

        header = rep.data[0].keys()
        excel = make_excel(header=header, rows=gen_row(rep.data, header))
        attach = excel.get_attach()
        response = HttpResponse(mimetype='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename={filename}'.format(
            filename=attach['filename'],
        )
        excel.content().save(response)
        return response
