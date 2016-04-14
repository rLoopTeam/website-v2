#!/usr/bin/env node
require('shelljs/global');

var path = require('path');
var nunjucks = require('nunjucks');

config.fatal = true;
config.silent = true;

rm('-rf', 'build');
mkdir('build');

['js', 'styles', 'assets'].forEach(dir => cp('-r', dir, 'build'));

ls('-R', 'pages').filter(file => file.slice(-5) === '.html').forEach(page => {
  mkdir('-p', path.join('build', path.dirname(page)));
  const str = cat(path.join('pages', page)).toString();
  const out = nunjucks.renderString(str, getContext(path.basename(page, '.html')));
  out.to(path.join('build', page)); // FIXME: Won't be compatable with shelljs@0.7.0
});

function getContext (pageName) {
  const defaultContext = {
    __DEV__: (typeof process.env.DEV === 'string') ? process.env.DEV.trim() === '1' : process.env.NODE_ENV !== 'production',
  };

	const pagesContexts = {
		"team":{
			"members": require('./data/members.json')
		},
	    "press": {
	      stories: require('./data/press.json')
	    },
		"sponsors":{
			sponsors:require('./data/sponsors.json')
		}
	}

	return Object.assign({}, defaultContext, pagesContexts[pageName]);
}
