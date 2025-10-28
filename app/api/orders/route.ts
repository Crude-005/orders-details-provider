import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import clientPromise from '@/lib/mongodb';

export async function GET(request : NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cID = parseInt(searchParams.get('customerId') || '-1');
    const oID = parseInt(searchParams.get('orderId') || '-1');

    const client = await clientPromise;
    const db = client.db('keshav'); // Make sure this matches your DB name
    const collection = db.collection('customer');

    let query = {};
    if (cID == -1) {
      query = {"Order ID" : oID };
    }
    else if( oID == -1){
      query = {"Customer ID" : cID };
    }
    else{
      query = {"Customer ID" : cID,"Order ID" : oID };
    }
    const orders = await collection.find(query).toArray();



    // const orders = await collection.find({}).toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error loading orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to load data' }, { status: 500 });
  }
}