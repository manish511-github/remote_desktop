'use client'
import React from 'react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaces } from '@/actions/workspace'
import { PlusCircle } from 'lucide-react'
import Modal from '../modal'
import Search from '../search'
type Props = {
  activeWorkspaceId : string
}
import { usePathname,useRouter } from 'next/navigation'
import { NotificationProps,WorkspaceProps } from '@/types/inde.type'
import { MENU_ITEMS } from '@/constants'
import SidebarItem from './sidebar-item'

const Sidebar = ({activeWorkspaceId}: Props) => {
const pathName = usePathname()

const router = useRouter()
const {data ,isFetched} = useQueryData(['user-workspaces'],getWorkspaces)
const menuItems =MENU_ITEMS(activeWorkspaceId)
const {data : workspace} = data as WorkspaceProps
const { data: count } = notifications as NotificationProps

const onChangeActiveWorkspace = (value : string) => {
  router.push(`/dashboard/${value}`)
}
const currentWorkspace = workspace.workspace.find(
  (s) => s.id === activeWorkspaceId
)


  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden '>
      <div className='bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0 '>
      <Image
          src="/opal-logo.svg"
          height={40}
          width={40}
          alt="logo"
        />
        <p className="text-2xl">Opal</p>
       
      </div>g
      <Select defaultValue ={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
      <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace)=>(
              <SelectItem key={workspace.id} value={workspace.id}>{workspace.name}</SelectItem>
            ))}
            {workspace.members.length>0 && workspace.members.map(workspace=> workspace.WorkSpace && (
              <SelectItem key={workspace.WorkSpace.id} value={workspace.WorkSpace.id}>{workspace.WorkSpace.name}</SelectItem>
            ))}
        </SelectGroup>
        </SelectContent>

        
      </Select>
      {currentWorkspace?.type === 'PUBLIC' &&
        workspace.subscription?.plan == 'PRO' && (
     <Modal trigger={
      <span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2'>
        <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500' ></PlusCircle>
        <span className='text-neutral-400 font-semibold text-xs'>Invite to Workspace</span>
      </span>
     }  title="Invite To Workspace"
     description="Invite other users to your workspace">
       <Search workspaceId={activeWorkspaceId} />

     </Modal>
              )}
    <p className='w-full text-[#9D9D9D] font-bold mt-4'>Menu</p>
    <nav className='w-full'>
      <ul>
      {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === 'Notifications' &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
      </ul>
    </nav>
    </div>
  )
}

export default Sidebar