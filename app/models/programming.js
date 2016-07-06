/*
Modèle pour programmation de l'éclairage
- isOn : Vrai si la lumière est allumé. Faux si elle ne l'ai pas
- isAutomatic : Vrai si le detecteur de présence est activé. Faux s'il ne l'ai pas
- date : liste de dates prennant soit la valeur vrai soit la valeur faux
         Vrai si l'éclairage doit s'allumer à cette date Faux s'il ne le doit pas
*/
module.exports = function(app) {
	var programmingSchema = app.mongoose.Schema({
		time: { type: Date, required: true },
		enabled: { type: Boolean, required: true },
		trigger: { type: Boolean, required: true },
		gradual: { type: Boolean, required: true },
		brightness_value: { type: Number, required: true },
    days_enabled: {
			monday: {type: Boolean, required: true },
			tuesday: {type: Boolean, required: true },
			wednesday: {type: Boolean, required: true },
			thursday: {type: Boolean, required: true },
			friday: {type: Boolean, required: true },
			saturday: {type: Boolean, required: true },
			sunday: {type: Boolean, required: true }
		}
	});

  var Programming = app.mongoose.model('Programming', programmingSchema);

	return Programming;
};
