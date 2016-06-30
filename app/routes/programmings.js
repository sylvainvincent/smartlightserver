/* Redirige sur les fichiers adéquats
Chemins  :
- POST 	  /programmings 		       Créer une nouvelle solution lumineuse
- GET 	  /programmings 			     Récupération d'une liste de tous les solutions lumineuses
- GET 	  /programmings/{programming_id}  Récupération d'une solution lumineuse
- PUT    	/programmings/{programming_id}  Modification d'une solution lumineuse
- DELETE 	/programmings/{programming_id}  Supprimer une solution lumineuse
*/
var router = require('express').Router();
var bodyParser = require('body-parser').json();

module.exports = function(app) {

 	router.post('/', bodyParser, app.actions.programmings.create);
	router.get('/', app.actions.programmings.list);
	router.get('/:programming_id', app.actions.programmings.retrieve);
	router.put('/:programming_id', bodyParser, app.actions.programmings.update);
	router.delete('/:programming_id', app.actions.programmings.delete);

	return router;
};
