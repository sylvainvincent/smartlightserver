/*
	Implementation du framework express
*/

require('./global');

var express = require('express');
var api = express();

// Initialisation des differents fichiers du framework
(function init() {
	require('./settings')(api);
	require('./models')(api);
	require('./actions')(api);
	require('./routes')(api);
}());

(function start() {
	api.listen(process.env.port || api.settings.port, '0.0.0.0');
	console.log('Le serveur écoute sur le port :port'.replace(':port', api.settings.port));
	console.log('Le serveur est connecté à la base de donnée : :db'.replace(':db', api.settings.db));
}());
