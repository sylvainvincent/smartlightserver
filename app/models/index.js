/* Index file to redirect models definition scripts
*
* Nodes implemented: mongoose (schema and model definition)
*
* NOTE: Mongoose objects carry an _id by default. It is of ObjectId type (see Mongoose documentation).
*/

var mongoose = require('mongoose');

module.exports = function(app) {
	app.mongoose = mongoose.connect(app.settings.db,function(err, db) {
	  if (err) {
			console.log("La connexion vers la base de données a echoué");
	    throw err;
		}else{
			 console.log("Connexion établie avec la base de données");
		}
	});

	app.models = {
		Light : require('./light')(app),
		Programming : require('./programming')(app),
		Log: require('./log')(app)
	};
};
