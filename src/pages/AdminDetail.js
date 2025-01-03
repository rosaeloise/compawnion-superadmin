import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

import '../css/adminDetail.css';

class AdminDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			admin: null,
			loading: true,
			error: null
		};
	}
	componentDidMount() {
		this.fetchAdmin();

	}
	async fetchAdmin() {
		const AdminId = location.hash.split('/').pop();

		try {
			const response = await fetch(`https://compawnion-backend.onrender.com/admins/${AdminId}`);
			if (!response.ok) {
				throw new Error('Failed to fetch admin details');
			}
			const data = await response.json();
			this.setState({ admin: data, loading: false });
		} catch (error) {
			this.setState({ error: error.message, loading: false });
		}
	}

	async updateAdmin() {
		const admin = this.state.admin;
		const AdminId = location.hash.split('/').pop();
		const Email = document.getElementById('Email').value;
		const Mobilenumber = document.getElementById('Mobilenumber').value;
		const Branches = document.getElementById('Branches').value;

		admin.aStaffInfo.Email = Email;
		admin.aStaffInfo.Mobilenumber = Mobilenumber;
		admin.aStaffInfo.Branches = Branches;
		delete admin.id;

		fetch(`https://compawnion-backend.onrender.com/admins/${AdminId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(admin)
		})
			.then(res => res.json())
			.then(response => {
				if (response.message === 'Admin updated successfully') {
					MySwal.fire({
						title: <h4>Success</h4>,
						html: <p>Admin updated successfully.</p>,
						width: '60rem',
						icon: 'success',
						confirmButtonText: 'Ok',
						confirmButtonColor: 'var(--primary-color)'
					}).then(() => {
					window.location.hash = '/admins';
					});
					saveButton.disabled = false;
				} else {
					MySwal.fire({
						title: <h4>Failed</h4>,
						html: <p>Failed to update admin.</p>,
						width: '60rem',
						icon: 'error',
						confirmButtonText: 'Ok',
						confirmButtonColor: 'var(--primary-color)'
					});
				}
			})
			.catch(err => console.error);
	}

	async deleteAdmin() {
		MySwal.fire({
			title: <h4>Delete Account?</h4>,
			html: <p>This admin user account will be deleted from the database.</p>,
			width: '80rem',
			icon: 'warning',
			iconColor: '#c32626',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			confirmButtonColor: '#c32626',
			cancelButtonText: 'Cancel',
			cancelButtonColor: 'var(--primary-complement)'
		}).then(result => {
			if (result.isConfirmed) {
				const AdminId = location.hash.split('/').pop();

				fetch(`https://compawnion-backend.onrender.com/admins/${AdminId}`, {
					method: 'DELETE'
				})
					.then(res => res.json())
					.then(response => {
						if (response.message === 'Admin deleted successfully') {
							MySwal.fire({
								title: <h4>Success</h4>,
								html: <p>Admin deleted successfully.</p>,
								width: '60rem',
								icon: 'success',
								confirmButtonText: 'Ok',
								confirmButtonColor: 'var(--primary-color)'
							}).then(() => {
								window.location.hash = '/admins';
							});
						} else {
							MySwal.fire({
								title: <h4>Failed</h4>,
								html: <p>Failed to delete admin.</p>,
								width: '60rem',
								icon: 'error',
								confirmButtonText: 'Ok',
								confirmButtonColor: 'var(--primary-color)'
							});
						}
					})
					.catch(err => console.error);
			}
		});
	}

	render() {
		const { admin, loading, error } = this.state;

		if (loading) return <p>Loading...</p>;
		if (error) return <p>{error}</p>;

		return (
			<>
				<svg viewBox='0 0 943 1015' id='pawBackground'>
					<path d='M891.353 638.114C912.994 717.216 873.044 822.788 821.273 834.888C715.504 887.059 679.07 796.346 596.209 819.016C513.348 841.685 558.279 906.839 427.292 965.908C371.714 986.843 222.774 911.903 199.642 827.353C147.385 636.342 233.595 357.26 424.606 305.003C615.617 252.746 839.096 447.103 891.353 638.114Z' fill='var(--primary-color)' />
					<path d='M211.833 299.759C244.803 356.384 233.101 417.499 203.039 435.003C167.386 455.762 105.26 438.336 72.2897 381.71C39.3196 325.085 37.4866 235.727 73.1397 214.969C115.391 218.334 178.863 243.133 211.833 299.759Z' fill='var(--primary-color)' />
					<path d='M376.557 130.274C400.958 191.086 406.97 254.141 368.681 269.505C330.393 284.868 279.573 248.025 255.172 187.213C230.771 126.401 249.12 88.7089 287.409 73.3455C325.698 57.9821 352.157 69.4627 376.557 130.274Z' fill='var(--primary-color)' />
					<path d='M609.673 121.791C608.187 187.298 573.546 239.645 532.3 238.709C491.055 237.773 467.636 203.027 469.122 137.519C469.74 110.282 487.205 88.1102 495.598 64.4464C507.391 31.1959 513.585 0.937857 537.682 1.48447C578.927 2.4201 611.159 56.2831 609.673 121.791Z' fill='var(--primary-color)' />
					<path d='M806.197 219.445C802.778 250.355 791.964 264.909 770.688 286.219C754.55 307.998 740.449 331.539 718.905 329.156C677.899 324.62 650.497 268.146 657.701 203.019C664.905 137.892 703.987 88.7728 744.993 93.3088C785.999 97.8447 813.401 154.318 806.197 219.445Z' fill='var(--primary-color)' />
				</svg>
				<form id='adminDetailsMain'>
					<header id='header'>
						<h4>{admin.aStaffInfo.Username}</h4>
					</header>
					{admin ? (
						<section id='accountInfo'>
							<div id='image'>
								<img id='img' src={admin.aStaffInfo.Picture} />
							</div>

							<div>
								<FormInput
									label='Name'
									type='text'
									id='Name'
									name='Name'
									placeholder={admin.aStaffInfo.Name}
									disabled={true}
								/>
								<FormInput
									label='Username'
									type='text'
									id='Username'
									name='Username'
									placeholder={admin.aStaffInfo.Username}
									disabled={true}
								/>
								<FormInput
									label='Branch'
									type='dropdown'
									id='Branches'
									name='Branches'
									value={admin.aStaffInfo.Branches}
									defaultValue={admin.aStaffInfo.Branches}
									placeholder='Select Branch'
									options={[
										{ value: 'Branch 1', label: 'Branch 1' },
										{ value: 'Branch 2', label: 'Branch 2' }
									]}
								/>
							</div>
							<div>
								<FormInput
									label='Admin ID'
									type='text'
									id='AdminID'
									name='AdminID'
									placeholder={admin.id}
									disabled={true}
								/>
								<FormInput
									label='Email'
									type='text'
									id='Email'
									name='Email'
									value={admin.aStaffInfo.Email}
								/>
								<FormInput
									label='Phone Number'
									type='text'
									id='Mobilenumber'
									name='Mobilenumber'
									value={admin.aStaffInfo.Mobilenumber}
									onChange={(e) => {
										const value = e.target.value;
										if (value.length > 11) {
											e.target.value = value.slice(0, 11);
										};
									}}
								/>
							</div>
						</section>
					) : (
						<p>No admin found</p>
					)}
					<div id='buttonGroup'>
						<Button
							title='Delete Account'
							id='delete'
							size='small'
							style={{ backgroundColor: '#c32626' }}
							onClick={() => {
								{ this.deleteAdmin() };
							}}
						/>
						<Button
							title='Update'
							id='update'
							size='small'
							onClick={() => {
								this.updateAdmin();
							}}
						/>
						<Button
							title='Cancel'
							id='cancel'
							size='small'
							theme='dark'
							onClick={() => {
								{ window.location.hash = '/admins' };
							}}
						/>
					</div>
				</form>
			</>
		);
	}
}

export default AdminDetail;
