"use server"

import prisma from "@/lib/prisma"

export const uploadProfilePicture = async(imageUrl:string, userId:string) => {
    try{
        const res = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                profileImage:imageUrl
            }
        })
        return res;
    }
    catch(err){
        console.error("Error updating profile picture:", err);
        return null;
    }
}