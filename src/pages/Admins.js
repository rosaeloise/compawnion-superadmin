import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

import '../css/admin.css';

class Admins extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			admins: [],
			searchTerm: '',
		};
	}

	async componentDidMount() {
		await this.fetchAdmins();
	}

	fetchAdmins = async () => {
		try {
			const response = await fetch('https://compawnion-backend.onrender.com/admins');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			console.log(data);

			this.setState({ admins: data });
		} catch (error) {
			console.error('Error fetching admins:', error);
		}
	};

	render() {
		const { admins, searchTerm } = this.state;
		const filteredAdmins = admins.filter(admin =>
			admin.aStaffInfo.Username.includes(searchTerm) || admin.aStaffInfo.Name.includes(searchTerm)
		);

		return (
			<main id='userAdmins'>
				<header id='header'>
					<h4>Admin Users</h4>
					<div>
						<Button
							title='Add New Admin'
							id='addNewAdmin'
							onClick={() => {
								window.location.hash = '/admins/add';
							}}
						/>
					</div>
				</header>

				<section id='adminAccount'>
					<Input
						type='search'
						placeholder='Search for Admin ID, Name or Username'
						onChange={this.handleSearch}
						icon={
							<svg viewBox='0 0 17 15' fill='transparent'>
								<path d='M11.5485 8.68585C11.839 8.01588 12 7.27674 12 6.5C12 3.46243 9.53757 1 6.5 1C3.46243 1 1 3.46243 1 6.5C1 9.53757 3.46243 12 6.5 12C7.72958 12 8.86493 11.5965 9.78085 10.9147M11.5485 8.68585L14.8235 10.8921C15.4731 11.3297 15.6449 12.2109 15.2073 12.8605C14.7698 13.51 13.8885 13.6819 13.239 13.2443L9.78085 10.9147M11.5485 8.68585C11.1629 9.57534 10.549 10.3429 9.78085 10.9147' stroke='var(--primary-complement)' strokeWidth='2' />
							</svg>
						}
					/>
					<table id='adminList'>
						<tr>
							<th>Admin ID</th>
							<th>Username</th>
							<th>Name</th>
							<th>Email</th>
							<th>Shelter Branch</th>
							<th>Actions</th>
						</tr>
						<tbody>
							{filteredAdmins.map((admin) => (
								<tr key={admin.id}>
									<td>{admin.id}</td>
									<td>{admin.aStaffInfo.Username}</td>
									<td>{admin.aStaffInfo.Name}</td>
									<td>{admin.aStaffInfo.Email}</td>
									<td>{admin.aStaffInfo.Branches}</td>
									<td>
										<Button
											title='View'
											size='small'
											theme='dark'
											fill='outline'
											onClick={() => {
												window.location.hash = `/admins/${admin.id}`; // Navigate to View Admin page
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
				<div id='logout'
					onClick={() => {
						window.location.hash = '/';
					}}
				>
					<svg viewBox='0 0 26 26'>
						<rect x='0.486328' y='0.796021' width='25' height='25' rx='12.5' fill='var(--primary-compliment)' />
						<path d='M6.73633 13.296L9.08008 15.6398M6.73633 13.296H13.7676M6.73633 13.296L9.08008 10.9523M12.9863 10.796V8.29602C12.9863 7.60566 13.546 7.04602 14.2363 7.04602H17.9863C18.6767 7.04602 19.2363 7.60566 19.2363 8.29602V18.296C19.2363 18.9864 18.6767 19.546 17.9863 19.546H14.2363C13.546 19.546 12.9863 18.9864 12.9863 18.296V15.796' stroke='var(--white)' strokeWidth='1' strokeLinecap='round' fill='transparent' />
					</svg>
					<p>Logout</p>
				</div>
			</main>
		)
	};

};

export default Admins;