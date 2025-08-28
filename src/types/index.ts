export interface User {
  _id: string;
  username: string;
  profilePicture: string;
  mobile: string;
  address: string;
  dob: string;
  gender: string;
  type: 'professional' | 'student' | 'teacher' | 'employee' | 'entrepreneur';
  history: string;
  email: string;
  bio: string;
  website?: string;
  followers: string[];
  following: string[];
  // Enhanced fields
  company?: string;
  position?: string;
  school?: string;
  degree?: string;
  skills?: string[];
  certifications?: string[];
  experience?: string;
  interests?: string[];
  achievements?: string[];
  linkedIn?: string;
  github?: string;
}

export interface Document {
  id: string;
  title: string;
  category: string;
  start: string;
  end: string;
  tags: string[];
  related: string[];
  next: string;
  path_ids: string[];
  vector_embedding: number[];
  social: string;
  group_discussion: string;
  metadata: string;
  media: MediaItem[];
}

export interface MediaItem {
  type: 'video' | 'image' | 'audio' | 'document';
  file_path: string;
  caption: string;
  thumbnail?: string;
}

export interface Segment {
  id: string;
  left?: string;
  text: string;
  right?: string;
  links: string[];
  // Enhanced fields
  annotations?: string[];
  importance?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Discussion {
  id: string;
  document_id: string;
  segment_id: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}