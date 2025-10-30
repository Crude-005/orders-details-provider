import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import clientPromise from '@/lib/mongodb';

export async function GET(request : NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cID = searchParams.get('customerId') || '';
    const oID = searchParams.get('orderId') || '';

    const client = await clientPromise;
    const db = client.db('keshav'); // Make sure this matches your DB name
    const collection = db.collection('customer');

    let query = {};
    if (cID == '') {
      query = {"Order ID" : oID };
    }
    else if( oID == ''){
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