/*
Modèle pour solution lumineuse comment une ampoule
- presenceDate : date à laquel le capteur de présence s'active
- light : la solution lumineuse utilisée
*/
module.exports = function(app) {
	var record = app.mongoose.Schema({
		presence_trigger_date: { type: Date, required: true },
		brightness_value: { type: Number, required: true }
	});

	var Record = app.mongoose.model('Record', record);

	return Record;
};
