import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification
    try {
      await sendContactEmail(name, email, subject, message);
    } catch (mailError) {
      console.error("Error sending notification email:", mailError);
      // We don't return an error to the user if the email fails, 
      // since the message is already saved in the DB.
    }

    return NextResponse.json({ success: true, data: newContact }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
