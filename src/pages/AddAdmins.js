import React from 'react';

import Button from '../components/Button';
import FormInput from '../components/FormInput';

import '../css/addAdmins.css';

class AddRescuedPet extends React.Component {
	constructor(props) {
		super(props);
	};
	componentDidMount() {
		const saveButton = document.getElementById('save');
		saveButton.addEventListener('click', () => {
			saveButton.disabled = true;
			const AdminID = document.getElementById('AdminID')?.value || '';
			const Name = document.getElementById('Name')?.value || '';
			const Username = document.getElementById('Username')?.value || '';
			const Branches = document.getElementById('Branches')?.value || '';
			const Password = document.getElementById('Password')?.value || '';
			const Email = document.getElementById('Email')?.value || '';
			const Mobilenumber = document.getElementById('Mobilenumber')?.value || '';

			if (!Name || !Username || !Branches || !Password || !Email || !Mobilenumber) {
				alert('Please fill out all fields.');
				return;
			}

			const image = document.getElementById('imageInput')?.files[0];
			if (image) {
				const reader = new FileReader();
				reader.readAsDataURL(image);
				reader.onload = () => {
					const imageBase64 = reader.result;
					const data = {
						AdminID,
						Name,
						Username,
						Branches,
						Password,
						Email,
						Mobilenumber,
						Picture: imageBase64,
					};

					fetch('http://localhost:3000/Admins/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					}).then(res => res.json()).then(() => {
						window.location.hash = '/admins';
						saveButton.disabled = false;
					}).catch(err => {
						alert('An error occurred. Please try again.');
						saveButton.disabled = false;
					});
				};
			} else {
				alert('Please upload an image.');
				saveButton.disabled = false;
			};
		});
	};
	render() {
		return (
			<>
				<form id='addAdminMain'>
					<header id='header'>
						<h4>Add New User Admin</h4>
					</header>

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
								placeholder='Enter Name'
							/>
							<FormInput
								label='Username'
								type='text'
								id='Username'
								name='Username'
								placeholder='Enter Username'
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
							<FormInput
								label='Password'
								type='text'
								id='Password'
								name='Password'
								placeholder='Generate Password'
							/>
						</div>
						<div>
							<FormInput
								label='Admin ID'
								type='text'
								id='AdminID'
								name='AdminID'
								value='###-###'
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
					<div>
						<Button
							title='Save'
							id='save'
						/>
						<Button
							title='Cancel'
							theme='dark'

							onClick={() => {
								window.location.hash = '/admins';
							}}
						/>
					</div>
				</form>
			</>
		)
	};
};

export default AddRescuedPet;