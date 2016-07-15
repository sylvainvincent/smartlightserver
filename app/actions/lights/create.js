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
			!req.body.brightness_value ||
			typeof req.body.automatic === 'undefined' ||
			typeof req.body.switched_on === 'undefined' ||
			typeof req.body.brightness_auto === 'undefined'){
			return res.status(400).json({success: false, error: 'Paramètres manquants ou inconnus'});
		}

		if(req.body.automatic === 'true' && req.body.switched_on === 'true'){
			return res.status(400).json({success: false, error: 'Le mode automatique et le mode continue ne doivent pas être activé en même temps'});
		}

		if(req.body.switched_off_auto_value){
			if(req.body.switched_off_auto_value < 0 || req.body.switched_off_auto_value > 999 ){
				return res.status(400).json({success: false, error: 'switched_off_auto_value doit être entre 0 et 1000'});
			}
		}

		if(req.body.brightness_value){
			if(req.body.brightness_value < 0 || req.body.brightness_value > 15 ){
				return res.status(400).json({success: false, error: 'la luminosité doit être entre 0 et 15'});
			}
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
				switched_on: body.switched_on,
				automatic: body.automatic,
				brightness_auto: body.brightness_auto,
				brightness_value: body.brightness_value
			});

			if(body.message){
				lightInstance.message = body.message;
			}

			if(body.switched_off_auto_value){
				lightInstance.switched_off_auto_value = body.switched_off_auto_value;
			}

				// Sauvegarde dans la base de donnée
				lightInstance.save(function(err, result) {
					if(err || !result){
						throw err;
						return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
					}

					res.status(201).json({success: true, _id: result._id});
				});
		});
	};
};
