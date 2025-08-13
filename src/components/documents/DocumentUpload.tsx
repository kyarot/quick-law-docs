import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const DocumentUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="space-y-4">
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">Upload Legal Documents</p>
        <p className="text-sm text-muted-foreground mb-4">
          Drag & drop files here or click to browse
        </p>
        <div className="flex gap-2 justify-center">
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
          <Button size="sm" variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Scan Document
          </Button>
        </div>
      </motion.div>
    </div>
  );
};