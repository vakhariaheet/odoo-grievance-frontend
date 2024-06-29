"use server";
import { currentUser } from "@clerk/nextjs/server"

export const getClientInfo = async () => { 
    const user = await currentUser();
    return {
        id: user?.id,
        fullName: user?.fullName,
        email: user?.emailAddresses[0].emailAddress,
       
        metadata: user?.publicMetadata,
    }
}

