/* ACTION Update de REST de light
- Route : PUT /mylightmanager/lights/{light_id}
*/

module.exports = function(app) {
	return function(req, res, next) {
		if(!req.body){
      return res.status(400).json({success: false, error: 'Paramètres manquants ou inconnus'});
    }else{
			console.log(req.body);
		}

		if(req.body.brightness_value){
			if(req.body.brightness_value < 0 || req.body.brightness_value > 15){
				return res.status(400).json({success: false, error: 'La luminosité doit être entre 0 et 15'});
			}
		}

		var body = req.body;

		var programmingId = req.params.programming_id;

		var Programming = app.models.Programming;
		Programming.findById({_id: programmingId}, function(err, programming) {
			if(err){
				return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
			}
			if(!programming){
				return res.status(404).json({success: false, error: 'Programmation non trouvée'});
			}

			if(body.time){
				programming.time = body.time;
			}

			if(typeof body.brightness_value !== 'undefined'){
				programming.brightness_value = body.brightness_value;
			}

			if(typeof body.enabled !== 'undefined'){
				programming.enabled = body.enabled;
			}

			if(typeof body.trigger !== 'undefined'){
				programming.trigger = body.trigger;
			}

			if(typeof body.gradual !== 'undefined'){
				programming.gradual = body.gradual;
			}

			if(body.days_enabled){
				programming.days_enabled = body.days_enabled;
			}

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
