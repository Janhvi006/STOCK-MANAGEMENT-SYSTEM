
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request){
const {action,product,initialQuantity}= await request.json();
console.log({ action, product, initialQuantity });
 

  const uri = "mongodb+srv://janhvisharma1:Googletest1!@cluster0.2buelrl.mongodb.net/";
  const client = new MongoClient(uri);
  try {
   const database = client.db('stock');
    const inventory = database.collection('inventory');
    const filter = { product:product};
let newQuantity=action=="plus"? (parseInt(initialQuantity) + 1):(parseInt(initialQuantity)-1)
    const updateDoc = {
      $set: {
        quantity:newQuantity
      },
    };
    const result = await inventory.updateOne(filter, updateDoc, 
        {}
    );
    return NextResponse.json({success:true,message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,})
  } finally {
    
    await client.close();
  }

}