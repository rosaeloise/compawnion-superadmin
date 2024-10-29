import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

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
		<form id='addAdminMain'>
			<header id='header'>
				<h4>{admin.aStaffInfo.Username}</h4>
			</header>
			{admin ? (
				<section id='basicInfo'>
					<div id='image'>
						<input type='file' name='imageInput' id='imageInput' accept="image/*" />
						<div id='img' onClick={() => {
							const imageInput = document.getElementById('imageInput');
							imageInput.onchange = () => {
								const file = imageInput.files[0];
								const img = document.getElementById('img');
								const reader = new FileReader();

								reader.onload = (e) => {
									img.style.backgroundImage = `url(${e.target.result})`;
								};

								if (file) reader.readAsDataURL(file);
							};

							imageInput.click();
						}} />
						<Button
							title='Upload Image'
							theme='dark'
							fill='outline'

							onClick={() => {
								const img = document.getElementById('img');
								img.click();
							}}
						/>
					</div>

					<div>
						<FormInput
							label='Name'
							type='text'
							id='Name'
							name='Name'
							value={admin.aStaffInfo.Name}
							disabled={true}
						/>
						<FormInput
							label='Username'
							type='text'
							id='Username'
							name='Username'
							value={admin.aStaffInfo.Username}
							disabled={true}
						/>
						<FormInput
							label='Branch'
							type='dropdown'
							id='Branches'
							name='Branches'
							placeholder='Select Branch'

							options={[
								{
									value: 'Branch 1',
									label: 'Branch 1'
								},
								{
									value: 'Branch 2',
									label: 'Branch 2'
								}
							]}

						/>
					</div>
					<div>
						<FormInput
							label='Admin ID'
							type='text'
							id='AdminID'
							name='AdminID'
							value={admin.id}
							disabled={true}
						/>
						<FormInput
							label='Email'
							type='text'
							id='Email'
							name='Email'
							placeholder='Enter Email'
						/>
						<FormInput
							label='Phone Number'
							type='text'
							id='Mobilenumber'
							name='Mobilenumber'
							placeholder='Enter Phone Number'
						/>
						<Button>
							Generate Password
						</Button>
					</div>
				</section>
			) : (
				<p>No admin found</p>
			)}
		</form>
	);
}

export default AdminDetail;
