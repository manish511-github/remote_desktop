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
type Props = {
  activeWorkspaceId : string
}
import { useRouter } from 'next/navigation'
import { WorkspaceProps } from '@/types/inde.type'


const Sidebar = ({activeWorkspaceId}: Props) => {

const router = useRouter()
const {data ,isFetched} = useQueryData(['user-workspaces'],getWorkspaces)
const {data : workspace} = data as WorkspaceProps
const onChangeActiveWorkspace = (value : string) => {
  router.push(`/dashboard/${value}`)
}


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
        </SelectGroup>
        </SelectContent>

        
      </Select>
      
    </div>
  )
}

export default Sidebar