(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("common/application", function(exports, require, module) {
var Application, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Application;

})(Chaplin.Application);
});

;require.register("common/config", function(exports, require, module) {
module.exports = {
  pushState: false,
  controllerSuffix: '',
  apiRoot: 'http://127.0.0.1:8000'
};
});

;require.register("common/controllers/base/controller", function(exports, require, module) {
var Controller, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    _ref = Controller.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Controller.prototype.beforeAction = function(params, route, options) {
    if (!localStorage.access_token) {
      return location.href = '/!/login';
    }
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("common/mediator", function(exports, require, module) {

});

;require.register("common/mock", function(exports, require, module) {

});

;require.register("common/models/base/collection", function(exports, require, module) {
var Collection, Model, config, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./model');

config = require("common/config");

module.exports = Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    this.url = __bind(this.url, this);
    this.initialize = __bind(this.initialize, this);
    _ref = Collection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Collection.prototype.apiRoot = config.apiRoot;

  Collection.prototype.model = Model;

  Collection.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    Collection.__super__.initialize.apply(this, arguments);
    return this.options = options;
  };

  Collection.prototype.url = function() {
    return "" + this.apiRoot + (this.urlPath()) + "?" + (this.querystring(this.queryParams()));
  };

  Collection.prototype.querystring = function(params) {
    params.access_token = localStorage.getItem('access_token');
    return _.map(params, function(v, k) {
      return "" + k + "=" + (encodeURIComponent(v));
    }).join('&');
  };

  Collection.prototype.queryParams = function() {
    return {};
  };

  return Collection;

})(Chaplin.Collection);
});

;require.register("common/models/base/model", function(exports, require, module) {
var Model, config, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

config = require('common/config');

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    this.queryParams = __bind(this.queryParams, this);
    this.initialize = __bind(this.initialize, this);
    _ref = Model.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Model.prototype.apiRoot = config.apiRoot;

  Model.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    Model.__super__.initialize.apply(this, arguments);
    return this.options = options;
  };

  Model.prototype.urlRoot = function() {
    if (this.id || !this.collection) {
      return "" + this.apiRoot + (this.urlPath());
    }
    return "" + this.apiRoot + (this.collection.urlPath());
  };

  Model.prototype.url = function() {
    return "" + Model.__super__.url.apply(this, arguments) + "?" + (this.querystring(this.queryParams()));
  };

  Model.prototype.querystring = function(params) {
    params.access_token = localStorage.getItem('access_token');
    return _.map(params, function(v, k) {
      return "" + k + "=" + (encodeURIComponent(v));
    }).join('&');
  };

  Model.prototype.queryParams = function() {
    return this.options;
  };

  return Model;

})(Chaplin.Model);
});

