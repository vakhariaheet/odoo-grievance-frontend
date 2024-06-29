import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddGrievancePage = () => {
	const handleSubmit = async (formData: FormData) => {
		'use server';
		const { sessionId } = auth();
		if (!sessionId) return;
		const files = formData.getAll('files');
		console.log('files', files);
		const attachments: string[] = [];
		const token = await clerkClient.sessions.getToken(sessionId, 'jwt_token');
		for (const file of files as File[]) {
			console.log('file', file);
			const fileData = new FormData();
			fileData.append('file', file as Blob);
			fileData.append('user_id', (await currentUser())?.id as string);
			const fileResponse = await fetch(process.env.NEXT_PUBLIC_REST_API_URL + 'upload', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token.jwt}`,
				},
				body: fileData,
			});
			const fileJson = await fileResponse.json();
			attachments.push(fileJson.url);
		}

		const data = {
			grievance_type: formData.get('grievance_type') as string,
			title: formData.get('subject') as string,
			description: formData.get('message') as string,
			user_id: (await currentUser())?.id,
			attachments: attachments,
		};
		console.log('data', data);
		const response = await fetch(process.env.NEXT_PUBLIC_REST_API_URL + 'grievance', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.jwt}`,
			},
			body: JSON.stringify(data),
		});
		redirect('/employee/history-grievance');

		console.log('response', response);
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
			<form className=' mx-auto' action={handleSubmit}>
				<div className='relative z-0 w-full mb-5 group'>
					<label
						htmlFor='grievance_type'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Grievance Type
					</label>
					<select
						id='grievance_type'
						name='grievance_type'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					>
						<option value=''>Select a type</option>
						<option value='harassment'>Harassment</option>
						<option value='discrimination'>Discrimination</option>
						<option value='pay'>Pay</option>
						<option value='workplace'>Workplace</option>
						<option value='other'>Other</option>
					</select>
				</div>

				<div className='relative z-0 w-full mb-5 group'>
					<label
						htmlFor='subject'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Subject
					</label>
					<input
						id='subject'
						type='text'
						name='subject'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						required
					/>
				</div>
				<div className='relative z-0 w-full mb-5 group'>
					<label
						htmlFor='message'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Description
					</label>
					<textarea
						id='message'
						name='message'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						rows={5}
						required
					></textarea>
				</div>
				<div className='max-w-lg mx-auto'>
					<label
						htmlFor='grievance_type'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Upload Files
					</label>
					<input
						className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
						id='grievance_type'
						type='file'
						name='files'
						multiple
					/>
				</div>
				<button
					type='submit'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddGrievancePage;
