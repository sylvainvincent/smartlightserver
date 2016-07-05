/* ACTION Update de REST de light
- Route : PUT /mylightmanager/lights/{light_id}
*/

module.exports = function(app) {
	return function(req, res, next) {
		if(!req.body ||
			!req.body.time ||
			typeof req.body.enabled === 'undefined' ||
			typeof req.body.gradual === 'undefined' ||
			!req.body.brightness_value ||
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
		var body = req.body;
		var date = body.days_enabled;
		var programmingId = req.params.programming_id;

		var Programming = app.models.Programming;
		Programming.findById({_id: programmingId}, function(err, programming) {
			if(err){
				return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
			}
			if(!programming){
				return res.status(404).json({success: false, error: 'Programmation non trouvée'});
			}

			programming.time = body.time;
			programming.brightness_value = body.brightness_value;
			programming.enabled = body.enabled;
			programming.gradual = body.gradual;
			programming.days_enabled = date;

				// Modification d'une programmation d'éclairage
				programming.save(function(err, result) {
					if(err || !result){
						return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
					}

					res.status(200).json({success: true, item: result});
			});
		});
	};
};
