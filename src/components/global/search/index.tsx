import React from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearch } from '@/hooks/useSearch'


type Props = {
    workspaceId : string
}
const dummyUsers = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' },
    { id: '4', name: 'Dana White' },
];


const Search = ({workspaceId}: Props) => {
    const {query,onSearchQuery,isFetching,onUsers} = useSearch('get-users','USERS')

  return (
    <div className='flex flex-col gap-y-5'>
        <Input onChange={onSearchQuery} value={query} className="bg-transparent border-2 outline-none" placeholder="Search for your user..." type="text"></Input>
        {isFetching ? (
            <div>
                  <Skeleton className="w-full h-8 rounded-xl" />
            </div>
        ):!onUsers?(
            <p className="text-center text-sm text-[#a4a4a4]">No Users Found</p>            
        ):(<div>
            {dummyUsers.map((user)=>(
                <div key = {user.id} className=''></div>
            ))}
        </div>)}
        </div>
  )
}

export default Search