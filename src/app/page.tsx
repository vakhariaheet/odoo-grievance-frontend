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
      <div className="mt-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="">Name</th> 
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map(user => (
              <tr key={user.id}>
                <td className="text-center">{user.fullName}</td>
                <td className="text-center">{user.emailAddresses[0].emailAddress}</td>
                <td className="text-center">{(user.publicMetadata as any).role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="w-full">
          <thead>
            <tr>
              <th className="">Email</th> 
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {pendingInvitations.data.map(invitation => (
              <tr key={invitation.id}>
                <td className="text-center">{invitation.emailAddress}</td>
                <td className="text-center">{(invitation.publicMetadata as any).role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
		</main>
	);
}

export const fetchCache = 'force-no-store';
