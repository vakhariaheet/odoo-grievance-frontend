'use client';

import { inviteUser } from '@/app/actions/clerk';
import PopUp from './PopUp/PopUp';
import { useState } from 'react';

const Invite = () => {
	const [showModal, setShowModal] = useState(false);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		await inviteUser(formData);
		setShowModal(false);
	};
	return (
		<div>
			<button onClick={() => setShowModal(true)}>Invite</button>
			{showModal && (
				<PopUp>
					<div>
						<h1>Invite User</h1>
						<form onSubmit={handleSubmit}>
							<input type='email' placeholder='Email' name='email' />
							<select name='role'>
								<option value='admin'>Admin</option>
								<option value='user'>Employee</option>
								<option value='hr'>HR</option>
							</select>

							<button type='submit'>Invite</button>
						</form>
					</div>
				</PopUp>
			)}
		</div>
	);
};

export default Invite;
