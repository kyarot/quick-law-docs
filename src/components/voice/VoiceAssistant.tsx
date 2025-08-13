import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { geminiService } from '@/services/geminiService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const VoiceAssistant: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const { currentLanguage, translateText } = useLanguage();
  const { toast } = useToast();

  const { speak, cancel: cancelSpeech, speaking } = useSpeechSynthesis();
  const { listen, listening, stop: stopListening } = useSpeechRecognition({
    onResult: (result: string) => {
      setInputText(result);
    },
    onError: (error) => {
      console.error('Speech recognition error:', error);
      toast({
        title: "Speech Recognition Error",
        description: "Could not understand speech. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    setIsSpeaking(speaking);
  }, [speaking]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Conversation = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setConversations(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await geminiService.getLegalAdvice(message, currentLanguage.code);
      const translatedResponse = await translateText(response);

      const assistantMessage: Conversation = {
        id: (Date.now() + 1).toString(),
        text: translatedResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setConversations(prev => [...prev, assistantMessage]);

      // Auto-speak the response
      if (!isSpeaking) {
        speak({ text: translatedResponse });
      }
    } catch (error) {
      console.error('Voice assistant error:', error);
      toast({
        title: "Assistant Error",
        description: "Failed to get legal advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [currentLanguage, translateText, speak, isSpeaking, toast]);

  const handleVoiceInput = () => {
    if (listening) {
      stopListening();
    } else {
      listen();
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      cancelSpeech();
    }
  };

  return (
    <div className="space-y-4">
      {/* Conversation Display */}
      <Card className="h-80 overflow-y-auto p-4 bg-muted/20">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-center"
            >
              <div>
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="h-8 w-8 text-primary" />
                </motion.div>
                <p className="text-muted-foreground">
                  Start a conversation with your AI legal assistant
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {conversations.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-background border p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
        <div ref={conversationEndRef} />
      </Card>

      {/* Input Controls */}
      <div className="space-y-3">
        <div className="flex space-x-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your legal question or use voice input..."
            className="flex-1 min-h-[60px]"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isProcessing}
              size="icon"
              className="h-[60px] w-12"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Voice Controls */}
        <div className="flex items-center justify-center space-x-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleVoiceInput}
              variant={listening ? 'default' : 'outline'}
              size="lg"
              className={`${listening ? 'voice-pulse bg-primary' : ''} transition-all`}
            >
              {listening ? (
                <MicOff className="h-5 w-5 mr-2" />
              ) : (
                <Mic className="h-5 w-5 mr-2" />
              )}
              {listening ? 'Stop Listening' : 'Voice Input'}
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleToggleSpeech}
              variant="outline"
              size="lg"
              className={isSpeaking ? 'voice-pulse' : ''}
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5 mr-2" />
              ) : (
                <Volume2 className="h-5 w-5 mr-2" />
              )}
              {isSpeaking ? 'Stop Speaking' : 'Voice Output'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};