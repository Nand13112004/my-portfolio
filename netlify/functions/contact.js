import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    const { db } = await connectToDatabase();
    const contactMessage = {
      name,
      email,
      subject,
      message,
      is_read: false,
      created_at: new Date().toISOString()
    };

    const result = await db.collection('contact_messages').insertOne(contactMessage);
    
    return {
      statusCode: 201,
      body: JSON.stringify({ 
        success: true, 
        message: 'Contact message saved successfully',
        id: result.insertedId 
      }),
    };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save contact message' }),
    };
  }
}
