import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Nand13112004" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/delvadiya-nand-2b2838276/" },
  { icon: Mail, label: "Email", href: "mailto:nand13112004@gmail.com" },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message });

    if (error) {
      console.error("Error submitting message:", error);
      toast.error("Failed to send message. Please try again.");
    } else {
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-glow-gradient opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Let's collaborate
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's build something
            <br />
            <span className="gradient-text">users actually love.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a project in mind? Need a developer who thinks like a designer?
            Let's talk about how we can create something amazing together.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Name</label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-secondary/30 border-border focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="bg-secondary/30 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Subject</label>
                <Input
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="bg-secondary/30 border-border focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="bg-secondary/30 border-border focus:border-primary transition-colors resize-none"
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="glass-card p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Quick Connect</h3>
              <p className="text-muted-foreground mb-6">
                Prefer a direct approach? Reach out through any of these channels
                and I'll respond within 24 hours.
              </p>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{link.label}</span>
                    <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <span className="text-sm">
                  <span className="text-foreground font-medium">
                    Available for freelance
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    — Open to new opportunities
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
