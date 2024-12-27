import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

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
		console.log('a');
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
					window.location.hash = '/admins';
				} else {
					alert('Failed to update admin');
				}
			})
			.catch(err => console.error);
	}

	async deleteAdmin() {
		const AdminId = location.hash.split('/').pop();

		try {
			const response = await fetch(`https://compawnion-backend.onrender.com/admins/${AdminId}`, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw new Error('Failed to delete admin');
			}
			window.location.hash = '/admins';
		} catch (error) {
			alert('An error occurred. Please try again.');
		}
	}

	render() {
		const { admin, loading, error } = this.state;

		if (loading) return <p>Loading...</p>;
		if (error) return <p>{error}</p>;

		return (
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
						onClick={() => {
							{ this.deleteAdmin() };
						}}
					/>
					<Button
						title='Save'
						id='save'
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
		);
	}
}

export default AdminDetail;
