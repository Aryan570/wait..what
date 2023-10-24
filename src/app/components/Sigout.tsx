"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
export default function SignO() {
  return (
    <div className='flex justify-center items-center md:scale-100 scale-75'>
      <Button variant={"destructive"} onClick={()=> signOut()}>SignOut</Button>
    </div>
  )
}