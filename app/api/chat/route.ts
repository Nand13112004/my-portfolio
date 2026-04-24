import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let context = "";

    // 1. Fetch relevant context from MongoDB
    try {
      const mongoose = await connectToDatabase();
      const db = mongoose.connection.db;

      if (!db) {
        throw new Error("Database connection not established");
      }

      const collection = db.collection("portfolio");

      const docs = await collection.find({
        $text: { $search: message }
      }).limit(3).toArray();

      if (docs && docs.length > 0) {
        context = docs.map((d: any) => d.content || '').join("\n");
      }
    } catch (dbError) {
      console.warn("MongoDB query failed, proceeding without RAG context:", dbError);
    }

    // 2. Generate response using Gemini API
    const prompt = `You are a portfolio assistant.
Answer based only on the following context:

${context}

User question: ${message}`;

    let botResponse = "";
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(prompt);
      botResponse = result.response.text();
    } catch (geminiError) {
      console.warn("Gemini API failed, using fallback response:", geminiError);
      botResponse = "Sorry, I am currently unavailable. Please try again later or use the contact form.";
    }

    return NextResponse.json({ reply: botResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
