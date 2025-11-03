import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request){
    

  const uri = "mongodb+srv://janhvisharma1:Googletest1!@cluster0.2buelrl.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    
    const products = await inventory.find({}).toArray();

    console.log(products);
    return  NextResponse.json({success:true,products})
  } finally {
    await client.close();
  }

}
export async function POST(request){
let body= await request.json();
console.log(body)    

  const uri = "mongodb+srv://janhvisharma1:Googletest1!@cluster0.2buelrl.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const products = await inventory.insertOne(body);
    return  NextResponse.json({products,ok:true})
  } finally {
    await client.close();
  }

}
