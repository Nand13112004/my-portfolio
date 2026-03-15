import { ChromaClient } from 'chromadb';
import Bytez from 'bytez.js';
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    return res.json({ response: output.content });

  } catch (error) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: 'Failed to process chat request' });
  }
}
