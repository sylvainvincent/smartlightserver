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

	router.get('/', app.actions.messages.list);
	router.post('/', bodyParser, app.actions.messages.create);
	router.get('/:message_id', app.actions.messages.retrieve);
	router.put('/:message_id', bodyParser, app.actions.messages.update);
	router.delete('/:message_id', app.actions.messages.delete);

	return router;
};
