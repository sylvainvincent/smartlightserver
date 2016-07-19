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
			!req.body.presence_trigger_date ||
			typeof req.body.brightness_value === 'undefined'){
			return res.status(400).json({success: false, error: 'Paramètres manquants ou inconnus'});
		}

		var body = req.body;

			var Record = app.models.Record;
			var record = new Record({
				presence_trigger_date: body.presence_trigger_date,
				brightness_value: body.brightness_value
			});

			// Sauvegarde dans la base de donnée
			record.save(function(err, result) {
				if(err || !result){
					throw err;
					return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
				}

				res.status(201).json({success: true, _id: result._id});
		});
	};
};
