// src/pages/AdminDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AdminDetail() {
	const { AdminId } = useParams(); // Gets the id from the URL
	const [admin, setAdmin] = useState(null); // State to store admin details
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(null); // Error state

	useEffect(() => {
		// Fetch admin details when the component mounts
		const fetchAdmin = async () => {
			try {
				const response = await fetch(`http://localhost:3000/admins/${AdminId}`);
				if (!response.ok) {
					throw new Error('Failed to fetch admin details');
				}
				const data = await response.json();
				setAdmin(data); // Set admin data in state
			} catch (error) {
				setError(error.message); // Set error message in state
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchAdmin();
	}, [AdminId]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<h2>Admin Details</h2>
			{admin ? (
				<div>
					<p><strong>Name:</strong> {admin.name}</p>
					<p><strong>Email:</strong> {admin.email}</p>
					<p><strong>Phone:</strong> {admin.phone}</p>
					<p><strong>Position:</strong> {admin.position}</p>
					{/* Add more fields as needed */}
				</div>
			) : (
				<p>No admin found</p>
			)}
		</div>
	);
}

export default AdminDetail;
