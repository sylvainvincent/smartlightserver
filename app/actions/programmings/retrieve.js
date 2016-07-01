/* REST GET
Récupérer une solution lumineuse grâce à son identifiant

route: GET /lights/{light_id}
{light_id} -> req.params.light_id

Les codes HTTP :
- 200 : Requête traitée avec succès
- 404 : Ressource non trouvée
- 500 : Erreur interne du serveur
OK
*/
module.exports = function(app) {
	return function(req, res, next) {

		var programmingId = req.params.programming_id;

		var Programming = app.models.Programming;
		Programming.findOne({_id: programmingId}, function(err, programming) {
			if(err || !programming){
				return res.status(404).json({success: false, error: 'Cette éclairage n\'a pas été trouvée'});
			}
			res.status(200).json({success: true, profile: programming});
		});
	};
};
