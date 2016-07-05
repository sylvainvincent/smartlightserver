/* Redirige sur les fichiers adéquats
Chemins  :
- GET 	  /lights 			      Liste de tous les solutions lumineuses
- POST 	  /lights 		        Créer une nouvelle solution lumineuse
- GET 	  /lights/{lightid}  Récupération d'une solution lumineuse
- PUT    	/lights/{lightid}  Modification d'une solution lumineuse
- DELETE 	/lights/{lightid}  Supprimer une solution lumineuse
*/

var router = require('express').Router();
var bodyParser = require('body-parser').json();

module.exports = function(app) {

	router.post('/', bodyParser, app.actions.records.create);
	router.get('/', app.actions.records.list);
	router.delete('/:record_id', app.actions.records.delete);

	return router;
};
