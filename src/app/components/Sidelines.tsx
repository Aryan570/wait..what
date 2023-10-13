//check for separator too
import Image from 'next/image'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '../../../lib/mongodb'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from './ui/button'
import {PlusCircle,Plus} from 'lucide-react'
const Sidelines = async () => {
    const session = await getServerSession(authOptions);
    const { db } = await connectToDatabase();
    const res = await db.collection("all_details").findOne({
        name: session.name,
        password: session.password
    })
    const urlR = res ? res.fileURL : '/fatrat.jpg'; ///have to do something here
    return (
        <div>
            <div className=' grid grid-cols-6 grid-rows-6'>
                <div className='col-start-1 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed'><Image className='object-cover' src='/checkk.png' alt='left_logo' width={400} height={400} /></div>
                <div className='relative text-center col-start-2 col-span-4 row-start-1 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] border-dashed'>
                    <Image className='object-cover' src={urlR} alt='Cover Picture' fill={true} />
                </div>
                <div className='col-start-2 min-h-screen  col-span-4 row-start-2 row-span-4 text-center border-l-[0.5px] border-r-[0.5px] border-dashed'>3</div>
                <div className='col-start-6 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed'>
                    <Avatar>
                        <AvatarImage src={urlR} />
                        <AvatarFallback>WW</AvatarFallback>
                    </Avatar>
                    <Button><div className='flex justify-between items-center text-lg font-bold'><Plus strokeWidth={2}/><div className='px-1'></div>Post</div></Button>
                </div>
            </div>
        </div>
    )
}
export default Sidelines
