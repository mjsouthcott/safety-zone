if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// create app
const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;
const mongoUser = process.env.MONGO_USER || '';
const mongoPass = process.env.MONGO_PASS || '';
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;

// define middleware
app.use(express.json());
app.use(routes);

// connect to db
const mongoseAuth = mongoUser && mongoPass ? `${mongoUser}:${mongoPass}@` : '';
mongoose.connect(`mongodb://${mongoseAuth}${mongoHost}:${mongoPort}/test`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// launch app
app.listen(port, hostname, () => {
	console.log(`Example app listening at http://${hostname}:${port}`);
});
