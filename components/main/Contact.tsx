"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { FiSend } from "react-icons/fi";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import { HiOutlineMail } from "react-icons/hi";
import { TbArrowUpRight } from "react-icons/tb";
import Link from "next/link";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 px-4 sm:px-8 z-[20]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm"
          >
            <SparklesIcon className="text-[#3b82f6] h-4 w-4" />
            <span className="text-[#3b82f6] text-sm font-medium">Let&apos;s collaborate</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            Let&apos;s build something <br className="hidden sm:block" />
            <span className="text-[#3b82f6]">users actually love.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Have a project in mind? Need a developer who thinks like a designer? Let&apos;s talk about how we can create something amazing together.
          </motion.p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" suppressHydrationWarning>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-gray-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-[#0f172a] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-colors"
                    suppressHydrationWarning
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="bg-[#0f172a] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-colors"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm text-gray-400">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="bg-[#0f172a] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-colors"
                  suppressHydrationWarning
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="bg-[#0f172a] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center justify-center gap-2 py-3 px-8 rounded-xl font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                suppressHydrationWarning
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                {!status && <FiSend className="h-4 w-4" />}
                {status !== "loading" && <FiSend className="h-4 w-4" />}
              </button>
              {status === "success" && <p className="text-green-400 text-sm mt-2">Message sent successfully!</p>}
              {status === "error" && <p className="text-red-400 text-sm mt-2">Error sending message. Try again later.</p>}
            </form>
          </motion.div>

          {/* Right: Quick Connect */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-[#0f172a]/50 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Quick Connect</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Prefer a direct approach? Reach out through any of these channels and I&apos;ll respond within 24 hours.
              </p>
              <div className="flex flex-col gap-4">
                <Link
                  href="https://github.com/Nand13112004"
                  target="_blank"
                  className="group flex items-center justify-between bg-[#1e293b]/50 border border-white/5 hover:border-white/10 p-4 rounded-xl transition-all hover:bg-[#1e293b]"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#3b82f6]/10 p-2 rounded-lg text-[#3b82f6] group-hover:scale-110 transition-transform">
                      <RxGithubLogo className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium">GitHub</span>
                  </div>
                  <TbArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/delvadiya-nand-2b2838276/"
                  target="_blank"
                  className="group flex items-center justify-between bg-[#1e293b]/50 border border-white/5 hover:border-white/10 p-4 rounded-xl transition-all hover:bg-[#1e293b]"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#3b82f6]/10 p-2 rounded-lg text-[#3b82f6] group-hover:scale-110 transition-transform">
                      <RxLinkedinLogo className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium">LinkedIn</span>
                  </div>
                  <TbArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="mailto:nand13112004@gmail.com"
                  className="group flex items-center justify-between bg-[#1e293b]/50 border border-white/5 hover:border-white/10 p-4 rounded-xl transition-all hover:bg-[#1e293b]"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#3b82f6]/10 p-2 rounded-lg text-[#3b82f6] group-hover:scale-110 transition-transform">
                      <HiOutlineMail className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium">Email</span>
                  </div>
                  <TbArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
            
            <div className="bg-[#0f172a]/50 border border-white/5 rounded-2xl p-6 flex flex-wrap items-center gap-4 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-sm font-medium text-white">
                Available for freelance <span className="text-gray-500 ml-2">— Open to new opportunities</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
