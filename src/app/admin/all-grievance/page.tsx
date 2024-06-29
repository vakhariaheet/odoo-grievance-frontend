"use client";

import { useEffect, useState } from "react";

interface Grievance {
	id: String;
	user_id: String;
	grievance_type: String;
	title: String;
	description: String;
	assigned_to: String | null;
	assigned_type: 'HR' | 'Department';
	dep_id: String;
	severity: 'High' | 'Medium' | 'Low';
	status: 'Pending' | 'Resolved' | 'Submitted';
	created_at: string;
	updated_at: string;
	resolved_at: string;
}

const grievances: Grievance[] = [
	{
		id: 'G001',
		user_id: 'U123',
		grievance_type: 'Workplace Harassment',
		title: 'Verbal Abuse from Supervisor',
		description:
			'Experiencing repeated verbal abuse from immediate supervisor during team meetings.',
		assigned_to: 'HR001',
		assigned_type: 'HR',
		dep_id: 'D001',
		severity: 'High',
		status: 'Pending',
		created_at: '2024-06-15T09:30:00Z',
		updated_at: '2024-06-15T14:45:00Z',
		resolved_at: '',
	},
	{
		id: 'G002',
		user_id: 'U456',
		grievance_type: 'Compensation',
		title: 'Unpaid Overtime',
		description:
			'Not receiving compensation for overtime hours worked in the last month.',
		assigned_to: null,
		assigned_type: 'HR',
		dep_id: 'D002',
		severity: 'Medium',
		status: 'Submitted',
		created_at: '2024-06-18T11:20:00Z',
		updated_at: '2024-06-18T11:20:00Z',
		resolved_at: '',
	},
	{
		id: 'G003',
		user_id: 'U789',
		grievance_type: 'Work Environment',
		title: 'Inadequate Safety Measures',
		description:
			'Lack of proper safety equipment in the manufacturing department.',
		assigned_to: 'D003M',
		assigned_type: 'Department',
		dep_id: 'D003',
		severity: 'High',
		status: 'Pending',
		created_at: '2024-06-20T13:45:00Z',
		updated_at: '2024-06-21T10:30:00Z',
		resolved_at: '',
	},
	{
		id: 'G004',
		user_id: 'U234',
		grievance_type: 'Discrimination',
		title: 'Age Discrimination in Promotion',
		description:
			'Passed over for promotion due to age, despite meeting all qualifications.',
		assigned_to: 'HR002',
		assigned_type: 'HR',
		dep_id: 'D004',
		severity: 'High',
		status: 'Pending',
		created_at: '2024-06-22T16:00:00Z',
		updated_at: '2024-06-23T09:15:00Z',
		resolved_at: '',
	},
	{
		id: 'G005',
		user_id: 'U567',
		grievance_type: 'Work-Life Balance',
		title: 'Excessive Workload',
		description:
			'Consistently assigned more tasks than can be completed within regular working hours.',
		assigned_to: 'D005M',
		assigned_type: 'Department',
		dep_id: 'D005',
		severity: 'Medium',
		status: 'Resolved',
		created_at: '2024-06-25T10:30:00Z',
		updated_at: '2024-06-28T14:20:00Z',
		resolved_at: '2024-06-28T14:20:00Z',
	},
	{
		id: 'G006',
		user_id: 'U890',
		grievance_type: 'Benefits',
		title: 'Health Insurance Coverage Issue',
		description:
			'Recent medical claim wrongly denied by company health insurance.',
		assigned_to: 'HR003',
		assigned_type: 'HR',
		dep_id: 'D006',
		severity: 'Medium',
		status: 'Pending',
		created_at: '2024-06-26T09:00:00Z',
		updated_at: '2024-06-26T15:45:00Z',
		resolved_at: '',
	},
	{
		id: 'G007',
		user_id: 'U345',
		grievance_type: 'Communication',
		title: 'Lack of Transparency in Decision Making',
		description:
			'Important departmental decisions being made without consulting team members.',
		assigned_to: 'D007M',
		assigned_type: 'Department',
		dep_id: 'D007',
		severity: 'Low',
		status: 'Submitted',
		created_at: '2024-06-27T11:30:00Z',
		updated_at: '2024-06-27T11:30:00Z',
		resolved_at: '',
	},
	{
		id: 'G008',
		user_id: 'U678',
		grievance_type: 'Performance Evaluation',
		title: 'Unfair Performance Review',
		description:
			'Recent performance review does not accurately reflect achievements and contributions.',
		assigned_to: 'HR001',
		assigned_type: 'HR',
		dep_id: 'D008',
		severity: 'Medium',
		status: 'Pending',
		created_at: '2024-06-28T14:15:00Z',
		updated_at: '2024-06-29T10:00:00Z',
		resolved_at: '',
	},
	{
		id: 'G009',
		user_id: 'U901',
		grievance_type: 'Equipment',
		title: 'Outdated Software Hindering Productivity',
		description:
			'Current software version is obsolete and significantly slowing down work processes.',
		assigned_to: 'D009M',
		assigned_type: 'Department',
		dep_id: 'D009',
		severity: 'Low',
		status: 'Resolved',
		created_at: '2024-06-29T09:45:00Z',
		updated_at: '2024-06-29T16:30:00Z',
		resolved_at: '2024-06-29T16:30:00Z',
	},
	{
		id: 'G010',
		user_id: 'U432',
		grievance_type: 'Workplace Conflict',
		title: 'Ongoing Dispute with Coworker',
		description:
			'Unresolved conflict with team member affecting productivity and team morale.',
		assigned_to: null,
		assigned_type: 'HR',
		dep_id: 'D010',
		severity: 'Medium',
		status: 'Submitted',
		created_at: '2024-06-29T13:00:00Z',
		updated_at: '2024-06-29T13:00:00Z',
		resolved_at: '',
	},
];


