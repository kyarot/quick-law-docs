import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, FileText, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { LanguageSelector } from '@/components/ui/language-selector';

const features = [
  {
    icon: MessageSquare,
    title: 'AI Legal Assistant',
    description: 'Get instant legal advice through voice or text chat powered by advanced AI',
  },
  {
    icon: FileText,
    title: 'Document Analysis',
    description: 'Upload and scan legal documents for instant analysis and Q&A',
  },
  {
    icon: Scale,
    title: 'Legal Forms',
    description: 'Fill out legal forms with voice input and live preview',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your legal information is protected with enterprise-grade security',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 flex justify-between items-center p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <Scale className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">LegalAI</span>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSelector />
          <SignInButton>
            <Button variant="outline" className="glass-effect">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-primary">Legal</span>{' '}
              <span className="text-secondary">AI</span>{' '}
              <span className="text-foreground">Assistant</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Get instant legal guidance, analyze documents, and fill forms with 
              the power of AI - all in your preferred language
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SignUpButton>
              <Button size="lg" className="legal-gradient legal-shadow text-lg px-8 py-6 group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignUpButton>
            
            <Button size="lg" variant="outline" className="glass-effect text-lg px-8 py-6">
              Watch Demo
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="glass-effect legal-card-hover h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Trusted by 10k+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              <span className="text-sm">Legal AI Certified</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/3 left-8 hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Scale className="h-8 w-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-8 hidden lg:block"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
          <FileText className="h-6 w-6 text-secondary" />
        </div>
      </motion.div>
    </div>
  );
};