import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/_sanidhyy",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
  {
    skill_name: "Razorpay",
    image: "razorpay.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "FleetFlow AI",
    subtitle: "Autonomous Fleet Intelligence Platform",
    category: "FULL STACK / AI",
    description:
      "AI-powered Fleet & Logistics Management System with real-time updates, predictive risk scoring, and Gemini API integration. Features JWT/RBAC auth, vehicle registry with ROI tracking, and trip lifecycle management.",
    image: "/projects/fleetflow.png",
    link: "https://fleetflow-silk-ten.vercel.app/",
    github: "https://github.com/Nand13112004/Fleet_Flow",
    features: [
      "JWT & RBAC with 4 role types (Manager, Dispatcher, Safety, Financial)",
      "Real-time vehicle & driver tracking via Socket.io",
      "Predictive risk scoring with Gemini AI integration",
      "Full trip lifecycle — create, dispatch, complete",
      "CSV/PDF export & ROI calculation per vehicle",
    ],
    techStack: ["Next.js", "TypeScript", "MongoDB", "Node.js", "Socket.io", "Recharts"],
  },
  {
    title: "RevoraX",
    subtitle: "Product Lifecycle & Change Management",
    category: "FULL STACK / PLM",
    description:
      "Multi-tenant PLM web app for managing Products, Bills of Materials, and Engineering Change Orders with approval workflows, versioning, audit trails, and role-based access control.",
    image: "/projects/revorax.png",
    link: "https://github.com/Nand13112004/RevoraX",
    github: "https://github.com/Nand13112004/RevoraX",
    features: [
      "Multi-tenant with 4 roles: Engineering, Approver, Operations, Admin",
      "ECO approval workflow (New → Approval → Done)",
      "Version-controlled Products and Bills of Materials",
      "Full audit trail and traceability for compliance",
      "Configurable ECO stages via Settings dashboard",
    ],
    techStack: ["React", "Vite", "Express", "MongoDB", "JWT"],
  },
  {
    title: "MockMate AI",
    subtitle: "AI-Powered Mock Interview Platform",
    category: "FULL STACK / AI",
    description:
      "Enterprise-grade interview platform with real-time WebRTC communication, advanced proctoring, AI question generation, automated scoring, and comprehensive analytics for both candidates and interviewers.",
    image: "/projects/mockmate.png",
    link: "https://github.com/Nand13112004/Ai_Powered_Interview_System",
    github: "https://github.com/Nand13112004/Ai_Powered_Interview_System",
    features: [
      "Real-time audio/video via WebRTC with session recovery",
      "Advanced proctoring: face detection, tab-switch & fullscreen enforcement",
      "AI dynamic question generation with context-aware follow-ups",
      "Automated scoring, sentiment analysis & performance analytics",
      "Dual answer storage with real-time interviewer monitoring",
    ],
    techStack: ["Next.js", "Node.js", "MongoDB", "Socket.io", "WebRTC", "Gemini AI"],
  },
  {
    title: "Varni Tours",
    subtitle: "Full-Stack Travel Booking Platform",
    category: "FULL STACK / TRAVEL",
    description:
      "Comprehensive end-to-end travel booking platform for domestic and international tour packages, flights, hotels, visa assistance, cruises, and travel insurance with AI chatbot support.",
    image: "/projects/varni.png",
    link: "https://varnitours.com",
    features: [
      "Tour & travel booking for packages, flights, hotels, cruises",
      "Dynamic search & filtering by destination, price, duration",
      "Full SEO: sitemap.xml, robots.txt, Google Search Console",
      "Integrated AI chatbot for real-time user support & lead capture",
      "Fully responsive design across mobile, tablet, and desktop",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "SEO"],
  },
  {
    title: "Mozzinoz",
    subtitle: "Full Stack MERN Web Application",
    category: "FULL STACK / MERN",
    description:
      "MERN-based full stack application demonstrating JWT authentication, dynamic React frontend, backend REST API integration, responsive UI design, and database-driven content management.",
    image: "/projects/mozzinoz.png",
    link: "https://mozzinoz.netlify.app/",
    github: "https://github.com/Nand13112004/Mozzinoz",
    features: [
      "JWT-based authentication system",
      "Dynamic React frontend with component architecture",
      "Backend REST API with Node.js & Express",
      "MongoDB database-driven content management",
      "Fully responsive Tailwind CSS UI design",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
  {
    title: "ISLR",
    subtitle: "Indian Sign Language Recognition System",
    category: "AI / ML PROJECT",
    description:
      "Machine learning system for real-time recognition of Indian Sign Language gestures using CNN deep learning and computer vision. Converts sign language gestures into readable text, bridging the communication gap for hearing-impaired individuals.",
    image: "/projects/islr.png",
    link: "https://github.com/Nand13112004/ISLR",
    github: "https://github.com/Nand13112004/ISLR",
    features: [
      "Real-time gesture capture and recognition",
      "CNN model for accurate gesture prediction",
      "Custom dataset collection and preprocessing pipeline",
      "Convert gestures into readable text output",
      "High accuracy model evaluation and testing",
    ],
    techStack: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Pandas"],
  },
  {
    title: "Space Portfolio",
    subtitle: "3D Interactive Developer Portfolio",
    category: "PORTFOLIO / 3D",
    description:
      "This very portfolio! A space-themed, 3D interactive developer portfolio with an orbiting tech stack, RAG-based AI chatbot powered by Gemini 1.5 Flash, contact form persistence, and stunning glassmorphism animations.",
    image: "/projects/space-portfolio.png",
    link: "https://space-portfolio-navy-xi.vercel.app/",
    github: "https://github.com/Nand13112004/space-portfolio",
    features: [
      "3D orbiting tech logos with React Three Fiber",
      "RAG AI chatbot with Gemini 1.5 Flash + MongoDB context",
      "Contact form with real-time MongoDB persistence",
      "Space-themed glassmorphism dark UI",
      "Framer Motion micro-animations throughout",
    ],
    techStack: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "MongoDB", "Gemini AI"],
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/_sanidhyy",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://youtube.com",
      },
      {
        name: "Learning about me",
        icon: null,
        link: "https://example.com",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:contact@example.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
] as const;

export const LINKS = {
  Resume: "/Nand_Delvadiya_FullStack_resume.pdf",
};
