/** @format */
const express = require("express");
const User = require("./userSchema.js");
const upload = require("./multer.js");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use("/images/uploads", express.static("public/images/uploads"));

app.use(express.json());
app.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error("Error in  fetching users:", error);
		res.status(500).json({ message: "Failed to fetch users." });
	}
});

app.post("/user", upload.array("images", 10), async (req, res) => {
	try {
		const { name, socialMediaHandle } = req.body;
		const imagePaths = req.files.map((file) => file.filename);
		const exists = await User.findOne({
			$and: [{ name: name }, { socialMediaHandle: socialMediaHandle }],
		});
		if (exists) {
			await exists.updateOne({ socialMediaHandle, imagePaths });
			return res
				.status(201)
				.json({ message: "Data updated successfully", user: exists });
		}

		const newUser = await User.create({
			name,
			socialMediaHandle,
			images: imagePaths,
		});
		return res
			.status(201)
			.json({ message: "Data uploaded successfully", user: newUser });
	} catch (error) {
		res.status(500).json({ message: "OOPS!!! Error occured.", error });
	}
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is on port ${PORT}`);
});
