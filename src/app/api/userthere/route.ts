import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb';
interface user{
    name: string
}
export async function POST(request: Request) {
  const justBody = await request.json();
  const {db} = await connectToDatabase();
  const res = await db.collection<user>("all_details").findOne({
    name: justBody.username
  },{
    projection: {_id:0,name:1,password:1}
  })
  return NextResponse.json({res})
}