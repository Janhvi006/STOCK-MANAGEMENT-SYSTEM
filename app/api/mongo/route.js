import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request){
    

  // Replace the uri string with your connection string
  const uri = "mongodb+srv://janhvisharma1:Googletest1!@cluster0.2buelrl.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db('inventory');
    const movies = database.collection('items');

    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { };
    const movie = await movies.findOne(query);

    console.log(movie);
    return  NextResponse.json({"a":34,movie})
  } finally {
    await client.close();
  }

}
