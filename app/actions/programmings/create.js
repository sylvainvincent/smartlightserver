/**
 * REST CREATE
 * Créer une solution lumineuse
 *
 * route: POST /lights
 *
 * Les codes HTTP :
 *	- 201 : Requête traitée avec succès et création de document
 *	- 400 : Mauvaise requête
 *	- 403 : Accès refusé
 *	- 500 : Erreur interne du serveur
 */

module.exports = function(app) {
	return function(req, res, next) {
		if(!req.body ||
			!req.body.time ||
			!req.body.intensity ||
			!req.body.enabled ||
			!req.body.date_enabled ||
			!req.body.date_enabled.monday ||
			!req.body.date_enabled.tuesday ||
			!req.body.date_enabled.wednesday ||
			!req.body.date_enabled.thursday ||
			!req.body.date_enabled.friday ||
			!req.body.date_enabled.saturday ||
			!req.body.date_enabled.sunday){
			return res.status(400).json({success: false, error: 'Paramètres manquants ou inconnus'});
		}
		var body = req.body;
		var date = body.date_enabled;

			// Création d'un programme d'éclairage
			var programming = new Programming({
				time: body.time,
				intensity: body.intensity,
				enabled: body.enabled,
				date_enabled: date
			});


				// Sauvegarde dans la base de donnée
				programming.save(function(err, result) {
					if(err || !result){
						return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
					}

					res.status(201).json({success: true, id: result._id});
				});
			};
};
