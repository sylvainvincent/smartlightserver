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
			!req.body.name ||
			!req.body.switched_on ||
			!req.body.automatic ||
			!req.body.photoresistance ||
			!req.body.intensity){
			return res.status(400).json({success: false, error: 'Paramètres manquants ou inconnus'});
		}
		var body = req.body;

		var Light = app.models.Light;
		Light.findOne({name: body.name}, function(err, light) {
			if(err){
				return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
			}
			if(light){
				return res.status(403).json({success: false, error: 'Cet éclairage existe déjà'});
			}

			// Création de la solution lumineuse
			var lightInstance = new Light({
				name: body.name,
				switchedOn: body.switched_on,
				automatic: body.automatic,
				photoresistance: body.photoresistance,
				intensity: body.intensity

			});

				// Sauvegarde dans la base de donnée
				lightInstance.save(function(err, result) {
					if(err || !result){
						return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
					}

					res.status(201).json({success: true, id: result._id});
				});
		});
	};
};
