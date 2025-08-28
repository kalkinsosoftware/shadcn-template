import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileView from '@/components/ProfileView';
import InformationSystem from '@/components/InformationSystem';
import { mockUsers, mockDocuments, mockSegments, mockDiscussions } from '@/data/mockData';

function App() {
  const [currentUser] = useState(mockUsers[0]);
  const [currentDocument, setCurrentDocument] = useState(mockDocuments[0]);
  const [currentSegments, setCurrentSegments] = useState(
    mockSegments.filter(seg => 
      seg.id >= currentDocument.start && seg.id <= currentDocument.end ||
      mockSegments.indexOf(seg) >= 0 && mockSegments.indexOf(seg) <= 2
    )
  );
  const [currentDiscussions] = useState(
    mockDiscussions.filter(disc => disc.document_id === currentDocument.id)
  );

  const handleNavigateToDocument = (documentId: string) => {
    const doc = mockDocuments.find(d => d.id === documentId);
    if (doc) {
      setCurrentDocument(doc);
      // Update segments based on document
      const segments = documentId === 'doc_quantum_entanglement' 
        ? mockSegments.slice(0, 3) 
        : mockSegments.slice(3, 6);
      setCurrentSegments(segments);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Professional Profile & Information System</h1>
          <p className="text-muted-foreground">
            Comprehensive platform for professionals, students, teachers, employees, and entrepreneurs
          </p>
        </div>

        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profiles">Profile Views</TabsTrigger>
            <TabsTrigger value="information">Information System</TabsTrigger>
            <TabsTrigger value="demo">Demo Features</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Profiles by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {mockUsers.map(user => (
                    <Button 
                      key={user._id}
                      variant="outline" 
                      className="h-auto p-4 justify-start"
                      onClick={() => {/* Switch profile view */}}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{user.username}</div>
                        <div className="text-sm text-muted-foreground capitalize">{user.type}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <ProfileView user={currentUser} isOwnProfile={true} />
          </TabsContent>

          <TabsContent value="information" className="space-y-6">
            <InformationSystem
              document={currentDocument}
              segments={currentSegments}
              discussions={currentDiscussions}
              onNavigateToDocument={handleNavigateToDocument}
            />
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Profile System</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Multi-type user profiles (Professional, Student, Teacher, Employee, Entrepreneur)</li>
                      <li>• Type-specific information display</li>
                      <li>• Skills, achievements, and social connections</li>
                      <li>• Responsive design with tabbed interface</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Information System</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Hierarchical document navigation</li>
                      <li>• Segment-based content browsing</li>
                      <li>• Zoom functionality for detailed views</li>
                      <li>• Clickable phrases for cross-document linking</li>
                      <li>• Sidebar with document structure</li>
                      <li>• Media integration (videos, images)</li>
                      <li>• Discussion system with comments and replies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Navigation Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Segment Navigation</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">←</Button>
                        <Button size="sm" variant="outline">→</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Zoom Controls</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">-</Button>
                        <span className="text-xs px-2 self-center">100%</span>
                        <Button size="sm" variant="outline">+</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Sidebar Toggle</span>
                      <Button size="sm" variant="outline">☰</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Try these features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Click on highlighted words to navigate</li>
                      <li>• Use arrow buttons to move between segments</li>
                      <li>• Zoom in/out to see different detail levels</li>
                      <li>• Toggle sidebar to see document hierarchy</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;