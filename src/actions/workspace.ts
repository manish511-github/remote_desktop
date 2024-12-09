import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'


export const verifyAcccessToWorkspace = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if (!user) return {status: 403}
        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspaceId,
                OR: [
                    {
                        User: {
                            clerkid: user.id
                        }
                    },
                    {
                        members: {
                            every: {
                                User: {
                                    clerkid: user.id
                                }
                            }
                        }
                    }
                ]
            }
        })
        return {
            status: 200,
            data: {workspace: isUserInWorkspace}
        }
    } catch (error) {
        return {
            status: 403,
            data: {workspace: null}
        }
    }
}

export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const isFolders = await client.folder.findMany({
            where: {
                workspaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true,
                    }
                }
            }
        })
        if (isFolders) return {status: 200, data: isFolders}
        return {status: 404, data: []}
    } catch (error) {
        return {status: 403, data: []}
    }
}
export const getAllUserVideos = async (workspaceId : string) => {
 try {
    const user = await currentUser()
    if (!user) return {status : 404}
    const videos = await client.video.findMany({
        where : {
            OR : [{workspaceId}, {folder : {workspaceId}}]
        },
        select :{
            id : true,
            title : true, 
            createdAt : true,
            source : true, 
            processing : true,
            Folder: {
                select : {
                    id : true,
                    name : true
                },

            },
            User : {
                select : {
                    firstName : true,
                    lastName : true,
                    image : true
                }
            },
            orderBy : {
                createdAt : 'asc'
            }
        }
    })

    if (videos && videos.length > 0) return {status: 200, data: videos}
    return {status: 404}
 } catch (error) {
    return {status: 403}
 }
}
export const getWorkspaces = async () => {
    try {
        const user = await currentUser()
        if (!user) return {status: 404}
        const workspaces = await client.user.findUnique({
            where : {
                clerkid : user.id
            },
            select : {
                subscription : {
                    select : {
                        plan : true
                    }
                },
                workspace: {
                    select : {
                        id : true,
                        name : true,
                        type : true 
                    }
                },
                members : {
                    select : {
                        workSpace : {
                            select : {
                                id : true,
                                name : true,
                                type : true 
                            }
                        }
                    }
                }
            }
        })
        if (workspaces) return {status: 200, data: workspaces}
        
    } catch (error) {
        return {status: 400}
    }
}

export const getNotifications = async () => {
    try {
        const user = await currentUser()
        if (!user) return {status: 404}
        const notifications = await client.user.findUnique({
            where : {
                clerkid : user.id
            },
            select : {
                notifications : true,
                _count : {
                    select : {
                        notifications : true
                    }
                }
            }
        })
        if (notifications && notifications.length > 0)
            return { status: 200, data: notifications}
        return {status: 404, data: []}
    } catch (error) {
        return {status: 400, data: []}
    }
}
