"use server";

import { clerkClient } from "@clerk/nextjs/server";

type ResourceResponse<T> = {
    data: T;
};
export type PaginatedResourceResponse<T> = ResourceResponse<T> & {
    totalCount: number;
};

export const getUsers = async (q:string = "") => { 
    const users = await clerkClient.users.getUserList({
        query: q,
        
    })
    console.log(users.data.map(user => user.fullName),users.totalCount);
    return users;
}

export const getPendingInvitations = async () => { 
    const invitations = await clerkClient.invitations.getInvitationList({
        status: "pending",
    })
    
    return invitations;
}

export const inviteUser = async (formData:FormData) => { 
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    console.log(process.env.CLERK_SECRET_KEY);
    const resp = await clerkClient.invitations.createInvitation({
        emailAddress: email,
        publicMetadata: {
            role: role
        },    
    }) 

    return {...resp};
}
