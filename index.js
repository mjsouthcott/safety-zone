const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// get environment variables
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 27017;
const dbUsername = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASS || "";

// create app
const app = express();

// define middleware
app.use(express.json());
app.use(routes);

// connect to db
const dbAuth = dbUsername && dbPassword ? `${dbUsername}:${dbPassword}@` : "";
mongoose.connect(`mongodb://${dbAuth}${dbHost}:${dbPort}/test`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// launch app
app.listen(port, host, () => {
	console.log(`Example app listening at http://${host}:${port}`);
});
