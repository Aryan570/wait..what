import Image from 'next/image'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '../../../lib/mongodb'
import { SheetDemo } from './PostHere'
import { ArrowRightIcon } from "lucide-react"
import { redirect } from 'next/navigation'
import SignO from './Sigout'
import Link from 'next/link'
const Sidelines = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/login')
    const { db } = await connectToDatabase();
    const res = await db.collection("all_details").findOne({
        name: session.name,
        password: session.password
    })
    const urlR = res ? res.fileURL : '/fatrat.png';
    let resPost = res?.posts;
    if (!resPost) {
        resPost = [{
            title: "Post Something",
            content: "Do something Please"
        }]
    }
    interface Ele {
        title: string,
        content: string,
        date: string
    }
    return (
        <div>
            <div className='relative'>
                <div aria-hidden={true} className='absolute transform-gpu overflow-hidden blur-3xl -z-50 inset-x-0 pointer-events-none'>
                    <div
                     style={{
                        clipPath:
                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                      }}
                     className='relative aspect-[1155/500] -translate-x-8 rotate-[30deg] bg-gradient-to-b from-purple-400 via-violet-500 to-indigo-600 left-[calc(50%-30rem)] w-[72.1875rem] opacity-40'/>
                </div>
            </div>
            <div className=' grid grid-cols-6 grid-rows-6 max-h-screen min-h-screen'>
                <div className='col-start-1 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed flex justify-center items-center'><div className='overflow-hidden flex justify-center items-center '><Image className='object-cover overflow-hidden' src='/realLogo.png' alt='left_logo' width={100} height={100} /></div></div>
                <div className='relative text-center col-start-2 col-span-4 row-start-1 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] border-dashed'>
                    <Link href={'/getimg'}>
                    <div className="bg-[url('/chekkkss.svg')] z-10 w-full h-full absolute"></div>
                    <Image className='object-cover ' src={urlR} alt='Cover Picture' fill={true} />
                    </Link>
                </div>
                <div className='col-start-2 col-span-4 row-start-auto row-span-4 border-l-[0.5px] border-r-[0.5px] border-dashed overflow-scroll scrollbar-hide'>
                    {resPost.reverse().map((ele: Ele) => (
                        <div className='bg-slate-800 rounded-xl m-1 py-2' key={ele.title}>
                            <div className='flex justify-between'>
                                <div className='p-2 text-lg font-bold'>{ele.title}</div>
                                <div className='p-2 text-lg'>{ele.date}</div>
                            </div>
                            <hr className=' mx-2 opacity-70' />
                            <div className='p-2 break-words'>{ele.content}</div>
                        </div>
                    ))}
                </div>
                <div className='col-start-6 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed flex justify-center items-center'>
                    <SheetDemo />
                </div>
                <div className='row-start-6 border-t-[0.5px] border-dashed flex justify-center items-center'><SignO/></div>
                <div className='row-start-6 border-t-[0.5px] border-l-[0.5px] border-r-[0.5px] col-start-2 col-span-4 border-dashed flex justify-center items-center'>
                    <div className='flex'><p className='text-lg underline decoration-white'>Want to see something colorful?</p><ArrowRightIcon strokeWidth={1} /></div>
                </div>
                <div className='row-start-6 border-t-[0.5px] col-start-6 border-dashed flex justify-center items-center'><Link href={'https://ghiblily.vercel.app/'} target='_blank'><Image src='/ghib.png' alt='ghiblily' width={100} height={100} /></Link></div>
            </div>
        </div>
    )
}
export default Sidelines


// bg-gradient-to-r from-violet-200 to-pink-200
//className='relative left-[calc(50%-11rem)] aspect-[1155/500] w-[36.125rem] -translate-x-8 rotate-[30deg] bg-gradient-to-b from-purple-400 via-violet-500 to-indigo-600 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] opacity-40'/>
// to do- 
// signOut function   /// DONE
//font size of signup and login ///DONE
//link to ghiblily             ///DONE
//realistingly speaking this project might be over on 23 October 2023
//mobile view  --- this is the big -------------- Mobile view remaining  // its done i guess
//encrypt the passwords.  /// DONE
