//check for separator too
import Image from 'next/image'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '../../../lib/mongodb'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { SheetDemo } from './PostHere'
const Sidelines = async () => {
    const session = await getServerSession(authOptions);
    const { db } = await connectToDatabase();
    const res = await db.collection("all_details").findOne({
        name: session.name,
        password: session.password
    })
    const urlR = res ? res.fileURL : '/fatrat.jpg'; ///have to do something here
    let resPost = res?.posts;
    if(!resPost){
        resPost = [{
            title: "Post Something",
            content: "Do something Please"
        }]
    }
    // console.log(resPost)
    interface Ele{
        title: string,
        content: string,
        date: string
    }
    return (
        <div>
            <div className=' grid grid-cols-6 grid-rows-6 max-h-screen min-h-screen'>
                <div className='col-start-1 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed'><div className='overflow-hidden flex justify-center items-center '><Image className='object-cover overflow-hidden' src='/checkk.png' alt='left_logo' width={100} height={100} /></div></div>
                <div className='relative text-center col-start-2 col-span-4 row-start-1 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] border-dashed'>
                    <div className="bg-[url('/chekkkss.svg')] z-10 w-full h-full absolute"></div>
                    <Image className='object-cover ' src={urlR} alt='Cover Picture' fill={true} />
                </div>
                {/* <div className='col-start-2 min-h-screen  col-span-4 row-start-2 row-span-4 text-center border-l-[0.5px] border-r-[0.5px] border-dashed'>3</div> */}
                <div className='col-start-2 col-span-4 row-start-auto row-span-4 border-l-[0.5px] border-r-[0.5px] border-dashed overflow-scroll scrollbar-hide'>
                    {resPost.reverse().map((ele : Ele) =>(
                        <div className='bg-slate-800 rounded-xl m-1 py-2 ' key={ele.title}>
                            <div className='flex justify-between'>
                                <div className='p-2 text-lg font-bold'>{ele.title}</div>
                                <div className='p-2 text-lg'>{ele.date}</div>
                            </div>
                            <hr className=' mx-2 opacity-70'/>
                            <div className='p-2 break-words'>{ele.content}</div>
                        </div>
                    ))}
                </div>
                <div className='col-start-6 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed flex justify-center items-center'>
                    {/* <Avatar>
                        <AvatarImage src={urlR} />
                        <AvatarFallback>WW</AvatarFallback>  We'll see if we want to use avatar
                    </Avatar> */}
                    <SheetDemo />
                </div>
                <div className='row-start-6 border-t-[0.5px] border-dashed'></div>
                <div className='row-start-6 border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] col-start-2 col-span-4 border-dashed'></div>
                <div className='row-start-6 border-t-[0.5px] col-start-6 border-dashed'></div>
            </div>
        </div>
    )
}
export default Sidelines
