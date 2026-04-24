const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB.");
    const db = client.db(process.env.MONGODB_DB_NAME || "portfolio");
    const collection = db.collection("portfolio");

    // Clear old resume data
    await collection.deleteMany({ source: "resume" });

    // Hardcoded Resume Data for RAG
    const docs = [
  {
    "title": "About Me",
    "content": "I am Nand Delvadiya, a Full Stack Developer specializing in the MERN stack. I build scalable, real-time web applications and intelligent systems. I focus on backend architecture, performance optimization, and clean user interfaces. I am currently looking for internship and freelance opportunities."
  },
  {
    "title": "Core Skills",
    "content": "My core skills include MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, REST APIs, WebSockets, and JWT authentication. I develop scalable and production-ready applications."
  },
  {
    "title": "Programming Skills",
    "content": "I work with JavaScript, TypeScript, Python, Java, and C++. I use these languages to build full stack applications and data-driven systems."
  },
  {
    "title": "Database Skills",
    "content": "I use MongoDB Atlas and PostgreSQL for database management. I design optimized schemas and handle large-scale data efficiently."
  },
  {
    "title": "Tools & Technologies",
    "content": "I use Git, GitHub, Postman, MongoDB Compass, VS Code, Docker, AWS (EC2, S3), Netlify, Render, and Cloudinary for development and deployment."
  },
  {
    "title": "AI & ML Skills",
    "content": "I have experience with TensorFlow, Keras, OpenCV, CNN, Pandas, NumPy, and data preprocessing. I have built AI-powered features like interview evaluation and predictive analysis."
  },
  {
    "title": "Project - FleetFlow AI",
    "content": "FleetFlow AI is an autonomous fleet intelligence platform. It is a full-stack AI-powered Fleet and Logistics Management System built with Next.js 14, TypeScript, Node.js, Express, MongoDB, Socket.io, Recharts, and Framer Motion. Features include JWT and RBAC authentication with roles like Fleet Manager, Dispatcher, Safety Officer, and Financial Analyst. It supports vehicle registry with capacity, odometer, status, and risk score tracking; driver management with license expiry and safety scores; trip lifecycle (create, dispatch, complete) with business rules; maintenance records with severity; ROI calculation; predictive risk scoring using odometer and fuel efficiency; Gemini API for AI vehicle risk analysis and financial advice; real-time Socket.io events; and CSV/PDF export. Live at https://fleetflow-silk-ten.vercel.app/ and code at https://github.com/Nand13112004/Fleet_Flow."
  },
  {
    "title": "Project - RevoraX",
    "content": "RevoraX is a multi-tenant Product Lifecycle and Change Management (PLM) web application. It manages Products, Bills of Materials (BOM), and Engineering Change Orders (ECO) with approval workflows, versioning, audit trails, and role-based access. Built with React (Vite) and Express with MongoDB. Roles include Engineering, Approver, Operations, and Admin. Features configurable ECO stages (New, Approval, Done), approval rules, version history for products and BOMs, archive management, comprehensive reports, and audit logs. GitHub: https://github.com/Nand13112004/RevoraX."
  },
  {
    "title": "Project - MockMate AI",
    "content": "MockMate AI is an enterprise-grade AI-powered mock interview platform. Built with Next.js 14, Node.js, MongoDB, Socket.io, WebRTC, and Gemini/OpenAI APIs. Features real-time audio and video communication via WebRTC, advanced proctoring (face detection, tab-switch detection with 2-second warning, fullscreen enforcement with 3-second warning, copy/paste monitoring, DevTools detection), AI-generated dynamic questions with context-aware follow-ups, automated scoring and sentiment analysis, dual answer storage (Answer and Response collections), session management with resume capability, interviewer dashboard with live monitoring, and comprehensive analytics. GitHub: https://github.com/Nand13112004/Ai_Powered_Interview_System."
  },
  {
    "title": "Project - Varni Tours",
    "content": "Varni Tours (varnitours.com) is a full-stack travel booking platform for domestic and international tour packages, flights, hotels, visa assistance, cruise bookings, and travel insurance. Built with the MERN stack (React.js, Node.js, Express.js, MongoDB). Features dynamic search and filtering, SEO optimization with sitemap.xml, robots.txt, and Google Search Console integration, alt-optimized images, clean URLs, a chatbot for real-time user support, and a fully responsive design. Live at https://varnitours.com."
  },
  {
    "title": "Project - Mozzinoz",
    "content": "Mozzinoz is a full-stack MERN web application demonstrating JWT authentication, dynamic React frontend, backend REST API integration, responsive Tailwind CSS UI, and database-driven content management. Built with React, Node.js, Express, MongoDB, and Tailwind CSS. Live at https://mozzinoz.netlify.app/ and code at https://github.com/Nand13112004/Mozzinoz."
  },
  {
    "title": "Project - ISLR (Indian Sign Language Recognition)",
    "content": "ISLR is a machine learning system for real-time recognition of Indian Sign Language (ISL) gestures. It uses a CNN deep learning model (TensorFlow/Keras) trained on a custom dataset of hand gesture images. Features a custom dataset collection pipeline (data_collection_binary.py), real-time gesture prediction (final_pred.py), text translation output from recognized gestures, and accuracy evaluation (test_accuracy.py). Built with Python, TensorFlow, Keras, OpenCV, NumPy, and Pandas. It bridges the communication gap for hearing-impaired individuals. GitHub: https://github.com/Nand13112004/ISLR."
  },
  {
    "title": "Project - Space Portfolio",
    "content": "This is Nand Delvadiya's personal portfolio website. It is built with Next.js 14, TypeScript, React Three Fiber, Tailwind CSS, and Framer Motion. Features include a space-themed 3D interactive UI with orbiting tech logos, a RAG-based AI chatbot powered by Gemini 1.5 Flash and MongoDB for context retrieval, a contact form persisted to MongoDB, glassmorphism dark design with animated particle backgrounds, and an interactive 3D tech stack section. GitHub: https://github.com/Nand13112004/space-portfolio."
  },
  {
    "title": "Experience - Web Development Intern",
    "content": "I worked as a Web Development Intern where I developed RESTful APIs using Node.js and Express.js. I implemented JWT authentication, optimized database schemas, and improved backend performance using MongoDB Atlas."
  },
  {
    "title": "Experience - Python Intern",
    "content": "As a Python Intern, I developed modular applications using data structures like lists and dictionaries. I focused on writing clean, efficient, and reusable code for data processing."
  },
  {
    "title": "Education",
    "content": "I am pursuing a B.Tech in Computer Engineering at CHARUSAT with a CGPA of 7.82. I completed my Higher Secondary Certificate with 68.33%."
  },
  {
    "title": "Achievements",
    "content": "I am NPTEL certified in Database Management Systems and have completed Git and GitHub certification from Coursera."
  },
  {
    "title": "Activities",
    "content": "I have participated in Smart India Hackathon, Odoo x CHARUSAT, and Odoo x Gujarat Vidyapeeth. I am also active in technical workshops and hackathons."
  },
  {
    "title": "Leadership & Volunteering",
    "content": "I have worked as a coordinator in the Charusat Rural Education Development Program and as a course coordinator in community engagement programs. I am also an active NSS volunteer."
  },
  {
    "title": "Career Goal",
    "content": "My goal is to become a highly skilled full stack developer and work on impactful real-world systems involving scalable architectures, AI integration, and performance-driven applications."
  }
];

    await collection.insertMany(docs);
    console.log(`Inserted ${docs.length} resume sections into MongoDB.`);

    // Drop text index if exists so it can be recreated cleanly
    try {
      await collection.dropIndex("content_text");
    } catch(e) {}
    
    // Create Text Index on content so $text search works
    await collection.createIndex({ content: "text" });
    console.log("Created text index on 'content'.");

  } catch (error) {
    console.error("Failed to seed:", error);
  } finally {
    await client.close();
    console.log("Done!");
  }
}

seed();
