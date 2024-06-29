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
		<div className='flex items-center '>
			<button onClick={() => setShowModal(true)}
				className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-2'
			>Invite</button>
			{showModal && (
				<PopUp>
					<div className='p-5'>

						<h1 className='text-lg font-semibold text-gray-900 dark:text-black'>Invite User</h1>

						<form className='mt-5 w-full space-y-5'
							onSubmit={handleSubmit}>
							<input type='email' placeholder='Email' name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required
							/>
							<select name='role'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required
							>
								<option value='admin'>Admin</option>
								<option value='user'>Employee</option>
								<option value='hr'>HR</option>
							</select>

							<button className='text-white bg-blue-700 hover:bg-blue-800 mr-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								type='submit' 
							>Invite</button>
							<button
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
						</form>
					</div>
				</PopUp>
			)}
		</div>
	);
};

export default Invite;
