import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  User,
  Briefcase,
  Mail,
  Code,
  Sparkles,
  FileText,
  Moon,
  Sun,
} from "lucide-react";

interface CommandPaletteProps {
  onNavigate: (section: string) => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const CommandPalette = ({
  onNavigate,
  onToggleTheme,
  isDark,
}: CommandPaletteProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (section: string) => {
    onNavigate(section);
    setOpen(false);
  };

  const commands = [
    { id: "hero", label: "Home", icon: Sparkles },
    { id: "about", label: "About Me", icon: User },
    { id: "projects", label: "Case Studies", icon: Briefcase },
    { id: "skills", label: "Skills & Expertise", icon: Code },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed top-5 right-6 z-40 glass-card px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Navigate</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘/Ctrl + k</span>
        </kbd>
      </motion.button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-xl border border-border bg-popover">
          <CommandInput placeholder="Where would you like to go?" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {commands.map((cmd) => (
                <CommandItem
                  key={cmd.id}
                  onSelect={() => handleSelect(cmd.id)}
                  className="cursor-pointer"
                >
                  <cmd.icon className="mr-2 h-4 w-4" />
                  <span>{cmd.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Settings">
              <CommandItem onSelect={onToggleTheme} className="cursor-pointer">
                {isDark ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                <span>Toggle {isDark ? "Light" : "Dark"} Mode</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
