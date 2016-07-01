/* REST DELETE
Suprime une solution lumineuse existante grâce à son identifiant

route: DELETE /lights/{lightid}

Les codes HTTP :
- 204 : Requête traitée avec succès mais pas d’information à renvoyer
- 404 : Ressource non trouvée
- 500 : Erreur interne du serveur
OK
*/

module.exports = function(app) {
	return function(req, res, next) {
		
		var programmingId = req.params.programming_id;

		var Programming = app.models.Programming;

		Programming.findById({_id: programmingId}, function(err, programming) {
			if(err || !programming){
				return res.status(404).json({success: false, error: 'Cette programmation n\'a pas été trouvée'});
			}

			programming.remove(function(err, result) {
				if(err || !result){
					return res.status(500).json('Erreur interne du serveur');
				}

				res.status(204).json({success: true});
			});
		});
	};
};
