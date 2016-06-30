// Fichier index qui redirige vers les autres fichiers du dossier
module.exports = function(app) {
	app.use('/lights', require('./lights')(app));
	app.use('/programmings', require('./programmings')(app));
};
