import { Company, Job, Candidate, Application, Recruiter, DSAQuestion, ApplicationStatus } from './types';
import { INITIAL_COMPANIES, INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_RECRUITERS, INITIAL_DSA_QUESTIONS } from './initial-data';


// Helper for persistence
const STORAGE_KEY = 'mini_ats_db_v1';
const isBrowser = typeof window !== 'undefined';

function loadFromStorage() {
    if (!isBrowser) return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

function saveToStorage(data: { 
    companies: Company[], 
    jobs: Job[], 
    candidates: Candidate[], 
    applications: Application[],
    recruiters: Recruiter[],
    dsaQuestions: DSAQuestion[]
}) {
    if (isBrowser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
}

const initialData = loadFromStorage() || {
    companies: [...INITIAL_COMPANIES],
    jobs: [...INITIAL_JOBS],
    candidates: [...INITIAL_CANDIDATES],
    recruiters: [...INITIAL_RECRUITERS],
    dsaQuestions: [...INITIAL_DSA_QUESTIONS],

    applications: [
        {
            id: 'app-demo-1',
            jobId: 'job-0', // Full Stack Engineer at Umbrella Corp
            candidateId: 'john-doe-123',
            status: 'applied' as const,
            score: 85,
            aiAnalysis: 'Match Score: 85%. Matched 7 of 7 required skills. FAST TRACK RECOMMENDED.',
            appliedAt: new Date().toISOString()
        }
    ]
};

let companies: Company[] = initialData.companies;
let jobs: Job[] = initialData.jobs;
let candidates: Candidate[] = initialData.candidates;
let applications: Application[] = initialData.applications;
let recruiters: Recruiter[] = initialData.recruiters;
let dsaQuestions: DSAQuestion[] = initialData.dsaQuestions;

function persist() {
    saveToStorage({ companies, jobs, candidates, applications, recruiters, dsaQuestions });
}

// Simulate database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MockDB = {
  // --- Companies ---
  getCompany: async (slug: string): Promise<Company | null> => {
    await delay(200);
    return companies.find((c) => c.slug === slug) || null;
  },

  getAllCompanies: async (): Promise<Company[]> => {
    await delay(200);
    return [...companies];
  },

  updateCompany: async (id: string, updates: Partial<Company>): Promise<Company> => {
    await delay(300);
    const index = companies.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Company not found');
    
    const updated = {
      ...companies[index],
      ...updates,
      branding: { ...companies[index].branding, ...(updates.branding || {}) },
    };
    companies[index] = updated;
    persist();
    return updated;
  },

  // --- Jobs ---
  getJobs: async (companyId: string): Promise<Job[]> => {
    await delay(200);
    return jobs.filter((j) => j.companyId === companyId);
  },

  getAllJobs: async (): Promise<Job[]> => {
      await delay(200);
      return [...jobs];
  },
  
  getJob: async (id: string): Promise<Job | null> => {
      await delay(100);
      return jobs.find(j => j.id === id) || null;
  },
  
  createJob: async (job: Omit<Job, 'id' | 'publishedAt'>): Promise<Job> => {
      await delay(200);
      const newJob: Job = {
          ...job,
          id: Math.random().toString(36).substring(7),
          publishedAt: new Date().toISOString()
      };
      jobs.push(newJob);
      persist();
      return newJob;
  },

  updateJob: async (id: string, updates: Partial<Job>): Promise<Job> => {
      await delay(200);
      const index = jobs.findIndex(j => j.id === id);
      if (index === -1) throw new Error("Job not found");
      const updated = { ...jobs[index], ...updates };
      jobs[index] = updated;
      persist();
      return updated;
  },

  // --- Candidates ---
  createCandidate: async (candidate: Omit<Candidate, 'id'>): Promise<Candidate> => {
      await delay(300);
      const newCandidate = { ...candidate, id: Math.random().toString(36).substring(7) };
      candidates.push(newCandidate);
      persist();
      return newCandidate;
  },

  getCandidate: async (email: string): Promise<Candidate | null> => {
      await delay(200);
      return candidates.find(c => c.email === email) || null;
  },

  getCandidateById: async (id: string): Promise<Candidate | null> => {
      await delay(200);
      return candidates.find(c => c.id === id) || null;
  },

  getCandidateByEmail: async (email: string): Promise<Candidate | null> => {
      await delay(200);
      return candidates.find(c => c.email.toLowerCase() === email.toLowerCase()) || null;
  },

  loginCandidateWithPassword: async (email: string, password: string): Promise<Candidate | null> => {
      await delay(300);
      const candidate = candidates.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (!candidate) return null;
      
      // In a real app, you would hash and compare passwords
      // For this mock, we'll do a simple comparison
      if (candidate.password === password) {
          return candidate;
      }
      return null;
  },

  // --- Applications ---
  applyToJob: async (application: Omit<Application, 'id' | 'appliedAt' | 'status'>): Promise<Application> => {
      await delay(400);
      // AI Scoring Mock
      const job = jobs.find(j => j.id === application.jobId);
      const candidate = candidates.find(c => c.id === application.candidateId);
      
      let score = 0;
      let aiAnalysis = "No analysis available.";
      
      if (job && candidate) {
          // Simple overlap logic
          const jobSkills = job.skills.map(s => s.toLowerCase());
          const candSkills = candidate.skills.map(s => s.toLowerCase());
          const matchCount = jobSkills.filter(s => candSkills.includes(s)).length;
          score = jobSkills.length > 0 ? (matchCount / jobSkills.length) * 100 : 50;
          
          aiAnalysis = `Match Score: ${score.toFixed(0)}%. Matched ${matchCount} of ${jobSkills.length} required skills.`;
          
          if (score > 80) aiAnalysis += " FAST TRACK RECOMMENDED.";
      }

      // Auto-reject candidates with less than 80% match
      const isRejected = score < 80;
      const status: ApplicationStatus = isRejected ? 'rejected' : 'applied';

      const newApp: Application = {
          ...application,
          id: Math.random().toString(36).substring(7),
          appliedAt: new Date().toISOString(),
          status,
          score,
          aiAnalysis
      };

      // Add rejection info if rejected
      if (isRejected && job && candidate) {
          newApp.rejectionInfo = {
              rejectedBy: 'AI',
              reason: `Your profile match score (${score.toFixed(0)}%) is below our minimum threshold of 80%. We recommend improving your skills in: ${job.skills.filter(s => !candidate.skills.map(cs => cs.toLowerCase()).includes(s.toLowerCase())).join(', ')}`,
              rejectedAt: new Date().toISOString(),
              emailSent: true
          };
          
          // Simulate sending automated rejection email
          console.log(`📧 Automated Rejection Email Sent to ${candidate.email}:`);
          console.log(`Subject: Application Update - ${job.title}`);
          console.log(`Dear ${candidate.name},\n\nThank you for applying for the ${job.title} position. After careful review by our AI screening system, we regret to inform you that we will not be moving forward with your application at this time.\n\nReason: ${newApp.rejectionInfo.reason}\n\nWe encourage you to apply for other positions that may be a better match for your skills and experience.\n\nBest regards,\nThe Hiring Team`);
      }

      applications.push(newApp);
      persist();
      return newApp;
  },

  getApplicationsForJob: async (jobId: string): Promise<(Application & { candidate: Candidate })[]> => {
      await delay(200);
      const apps = applications.filter(a => a.jobId === jobId);
      return apps.map(a => ({
          ...a,
          candidate: candidates.find(c => c.id === a.candidateId)!
      })).filter(a => a.candidate); // safety check
  },

  getApplicationsByCandidate: async (candidateId: string): Promise<(Application & { job: Job })[]> => {
      await delay(200);
      const apps = applications.filter(a => a.candidateId === candidateId);
      return apps.map(a => ({
          ...a,
          job: jobs.find(j => j.id === a.jobId)!
      })).filter(a => a.job);
  },

  updateCandidate: async (id: string, updates: Partial<Candidate>): Promise<Candidate> => {
      await delay(200);
      const index = candidates.findIndex(c => c.id === id);
      if (index === -1) throw new Error("Candidate not found");
      const updated = { ...candidates[index], ...updates };
      candidates[index] = updated;
      persist();
      return updated;
  },

  updateApplication: async (id: string, updates: Partial<Application>): Promise<Application> => {
      await delay(200);
      const index = applications.findIndex(a => a.id === id);
      if (index === -1) throw new Error("Application not found");
      const updated = { ...applications[index], ...updates };
      applications[index] = updated;
      persist();
      return updated;
  },

  analyzeApplication: async (appId: string): Promise<Application | null> => {
      const appIndex = applications.findIndex(a => a.id === appId);
      if (appIndex === -1) return null;
      
      const app = applications[appIndex];
      const job = jobs.find(j => j.id === app.jobId);
      const candidate = candidates.find(c => c.id === app.candidateId);
      
      if (!job || !candidate) return app;

      // Mock Analysis
      const jobSkills = job.skills.map(s => s.toLowerCase());
      const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase());
      
      const matchingSkills = jobSkills.filter(s => candidateSkills.includes(s));
      const missingSkills = jobSkills.filter(s => !candidateSkills.includes(s));
      
      const matchPercentage = Math.round((matchingSkills.length / Math.max(jobSkills.length, 1)) * 100);
      
      const improvements = missingSkills.map(skill => `Take a course on ${skill} or add a project using ${skill}.`);
      
      // Auto-Select Logic
      let status = app.status;
      if (matchPercentage > 80 && status === 'applied') {
          status = 'selected'; // Trigger interview flow
      }

      const analysis = {
          matchPercentage: Math.max(matchPercentage, 10), 
          strengths: matchingSkills,
          weaknesses: missingSkills,
          missingSkills: missingSkills,
          improvements: improvements
      };

      const updatedApp = { ...app, aiAnalysis: analysis, score: matchPercentage, status };
      applications[appIndex] = updatedApp;
      persist();
      return updatedApp;
  },

  submitInterview: async (appId: string): Promise<Application> => {
      await delay(2000);
      const index = applications.findIndex(a => a.id === appId);
      if (index === -1) throw new Error("Application not found");
      
      // 90% chance to pass mock interview
      const passed = Math.random() > 0.1; 
      
      const updated = { 
          ...applications[index], 
          status: passed ? 'offer_pending' : 'rejected',
          interviewData: {
              completed: true,
              result: passed ? 'passed' : 'failed',
              scheduledAt: new Date().toISOString()
          }
      } as Application;

      if (passed) {
          updated.offerLetterUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // Mock PDF
      }
      
      applications[index] = updated;
      persist();
      return updated;
  },

  // --- Recruiters ---
  loginRecruiter: async (email: string): Promise<Recruiter | null> => {
      await delay(300);
      return recruiters.find(r => r.email.toLowerCase() === email.toLowerCase()) || null;
  },

  getRecruiter: async (id: string): Promise<Recruiter | null> => {
      await delay(200);
      return recruiters.find(r => r.id === id) || null;
  },

  loginRecruiterWithPassword: async (usernameOrEmail: string, password: string): Promise<Recruiter | null> => {
      await delay(300);
      const recruiter = recruiters.find(r => 
          r.email.toLowerCase() === usernameOrEmail.toLowerCase() || 
          (r as any).username?.toLowerCase() === usernameOrEmail.toLowerCase()
      );
      if (!recruiter) return null;
      
      // In a real app, you would hash and compare passwords
      if ((recruiter as any).password === password) {
          return recruiter;
      }
      return null;
  },

  createRecruiter: async (data: { username: string; email: string; password: string; name: string; companyName: string }): Promise<Recruiter | null> => {
      await delay(300);
      
      // Check if email or username already exists
      const existing = recruiters.find(r => 
          r.email.toLowerCase() === data.email.toLowerCase() ||
          (r as any).username?.toLowerCase() === data.username.toLowerCase()
      );
      if (existing) return null;
      
      // Create new company for this recruiter
      const companyId = Math.random().toString(36).substring(7);
      const newCompany: Company = {
          id: companyId,
          slug: data.companyName.toLowerCase().replace(/\s+/g, '-'),
          name: data.companyName,
          branding: {
              primaryColor: '#0066FF',
              secondaryColor: '#00CCFF',
              fontFamily: 'Inter'
          },
          sections: []
      };
      companies.push(newCompany);
      
      // Create new recruiter
      const newRecruiter: Recruiter = {
          id: Math.random().toString(36).substring(7),
          email: data.email,
          companyId,
          name: data.name,
          role: 'Admin',
          ...(data.username && { username: data.username } as any),
          ...(data.password && { password: data.password } as any)
      };
      recruiters.push(newRecruiter);
      persist();
      return newRecruiter;
  },

  // --- DSA Questions ---
  getDSAQuestions: async (companyId: string): Promise<DSAQuestion[]> => {
      await delay(200);
      return dsaQuestions.filter(q => q.companyId === companyId);
  },

  getDSAQuestion: async (id: string): Promise<DSAQuestion | null> => {
      await delay(200);
      return dsaQuestions.find(q => q.id === id) || null;
  },

  createDSAQuestion: async (question: Omit<DSAQuestion, 'id' | 'createdAt'>): Promise<DSAQuestion> => {
      await delay(300);
      const newQuestion: DSAQuestion = {
          ...question,
          id: `dsa-${Math.random().toString(36).substring(7)}`,
          createdAt: new Date().toISOString()
      };
      dsaQuestions.push(newQuestion);
      persist();
      return newQuestion;
  },

  updateDSAQuestion: async (id: string, updates: Partial<DSAQuestion>): Promise<DSAQuestion> => {
      await delay(200);
      const index = dsaQuestions.findIndex(q => q.id === id);
      if (index === -1) throw new Error("Question not found");
      const updated = { ...dsaQuestions[index], ...updates };
      dsaQuestions[index] = updated;
      persist();
      return updated;
  },

  deleteDSAQuestion: async (id: string): Promise<void> => {
      await delay(200);
      const index = dsaQuestions.findIndex(q => q.id === id);
      if (index === -1) throw new Error("Question not found");
      dsaQuestions.splice(index, 1);
      persist();
  }

};
