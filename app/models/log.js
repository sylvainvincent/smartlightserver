/*
Modèle pour solution lumineuse comment une ampoule
- presenceDate : date à laquel le capteur de présence s'active
- light : la solution lumineuse utilisée
*/
module.exports = function(app) {
	var log = app.mongoose.Schema({
		presenceDate: { type: String, required: true },
		light: { type: app.mongoose.Schema.ObjectId, ref: 'Light', required: true }
	});

	var Log = app.mongoose.model('Log', log);

	return Log;
};
