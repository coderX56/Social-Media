/** @format */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connection successful");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});
const userSchema = mongoose.Schema({
	name: String,
	socialMediaHandle: String,
	images: [{ type: String }],
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
