// Fichier index qui redirige vers les actions REST

module.exports = function(app) {
	return {
		create: require('./create')(app),
		update: require('./update')(app),
		retrieve: require('./retrieve')(app),
		list: require('./list')(app),
		delete: require('./delete')(app)
	};
};