;require.register("common/models/domain-collection", function(exports, require, module) {
var Collection, DomainCollection, Item, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Item = require('./domain-item');

module.exports = DomainCollection = (function(_super) {
  __extends(DomainCollection, _super);

  function DomainCollection() {
    _ref = DomainCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DomainCollection.prototype.urlPath = function() {
    return "/domains";
  };

  DomainCollection.prototype.model = Item;

  return DomainCollection;

})(Collection);
});

;require.register("common/models/domain-item", function(exports, require, module) {
var DomainItem, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('common/models/base/model');

module.exports = DomainItem = (function(_super) {
  __extends(DomainItem, _super);

  function DomainItem() {
    _ref = DomainItem.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DomainItem.prototype.urlPath = function() {
    return "/domains";
  };

  return DomainItem;

})(Model);
});

;require.register("common/models/download-domain", function(exports, require, module) {
var DownLoadModel, Model, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('common/models/base/model');

module.exports = DownLoadModel = (function(_super) {
  __extends(DownLoadModel, _super);

  function DownLoadModel() {
    this.urlPath = __bind(this.urlPath, this);
    _ref = DownLoadModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DownLoadModel.prototype.urlPath = function() {
    return "/download/domains";
  };

  return DownLoadModel;

})(Model);
});

;require.register("common/models/login", function(exports, require, module) {
var LoginModel, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('common/models/base/model');

module.exports = LoginModel = (function(_super) {
  __extends(LoginModel, _super);

  function LoginModel() {
    _ref = LoginModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LoginModel.prototype.urlPath = function() {
    return "/authenticate";
  };

  return LoginModel;

})(Model);
});

;require.register("common/models/record-collection", function(exports, require, module) {
var Collection, Item, RecordCollection, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('./base/collection');

Item = require('./record-item');

module.exports = RecordCollection = (function(_super) {
  __extends(RecordCollection, _super);

  function RecordCollection() {
    this.urlPath = __bind(this.urlPath, this);
    _ref = RecordCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  RecordCollection.prototype.urlPath = function() {
    return "/domains/" + this.options['domain_id'] + "/records";
  };

  RecordCollection.prototype.model = Item;

  return RecordCollection;

})(Collection);
});

;require.register("common/models/record-item", function(exports, require, module) {
var Model, RecordItem, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('common/models/base/model');

module.exports = RecordItem = (function(_super) {
  __extends(RecordItem, _super);

  function RecordItem() {
    this.urlPath = __bind(this.urlPath, this);
    _ref = RecordItem.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  RecordItem.prototype.urlPath = function() {
    return "/domains/" + this.options['domain_id'] + "/records";
  };

  return RecordItem;

})(Model);
});

;require.register("common/views/base/collection-view", function(exports, require, module) {
var CollectionView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView() {
    _ref = CollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollectionView.prototype.listen = {
    'addedToDOM': 'addedToDOM'
  };

  CollectionView.prototype.addedToDOM = function() {};

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("common/views/base/view", function(exports, require, module) {
var View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.listen = {
    'addedToDOM': 'addedToDOM'
  };

  View.prototype.addedToDOM = function() {};

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);
});

;require.register("dnspod/controllers/auth", function(exports, require, module) {
var AuthController, Controller, HeaderView, HomeView, LoginModel, LoginView, subscribe, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

LoginModel = require('common/models/login');

Controller = require('common/controllers/base/controller');

HeaderView = require('dnspod/views/common/header-view');

HomeView = require('dnspod/views/home/home-view');

LoginView = require('dnspod/views/auth/login-view');

subscribe = Chaplin.mediator.subscribe;

module.exports = AuthController = (function(_super) {
  __extends(AuthController, _super);

  function AuthController() {
    _ref = AuthController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AuthController.prototype.beforeAction = function(params, route, options) {
    return this.reuse('home', HomeView);
  };

  AuthController.prototype.login = function(params, route, options) {
    this.loginView = new LoginView({
      region: 'container'
    });
    return subscribe('authenticate', function(data) {
      var loginModel;
      loginModel = new LoginModel;
      return loginModel.save(data).success(function(res) {
        var access_token;
        localStorage.setItem('user', res);
        access_token = data['email'] + '&&' + data['password'];
        localStorage.setItem('access_token', $.base64.btoa(access_token));
        return location.href = '/';
      }).error(function(res) {
        var messenger;
        messenger = new Messenger({
          extraClasses: 'messenger-fixed messenger-on-left messenger-on-top messenger-theme-flat'
        });
        return messenger.post({
          type: 'error',
          message: '用户名或密码错误',
          hideAfter: 3
        });
      });
    });
  };

  return AuthController;

})(Controller);
});

;require.register("dnspod/controllers/domain", function(exports, require, module) {
var Controller, DomainController, HeaderView, HomeView, IndexView, RecordCollection, RecordCollectionView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RecordCollection = require('common/models/record-collection');

Controller = require('common/controllers/base/controller');

HeaderView = require('dnspod/views/common/header-view');

HomeView = require('dnspod/views/home/home-view');

IndexView = require('dnspod/views/home/index-view');

RecordCollectionView = require('dnspod/views/record/record-collection-view');

module.exports = DomainController = (function(_super) {
  __extends(DomainController, _super);

  function DomainController() {
    _ref = DomainController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DomainController.prototype.beforeAction = function(params, route, options) {
    DomainController.__super__.beforeAction.apply(this, arguments);
    this.reuse('home', HomeView);
    this.reuse('index', IndexView, {
      region: 'container'
    });
    return this.reuse('header', HeaderView, {
      region: 'header'
    });
  };

  DomainController.prototype.records = function(params, route, options) {
    var domain_id;
    domain_id = params['domain_id'];
    return this.recordCollectionView = new RecordCollectionView({
      collection: new RecordCollection({
        domain_id: domain_id
      }),
      region: 'content'
    });
  };

  return DomainController;

})(Controller);
});

;require.register("dnspod/controllers/home", function(exports, require, module) {
var Controller, DomainCollection, DomainCollectionView, HeaderView, HomeController, HomeView, IndexView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DomainCollection = require('common/models/domain-collection');

Controller = require('common/controllers/base/controller');

HeaderView = require('dnspod/views/common/header-view');

HomeView = require('dnspod/views/home/home-view');

IndexView = require('dnspod/views/home/index-view');

DomainCollectionView = require('dnspod/views/domain/domain-collection-view');

module.exports = HomeController = (function(_super) {
  __extends(HomeController, _super);

  function HomeController() {
    _ref = HomeController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeController.prototype.beforeAction = function(params, route, options) {
    HomeController.__super__.beforeAction.apply(this, arguments);
    this.reuse('home', HomeView);
    this.reuse('index', IndexView, {
      region: 'container'
    });
    return this.reuse('header', HeaderView, {
      region: 'header'
    });
  };

  HomeController.prototype.index = function(params, route, options) {
    var type;
    type = 'all';
    if (options['query']['type']) {
      type = options['query']['type'];
    }
    return this.domainCollectionView = new DomainCollectionView({
      collection: new DomainCollection({
        type: type
      }),
      region: 'content'
    });
  };

  return HomeController;

})(Controller);
});

;require.register("dnspod/initialize", function(exports, require, module) {
var Application, config, routes;

Application = require('common/application');

config = require('common/config');

routes = require('./routes');

$(function() {
  return new Application({
    routes: routes,
    controllerSuffix: config.controllerSuffix,
    controllerPath: 'dnspod/controllers/'
  });
});
});

;require.register("dnspod/routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'home#index');
  match('!/domains', 'home#index');
  match('!/login', 'auth#login');
  return match('!/domains/:domain_id/records', 'domain#records');
};
});

;require.register("dnspod/views/auth/login-view", function(exports, require, module) {
var LoginView, View, publish, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('common/views/base/view');

publish = Chaplin.mediator.publish;

module.exports = LoginView = (function(_super) {
  __extends(LoginView, _super);

  function LoginView() {
    this.authenticate = __bind(this.authenticate, this);
    _ref = LoginView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LoginView.prototype.autoRender = true;

  LoginView.prototype.template = require('./templates/login');

  LoginView.prototype.events = {
    'submit': 'authenticate'
  };

  LoginView.prototype.authenticate = function() {
    var data;
    data = this.$('form').serializeObject();
    publish('authenticate', data);
    return false;
  };

  return LoginView;

})(View);
});

;require.register("dnspod/views/auth/templates/login", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id='loginModal' class='modal show' role='dialog' aria-hidden='true'>\n  <div class='modal-dialog'>\n    <div class='modal-content'>\n      <div class='modal-header'>\n          <h1 class='text-center'>登录</h1>\n      </div>\n      <div class='modal-body'>\n        <form class='form col-md-12 center-block'>\n          <div class='form-group'>\n            <input type='text' name='email'\n                   class='form-control input-lg' placeholder='邮箱'>\n          </div>\n          <div class='form-group'>\n            <input type='password' name='password'\n                   class='form-control input-lg' placeholder='密码'>\n          </div>\n          <div class='form-group'>\n            <button class='btn btn-primary btn-lg btn-block'>登录</button>\n            <span class='pull-right'>\n              <a href='https://www.dnspod.cn/SignUp' target='_blank'>注册</a>\n            </span>\n            <span> 还没有DNSPod的帐号?</span>\n          </div>\n        </form>\n      </div>\n      <div class='modal-footer'> </div>\n    </div>\n  </div>\n</div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/common/header-view", function(exports, require, module) {
var HeaderView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('common/views/base/view');

module.exports = HeaderView = (function(_super) {
  __extends(HeaderView, _super);

  function HeaderView() {
    _ref = HeaderView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.container = 'body';

  HeaderView.prototype.template = require('./templates/header');

  HeaderView.prototype.initialize = function() {
    return HeaderView.__super__.initialize.apply(this, arguments);
  };

  return HeaderView;

})(View);
});

;require.register("dnspod/views/common/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='navbar navbar-inverse container'>\n  <div class='navbar-header'>\n    <a class='navbar-brand' href=\"/\">DNSPod HomeWork</a>\n  </div>\n</div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/domain/domain-collection-view", function(exports, require, module) {
var CollectionView, DomainCollectionView, DomainItem, DownloadDomainModel, ItemView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('common/views/base/collection-view');

ItemView = require('./domain-item-view');

DomainItem = require('common/models/domain-item');

DownloadDomainModel = require('common/models/download-domain');

module.exports = DomainCollectionView = (function(_super) {
  __extends(DomainCollectionView, _super);

  function DomainCollectionView() {
    this.export_domain = __bind(this.export_domain, this);
    this.delete_domain = __bind(this.delete_domain, this);
    this.add_domain = __bind(this.add_domain, this);
    this.add_dom = __bind(this.add_dom, this);
    this.initialize = __bind(this.initialize, this);
    _ref = DomainCollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DomainCollectionView.prototype.autoRender = true;

  DomainCollectionView.prototype.template = require('./templates/domain-collection');

  DomainCollectionView.prototype.itemView = ItemView;

  DomainCollectionView.prototype.listSelector = '.list';

  DomainCollectionView.prototype.events = {
    'click .add': 'add_dom',
    'submit form': 'add_domain',
    'click .cancel': 'cancel_add',
    'click .delete': 'delete_domain',
    'click .export': 'export_domain'
  };

  DomainCollectionView.prototype.initialize = function() {
    DomainCollectionView.__super__.initialize.apply(this, arguments);
    return this.collection.fetch({
      data: this.collection.options
    });
  };

  DomainCollectionView.prototype.add_dom = function() {
    return $('<div>').addClass('row').addClass('entry').html('<form >\n  <div class="col-md-3">\n    <input class=\'form-control\' name=\'domain\' placeholder=\'请输入您的域名\'/>\n  </div>\n  <button class=\'btn btn-primary\'>确定</button>\n  <button class=\'btn cancel\'>取消</button>\n</form>').prependTo(this.$('.add-form-list'));
  };

  DomainCollectionView.prototype.add_domain = function(e) {
    var $cur, data, domain,
      _this = this;
    $cur = $(e.currentTarget);
    data = $cur.serializeObject();
    domain = new DomainItem(data);
    domain.save().success(function(rep) {
      domain.set('name', data['domain']);
      _this.collection.unshift(domain);
      return $cur.parent().remove();
    }).error(function(rep) {
      var messenger;
      messenger = new Messenger;
      return messenger.post({
        type: 'error',
        message: rep.responseJSON['status']['message'],
        hideAfter: 3
      });
    });
    return false;
  };

  DomainCollectionView.prototype.cancel_add = function(e) {
    var $cur;
    $cur = $(e.currentTarget);
    $cur.parent().parent().remove();
    return false;
  };

  DomainCollectionView.prototype.delete_domain = function(e) {
    var $cur, msg,
      _this = this;
    $cur = $(e.currentTarget);
    return msg = Messenger().post({
      message: "确定删除?",
      actions: {
        "delete": {
          label: "删除",
          action: function() {
            var item;
            item = _this.collection.get($cur.attr('data-id'));
            item.destroy();
            return msg.hide();
          }
        },
        cancel: {
          label: "亲我后悔了",
          action: function() {
            return msg.hide();
          }
        }
      }
    });
  };

  DomainCollectionView.prototype.export_domain = function(e) {
    var download_domain, url;
    download_domain = new DownloadDomainModel(this.collection.options);
    url = download_domain.url();
    return $.fileDownload(url);
  };

  return DomainCollectionView;

})(CollectionView);
});

;require.register("dnspod/views/domain/domain-item-view", function(exports, require, module) {
var DomainItemView, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('common/views/base/view');

module.exports = DomainItemView = (function(_super) {
  __extends(DomainItemView, _super);

  function DomainItemView() {
    this.getTemplateData = __bind(this.getTemplateData, this);
    this.update_domain = __bind(this.update_domain, this);
    _ref = DomainItemView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DomainItemView.prototype.autoRender = true;

  DomainItemView.prototype.noWrap = true;

  DomainItemView.prototype.template = require('./templates/domain-item');

  DomainItemView.prototype.events = {
    'click .edit': 'update_domain'
  };

  DomainItemView.prototype.update_domain = function(e) {
    var $cur, item,
      _this = this;
    $cur = $(e.currentTarget);
    item = this.model;
    return item.save({
      'status': $cur.attr('data-next-status')
    }).success(function(rep) {
      var data;
      data = _this.getTemplateData();
      return _this.$('button.edit').attr('data-next-status', data['next_status']).html(data['button_text']);
    }).error(function() {
      return console.log('DomainItemView error');
    });
  };

  DomainItemView.prototype.getTemplateData = function() {
    var attr;
    attr = _.clone(this.model.attributes);
    attr['domain_enabled'] = attr['status'] === 'enable';
    attr['next_status'] = attr['status'] === 'enable' ? 'disable' : 'enable';
    attr['button_text'] = attr['status'] === 'enable' ? '暂停' : '启用';
    return attr;
  };

  return DomainItemView;

})(View);
});

;require.register("dnspod/views/domain/templates/domain-collection", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n  <div class=\"btn-group\">\n    <button class=\"btn btn-success add\">添加域名</button>\n  </div>\n  <div class=\"btn-group\">\n    <button class=\"btn btn-info export\">导出域名</button>\n  </div>\n</div>\n<div class=\"add-form-list\"></div>\n<div class=\"list\"></div>\n\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/domain/templates/domain-item", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row entry\">\n  <span><a href='/!/domains/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/records'>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></span>\n  <span><button class='edit btn btn-warning' data-id=";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " data-next-status=";
  if (helper = helpers.next_status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.next_status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">";
  if (helper = helpers.button_text) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.button_text); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</button></span>\n  <span><button class='delete btn btn-danger' data-id=";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ">删除</button></span>\n</div>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/home/home-view", function(exports, require, module) {
var HomeView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('common/views/base/view');

module.exports = HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    _ref = HomeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeView.prototype.autoRender = true;

  HomeView.prototype.container = 'body';

  HomeView.prototype.className = 'container';

  HomeView.prototype.template = require('./templates/home');

  HomeView.prototype.regions = {
    'header': 'header',
    'container': '#container',
    'footer': 'footer'
  };

  return HomeView;

})(View);
});

;require.register("dnspod/views/home/index-view", function(exports, require, module) {
var IndexView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('common/views/base/view');

module.exports = IndexView = (function(_super) {
  __extends(IndexView, _super);

  function IndexView() {
    _ref = IndexView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  IndexView.prototype.autoRender = true;

  IndexView.prototype.noWrap = true;

  IndexView.prototype.className = 'row';

  IndexView.prototype.template = require('./templates/index');

  IndexView.prototype.regions = {
    'content': '#content'
  };

  return IndexView;

})(View);
});

;require.register("dnspod/views/home/templates/home", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header></header>\n<div id=\"container\"></div>\n<footer></footer>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/home/templates/index", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\n  <aside class=\"col-md-3\">\n    <nav >\n      <ul class=\"nav nav-pills nav-stacked\">\n        <li><a href=\"/!/domains?type=all\" >全部域名</a></li>\n        <li><a href=\"/!/domains?type=recent\" >最近域名</a></li>\n        <li><a href=\"/!/domains?type=pause\" >暂停域名</a></li>\n      </ul>\n    </nav>\n  </aside>\n  <section class=\"col-md-9\" id=\"content\"></section>\n</div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/record/record-collection-view", function(exports, require, module) {
var CollectionView, ItemView, RecordCollectionView, RecordItem, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('common/views/base/collection-view');

ItemView = require('./record-item-view');

RecordItem = require('common/models/record-item');

module.exports = RecordCollectionView = (function(_super) {
  __extends(RecordCollectionView, _super);

  function RecordCollectionView() {
    this.delete_record = __bind(this.delete_record, this);
    this.add_record = __bind(this.add_record, this);
    this.add_dom = __bind(this.add_dom, this);
    this.initialize = __bind(this.initialize, this);
    _ref = RecordCollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  RecordCollectionView.prototype.autoRender = true;

  RecordCollectionView.prototype.template = require('./templates/record-collection');

  RecordCollectionView.prototype.itemView = ItemView;

  RecordCollectionView.prototype.listSelector = '.list';

  RecordCollectionView.prototype.events = {
    'click .add': 'add_dom',
    'submit form': 'add_record',
    'click .cancel': 'cancel_add',
    'click .delete': 'delete_record'
  };

  RecordCollectionView.prototype.initialize = function() {
    RecordCollectionView.__super__.initialize.apply(this, arguments);
    return this.collection.fetch();
  };

  RecordCollectionView.prototype.add_dom = function() {
    return $('<form class="form">').addClass('entry').html('<div class=\'row\'>\n  <div class=\'col-md-2\'>\n    <select class="form-control" name=\'sub_domain\'>\n      <option value=\'www\'>www</option>\n      <option value=\'@\'>@</option>\n      <option value=\'*\'>*</option>\n    </select>\n  </div>\n  <div class=\'col-md-2\'>\n    <select class="form-control" name=\'record_type\'>\n      <option value=\'A\'>A</option>\n      <option value=\'CNAME\'>CNAME</option>\n      <option value=\'MX\'>MX</option>\n      <option value=\'TXT\'>TXT</option>\n      <option value=\'NS\'>NS</option>\n      <option value=\'AAAA\'>AAAA</option>\n      <option value=\'SRV\'>SRV</option>\n      <option value=\'URL\'>URL</option>\n    </select>\n  </div>\n  <div class=\'col-md-2\'>\n    <select class="form-control" name=\'line\'>\n      <option value=\'默认\'>默认</option>\n      <option value=\'电信\'>电信</option>\n      <option value=\'联通\'>联通</option>\n      <option value=\'教育网\'>教育网</option>\n      <option value=\'百度\'>百度</option>\n      <option value=\'搜索引擎\'>搜索引擎</option>\n    </select>\n  </div>\n  <div class=\'col-md-2\'>\n    <input class=\'form-control\' name=\'value\' placeholder=\'记录值\'/>\n  </div>\n  <div class=\'col-md-1\'>\n    <input class=\'form-control\' name=\'mx\' placeholder=\'MX优先级\' value=\'1\'/>\n  </div>\n  <div class=\'col-md-1\'>\n    <input class=\'form-control\' name=\'ttl\' placeholder=\'TTL\' value=\'600\'/>\n  </div>\n  <div class=\'col-md-2\'>\n    <button type=\'submit\' class=\'btn btn-sm btn-primary\'>确定</button>\n    <button class=\'btn btn-sm cancel\'>取消</button>\n  </div>\n</div>').prependTo(this.$('.add-form-list'));
  };

  RecordCollectionView.prototype.add_record = function(e) {
    var $cur, data, item,
      _this = this;
    $cur = $(e.currentTarget);
    data = $cur.serializeObject();
    data['domain_id'] = this.collection.options['domain_id'];
    item = new RecordItem(data);
    item.save().success(function(rep) {
      _this.collection.unshift(item);
      return $cur.parent().remove();
    }).error(function(rep) {
      var message, messenger;
      if (rep.responseJSON['status'] != null) {
        message = rep.responseJSON['status']['message'];
      } else {
        message = rep.responseJSON;
      }
      messenger = new Messenger;
      return messenger.post({
        type: 'error',
        message: message,
        hideAfter: 3
      });
    });
    return false;
  };

  RecordCollectionView.prototype.cancel_add = function(e) {
    var cur;
    cur = e.currentTarget;
    $(cur).parent().parent().remove();
    return false;
  };

  RecordCollectionView.prototype.delete_record = function(e) {
    var $cur, msg,
      _this = this;
    $cur = $(e.currentTarget);
    return msg = Messenger().post({
      message: "确定删除?",
      actions: {
        "delete": {
          label: "删除",
          action: function() {
            var item;
            item = _this.collection.get($cur.attr('data-id'));
            item.options['domain_id'] = _this.collection.options['domain_id'];
            item.destroy();
            return msg.hide();
          }
        },
        cancel: {
          label: "亲我后悔了",
          action: function() {
            return msg.hide();
          }
        }
      }
    });
  };

  return RecordCollectionView;

})(CollectionView);
});

;require.register("dnspod/views/record/record-item-view", function(exports, require, module) {
var RecordItemView, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('common/views/base/view');

module.exports = RecordItemView = (function(_super) {
  __extends(RecordItemView, _super);

  function RecordItemView() {
    this.getTemplateData = __bind(this.getTemplateData, this);
    _ref = RecordItemView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  RecordItemView.prototype.autoRender = true;

  RecordItemView.prototype.tagName = 'tr';

  RecordItemView.prototype.className = '';

  RecordItemView.prototype.template = require('./templates/record-item');

  RecordItemView.prototype.getTemplateData = function() {
    var attr;
    attr = _.clone(this.model.attributes);
    if (attr['name'] != null) {
      attr['sub_domain'] = attr['name'];
    }
    if (attr['record_type'] != null) {
      attr['type'] = attr['record_type'];
    }
    if (attr['record_line'] != null) {
      attr['line'] = attr['record_line'];
    }
    return attr;
  };

  return RecordItemView;

})(View);
});

;require.register("dnspod/views/record/templates/record-collection", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"btn-toolbar\">\n  <div class=\"btn-group\">\n    <button class=\"btn btn-success add\">添加记录</button>\n  </div>\n</div>\n<div class=\"add-form-list\"></div>\n<table class=\"table table-condensed\">\n  <thead>\n    <tr>\n      <th>主机记录</th>\n      <th>记录类型</th>\n      <th>线路类型</th>\n      <th>记录值</th>\n      <th>MX优先级</th>\n      <th>TTL</th>\n      <th>操作</th>\n    </tr>\n  </thead>\n  <tbody class=\"list\"></tbody>\n</table>\n\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("dnspod/views/record/templates/record-item", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>";
  if (helper = helpers.sub_domain) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.sub_domain); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (helper = helpers.line) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.line); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (helper = helpers.mx) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.mx); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>";
  if (helper = helpers.ttl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.ttl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td>\n  <span>\n    <button class=\"delete btn btn-sm btn-danger\" data-id='";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "'>删除</button>\n  </span>\n</td>\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("lib/utils", function(exports, require, module) {

});

;require.register("lib/view-helper", function(exports, require, module) {

});

;
//# sourceMappingURL=app.js.map