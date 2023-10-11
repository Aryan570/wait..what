import { connectToDatabase } from '../../../../lib/mongodb';
import { NextResponse } from 'next/server'

export async function GET(request: Request){
    let { db } = await connectToDatabase();
    const res = await db.collection("all_details").find().toArray();
    return NextResponse.json( res )
}