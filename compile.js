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
			"members": [
				{ "name":"Brent Lessard", "title": "Project Manager", "location": "Canada", "imageUrl": "assets/images/members/ble.png" },
				{ "name":"Daniel Hunter", "title": "Assisstant Project Manager", "location": "USA", "imageUrl": "assets/images/members/dhu.png" },
				{ "name":"Thomas Lambot", "title": "Engineering Lead", "location": "Belgium/USA", "imageUrl": "assets/images/members/tla.png" },
				{ "name":"Andrew Ouimette", "title": "Assisstant Project Manager", "location": "USA", "imageUrl": "assets/images/members/aou.png" },
				{ "name":"Ari Porad", "title": "IT Lead", "location": "USA", "imageUrl": "assets/images/members/apo.png" },
				{ "name":"Kyle Zienin", "title": "Systems Engineering Lead", "location": "USA", "imageUrl": "assets/images/members/kzl.png" },
				{ "name":"Larry Joseph \"Joey\" Sharette Jr.", "title": "Compressor Lead", "location": "USA", "imageUrl": "assets/images/members/lsh.png" },
				{ "name":"Mohd Amir Hasan Khan", "title": "Numerical Simulation Lead", "location": "India", "imageUrl": "assets/images/members/mhk.png" },
				{ "name":"Scott Leonard", "title": "Structures-Aero Lead", "location": "USA", "imageUrl": "assets/images/members/sle.png" },
				{ "name":"Michael Cook", "title": "Mechanical Lead", "location": "New Zealand", "imageUrl": "assets/images/members/mco.png" },
				{ "name":"Shabab Hussain", "title": "Visualisation Lead", "location": "Hong Kong", "imageUrl": "assets/images/members/shu.png" },
				{ "name":"Paul Guenette", "title": "Assisstant Project Manager", "location": "Canada", "imageUrl": "assets/images/members/doge.png" },
				{ "name":"Joakim Forslund", "title": "Software Lead", "location": "Sweden", "imageUrl": "assets/images/members/doge.png" },
				{ "name":"Richard P. Behiel", "title": "PR Lead", "location": "USA", "imageUrl": "assets/images/members/rbe.png" },
			]
		},
    "press": {
      stories: require('./press.json'),
    }
	}

	return Object.assign({}, defaultContext, pagesContexts[pageName]);
}
