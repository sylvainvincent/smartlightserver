/*
Modèle pour solution lumineuse comment une ampoule
- name : nom de la solution lumineuse
- switchedOn : Vrai si la lumière est allumé. Faux si elle ne l'ai pas
- automatic : Vrai si le detecteur de présence est activé. Faux s'il ne l'ai pas
- photoresistance : Vrai si la photoresistance (détécteur de luminosité) est activé. Faux s'il ne l'ai pas
- intensity : l'intensité de la lumière si la photoresistance est désactivée
- text : permet l'affichage d'un texte
*/
module.exports = function(app) {
	var lightSchema = app.mongoose.Schema({
		name: { type: String, required: true },
		automatic: { type: Boolean, required: true },
		switched_on: { type: Boolean, required: true },
    brightness_auto:{ type: Boolean, required: true },
		brightness_value: { type: Number, required: true },
		switched_off_auto_value: { type: Number, required: false },
		switched_on_date:{ type: Date, required: false},
    message: { type: String, required: false }
	});

	var Light = app.mongoose.model('Light', lightSchema);

	return Light;
};
