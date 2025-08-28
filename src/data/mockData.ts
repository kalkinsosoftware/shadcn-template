import { User, Document, Segment, Discussion } from '@/types';

export const mockUsers: User[] = [
  {
    _id: "68affdcf383798300690ac5b",
    username: "john_doe",
    profilePicture: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    mobile: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    dob: "1990-01-01",
    gender: "Male",
    type: "student",
    history: "ObjectId()",
    email: "john.doe@example.com",
    bio: "Computer Science student at MIT, passionate about quantum computing and AI",
    website: "www.johndoe.com",
    followers: ["5e6789abcde123456"],
    following: ["5e6789abcde098765"],
    school: "MIT",
    degree: "Bachelor of Science in Computer Science",
    skills: ["Python", "JavaScript", "Quantum Computing", "Machine Learning", "React"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    interests: ["Quantum Physics", "Artificial Intelligence", "Web Development", "Gaming"],
    achievements: [
      "Dean's List for 3 consecutive semesters",
      "Winner of MIT Hackathon 2024",
      "Published research paper on quantum algorithms"
    ],
    github: "https://github.com/johndoe",
    linkedIn: "https://linkedin.com/in/johndoe"
  },
  {
    _id: "68affdcf383798300690ac5c",
    username: "dr_smith",
    profilePicture: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=400",
    mobile: "987-654-3210",
    address: "456 University Ave, Boston, MA",
    dob: "1975-05-15",
    gender: "Female",
    type: "teacher",
    history: "ObjectId()",
    email: "dr.smith@university.edu",
    bio: "Professor of Quantum Physics with 20+ years of experience in research and education",
    website: "www.drsmith-physics.edu",
    followers: ["5e6789abcde123457", "5e6789abcde123458"],
    following: ["5e6789abcde098766"],
    school: "Harvard University",
    position: "Professor of Quantum Physics",
    skills: ["Quantum Mechanics", "Research", "Academic Writing", "Data Analysis"],
    certifications: ["PhD in Physics", "Postdoc in Quantum Computing"],
    experience: "20+ years in quantum physics research and education",
    interests: ["Quantum Entanglement", "Scientific Research", "Education Technology"],
    achievements: [
      "Published 50+ peer-reviewed papers",
      "Recipient of Nobel Prize in Physics nomination",
      "Leading quantum computing research lab"
    ]
  },
  {
    _id: "68affdcf383798300690ac5d",
    username: "sarah_entrepreneur",
    profilePicture: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
    mobile: "555-123-4567",
    address: "789 Innovation Dr, Silicon Valley, CA",
    dob: "1985-09-22",
    gender: "Female",
    type: "entrepreneur",
    history: "ObjectId()",
    email: "sarah@techstartup.com",
    bio: "Tech entrepreneur and founder of three successful startups in AI and blockchain",
    website: "www.sarahinnovates.com",
    followers: ["5e6789abcde123459", "5e6789abcde123460"],
    following: ["5e6789abcde098767", "5e6789abcde098768"],
    company: "TechInnovate Inc.",
    position: "CEO & Founder",
    skills: ["Leadership", "Business Strategy", "AI/ML", "Blockchain", "Fundraising"],
    certifications: ["MBA from Stanford", "Certified Blockchain Expert"],
    interests: ["Artificial Intelligence", "Venture Capital", "Startup Ecosystem", "Innovation"],
    achievements: [
      "Successfully raised $50M in Series B funding",
      "Featured in Forbes 30 Under 30",
      "Sold previous startup for $100M"
    ],
    linkedIn: "https://linkedin.com/in/sarahentrepreneur"
  }
];

export const mockDocuments: Document[] = [
  {
    id: "doc_quantum_entanglement",
    title: "Quantum Entanglement",
    category: "physics",
    start: "seg_1",
    end: "seg_3",
    tags: ["quantum", "entanglement", "physics"],
    related: ["https://arxiv.org/abs/quant-ph/9707021"],
    next: "doc_physical_matter",
    path_ids: ["/Physics/Quantum Mechanics"],
    vector_embedding: [0.431, -0.212, 0.782, 0.123, -0.456],
    social: "social_1",
    group_discussion: "discussion_1",
    metadata: "Metadata for quantum entanglement",
    media: [
      {
        type: "video",
        file_path: "/media/videos/entanglement_explainer.mp4",
        caption: "Lecture on Quantum Entanglement by Dr. Smith"
      },
      {
        type: "image",
        file_path: "/media/images/bell_test.png",
        caption: "Diagram of Bell's Theorem experiment"
      }
    ]
  },
  {
    id: "doc_physical_matter",
    title: "Physical Matter",
    category: "physics",
    start: "seg_4",
    end: "seg_6",
    tags: ["matter", "physics", "classical"],
    related: ["https://arxiv.org/abs/physics/classical-matter"],
    next: "doc_quantum_entanglement",
    path_ids: ["/Physics/Classical Physics/Physical Matter"],
    vector_embedding: [0.331, -0.412, 0.582, 0.223, -0.356],
    social: "social_2",
    group_discussion: "discussion_2",
    metadata: "Metadata for physical matter",
    media: [
      {
        type: "image",
        file_path: "/media/images/matter_states.png",
        caption: "States of matter diagram"
      }
    ]
  }
];

export const mockSegments: Segment[] = [
  {
    id: "seg_1",
    left: undefined,
    text: "Quantum entanglement is a phenomenon in quantum mechanics where pairs or groups of particles are generated, interact, or share spatial proximity in ways such that the quantum state of each particle of the pair or group cannot be described independently.",
    right: "seg_2",
    links: ["doc_physical_matter"],
    importance: 5,
    difficulty: "intermediate"
  },
  {
    id: "seg_2",
    left: "seg_1",
    text: "Instead, a quantum state must be described for the system as a whole. This creates what Einstein famously called 'spooky action at a distance' - a phenomenon that seemed to violate the principle of locality in physics.",
    right: "seg_3",
    links: ["doc_physical_matter"],
    importance: 4,
    difficulty: "advanced"
  },
  {
    id: "seg_3",
    left: "seg_2",
    text: "The experimental verification of quantum entanglement has been crucial for the development of quantum information theory, quantum computing, and quantum cryptography, opening new frontiers in technology and our understanding of the universe.",
    right: undefined,
    links: ["doc_physical_matter"],
    importance: 5,
    difficulty: "intermediate"
  },
  {
    id: "seg_4",
    left: undefined,
    text: "Physical matter consists of particles that have mass and take up space. These particles interact through various fundamental forces including electromagnetic, gravitational, strong nuclear, and weak nuclear forces.",
    right: "seg_5",
    links: ["doc_quantum_entanglement"],
    importance: 3,
    difficulty: "beginner"
  },
  {
    id: "seg_5",
    left: "seg_4",
    text: "Matter exists in different states including solid, liquid, gas, and plasma, each characterized by different arrangements and behaviors of particles at the molecular and atomic level.",
    right: "seg_6",
    links: ["doc_quantum_entanglement"],
    importance: 3,
    difficulty: "beginner"
  },
  {
    id: "seg_6",
    left: "seg_5",
    text: "Understanding the properties of matter is fundamental to chemistry, materials science, and engineering, forming the basis for countless technological applications in our modern world.",
    right: undefined,
    links: ["doc_quantum_entanglement"],
    importance: 4,
    difficulty: "intermediate"
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: "discussion_1",
    document_id: "doc_quantum_entanglement",
    segment_id: "seg_1",
    comments: [
      {
        id: "comment_1",
        user: "student_1",
        text: "Does entanglement break relativity? How can information travel faster than light?",
        timestamp: "2025-01-27T16:00:00Z",
        replies: [
          {
            id: "reply_1",
            user: "professor_1",
            text: "Great question! No, entanglement doesn't violate relativity. No information actually travels faster than light - it's the correlation between particles that's instantaneous, not information transfer.",
            timestamp: "2025-01-27T16:15:00Z"
          }
        ]
      },
      {
        id: "comment_2",
        user: "physics_student",
        text: "Can someone explain the practical applications of quantum entanglement?",
        timestamp: "2025-01-27T17:00:00Z",
        replies: [
          {
            id: "reply_2",
            user: "dr_smith",
            text: "Quantum entanglement is the foundation for quantum computing, quantum cryptography, and quantum teleportation. It's what makes quantum computers potentially so powerful!",
            timestamp: "2025-01-27T17:30:00Z"
          }
        ]
      }
    ]
  },
  {
    id: "discussion_2",
    document_id: "doc_physical_matter",
    segment_id: "seg_4",
    comments: [
      {
        id: "comment_3",
        user: "chemistry_student",
        text: "How do the fundamental forces relate to chemical bonding?",
        timestamp: "2025-01-27T18:00:00Z",
        replies: [
          {
            id: "reply_3",
            user: "chemistry_prof",
            text: "Chemical bonding primarily involves electromagnetic forces between electrons and nuclei. The other forces are generally too weak or operate at different scales.",
            timestamp: "2025-01-27T18:15:00Z"
          }
        ]
      }
    ]
  }
];