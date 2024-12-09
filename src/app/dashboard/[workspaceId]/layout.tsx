import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'
import { 
  verifyAcccessToWorkspace,
  getWorkspaceFolders,
  getAllUserVideos,
  getWorkspaces,
  getNotifications 
} from '@/actions/workspace'
import { QueryClient } from '@tanstack/react-query'
type Props = {
    params : {
        workspaceId : string
    }
    children : React.ReactNode
}

const Layout = async ({params :{workspaceId },children }: Props) => {
    const auth = await onAuthenticateUser()
    if (!auth.user?.workspace)
        redirect('/auth/sign-in')
    if (!auth.user?.workspace.length) 
        redirect('/auth/sign-in')
    const hasAccess = await verifyAcccessToWorkspace(workspaceId)
    if (hasAccess.status !== 200){
        redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }
    if (!hasAccess.data?.workspace) return null
    
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey : ['workspace-folders'],
        queryFn : () => getWorkspaceFolders(workspaceId)
    })
    await query.prefetchQuery({
        queryKey : ['user-videos'],
        queryFn : () => getAllUserVideos(workspaceId)
    })
    await query.prefetchQuery({
        queryKey : ['user-workspaces'],
        queryFn : () => getWorkspaces()
    })
    await query.prefetchQuery({
        queryKey : ['user-notifications'],
        queryFn : () => getNotifications()
    })
    
    return <div>Layout</div>



}

export default Layout

