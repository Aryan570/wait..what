import React from 'react'
const GetTesting  = async () => {
  const to_map = await (await fetch("http://localhost:3000/api/testing",{next:{revalidate:0}})).json() //opting out of caching
  return (
    <div className='bg-red-700'>
      {to_map.map((prod : any)=>(
        <div key={prod._id} className='bg-gray-50 w-32 text-pink-600'>
          {prod.name}
        </div>
      ))}
    </div>
  )
}

export default GetTesting
