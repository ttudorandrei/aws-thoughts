const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require("./router/routes/user-routes");

// express middleware, used to be bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// app.use(require('./routes'));
app.use("/api/", userRoutes);

// Start the API server
app.listen(PORT, () =>
	console.info(`🌎  ==> Access Server on http://localhost:${PORT}`)
);
