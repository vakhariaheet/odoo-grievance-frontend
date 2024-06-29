// import { useEffect, useState } from "react";
import Searchbar from "@/Components/Searchbar";
import { getPendingInvitations, getUsers,inviteUser,PaginatedResourceResponse } from "./actions/clerk";
import PopUp from "@/Components/PopUp/PopUp";
import Invite from "@/Components/Invite";
export default async function Home(params: {
  searchParams: { search?: string };
}) {
  const search = params.searchParams.search;
  const users = (await getUsers(search));
  const pendingInvitations = await getPendingInvitations();
	return (
		<main className='min-h-screen h-full p-24'>
      <h1 className=''>Users</h1>
      
      <div className="flex">
        <Searchbar />
        <Invite/>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map(user => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                <td  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.fullName}</td>
                <td  className="px-6 py-4">{user.emailAddresses[0].emailAddress}</td>
                <td  className="px-6 py-4">{(user.publicMetadata as any).role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-900 dark:text-black">
          Pending Invitations
        </h3>
        <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col"className="px-6 py-3">Email</th> 
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingInvitations.data.map(invitation => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={invitation.id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{invitation.emailAddress}</td>
                <td className="px-6 py-4">{(invitation.publicMetadata as any).role}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-5" >Resend</button>
                  <button className="text-red-600 hover:underline" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
      </div>
		</main>
	);
}

export const fetchCache = 'force-no-store';
