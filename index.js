const app      = require('express')()
const port     = process.env.PORT || 4444 
require('dotenv').config()

app.use(require("express").urlencoded({extended: true}))
app.use(require("express").json())


async function connectDB () {
	try {
		await require("mongoose").connect(process.env.MONGO);
		console.log("Connected to the DB ✅");
	} catch (error) {
		console.log("ERROR: Your DB is not running, start it up ☢️");
	}
}
connectDB()

	//==========================================================================
	app.use(require('cors')())
	//==========================================================================
	app.use('/users',require('./routes/users.js'))
	//==========================================================================


app.listen(port, () => console.log("🚀 Listening on port: " + port + " 🚀"));