import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, Square, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    role: 'assistant',
    content: "Hi! I'm Nand's AI Assistant. Ask me anything about his projects, skills, or experience!"
  }]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [typingId, setTypingId] = useState<string | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const stopGeneratingRef = useRef(false);

  // Smart Auto-scroll logic
  const scrollToBottom = useCallback((force = false) => {
    if (scrollAreaRef.current && (isAutoScroll || force)) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: force ? 'auto' : 'smooth'
            });
        }
    }
  }, [isAutoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 50;
    setIsAutoScroll(isAtBottom);
  };

  const getTypingSpeed = (text: string) => {
    const len = text.length;
    if (len < 80) return 35;
    if (len < 300) return 20;
    return 8; // Fast for long messages
  };

  const typeMessage = async (messageId: string, fullText: string) => {
    setIsTyping(true);
    setTypingId(messageId);
    stopGeneratingRef.current = false;

    let currentText = "";
    const speed = getTypingSpeed(fullText);

    for (let i = 0; i < fullText.length; i++) {
      if (stopGeneratingRef.current) break;
      
      currentText += fullText[i];
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content: currentText } : msg
      ));
      
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    setTypingId(null);
    setIsTyping(false);
  };

  const handleStopGenerating = () => {
    stopGeneratingRef.current = true;
    setIsTyping(false);
    setTypingId(null);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading || isTyping) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMsg
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const botMessageId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: botMessageId,
        role: 'assistant',
        content: ""
      }]);
      
      setIsLoading(false);
      await typeMessage(botMessageId, data.response || "No response received.");
      
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Oops! I encountered an error. Please try again."
      }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .chat-cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background-color: #3b82f6;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.8s infinite;
        }
        .prose pre { background: transparent; padding: 0; }
        .prose code { color: inherit; }
        .prose h2 { font-size: 1.125rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; }
        .prose h3 { font-size: 1rem; font-weight: 600; margin-top: 0.75rem; margin-bottom: 0.25rem; }
        .prose p { margin-bottom: 0.75rem; line-height: 1.6; }
        .prose ul, .prose ol { margin-bottom: 0.75rem; padding-left: 1.25rem; }
        .prose li { margin-bottom: 0.25rem; }
        .prose > :last-child { margin-bottom: 0; }
      `}</style>
      
      {isOpen && (
        <Card className="w-80 sm:w-[400px] h-[600px] mb-4 flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border-primary/20 bg-background/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b bg-muted/30">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <div className="p-1 px-1.5 bg-primary/10 rounded-lg">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                Ask Nand AI 🤖
              </CardTitle>
              <CardDescription className="text-xs">Always learning about Nand</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden relative">
             <ScrollArea 
                className="h-full p-4" 
                ref={scrollAreaRef}
                onScrollCapture={handleScroll}
             >
                <div className="flex flex-col gap-6 pb-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={cn(
                        "flex flex-col gap-2 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "rounded-2xl px-4 py-3 text-sm shadow-sm",
                        msg.role === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-muted/80 text-foreground rounded-tl-sm border border-border"
                      )}>
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                          {typingId === msg.id && <span className="chat-cursor" />}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="mr-auto flex flex-col gap-2">
                      <div className="bg-muted/80 rounded-2xl rounded-tl-sm px-4 py-3 border border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          AI is thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
             </ScrollArea>

             {!isAutoScroll && (
                <Button 
                   variant="secondary" 
                   size="icon" 
                   className="absolute bottom-4 right-4 h-8 w-8 rounded-full shadow-md animate-in fade-in slide-in-from-bottom-2"
                   onClick={() => scrollToBottom(true)}
                >
                   <ArrowDown className="h-4 w-4" />
                </Button>
             )}
          </CardContent>
          
          <CardFooter className="p-4 border-t bg-muted/10 flex flex-col gap-3">
            {isTyping && (
                <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={handleStopGenerating}
                   className="mx-auto flex items-center gap-2 h-8 text-xs font-medium border-muted-foreground/20 hover:bg-destructive/5 hover:text-destructive transition-colors"
                >
                   <Square className="h-3 w-3 fill-current" />
                   Stop Generating
                </Button>
            )}
            
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input 
                type="text" 
                placeholder="Ask something..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading || isTyping}
                className="flex-1 bg-background"
              />
              <Button type="submit" size="icon" disabled={isLoading || isTyping || !inputValue.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-110 active:scale-95 bg-primary"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
