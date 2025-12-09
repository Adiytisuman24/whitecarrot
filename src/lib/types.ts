
export interface BrandingConfig {
  logoUrl?: string;
  primaryColor: string; // Hex code
  secondaryColor: string; // Hex code
  heroVideoUrl?: string; // Optional URL for hero video
  heroImageUrl?: string; // Fallback or alternative
  fontFamily: string;
}

export type SectionType = 'hero' | 'about' | 'gallery' | 'culture' | 'perks' | 'text';

export interface ContentSection {
  id: string;
  type: SectionType;
  title: string;
  content: string; // Markdown or plain text
  order: number;
  imageUrl?: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'; // From CSV: employment_type
  workPolicy: 'Remote' | 'On-site' | 'Hybrid'; // From CSV: work_policy
  department: string;
  experienceLevel: string;
  description: string; // Generated or generic
  detailedJobDescription?: string; // Detailed JD added by HR
  companyDescription?: string; // About the company for this job
  responsibilities?: string[]; // Key responsibilities
  requirements?: string[]; // Job requirements
  benefits?: string[]; // Company benefits
  salaryRange?: string;
  publishedAt: string;
  skills: string[]; // Inferred or explicit
  slug: string; // URL friendly
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  branding: BrandingConfig;
  sections: ContentSection[];
}



export interface Candidate {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  resumeUrl?: string; // Active resume
  resumeVersions?: { url: string; date: string; name: string }[];
  profileImage?: string;
  skills: string[];
  role?: string; 
  bio?: string;
  location?: string;
  experienceLevel?: string;
  certifications?: string[];
  testResults?: { testName: string, score: number, date: string }[];
  projects?: { name: string; url: string; description?: string }[];
  codingProfiles?: { 
      platform: string; 
      rank: string; 
      url: string; 
      stats?: { easy: number; medium: number; hard: number; total: number };
  }[];
  registeredHackathons?: string[];
  githubUrl?: string;
  college?: {
      name: string;
      isVerified: boolean;
      cgpa: number;
      degree: string;
      batch: string;
  };
}

export type ApplicationStatus = 'applied' | 'screening' | 'test_pending' | 'test_completed' | 'interview' | 'selected' | 'rejected' | 'offer_pending' | 'offer_accepted';

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  score?: number; // AI Match Score
  aiAnalysis?: string | {
    matchPercentage: number;
    strengths: string[];
    weaknesses: string[];
    missingSkills: string[];
    improvements: string[];
  }; 
  testScore?: number;
  appliedAt: string;
  interviewData?: {
      scheduledAt?: string;
      completed: boolean;
      result?: 'passed' | 'failed';
  };
  offerLetterUrl?: string;
  rejectionInfo?: {
    rejectedBy: 'AI' | 'Company';
    reason: string;
    rejectedAt: string;
    emailSent: boolean;
  };
}

export interface Recruiter {
  id: string;
  email: string;
  companyId: string;
  name: string;
  role: 'HR' | 'Hiring Manager' | 'Admin';
}

export interface DSAQuestion {
  id: string;
  companyId: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number; // in minutes
  hints: string[];
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }[];
  starterCode?: {
    javascript?: string;
    python?: string;
    java?: string;
  };
  tags: string[];
  createdBy: string;
  createdAt: string;
}
