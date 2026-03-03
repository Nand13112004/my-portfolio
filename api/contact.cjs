const { MongoClient } = require('mongodb');

console.log('Function started');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';

console.log('Environment check:', {
  hasMongoUri: !!MONGODB_URI,
  dbName: MONGODB_DB_NAME
});

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is missing');
  throw new Error('MONGODB_URI environment variable is required');
}

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB_NAME);
    
    console.log('MongoDB connected successfully');
    
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  try {
    console.log('Request received:', {
      method: req.method,
      url: req.url,
      headers: req.headers
    });

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS request');
      return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      console.log('Method not allowed:', req.method);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('Request body:', req.body);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message });
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Connecting to database...');
    const { db } = await connectToDatabase();
    
    const contactMessage = {
      name,
      email,
      subject,
      message,
      is_read: false,
      created_at: new Date().toISOString()
    };

    console.log('Inserting message:', contactMessage);

    const result = await db.collection('contact_messages').insertOne(contactMessage);
    
    console.log('Message inserted successfully:', result.insertedId);
    
    return res.status(201).json({ 
      success: true, 
      message: 'Contact message saved successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error in contact function:', error);
    return res.status(500).json({ 
      error: 'Failed to save contact message',
      details: error.message 
    });
  }
};
