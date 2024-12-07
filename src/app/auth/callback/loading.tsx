import { Spinner } from '@/components/global/loader/spinner'
import React from 'react'

type Props = {}

const AuthLoading = (props: Props) => {
  return (
   <div >
    <Spinner></Spinner>
   </div>
  )
}

export default AuthLoading