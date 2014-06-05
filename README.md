#dnspod_homework

1.  使用 DNSPod API 完成 域名和记录的基本增、删、改、查操作；
2.  域名记录的导入、导出；

要求：
---

1.  有基本的 UI；
2.  使用原生Python或者任意一款 Python 框架进行开发；

技术一览

后端

1. django + django rest 封了一层DNSPod的api，rest化
2. fork了DNSPod-python, 不过这个挺老了，有问题，提了一个pull request没人理

前端

1. backbone + chanplin + bootstarp3
