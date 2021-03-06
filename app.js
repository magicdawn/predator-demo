global.Promise = require('bluebird');
var co = require('co');
var app = module.exports = require('koa')();
var Router = require('impress-router');
var router = Router();
var serve = require('koa-static');
var _ = require('lodash');
var debug = require('debug')('predator:demo');

// use router
app.use(router);


// create predator
global.predator = require('predator-kit')({
  home: __dirname,
  app: app,
  router: router,
  buildDir: __dirname + '/public'
});

/**
 * when
 *   - production, we use `/public` dir
 *   - otherwise, we load a bunch of middlewares
 */
if (app.env === 'production') {
  app.use(serve(predator.buildDir));
} else {
  predator.startAssetsManager();
}

/**
 * 使用所有的router
 * index.js
 */
predator.loadAllRouter();