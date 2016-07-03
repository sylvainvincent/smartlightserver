/**
 * REST PUT
 * Modifier une solution lumineuse grâce à son identifiant
 *
 * route: PUT /lights/{lightid}
 * {light_id} -> req.params.light_id
 *
 * Les codes HTTP :
 *	- 200 : Requête traitée avec succès
 *	- 400 : Mauvaise requête
 *	- 403 : Accès refusé
 *  - 404 : Ressource non trouvée
 *  - 500 : Erreur interne du serveur
 */

module.exports = function(app) {
	return function(req, res, next) {
		if(!req.body ||
			typeof req.body.automatic === 'undefined' ||
			typeof req.body.switched_on === 'undefined' ||
			typeof req.body.photoresistance === 'undefined'){
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

			if(body.name){
				light.name = body.name;
			}

			if(body.intensity){
				light.intensity = body.intensity;
			}

			if(body.switched_on_date){
				light.switched_on_date = body.switched_on_date;
			}

			light.switched_on = body.switched_on;
			light.automatic = body.automatic;
			light.photoresistance = body.photoresistance;

			// Enregistre les nouvelles modifications dans la base de données
			light.save(function(err, result) {
				if(err || !result){
					return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
				}

				res.status(200).json({success: true, item: result});

			});
		});
	};
};
