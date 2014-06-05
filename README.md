#dnspod_homework

[online demo](http://115.28.11.182:9001/)
---

要求：
---
1.  使用 DNSPod API 完成 域名和记录的基本增、删、改、查操作；
2.  域名记录的导入、导出；
3.  有基本的 UI；
4.  使用原生Python或者任意一款 Python 框架进行开发；

最终完成
---

1. 域名增删改(状态）查(type)
2. 记录增删
  改懒得做了，查貌似没什么查的，就是根据域名显示一个列表
3. 导出做了域名的导出，为excel, 后端也没有做神么特殊的处理,比如字段转化
4. UI部分有偷懒
  记录删的地发默认有两个不能删每加错误提示
  分页没有做
5. 哦，我还没有做退出登录的玩意儿:(

好吧安慰一下,这是个demo

技术一览
---

###后端

1. django + django rest 封了一层DNSPod的api，rest化
2. fork了DNSPod-python, 不过这个挺老了，有问题，提了一个pull request没人理

###前端

1. backbone + chanplin + coffee + bootstarp3
2. brunch + bower

###部署

1. gunicorn
2. nginx
3. supervisor

分支
---

1. master | develop 做本地开发

2. deploy做线上部署, 部署部分的代码与开发分支不太一样，(前端配置ip)
因此主要是cherry-pick develop分支的代码


问题
---
1. 记录还是不记录密码？

    由于DNSPod的api每一个都需要一个邮箱密码，所以应该有一个登录页面，
    将用户的信息存起来，但是后端我又不想用数据库存起来(耍流氓么、、)
    因此把登录信息前端放在localStorage, 并且用base64加密，做成access_token,
    后端每个请求都需要这个access_token(好吧，实际上不应该叫这个名字的),
    base64解开之后在请求dnspod的接口.

2. 数据库？

    本来是不需要的，除了初始化django默认的东西外，其他的不需要自己存，
    选了个sqlite存这些必须的东西(session表等等）。

3. 服务器

    服务器借用朋友的, 由于是个demo，起了一个worker，在服务器改nginx的时候,
    没注意用了服务器默认的git config, 看下deploy分支就懂了，我说为毛出现了
    其他合作者...这不科学
