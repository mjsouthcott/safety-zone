const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// create app
const app = express();
const port = 3000;

// define middleware
app.use(express.json());
app.use(routes);

// connect to db
mongoose.connect("mongodb://localhost:27017/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// launch app
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
