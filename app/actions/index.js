
// Fichier index qui redirige vers les autres fichiers du dossier
module.exports = function(app) {
	app.actions = {
		lights : require('./lights')(app),
		programmings : require('./programmings')(app),
		records : require('./records')(app)

	};
};
