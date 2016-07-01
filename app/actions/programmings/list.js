/* REST GET
Récupérer toutes les solutions lumineuses

route: GET /lights

Les codes HTTP :
- 200 : Requête traitée avec succès
- 404 : Ressource non trouvée
- 500 : Erreur interne du serveur
OK
*/

module.exports = function(app) {
	return function(req, res, next) {
		var Programming = app.models.Programming;

		Programming.find(function(err, programmings) {
			if(err){
        return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
      }
			if(!programmings){
				return res.status(404).json({success: false, error: 'Liste de solutions lumineuses vide'});
			}

			res.status(200).json({success: true, list: programmings});
		});
	};
};
