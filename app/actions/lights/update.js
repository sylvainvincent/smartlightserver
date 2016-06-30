/**
 * REST PUT
 * Modifier une solution lumineuse grâce à son identifiant
 *
 * route: PUT /lights/{lightid}
 * {light_id} -> req.params.light_id
 *
 * Les codes HTTP :
 *	- 201 : Requête traitée avec succès et création de document
 *	- 400 : Mauvaise requête
 *	- 403 : Accès refusé
 *  - 404 : Ressource non trouvée
 *  - 500 : Erreur interne du serveur
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

		var lightId = req.params.light_id;

		var Light = app.models.Light;

		Light.findById({_id: lightId}, function(err, light) {
			if(err){
				return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
			}
			if(!light){
				return res.status(404).json({success: false, error: 'Eclairage non trouvé'});
			}

			Light.findOne({name: body.name}, function(err, found) {
				if(err){
					return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
				}
				if(found){
					return res.status(403).json({success: false, error: 'Une solution lumineuse portant ce nom existe déjà'});
				}

				light.name = body.name;
				light.switchedOn = body.switched_on;
				light.automatic = body.automatic;
				light.photoresistance = body.photoresistance;
				light.intensity = body.intensity;

				// Enregistre les nouvelles modifications dans la base de données
				light.save(function(err, result) {
					if(err || !result){
						return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
					}

					res.status(200).json({success: true});

				});
			});
		});
	};
};
