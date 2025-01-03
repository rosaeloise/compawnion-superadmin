import React from 'react';

import Button from '../components/Button';
import FormInput from '../components/FormInput';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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
				MySwal.fire({
					title: <h4>Error</h4>,
					html: <p>Please fill in all fields.</p>,
					width: '60rem',
					icon: 'error',
					iconColor: 'var(--primary-color)',
					confirmButtonText: 'Ok',
					confirmButtonColor: 'var(--primary-color)'
				});
				saveButton.disabled = false;
				return;
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(Email)) {
				MySwal.fire({
					title: <h4>Error</h4>,
					html: <>
						<p>Invalid email format.</p>
						<p>Please enter a valid email address.</p>
					</>,
					width: '60rem',
					icon: 'error',
					iconColor: 'var(--primary-color)',
					confirmButtonText: 'Ok',
					confirmButtonColor: 'var(--primary-color)'
				});
				saveButton.disabled = false;
				return;
			}

			if (Mobilenumber.length < 11) {
				MySwal.fire({
					title: <h4>Error</h4>,
					html: <p>Phone number must be at least 11 digits.</p>,
					width: '60rem',
					icon: 'error',
					iconColor: 'var(--primary-color)',
					confirmButtonText: 'Ok',
					confirmButtonColor: 'var(--primary-color)'
				});
				saveButton.disabled = false;
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

					fetch('https://compawnion-backend.onrender.com/Admins/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					}).then(async res => {
						if (!res.ok) {
							const message = await res.json();
							throw new Error(message.message);
						};
						return res.json();
					}).then(() => {
						MySwal.fire({
							title: <h4>Success</h4>,
							html: <p>Admin added successfully.</p>,
							width: '60rem',
							icon: 'success',
							confirmButtonText: 'Ok',
							confirmButtonColor: 'var(--primary-color)'
						}).then(() => {
							window.location.hash = '/admins';
						});
						saveButton.disabled = false;
					}).catch(err => {
						MySwal.fire({
							title: <h4>Error</h4>,
							html: <>
								<p>Failed to add admin.</p>
								<p>{err.message}</p>
							</>,
							width: '60rem',
							icon: 'error',
							iconColor: 'var(--primary-color)',
							confirmButtonText: 'Ok',
							confirmButtonColor: 'var(--primary-color)'
						});
						saveButton.disabled = false;
					});
				};
			} else {
				MySwal.fire({
					title: <h4>Error</h4>,
					html: <p>Please upload an image.</p>,
					width: '60rem',
					icon: 'error',
					iconColor: 'var(--primary-color)',
					confirmButtonText: 'Ok',
					confirmButtonColor: 'var(--primary-color)'
				});
				saveButton.disabled = false;
			};
		});
	};
	render() {
		return (
			<>
				<svg viewBox='0 0 943 1015' id='pawBackground'>
					<path d='M891.353 638.114C912.994 717.216 873.044 822.788 821.273 834.888C715.504 887.059 679.07 796.346 596.209 819.016C513.348 841.685 558.279 906.839 427.292 965.908C371.714 986.843 222.774 911.903 199.642 827.353C147.385 636.342 233.595 357.26 424.606 305.003C615.617 252.746 839.096 447.103 891.353 638.114Z' fill='var(--primary-color)' />
					<path d='M211.833 299.759C244.803 356.384 233.101 417.499 203.039 435.003C167.386 455.762 105.26 438.336 72.2897 381.71C39.3196 325.085 37.4866 235.727 73.1397 214.969C115.391 218.334 178.863 243.133 211.833 299.759Z' fill='var(--primary-color)' />
					<path d='M376.557 130.274C400.958 191.086 406.97 254.141 368.681 269.505C330.393 284.868 279.573 248.025 255.172 187.213C230.771 126.401 249.12 88.7089 287.409 73.3455C325.698 57.9821 352.157 69.4627 376.557 130.274Z' fill='var(--primary-color)' />
					<path d='M609.673 121.791C608.187 187.298 573.546 239.645 532.3 238.709C491.055 237.773 467.636 203.027 469.122 137.519C469.74 110.282 487.205 88.1102 495.598 64.4464C507.391 31.1959 513.585 0.937857 537.682 1.48447C578.927 2.4201 611.159 56.2831 609.673 121.791Z' fill='var(--primary-color)' />
					<path d='M806.197 219.445C802.778 250.355 791.964 264.909 770.688 286.219C754.55 307.998 740.449 331.539 718.905 329.156C677.899 324.62 650.497 268.146 657.701 203.019C664.905 137.892 703.987 88.7728 744.993 93.3088C785.999 97.8447 813.401 154.318 806.197 219.445Z' fill='var(--primary-color)' />
				</svg>
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
								title='Add an Image'
								theme='dark'
								fill='outline'
								size='small'

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
								label='Admin ID'
								type='text'
								id='AdminID'
								name='AdminID'
								value='###-###'
								disabled={true}
							/>
							<FormInput
								label='Username'
								type='text'
								id='Username'
								name='Username'
								placeholder='Enter Username'
								onChange={(e) => {
									const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
									e.target.value = value;
								}}
							/>
							<FormInput
								label='Email'
								type='text'
								id='Email'
								name='Email'
								placeholder='Enter Email'
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
								label='Phone Number'
								type='number'
								id='Mobilenumber'
								name='Mobilenumber'
								placeholder='Enter Phone Number'
								value='09'
								onChange={(e) => {
									let value = e.target.value;
									if (!value.startsWith('09')) {
										value = '09' + value.replace(/^09/, '');
									}
									e.target.value = value;
									if (value.length > 12) {
										e.target.value = value.slice(0, 11);
									}
								}}
							/>
							<FormInput
								label='Password'
								type='text'
								id='Password'
								name='Password'
								placeholder='Generate Password'
							/>
							<div>
								<Button
									size='small'
									fill='outline'
									onClick={() => {
									const password = Math.random().toString(36).slice(-10);
									document.getElementById('Password').value = password;
								}}>
									Generate Password
								</Button>
							</div>
						</div>
					</section>
					<div id='buttonGroup'>
						<Button
							title='Save'
							id='save'
							size='small'
						/>
						<Button
							title='Cancel'
							theme='dark'
							size='small'
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