import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Scale, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const actions = [
  { icon: FileText, label: 'Legal Forms', color: 'text-primary' },
  { icon: MessageSquare, label: 'Contact Us', color: 'text-secondary' },
  { icon: Scale, label: 'Legal Docs', color: 'text-accent' },
  { icon: User, label: 'Profile', color: 'text-muted-foreground' },
];

export const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 legal-card-hover"
              >
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <span className="text-sm">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};