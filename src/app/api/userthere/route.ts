import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb';
interface user{
    name: string,
    password: string
}
export async function POST(request: Request) {
  const justBody = await request.json();
  const {db} = await connectToDatabase();
  // console.log(justBody.username)
  const uname = justBody.username;
  const pass = justBody.password
  const res = await db.collection<user>("all_details").findOne({
    name: justBody.username,
    password: justBody.password
  },{
    projection: {_id:0,name:1,password:1}
  })
  // const data = await res.json()
  // console.log(res);
  return NextResponse.json({res})
}