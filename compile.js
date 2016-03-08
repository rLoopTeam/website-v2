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
				{ "name":"Thomas Lambot", "title": "Engineering Lead", "location": "Belgium/USA", "imageUrl": "assets/images/members/tla.png" },
				{ "name":"Michael Cook", "title": "Mechanical Lead", "location": "New Zealand", "imageUrl": "assets/images/members/mco.png" },
				{ "name":"Kyle Zienin", "title": "Systems Engineering Lead", "location": "USA", "imageUrl": "assets/images/members/kzl.png" },
				{ "name":"Scott Leonard", "title": "Structures-Aero Lead", "location": "USA", "imageUrl": "assets/images/members/sle.png" },
				{ "name":"Mohd Amir Hasan Khan", "title": "Numerical Simulation Lead", "location": "India", "imageUrl": "assets/images/members/mhk.png" },
				{ "name":"Larry Joseph \"Joey\" Sharette Jr.", "title": "Manufacturing Lead", "location": "USA", "imageUrl": "assets/images/members/lsh.png" },
				{ "name":"Shabab Hussain", "title": "Industrial Design Lead", "location": "Hong Kong", "imageUrl": "assets/images/members/shu.png" },
				{ "name":"Joakim Forslund", "title": "Software Lead", "location": "Sweden", "imageUrl": "assets/images/members/joakim.png" },
				{ "name":"José Peña;", "title": "Thermal Lead", "location": "Spain", "imageUrl": "assets/images/members/jos___jrockwar__200.jpg" },
				{ "name":"Marek Gutt-Mostowy", "title": "Controls Lead", "location": "Poland", "imageUrl": "assets/images/members/marek_gutt-mostowy_m4rol__200.jpg" },
				{ "name":"Adrian Kelly", "title": "Electrical Lead", "location": "USA", "imageUrl": "assets/images/members/adrian_electrical_lead.jpg" },
				{ "name":"Richard P. Behiel", "title": "PR Lead", "location": "USA", "imageUrl": "assets/images/members/rbe.png" },
				{ "name":"Kevin Burville", "title": "Social Media Lead", "location": "Canada", "imageUrl": "assets/images/members/kevin_burville_smlead.jpg" },
				{ "name":"Ari Porad", "title": "IT Lead", "location": "USA", "imageUrl": "assets/images/members/apo.png" },
				{ "name":"Henry McKay", "title": "Finance Lead", "location": "New Zealand", "imageUrl": "assets/images/members/henry_mckay_finance_200.jpg" },
				{ "name":"Gregory Georgianna", "title": "Video Lead", "location": "USA", "imageUrl": "assets/images/members/gregory_video.jpg" },
				{ "name":"Eoghan Kidney", "title": "Creative Media Lead", "location": "Ireland", "imageUrl": "assets/images/members/eoghan_creative_media.jpg" }
			]
		},
	    "press": {
	      stories: require('./press.json'),
	    }
	}

	return Object.assign({}, defaultContext, pagesContexts[pageName]);
}
