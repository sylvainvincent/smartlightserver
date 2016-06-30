/* ACTION Update de REST de light
- Route : PUT /mylightmanager/lights/{light_id}
*/

module.exports = function(app) {
	return function(req, res, next) {
		if(!req.body || (!req.body.firstname && !req.body.lastname && !req.body.email && !req.body.password)){
      // Erreur 400 (Mauvaise requête)
      return res.status(400).json({success: false, error: 'Mauvaise requête'});
    }
		var body = req.body;

		var userId = req.params.userid;

		// Does the user exist? Is the user attempting to modify it the account's creator?
		var User = app.models.User;
		User.findById({_id: userId}, function(err, user) {
			if(err)
				return res.status(500).json({success: false, error: 'Internal server error'}); // 500 Internal Server Error
			if(!user)
				return res.status(404).json({success: false, error: 'User was not found'}); // 404 Not Found
			if(userId != req.user._id) // != is standard inequality (not equal value)
				return res.status(403).json({success: false, error: 'Not logged in as this user'}); // 403 Forbidden

			var changes = {};
			if(body.firstname) {
				user.firstname = body.firstname;
				changes.firstname = user.firstname;
			}
			if(body.lastname) {
				user.lastname = body.lastname;
				changes.lastname = user.lastname;
			}
			if(body.email) {
				user.email = body.email;
				changes.email = user.email;
			}
			if(body.password) {
				var encPass = User.encryptPassword(body.password);
				user.password = encPass;
				changes.password = user.password;
			}

			// Is the updated email already belonging to another user?
			User.findOne({email: user.email}, function(err, found) {
				if(err)
					return res.status(500).json({success: false, error: 'Internal server error'});
				if(found._id != userId)
					return res.status(403).json({success: false, error: 'Email already in use'});

				// Update user
				user.save(function(err, done) {
					if(err || !done)
						return res.status(500).json({success: false, error: 'Internal server error'});

					res.status(200).json({success: true, changed: changes}); // 200 OK
				});
			});
		});
	};
};
