import React from 'react';

import Button from '../components/Button';
import Input from '../components/Input';

import '../css/admin.css';

class Applications extends React.Component {
	render() {
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
						placeholder='Search for Name or Pet ID'
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
						<tr>
							<td>000-000</td>
							<td>rosaeloise</td>
							<td>Ely Rose Bosangit</td>
							<td>sample@email.com</td>
							<td>Branch 1</td>
							<td>
								<Button
									title='View'
									size='small'
								/>
							</td>
						</tr>
						<tr>
							<td>000-000</td>
							<td>rosaeloise</td>
							<td>Ely Rose Bosangit</td>
							<td>sample@email.com</td>
							<td>Branch 1</td>
							<td>
								<Button
									title='View'
									size='small'
								/>
							</td>
						</tr>
						<tr>
							<td>000-000</td>
							<td>rosaeloise</td>
							<td>Ely Rose Bosangit</td>
							<td>sample@email.com</td>
							<td>Branch 1</td>
							<td>
								<Button
									title='View'
									size='small'
								/>
							</td>
						</tr>
						<tr>
							<td>000-000</td>
							<td>rosaeloise</td>
							<td>Ely Rose Bosangit</td>
							<td>sample@email.com</td>
							<td>Branch 1</td>
							<td>
								<Button
									title='View'
									size='small'
								/>
							</td>
						</tr>
						<tr>
							<td>000-000</td>
							<td>rosaeloise</td>
							<td>Ely Rose Bosangit</td>
							<td>sample@email.com</td>
							<td>Branch 1</td>
							<td>
								<Button
									title='View'
									size='small'
								/>
							</td>
						</tr>
					</table>
				</section>
			</main>
		)
	};

};

export default Applications;