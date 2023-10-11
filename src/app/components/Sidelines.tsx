import Image from 'next/image'
import React from 'react'
const Sidelines = () => {
    return (
        <div>
            <div className=' grid grid-cols-6 grid-rows-6'>
                <div className='col-start-1 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed'>left</div>
                <div className='relative text-center col-start-2 col-span-4 row-start-1 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] border-dashed'>
                    <Image className='object-cover' src='/fatrat.jpg' alt='Cover Picture' fill={true}/>
                </div>
                <div className='col-start-2 min-h-screen  col-span-4 row-start-2 row-span-4 text-center border-l-[0.5px] border-r-[0.5px] border-dashed'>3</div>
                <div className='col-start-6 col-span-1 row-start-1 row-span-1 text-center border-b-[0.5px] border-dashed'>right</div>
            </div>
        </div>
    )
}
export default Sidelines
