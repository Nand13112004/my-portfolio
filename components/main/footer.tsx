export const Footer = () => {
  return (
    <footer className="w-full bg-transparent text-gray-300 py-6 md:py-8 mt-10 relative z-50 border-t border-purple-900/10">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-6 gap-2 md:gap-4 text-center md:text-left">
        {/* Left */}
        <div className="text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 whitespace-nowrap">
          Nand Delvadiya
        </div>

        {/* Center */}
        <div className="text-xs md:text-sm text-gray-400 text-center whitespace-nowrap">
          Building digital experiences.
        </div>

        {/* Right */}
        <div className="text-[10px] md:text-xs text-gray-600 whitespace-nowrap">
          &copy; 2026 Nand Delvadiya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
