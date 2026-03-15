import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { ChromaClient } from 'chromadb';
import Bytez from 'bytez.js';
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
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

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
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
    
    res.status(201).json({ 
      success: true, 
      message: 'Contact message saved successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Query ChromaDB
    const chromaClient = new ChromaClient({
      host: process.env.CHROMA_HOST,
      ssl: true,
      tenant: process.env.CHROMA_TENANT,
      database: process.env.CHROMA_DATABASE,
      headers: {
        "x-chroma-token": process.env.CHROMA_API_KEY
      }
    });

    const collection = await chromaClient.getCollection({
      name: 'nand-portfolio',
      embeddingFunction: new DefaultEmbeddingFunction()
    });

    // Search Chroma
    const results = await collection.query({
      queryTexts: [message],
      nResults: 3
    });

    const contextStr = results.documents.flat().join("\n");

    // 2. Query Bytez API
    const bytezClient = new Bytez(process.env.BYTEZ_API_KEY);
    const model = bytezClient.model("inference-net/Schematron-3B");

    const prompt = `
You are an AI assistant for Nand Delvadiya's professional portfolio.
Your goal is to provide clean, structured, and professional answers like ChatGPT.

### Formatting Rules:
1. **Markdown**: Use Markdown for everything. Use ## for titles and ### for sections.
2. **Bullet Points**: Always use bullet points for lists using the "*" character. Never write list items as plain lines.
3. **Spacing**: Always add spacing between sections and before/after headings.
4. **Structure**: Break long answers into sections. No long paragraphs.
5. **Projects & Experience**: Use detailed structured sections with emojis.
   - For Experience/Internships, use headings for the role and bold for "Responsibilities" and "Technologies Used".
6. **Emojis**: Use subtle emojis (🚀, ⚙️, 📊, ⚡, 🔒, 📦) for visual structure.
7. **Conciseness**: Keep simple answers short and lists clean.

Portfolio Data for Context:
${contextStr}

User Question:
${message}
`;

    const { error, output } = await model.run([
      {
        role: "user",
        content: prompt
      }
    ]);

    if (error) {
      console.error("Bytez Error:", error);
      return res.status(500).json({ error: 'AI generation failed' });
    }

    res.json({ response: output.content });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Local API server running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/contact`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (cachedClient) {
    await cachedClient.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});
