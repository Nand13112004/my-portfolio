"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 sm:px-10 md:px-20 mt-24 md:mt-36 w-full z-[20] gap-8 md:gap-0"
    >
      {/* Text content */}
      <div className="h-full w-full flex flex-col gap-4 justify-center text-center md:text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] inline-flex self-center md:self-start"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Fullstack Developer Portfolio
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-full md:max-w-[600px]"
        >
          <span>
            {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Full Stack Developer
            </span>{" "}
            building real-world applications
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm sm:text-base md:text-lg text-gray-400 my-5 max-w-full md:max-w-[600px]"
        >
          I&apos;m a Full Stack Developer specializing in the MERN stack. I build scalable web applications with clean UI and efficient backend systems. Currently focused on real-world projects and looking for internship opportunities.
        </motion.p>

        <motion.a
          href="/#projects"
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] self-center md:self-start"
        >
          View Projects
        </motion.a>
      </div>

      {/* Hero image — hidden on very small screens */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden sm:flex w-full h-full justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none max-w-[300px] sm:max-w-[400px] md:max-w-[650px]"
        />
      </motion.div>
    </motion.div>
  );
};