const GrievanceHistoryPage = () => {

	const [ grievances, setGrievances ] = useState<Grievance[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await fetch(process.env.NEXT_PUBLIC_REST_API_URL + 'get_all_grievances');
			const data = await response.json();
			console.log(data.grievances);
			setGrievances(data.grievances);
		 })();
	}, []);

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8  '>
			<div className=''>
				{grievances.map((grievance) => (
					<div
						key={grievance.id as any}
						className='bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-4'
					>
						<div className='px-4 py-5 sm:px-6'>
							<h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
								Grievance ID: {grievance.id}
							</h3>
							<p className='mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400'>
								Created on: {new Date(grievance.created_at).toLocaleString()}
							</p>
						</div>
						<div className='border-t border-gray-200 dark:border-gray-700'>
							<dl>
								<div className='bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Grievance Type
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.grievance_type}
									</dd>
								</div>
								<div className='bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Title
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.title}
									</dd>
								</div>
								<div className='bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Description
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.description}
									</dd>
								</div>
								<div className='bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Severity
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.severity}
									</dd>

									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Status
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										<div>
											<button
												id='dropdownDefaultButton'
												data-dropdown-toggle='dropdown'
												className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
												type='button'
											>
												{grievance.status}{' '}
												<svg
													className='w-2.5 h-2.5 ms-3'
													aria-hidden='true'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 10 6'
												>
													<path
														stroke='currentColor'
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='m1 1 4 4 4-4'
													/>
												</svg>
											</button>

											<div
												id='dropdown'
												className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
											>
												<ul
													className='py-2 text-sm text-gray-700 dark:text-gray-200'
													aria-labelledby='dropdownDefaultButton'
												>
													<li>
														<button
															
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
														>
															Submitted
														</button>
													</li>
													<li>
														<button
															
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
														>
															Pending
														</button>
													</li>
													<li>
														<button
															
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
														>
															Resolved
														</button>
													</li>
													
												</ul>
											</div>
										</div>
									</dd>

									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Assigned To
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.assigned_to
											? grievance.assigned_to
											: 'Unassigned'}
									</dd>

									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Assigned Type
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.assigned_type}
									</dd>

									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Department ID
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.dep_id}
									</dd>

									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Updated At
									</dt>

									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{new Date(grievance.updated_at).toLocaleString()}
									</dd>

									<dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										Resolved At
									</dt>
									<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2'>
										{grievance.resolved_at
											? new Date(grievance.resolved_at).toLocaleString()
											: 'Not resolved yet'}
									</dd>

									<div className='col-span-3 sm:col-span-3'>
										<div className='flex justify-end'>
											<button
												type='button'
												className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
											>
												View Chat
											</button>
										</div>
									</div>
								</div>
							</dl>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GrievanceHistoryPage;
