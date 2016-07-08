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
			typeof req.body.enabled === 'undefined' ||
			typeof req.body.gradual === 'undefined' ||
			typeof req.body.trigger === 'undefined' ||
			req.body.brightness_value === 0 ||
			typeof req.body.days_enabled === 'undefined' ||
			typeof req.body.days_enabled.monday === 'undefined' ||
			typeof req.body.days_enabled.tuesday === 'undefined' ||
			typeof req.body.days_enabled.wednesday === 'undefined' ||
			typeof req.body.days_enabled.thursday === 'undefined' ||
			typeof req.body.days_enabled.friday === 'undefined' ||
			typeof req.body.days_enabled.saturday === 'undefined' ||
			typeof req.body.days_enabled.sunday === 'undefined'){
			return res.status(400).json({success: false, error: 'Paramètres manquants ou inconnus'});
		}

		if(req.body.brightness_value < 0 || req.body.brightness_value > 15){
			return res.status(400).json({success: false, error: 'La luminosité doit être entre 0 et 15'});
		}

		var body = req.body;
		var date = body.days_enabled;

		var Programming = app.models.Programming;

			// Création d'un programme d'éclairage
			var programming = new Programming({
				time: body.time,
				brightness_value: body.brightness_value,
				enabled: body.enabled,
				trigger: body.trigger,
				gradual: body.gradual,
				days_enabled:{
					monday:date.monday,
					tuesday:date.tuesday,
					wednesday:date.wednesday,
					thursday:date.thursday,
					friday:date.friday,
					saturday:date.saturday,
					sunday:date.sunday
				}
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
