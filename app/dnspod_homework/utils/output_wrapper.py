# coding: utf-8
'''
    生成 excel 模块
'''

from datetime import datetime

from xlwt import CompoundDoc, Workbook

def get_xls_stream(stream):
    '''
        返回一个binary stream(用于生成excel文件)
    '''

    doc = CompoundDoc.XlsDoc()
    padding = '\x00' * (0x1000 - (len(stream) % 0x1000))
    doc.book_stream_len = len(stream) + len(padding)
    doc._XlsDoc__build_directory()
    doc._XlsDoc__build_sat()
    doc._XlsDoc__build_header()

    return reduce(
        lambda x, y:x+str(y),
        [
            doc.header,
            doc.packed_MSAT_1st,
            stream,
            padding,
            doc.packed_MSAT_2nd,
            doc.packed_SAT,
            doc.dir_stream,
        ]
    )



class XlsWriter(object):
    '''excel'''

    def __init__(self, file_name, sheet_name='sheet'):

        self.file_name = file_name + '.xls'
        self.sheet_name = sheet_name
        self.sheet_cnt = 1
        self.row_cnt = 0
        self.row_limit = 50000
        self.column_limit = 256
        self.cell_maxsize = 60000

        self.xlsfile = Workbook()
        self.table = self.xlsfile.add_sheet(self.sheet_name+str(self.sheet_cnt))

    def close(self):

        self.xlsfile.save(self.file_name)

    def content(self):

        return self.xlsfile

    def stream(self):

        return get_xls_stream(self.xlsfile.get_biff_data())

    def get_attach(self):
        '''获取附件格式'''

        return {
            'content': self.stream(),
            'filename': self.file_name,
            'mimetype': 'application/vnd.ms-excel',
        }

    def write(self, pos, data):
        '''写入 excel'''

        cnt = pos
        for item in data:
            is_type = isinstance(item, (str, unicode))
            if is_type and (len(item) > self.cell_maxsize):
                item = item[:self.cell_maxsize]
            self.table.write(self.row_cnt, cnt, item)
            cnt += 1
            if cnt >= self.column_limit:
                self.row_cnt += 1
                cnt = pos

        self.row_cnt += 1
        if self.row_cnt >= self.row_limit:
            self.row_cnt = 0
            self.sheet_cnt += 1
            self.table = self.xlsfile.add_sheet(
                self.sheet_name+str(self.sheet_cnt)
            )
