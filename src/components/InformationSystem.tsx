import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Menu,
  Play,
  Image as ImageIcon,
  FileText,
  MessageCircle,
  Home,
  ChevronDown,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Document, Segment, Discussion } from '@/types';

interface InformationSystemProps {
  document: Document;
  segments: Segment[];
  discussions: Discussion[];
  onNavigateToDocument?: (documentId: string) => void;
}

export default function InformationSystem({ 
  document, 
  segments, 
  discussions, 
  onNavigateToDocument 
}: InformationSystemProps) {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hierarchyExpanded, setHierarchyExpanded] = useState<Record<string, boolean>>({});

  const currentSegment = segments[currentSegmentIndex] || null;

  const navigateSegment = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentSegmentIndex > 0) {
      setCurrentSegmentIndex(currentSegmentIndex - 1);
    } else if (direction === 'right' && currentSegmentIndex < segments.length - 1) {
      setCurrentSegmentIndex(currentSegmentIndex + 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.25, 0.5));
  };

  const toggleHierarchy = (path: string) => {
    setHierarchyExpanded(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderHierarchy = () => {
    const paths = document.path_ids[0]?.split('/').filter(Boolean) || [];
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 cursor-pointer">
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">Root</span>
        </div>
        
        {paths.map((path, index) => {
          const fullPath = paths.slice(0, index + 1).join('/');
          const isExpanded = hierarchyExpanded[fullPath];
          const hasChildren = index < paths.length - 1;
          
          return (
            <div 
              key={fullPath}
              className="ml-4"
              style={{ marginLeft: `${(index + 1) * 16}px` }}
            >
              <div 
                className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 cursor-pointer"
                onClick={() => hasChildren && toggleHierarchy(fullPath)}
              >
                {hasChildren ? (
                  isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )
                ) : (
                  <div className="w-4" />
                )}
                <span className={`text-sm ${index === paths.length - 1 ? 'font-semibold text-primary' : ''}`}>
                  {path}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMediaPreview = () => {
    if (!document.media || document.media.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {document.media.map((media, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  {media.type === 'video' && <Play className="h-4 w-4" />}
                  {media.type === 'image' && <ImageIcon className="h-4 w-4" />}
                  {media.type === 'document' && <FileText className="h-4 w-4" />}
                  <span className="text-sm font-medium capitalize">{media.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{media.caption}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  View {media.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderClickableText = (text: string) => {
    // Split text into words and make some clickable (for demo purposes)
    const words = text.split(' ');
    return words.map((word, index) => {
      const isClickable = word.length > 6; // Make longer words clickable
      
      if (isClickable) {
        return (
          <span
            key={index}
            className="text-blue-600 hover:text-blue-800 cursor-pointer underline decoration-dotted"
            onClick={() => {
              // Simulate navigation to a new document
              console.log(`Navigate to document about: ${word}`);
              if (onNavigateToDocument) {
                onNavigateToDocument(`doc_${word.toLowerCase()}`);
              }
            }}
          >
            {word}{index < words.length - 1 ? ' ' : ''}
          </span>
        );
      }
      return word + (index < words.length - 1 ? ' ' : '');
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-80 border-r bg-card shadow-sm">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Document Structure</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground self-center">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Hierarchy</h3>
                {renderHierarchy()}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-semibold mb-2">Segments ({segments.length})</h3>
                <div className="space-y-2">
                  {segments.map((segment, index) => (
                    <div
                      key={segment.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        index === currentSegmentIndex 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-secondary/50'
                      }`}
                      onClick={() => setCurrentSegmentIndex(index)}
                    >
                      <div className="text-xs opacity-70">Segment {index + 1}</div>
                      <div className="text-sm line-clamp-2">
                        {segment.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold">{document.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{document.category}</Badge>
                  {document.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateSegment('left')}
                disabled={currentSegmentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                {currentSegmentIndex + 1} of {segments.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateSegment('right')}
                disabled={currentSegmentIndex === segments.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div 
            className="max-w-4xl mx-auto space-y-8"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          >
            {currentSegment && (
              <Card>
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed">
                      {renderClickableText(currentSegment.text)}
                    </p>
                  </div>
                  
                  {currentSegment.links && currentSegment.links.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="text-sm font-semibold mb-2">Related Documents</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentSegment.links.map(link => (
                          <Button
                            key={link}
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigateToDocument?.(link)}
                          >
                            {link}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {renderMediaPreview()}

            {/* Discussions */}
            {discussions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Discussions ({discussions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {discussions.map(discussion => (
                      <div key={discussion.id} className="space-y-3">
                        {discussion.comments.map(comment => (
                          <div key={comment.id} className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-sm">{comment.user}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{comment.text}</p>
                            
                            {comment.replies.length > 0 && (
                              <div className="ml-4 space-y-2">
                                {comment.replies.map(reply => (
                                  <div key={reply.id} className="bg-secondary/50 rounded p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-xs">{reply.user}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(reply.timestamp).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-xs">{reply.text}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}