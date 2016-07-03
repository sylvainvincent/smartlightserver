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

		var lightId = req.params.light_id;

		var Light = app.models.Light;
		Light.findOne({_id: lightId}, function(err, light) {
			if(err || !light){
				return res.status(404).json({success: false, error: 'Cette éclairage n\'a pas été trouvée'});
			}
			res.status(200).json({success: true, item: light});
		});
	};
};
