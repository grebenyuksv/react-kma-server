const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let password = "asdfasdf";

app.get("/secret-current-password", function(req, res) {
	res.send(password);
});

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/change-password", urlencodedParser, function(req, res) {
	const { currentPassword, newPassword } = req.body;
	if (!currentPassword || !newPassword) {
		res.status(400).send("Missing one of: currentPassword, newPassword");
		return;
	}
	if (currentPassword != password) {
		res.status(400).send("Current password does not match");
		return;
	}
	const minLength = 8;
	if (newPassword.length < minLength) {
		res
			.status(400)
			.send(
				`Your password must contain at least ${minLength} characters`
			);
		return;
	}
	if (!newPassword.match(/[a-z]/) || !newPassword.match(/[A-Z]/)) {
		res.status(400).send("The password must contain both cases");
		return;
	}
	if (!newPassword.match(/\d/)) {
		res.status(400).send("The password must contain digits");
		return;
	}
	password = newPassword;
	res.send("Password updated");
});

const server = app.listen(8081, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
