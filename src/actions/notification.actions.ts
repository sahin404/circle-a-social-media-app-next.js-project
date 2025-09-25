"use server";

import prisma from "@/lib/prisma";


export const getNotifications = async() =>{
    try{
        const notifications = await prisma.notification.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                creator:{
                    select:{
                        image:true,
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

