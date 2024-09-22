/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/");
				console.log(response.data);

				setUsers(response.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className=" mx-auto p-6 bg-gray-100 min-h-screen">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-5xl font-thin text-blue-600 text-center w-full pl-44">
					Admin Dashboard
				</h1>

				<Link
					to="/"
					className="bg-blue-500 hover:bg-blue-700  text-white font-semibold py-2 px-8 rounded-lg mr-40">
					Create
				</Link>
			</div>

			<table className=" mr-5 w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead className="bg-blue-500 text-white">
					<tr>
						<th className="py-3 px-4 text-left text-2xl font-semibold">Name</th>
						<th className="py-3 px-4 text-left text-2xl font-semibold">
							Social Media Handle
						</th>
						<th className="py-3 px-4 text-left text-2xl font-semibold">
							Uploaded Images
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr
							key={user._id}
							className="hover:bg-gray-200 transition-all text-xl font-semibold">
							<td className="py-3 px-4 border-b text-gray-800">{user.name}</td>
							<td className="py-3 px-4 border-b text-gray-800">
								{user.socialMediaHandle}
							</td>
							<td className="flex flex-row gap-3 py-3 px-4 border-b text-gray-800">
								{user.images.length > 0 ? (
									user.images.map((image, index) => (
										<img
											key={index}
											src={`http://localhost:4000/images/uploads/${image}`}
											alt={`Uploaded ${index + 1}`}
											className="w-16 h-16 mr-2 border rounded-full object-cover"
										/>
									))
								) : (
									<p>No images uploaded</p>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
