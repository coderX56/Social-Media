/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		socialMediaHandle: "",
		images: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		const files = e.target.files;
		setFormData({ ...formData, images: files });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("name", formData.name);
		data.append("socialMediaHandle", formData.socialMediaHandle);
		Array.from(formData.images).forEach((file) => {
			data.append("images", file);
		});
		console.log(formData);

		try {
			const response = await axios.post("http://localhost:4000/user", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);
			if (response.status === 201) {
				navigate("/admin");
			}
		} catch (error) {
			console.error("Error occured form:", error);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center bg-zinc-100">
			<div className="w-full max-w-md h-4/5 p-8 bg-white rounded-xl shadow-lg ">
				<h2 className="text-5xl  font-thin mb-6 text-center text-lime-900">
					UserInfo
				</h2>
				<form
					onSubmit={handleSubmit}
					encType="multipart/form-data"
					className="flex flex-col gap-7  font-semibold">
					<div className="flex flex-col text-lg">
						<label className="text-gray-700 text-xl">Name:</label>
						<input
							type="text"
							name="name"
							onChange={handleChange}
							required
							className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-gray-700 text-xl">
							Social Media Handle:
						</label>
						<input
							type="text"
							name="socialMediaHandle"
							onChange={handleChange}
							required
							className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-gray-700 text-xl">Upload Images:</label>
						<input
							type="file"
							name="images"
							multiple={true}
							onChange={handleFileChange}
							className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 rounded-md font-normal h-9 w-4/5 ml-12 p-1">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
