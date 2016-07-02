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
		switchedOn: { type: Boolean, required: true },
		automatic: { type: Boolean, required: true },
    photoresistance:{ type: Boolean, required: true },
		intensity: { type: Number, required: true },
		switchedOnDate:{ type: Date, required: true},
    text: { type: String, required: false }
	});

	var Light = app.mongoose.model('Light', lightSchema);

	return Light;
};
