"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Company, ContentSection, Job, Recruiter } from "@/lib/types";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EditorSection } from "@/components/recruiter/EditorSection";
import { JobItem } from "@/components/recruiter/JobItem";
import { DSAQuestionsManager } from "@/components/recruiter/DSAQuestionsManager";
import { LayoutTemplate, Briefcase, Eye, Save, Plus, Loader2, FileText, Sparkles, LogOut, Code } from "lucide-react";
import Link from "next/link";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCompanyId = searchParams.get('companyId');

  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(initialCompanyId);
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<'branding' | 'content' | 'jobs' | 'dsa'>('jobs'); // Default to jobs for recruiter flow
  const [saving, setSaving] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({ title: '', location: '', skills: [] });
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);

  useEffect(() => {
    // Check authentication
    const recruiterData = localStorage.getItem('recruiter');
    if (!recruiterData) {
      router.push('/recruiter/login');
      return;
    }
    
    const parsedRecruiter = JSON.parse(recruiterData);
    setRecruiter(parsedRecruiter);

    MockDB.getAllCompanies().then((data) => {
      setCompanies(data);
      // Only allow access to recruiter's company
      const targetId = parsedRecruiter.companyId;
      if (targetId) {
        setSelectedCompanyId(targetId);
        const found = data.find(c => c.id === targetId);
        if (found) setCompany(found);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCompanyId && recruiter) {
      // Ensure recruiter can only access their own company
      if (selectedCompanyId !== recruiter.companyId) {
        setSelectedCompanyId(recruiter.companyId);
        return;
      }
      MockDB.getJobs(selectedCompanyId).then(setJobs);
      const c = companies.find(Comp => Comp.id === selectedCompanyId);
      if(c) setCompany(c);
    }
  }, [selectedCompanyId, companies, recruiter]);

  const handleSave = async () => {
    if (!company) return;
    setSaving(true);
    try {
      await MockDB.updateCompany(company.id, company);
      // Refresh local list
      const updatedList = companies.map(c => c.id === company.id ? company : c);
      setCompanies(updatedList);
    } catch (e) {
      console.error(e);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handlePostJob = async () => {
      if (!company || !newJob.title) return;
      setSaving(true);
      try {
          // Mock AI Skill generation if empty
          let skills = newJob.skills || [];
          if (skills.length === 0) {
              const inferred = newJob.title.includes('Engineer') ? ['React', 'Node.js'] : ['Communication', 'Sales'];
              skills = inferred;
          }

          await MockDB.createJob({
              companyId: company.id,
              title: newJob.title || 'Untitled',
              location: newJob.location || 'Remote',
              type: 'Full-time',
              department: 'Engineering',
              description: newJob.description || 'We are hiring...',
              skills,
              slug: (newJob.title || 'job').toLowerCase().replace(/\s+/g, '-'),
              experienceLevel: 'Mid',
              workPolicy: 'Remote'
          });
          
          const updatedJobs = await MockDB.getJobs(company.id);
          setJobs(updatedJobs);
          setShowJobForm(false);
          setNewJob({ title: '', location: '', skills: [] });
      } catch (e) {
          console.error(e);
      } finally {
          setSaving(false);
      }
  };

  const addSection = () => {
    if (!company) return;
    const newSection: ContentSection = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      title: 'New Section',
      content: 'Add your content here...',
      order: company.sections.length,
    };
    setCompany({
      ...company,
      sections: [...company.sections, newSection],
    });
  };

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    if (!company) return;
    const newSections = company.sections.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setCompany({ ...company, sections: newSections });
  };

  const deleteSection = (id: string) => {
    if (!company) return;
    setCompany({
      ...company,
      sections: company.sections.filter((s) => s.id !== id),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('recruiter');
    router.push('/recruiter/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!company) return <div>No company data found.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Recruiter Dashboard</h1>
            {company && (
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md">
                <span className="text-sm font-medium text-slate-700">{company.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             {recruiter && (
                <span className="text-sm text-slate-600">
                  Welcome, <span className="font-semibold">{recruiter.name}</span>
                </span>
             )}
             <Link href={`/${company.slug}/careers`} target="_blank">
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" /> Preview
                </Button>
             </Link>
             <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
             </Button>
             <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
             </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
           {/* Sidebar Navigation */}
           <div className="lg:col-span-3">
              <nav className="flex flex-col gap-2">
                 <button
                    onClick={() => setActiveTab('jobs')}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'jobs' ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white/50'}`}
                 >
                    <FileText className="h-5 w-5" />
                    Job Listings
                 </button>
                 <button
                    onClick={() => setActiveTab('branding')}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'branding' ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white/50'}`}
                 >
                    <LayoutTemplate className="h-5 w-5" />
                    Branding & Style
                 </button>
                 <button
                    onClick={() => setActiveTab('content')}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'content' ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white/50'}`}
                 >
                    <Briefcase className="h-5 w-5" />
                    Page Sections
                 </button>
                 <button
                    onClick={() => setActiveTab('dsa')}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'dsa' ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-white/50'}`}
                 >
                    <Code className="h-5 w-5" />
                    DSA Questions
                 </button>
              </nav>
           </div>
           
           {/* Main Editor Area */}
           <div className="lg:col-span-9">
              {activeTab === 'jobs' && (
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">Active Jobs ({jobs.length})</h2>
                          <Button onClick={() => setShowJobForm(true)} className="gap-2">
                              <Plus className="h-4 w-4" /> Post New Job
                          </Button>
                      </div>

                      {showJobForm && (
                          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
                              <h3 className="font-medium">Post a Job</h3>
                              <div className="grid gap-4 md:grid-cols-2">
                                  <Input 
                                    placeholder="Job Title" 
                                    value={newJob.title} 
                                    onChange={e => setNewJob({...newJob, title: e.target.value})}
                                  />
                                  <Input 
                                    placeholder="Location"
                                    value={newJob.location} 
                                    onChange={e => setNewJob({...newJob, location: e.target.value})}    
                                  />
                                  <div className="col-span-2">
                                      <textarea 
                                        className="w-full rounded-md border p-2 text-sm" 
                                        rows={3}
                                        placeholder="Job Description..."
                                        value={newJob.description}
                                        onChange={e => setNewJob({...newJob, description: e.target.value})}
                                      />
                                  </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                  <Button variant="ghost" onClick={() => setShowJobForm(false)}>Cancel</Button>
                                  <Button onClick={handlePostJob} disabled={saving} className="gap-2">
                                      <Sparkles className="h-4 w-4 text-yellow-400" />
                                      Generate with AI & Post
                                  </Button>
                              </div>
                          </div>
                      )}

                      <div className="grid gap-4">
                          {jobs.map(job => (
                              <JobItem key={job.id} job={job} />
                          ))}
                      </div>
                  </div>
              )}

              {activeTab === 'branding' && (
                  <div className="space-y-6">
                      <div className="rounded-xl border bg-white p-6 shadow-sm">
                          <h2 className="mb-4 text-lg font-semibold">Brand Identity</h2>
                          <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-2">
                                  <label className="text-sm font-medium">Primary Color</label>
                                  <div className="flex gap-2">
                                      <input
                                          type="color"
                                          value={company.branding.primaryColor}
                                          onChange={(e) => setCompany({ ...company, branding: { ...company.branding, primaryColor: e.target.value } })}
                                          className="h-10 w-10 overflow-hidden rounded-md border p-0 cursor-pointer"
                                      />
                                      <Input
                                          value={company.branding.primaryColor}
                                          onChange={(e) => setCompany({ ...company, branding: { ...company.branding, primaryColor: e.target.value } })}
                                      />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-sm font-medium">Secondary Color</label>
                                  <div className="flex gap-2">
                                      <input
                                          type="color"
                                          value={company.branding.secondaryColor}
                                          onChange={(e) => setCompany({ ...company, branding: { ...company.branding, secondaryColor: e.target.value } })}
                                          className="h-10 w-10 overflow-hidden rounded-md border p-0 cursor-pointer"
                                      />
                                      <Input
                                          value={company.branding.secondaryColor}
                                          onChange={(e) => setCompany({ ...company, branding: { ...company.branding, secondaryColor: e.target.value } })}
                                      />
                                  </div>
                              </div>
                              
                              <div className="col-span-2 space-y-2">
                                  <label className="text-sm font-medium">Logo URL</label>
                                  <Input
                                      value={company.branding.logoUrl || ''}
                                      onChange={(e) => setCompany({ ...company, branding: { ...company.branding, logoUrl: e.target.value } })}
                                      placeholder="https://..."
                                  />
                              </div>

                              <div className="col-span-2 space-y-2">
                                  <label className="text-sm font-medium">Hero Image URL</label>
                                  <Input
                                      value={company.branding.heroImageUrl || ''}
                                      onChange={(e) => setCompany({ ...company, branding: { ...company.branding, heroImageUrl: e.target.value } })}
                                      placeholder="https://..."
                                  />
                                  {company.branding.heroImageUrl && (
                                      <div className="mt-2 h-40 w-full overflow-hidden rounded-lg border bg-slate-100">
                                          <img src={company.branding.heroImageUrl} alt="Hero Preview" className="h-full w-full object-cover" />
                                      </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'content' && (
                  <div className="space-y-6">
                      <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">Page Sections</h2>
                          <Button size="sm" onClick={addSection} className="gap-2">
                              <Plus className="h-4 w-4" /> Add Section
                          </Button>
                      </div>
                      
                      <div className="space-y-4">
                          {company.sections.sort((a,b) => a.order - b.order).map((section) => (
                              <EditorSection
                                  key={section.id}
                                  section={section}
                                  onUpdate={(updates) => updateSection(section.id, updates)}
                                  onDelete={() => deleteSection(section.id)}
                              />
                          ))}
                      </div>
                  </div>
              )}

              {activeTab === 'dsa' && recruiter && (
                  <DSAQuestionsManager companyId={company.id} recruiterId={recruiter.id} />
              )}
           </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <DashboardContent />
        </Suspense>
    )
}
