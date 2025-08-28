import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  Award, 
  BookOpen,
  Building,
  GraduationCap,
  Briefcase,
  Rocket,
  Github,
  Linkedin
} from 'lucide-react';
import { User } from '@/types';

interface ProfileViewProps {
  user: User;
  isOwnProfile?: boolean;
}

export default function ProfileView({ user, isOwnProfile = false }: ProfileViewProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student': return <GraduationCap className="h-4 w-4" />;
      case 'teacher': return <BookOpen className="h-4 w-4" />;
      case 'employee': return <Briefcase className="h-4 w-4" />;
      case 'entrepreneur': return <Rocket className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-500';
      case 'teacher': return 'bg-green-500';
      case 'employee': return 'bg-purple-500';
      case 'entrepreneur': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const renderTypeSpecificContent = () => {
    switch (user.type) {
      case 'student':
        return (
          <div className="space-y-4">
            {user.school && (
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.school}</span>
              </div>
            )}
            {user.degree && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.degree}</span>
              </div>
            )}
          </div>
        );
      case 'teacher':
        return (
          <div className="space-y-4">
            {user.school && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.school}</span>
              </div>
            )}
            {user.experience && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Experience</span>
                <p className="text-sm text-muted-foreground">{user.experience}</p>
              </div>
            )}
          </div>
        );
      case 'professional':
      case 'employee':
        return (
          <div className="space-y-4">
            {user.company && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.company}</span>
              </div>
            )}
            {user.position && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.position}</span>
              </div>
            )}
          </div>
        );
      case 'entrepreneur':
        return (
          <div className="space-y-4">
            {user.company && (
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Founder of {user.company}</span>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.profilePicture} alt={user.username} />
                <AvatarFallback className="text-2xl">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{user.username}</h1>
                  <Badge variant="secondary" className={`${getTypeColor(user.type)} text-white`}>
                    {getTypeIcon(user.type)}
                    <span className="ml-1 capitalize">{user.type}</span>
                  </Badge>
                </div>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(user.dob).toLocaleDateString()}</span>
                </div>
                {user.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={user.website} className="text-blue-600 hover:underline">
                      {user.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <div className="font-semibold">{user.followers.length}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{user.following.length}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>

              <div className="flex gap-2">
                {user.linkedIn && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={user.linkedIn} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {user.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={user.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderTypeSpecificContent()}
              
              {user.interests && user.interests.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              {user.skills && user.skills.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {user.certifications && user.certifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Certifications</h3>
                      <div className="space-y-2">
                        {user.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No skills listed yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {user.achievements && user.achievements.length > 0 ? (
                <div className="space-y-3">
                  {user.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                      <Award className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No achievements listed yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Activity feed will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}