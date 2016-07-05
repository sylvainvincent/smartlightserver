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
		var Record = app.models.Record;

		Record.find(function(err, records) {
			if(err){
        return res.status(500).json({success: false, error: 'Erreur interne du serveur'});
      }
			if(!records){
				return res.status(404).json({success: false, error: 'Liste d\'enregistrement vide'});
			}

			res.status(200).json({success: true, list: records});
		});
	};
};
