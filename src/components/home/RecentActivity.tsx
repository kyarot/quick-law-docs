import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, MessageSquare, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    type: 'form',
    title: 'Contract Review Form',
    status: 'completed',
    time: '2 hours ago',
    icon: Scale,
  },
  {
    id: 2,
    type: 'document',
    title: 'Document Analysis',
    status: 'processing',
    time: '4 hours ago',
    icon: FileText,
  },
  {
    id: 3,
    type: 'chat',
    title: 'Legal Consultation',
    status: 'completed',
    time: '1 day ago',
    icon: MessageSquare,
  },
];

export const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <activity.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge
                variant={activity.status === 'completed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {activity.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};