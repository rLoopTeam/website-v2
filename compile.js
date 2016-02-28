#!/usr/bin/env node
require('shelljs/global');

var path = require('path');
var nunjucks = require('nunjucks');

config.fatal = true;
config.silent = true;

rm('-rf', 'build');
mkdir('build');

['js', 'styles', 'assets'].forEach(function(dir) {
  cp('-r', dir, 'build');
});

ls('-R', 'pages').filter(function(file) {
  return file.slice(-5) === '.html';
}).forEach(function(page) {
  mkdir('-p', path.join('build', path.dirname(page)));

  var str = cat(path.join('pages', page)).toString();
  var out = nunjucks.renderString(str /*, { ... } */);
  out.to(path.join('build', page)); // FIXME: Won't be compatable with shelljs@0.7.0
});
