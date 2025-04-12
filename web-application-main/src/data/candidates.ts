
import { Candidate } from "../types";

// Skills list
export const skillsList = [
  "JavaScript", "TypeScript", "React", "Angular", "Vue.js", 
  "Node.js", "Python", "Java", "C#", "PHP",
  "HTML", "CSS", "SQL", "MongoDB", "AWS",
  "Docker", "Kubernetes", "Git", "Redux", "GraphQL"
];

// Experience options
export const experienceOptions = [
  "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", 
  "6 Years", "7 Years", "8 Years", "9 Years", "10+ Years"
];

// Gender options
export const genderOptions = ["Male", "Female", "Other"];

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Mock candidates data
export const mockCandidates: Candidate[] = [
  {
    id: generateId(),
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    gender: "Male",
    experience: "3 Years",
    qualification: "Bachelor of Arts (BA)",
    skills: ["JavaScript", "React", "Node.js"]
  },
  {
    id: generateId(),
    name: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "jane.smith@example.com",
    gender: "Female",
    experience: "5 Years",
    qualification: "Master of Computer Science (MCS)",
    skills: ["Python", "Django", "SQL"]
  },
  {
    id: generateId(),
    name: "Michael Johnson",
    phone: "+1 (555) 456-7890",
    email: "michael.j@example.com",
    gender: "Male",
    experience: "2 Years",
    qualification: "Bachelor of Science (BS)",
    skills: ["Java", "Spring", "Hibernate"]
  },
  {
    id: generateId(),
    name: "Emily Wilson",
    phone: "+1 (555) 789-0123",
    email: "emily.w@example.com",
    gender: "Female",
    experience: "4 Years",
    qualification: "Master of Business Administration (MBA)",
    skills: ["TypeScript", "Angular", "MongoDB"]
  },
  {
    id: generateId(),
    name: "Alex Rivera",
    phone: "+1 (555) 234-5678",
    email: "alex.r@example.com",
    gender: "Other",
    experience: "6 Years",
    qualification: "PhD in Computer Science",
    skills: ["C#", ".NET", "SQL", "Azure"]
  },
  {
    id: generateId(),
    name: "Samantha Lee",
    phone: "+1 (555) 345-6789",
    email: "samantha.l@example.com",
    gender: "Female",
    experience: "3 Years",
    qualification: "Bachelor of Engineering (BE)",
    skills: ["React", "Redux", "JavaScript", "HTML", "CSS"]
  },
  {
    id: generateId(),
    name: "David Kim",
    phone: "+1 (555) 876-5432",
    email: "david.k@example.com",
    gender: "Male",
    experience: "7 Years",
    qualification: "Master of Science (MS)",
    skills: ["Python", "Machine Learning", "TensorFlow"]
  },
  {
    id: generateId(),
    name: "Olivia Martinez",
    phone: "+1 (555) 567-8901",
    email: "olivia.m@example.com",
    gender: "Female",
    experience: "2 Years",
    qualification: "Bachelor of Technology (BTech)",
    skills: ["Vue.js", "JavaScript", "CSS"]
  },
  {
    id: generateId(),
    name: "Ethan Brown",
    phone: "+1 (555) 678-9012",
    email: "ethan.b@example.com",
    gender: "Male",
    experience: "4 Years",
    qualification: "Bachelor of Computer Applications (BCA)",
    skills: ["PHP", "Laravel", "MySQL"]
  },
  {
    id: generateId(),
    name: "Sophia Chen",
    phone: "+1 (555) 789-0123",
    email: "sophia.c@example.com",
    gender: "Female",
    experience: "5 Years",
    qualification: "Master of Computer Applications (MCA)",
    skills: ["AWS", "DevOps", "Docker", "Kubernetes"]
  },
  {
    id: generateId(),
    name: "Daniel Wilson",
    phone: "+1 (555) 890-1234",
    email: "daniel.w@example.com",
    gender: "Male",
    experience: "8 Years",
    qualification: "PhD in Data Science",
    skills: ["Data Science", "R", "Python", "Statistics"]
  },
  {
    id: generateId(),
    name: "Ava Rodriguez",
    phone: "+1 (555) 901-2345",
    email: "ava.r@example.com",
    gender: "Female",
    experience: "3 Years",
    qualification: "Bachelor of Science (BS)",
    skills: ["JavaScript", "React Native", "Mobile Development"]
  }
];

// Local storage key
const STORAGE_KEY = 'candidates_data';

// Function to get all candidates
export const getCandidates = (): Candidate[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Initialize with mock data if no stored data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCandidates));
  return mockCandidates;
};

// Function to add a new candidate
export const addCandidate = (candidate: Omit<Candidate, "id">): Candidate => {
  const candidates = getCandidates();
  const newCandidate = { ...candidate, id: generateId() };
  
  const updatedCandidates = [...candidates, newCandidate];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCandidates));
  
  return newCandidate;
};
