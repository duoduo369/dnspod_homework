# -*- coding: utf-8 -*-
from __future__ import absolute_import
from utils.output_wrapper import XlsWriter

def make_excel(file_name='download', sheet_name=u'1', header=None, rows=None):
    excel = XlsWriter(file_name, sheet_name)
    if header:
        assert isinstance(header, (list,tuple))
        excel.write(0, header)
    for row in rows:
        assert isinstance(row, (list,tuple))
        excel.write(0, row)
    return excel
