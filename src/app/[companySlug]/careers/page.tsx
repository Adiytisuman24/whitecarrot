"use client";

import { useEffect, useState, use } from "react";
import { Company, Job, ContentSection } from "@/lib/types";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { JobCard } from "@/components/JobCard";
import { Search, MapPin, Globe, Loader2, ArrowLeft, X, Upload } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

// Helper to inject branding variables
function BrandingStyles({ company }: { company: Company }) {
  return (
    <style jsx global>{`
      :root {
        --brand-primary: ${company.branding.primaryColor};
        --brand-secondary: ${company.branding.secondaryColor};
      }
      .bg-brand-primary { background-color: var(--brand-primary); }
      .text-brand-primary { color: var(--brand-primary); }
      .bg-brand-secondary { background-color: var(--brand-secondary); }
      .border-brand-primary { border-color: var(--brand-primary); }
      
      body {
          font-family: ${company.branding.fontFamily}, sans-serif;
      }
    `}</style>
  );
}

function ApplyModal({ job, company, onClose }: { job: Job, company: Company, onClose: () => void }) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [skills, setSkills] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            // 1. Create Candidate
            const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);
            const candidate = await MockDB.createCandidate({
                name,
                email,
                resumeUrl,
                skills: skillList,
                role: 'Applicant',
                bio: 'Generated bio'
            });

            // 2. Apply
            await MockDB.applyToJob({
                jobId: job.id,
                candidateId: candidate.id
            });

            // 3. Redirect to Candidate Platform
            router.push(`/candidate/dashboard?candidateId=${candidate.id}`);
            
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Apply for {job.title}</h2>
                        <p className="text-sm text-gray-500">at {company.name}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose}><X className="h-5 w-5" /></Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input required value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Resume / Portfolio URL</label>
                        <Input required value={resumeUrl} onChange={e => setResumeUrl(e.target.value)} placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Skills (Comma separated)</label>
                        <div className="relative">
                           <Input 
                              required 
                              value={skills} 
                              onChange={e => setSkills(e.target.value)} 
                              placeholder="React, Node.js, Design..." 
                           />
                           <p className="text-xs text-gray-400 mt-1">Our AI will match these against the job requirements.</p>
                        </div>
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
                        <Button type="submit" disabled={submitting} className="flex-1 bg-brand-primary text-white font-bold" style={{ backgroundColor: company.branding.primaryColor }}>
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Application'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function CareerPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const resolvedParams = use(params);
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const comp = await MockDB.getCompany(resolvedParams.companySlug);
        if (comp) {
          setCompany(comp);
          const jobData = await MockDB.getJobs(comp.id);
          setJobs(jobData);
        } else {
           // Handle 404 in a real app, for now just null
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resolvedParams.companySlug]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!company) {
    return notFound();
  }

  // Filter Jobs
  const filteredJobs = jobs.filter(job => {
     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesLocation = locationFilter ? job.location === locationFilter : true;
     const matchesType = typeFilter ? job.type === typeFilter : true;
     return matchesSearch && matchesLocation && matchesType;
  });

  const uniqueLocations = Array.from(new Set(jobs.map(j => j.location)));
  const uniqueTypes = Array.from(new Set(jobs.map(j => j.type)));

  // Render Section Helper
  const renderSection = (section: ContentSection) => {
      switch (section.type) {
          case 'hero':
              return (
                  <section key={section.id} className="relative py-20 text-white overflow-hidden">
                      <div className="absolute inset-0 bg-brand-primary opacity-90" style={{ backgroundColor: company.branding.primaryColor }}></div>
                      {company.branding.heroImageUrl && (
                          <img src={company.branding.heroImageUrl} alt="Hero" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
                      )}
                      
                      <div className="relative mx-auto max-w-7xl px-6 text-center">
                          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 shadow-sm">{section.title}</h1>
                          <div className="mx-auto max-w-2xl text-lg opacity-90 whitespace-pre-wrap">{section.content}</div>
                          <div className="mt-8">
                             <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100 font-bold border-none" 
                                style={{ color: company.branding.primaryColor }}
                                onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth'})}>
                                View Open Roles
                             </Button>
                          </div>
                      </div>
                  </section>
              );
          case 'text':
          case 'about':
              return (
                  <section key={section.id} className="py-16 bg-white">
                      <div className="mx-auto max-w-4xl px-6">
                           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ color: company.branding.primaryColor }}>{section.title}</h2>
                           <div className="prose prose-lg mx-auto text-gray-600 whitespace-pre-wrap leading-relaxed">{section.content}</div>
                      </div>
                  </section>
              );
           case 'culture':
              return (
                  <section key={section.id} className="py-16 bg-slate-50">
                      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
                           <div className="order-2 md:order-1">
                              {section.imageUrl && (
                                <img src={section.imageUrl} alt={section.title} className="rounded-2xl shadow-xl w-full object-cover h-[400px]" />
                              )}
                           </div>
                           <div className="order-1 md:order-2">
                               <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ color: company.branding.primaryColor }}>{section.title}</h2>
                               <div className="text-lg text-gray-600 whitespace-pre-wrap leading-relaxed">{section.content}</div>
                           </div>
                      </div>
                  </section>
              );
          default:
              return null;
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-primary selection:text-white">
      <BrandingStyles company={company} />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b shadow-sm">
         <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
             <div className="flex items-center gap-2">
                 {company.branding.logoUrl ? (
                     <img src={company.branding.logoUrl} alt={company.name} className="h-8 w-auto" />
                 ) : (
                     <span className="text-xl font-bold" style={{ color: company.branding.primaryColor }}>{company.name}</span>
                 )}
             </div>
             <div className="flex items-center gap-4">
                 <Link href={company.branding.logoUrl || '#'} className="text-sm font-medium hover:underline hidden sm:block">Company Website &rarr;</Link>
             </div>
         </div>
      </nav>
      
      {/* Render Dynamic Sections (Sorted) */}
      {company.sections.sort((a,b) => a.order - b.order).map(renderSection)}
      
      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-slate-50 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Find your next role at {company.name}. We are always looking for talented individuals to join our team.</p>
              </div>
              
              {/* Search & Filters */}
              <div className="mb-10 p-4 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input 
                        placeholder="Search for a job title..." 
                        className="pl-10 h-12 text-lg border-gray-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                      <select 
                        className="h-12 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary w-full md:w-48"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      >
                          <option value="">All Locations</option>
                          {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <select 
                        className="h-12 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary w-full md:w-48"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                      >
                          <option value="">All Types</option>
                          {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                  </div>
              </div>
              
              {/* Job List */}
              <div className="grid gap-6">
                  {filteredJobs.length > 0 ? (
                      filteredJobs.map(job => (
                          <JobCard 
                              key={job.id} 
                              job={job} 
                              primaryColor={company.branding.primaryColor}
                              onClick={() => setSelectedJob(job)} 
                          />
                      ))
                  ) : (
                      <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-dashed">
                          <p className="text-lg">No jobs found matching your criteria.</p>
                          <Button variant="link" onClick={() => { setSearchQuery(''); setLocationFilter(''); setTypeFilter(''); }}>Clear Filters</Button>
                      </div>
                  )}
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
          <div className="mx-auto max-w-7xl px-6 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} {company.name}. Powered by Mini ATS.</p>
          </div>
      </footer>
      
      {/* Apply Modal */}
      {selectedJob && (
          <ApplyModal 
              job={selectedJob} 
              company={company} 
              onClose={() => setSelectedJob(null)} 
          />
      )}
    </div>
  );
}
