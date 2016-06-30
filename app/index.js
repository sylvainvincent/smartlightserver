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
	api.listen(process.env.PORT || api.settings.port, '0.0.0.0');
	console.log('Server is listening to port :port'.replace(':port', api.settings.port));
	console.log('Server is connecting to :db'.replace(':db', api.settings.db));
}());
