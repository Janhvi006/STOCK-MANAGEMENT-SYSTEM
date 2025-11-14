import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const uri = "mongodb+srv://janhvisharma1:Googletest1%21@cluster0.2buelrl.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    // CONNECT to MongoDB
    await client.connect();

    const database = client.db("inventory");
    const items = database.collection("items");

    // fetch ALL items
    const data = await items.find({}).toArray();

    return NextResponse.json({
      success: true,
      count: data.length,
      data: data
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );

  } finally {
    await client.close();
  }
}
