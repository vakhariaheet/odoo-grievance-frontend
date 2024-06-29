"use client";

import { getClientInfo } from "@/app/admin/chat/actions";
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


const GrievanceHistoryPage = () => {
	const [ grievances, setGrievances ] = useState<Grievance[]>([]);
	
	const fetchGrievances = async () => {
		const user = await getClientInfo();
		const response = await fetch('/get_grievance_details/' + user.id);
		const data = await response.json();
		setGrievances(data.grievances);
		console.log(data);
	}
	useEffect(() => {
		(async () => {
			await fetchGrievances();
		 })();
	},[])
	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
			<div className="">
				{grievances.map((grievance) => (
					<div key={grievance.id as any} className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-4">
						<div className="px-4 py-5 sm:px-6">
							<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
								Grievance ID: {grievance.id}
							</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
								Created on: {new Date(grievance.created_at).toLocaleString()}
							</p>
						</div>
						<div className="border-t border-gray-200 dark:border-gray-700">
							<dl>
								<div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Grievance Type</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.grievance_type}
									</dd>
								</div>
								<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.title}
									</dd>
								</div>
								<div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.description}
									</dd>
								</div>
								<div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Severity</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.severity}
									</dd>

									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.status}
									</dd>

									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.assigned_to ? grievance.assigned_to : 'Unassigned'}
									</dd>

									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned Type</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.assigned_type}
									</dd>

									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department ID</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.dep_id}
									</dd>

									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated At</dt>

									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{new Date(grievance.updated_at).toLocaleString()}
									</dd>

									<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved At</dt>
									<dd className="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
										{grievance.resolved_at
											? new Date(grievance.resolved_at).toLocaleString()
											: 'Not resolved yet'}
									</dd>

									<div className="col-span-3 sm:col-span-3">
										<div className="flex justify-end">
											<button
												type="button"
												className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											>
												View Chat
											</button>
										</div>

									</div>

								</div>
							</dl>
						</div>
				
					
					</div>))}
			</div>
		</div>
	);
};


export default GrievanceHistoryPage;