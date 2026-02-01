import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
            by Nand Delvadiya
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
