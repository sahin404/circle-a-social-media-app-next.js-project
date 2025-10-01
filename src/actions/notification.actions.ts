"use server";

import prisma from "@/lib/prisma";
import { getUserIdFromDb } from "./user.actions";


export const getNotifications = async() =>{
    const dbUserId = await getUserIdFromDb();
    if(!dbUserId) return;
    // console.log('hi', dbUserId);
    try{
        const notifications = await prisma.notification.findMany({
            where:{
                userId:dbUserId
            },
            orderBy:{
                createdAt:"desc"
            },
            include:{
                creator:{
                    select:{
                        profileImage:true,
                        username:true,
                        name:true,
                    }
                },
                post:{
                    select:{
                        content:true,
                        Image:true
                    }
                },
                comment:{
                    select:{
                        content:true
                    }
                }

            }
        })

        return {notifications, success:true};

    }
    catch(err){
        console.log('An error occured to fetching notifications'), err;
        return {success:false};
    }
}

