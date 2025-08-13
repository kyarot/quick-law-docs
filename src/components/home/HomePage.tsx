import React from 'react';
import { motion } from 'framer-motion';
import { useUser, UserButton } from '@clerk/clerk-react';
import { VoiceAssistant } from '@/components/voice/VoiceAssistant';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { QuickActions } from '@/components/home/QuickActions';
import { RecentActivity } from '@/components/home/RecentActivity';
import { LanguageSelector } from '@/components/ui/language-selector';
import { FloatingChatbot } from '@/components/ui/floating-chatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, FileText, MessageSquare, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HomePage: React.FC = () => {
  const { user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">LegalAI</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <UserButton />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        className="container mx-auto px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            How can I assist you with your legal matters today?
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Voice Assistant */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  AI Legal Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VoiceAssistant />
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <QuickActions />
          </motion.div>
        </div>

        {/* Document Upload & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Document Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentUpload />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <RecentActivity />
          </motion.div>
        </div>
      </motion.main>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
};