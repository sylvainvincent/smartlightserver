/* ACTION Update de REST de light
- Route : PUT /mylightmanager/lights/{light_id}
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
			programming.intensity = body.intensity;
			programming.enabled = body.enabled;
			programming.dateEnabled = date;

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
