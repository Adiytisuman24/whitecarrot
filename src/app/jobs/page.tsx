"use client";

import { useState, useEffect, Suspense } from "react";
import { MockDB } from "@/lib/mock-db";
import { Job, Company } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, MapPin, Briefcase, Filter, X, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function JobSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<(Job & { company?: Company })[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [loc, setLoc] = useState(searchParams.get('loc') || '');
  const [type, setType] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      const allJobs = await MockDB.getAllJobs();
      const allCompanies = await MockDB.getAllCompanies(); // Need to enrich jobs with company names
      
      const enriched = allJobs.map(j => ({
          ...j,
          company: allCompanies.find(c => c.id === j.companyId)
      }));

      // Client-side Filter
      const filtered = enriched.filter(j => {
          const matchQ = q ? j.title.toLowerCase().includes(q.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(q.toLowerCase())) : true;
          const matchLoc = loc ? j.location.toLowerCase().includes(loc.toLowerCase()) : true;
          const matchType = type.length > 0 ? type.includes(j.type) : true;
          return matchQ && matchLoc && matchType;
      });

      setJobs(filtered);
      setLoading(false);
    }
    fetchJobs();
  }, [q, loc, type]);

  // Derived data for Sidebar
  const jobTypes = Array.from(new Set(jobs.map(j => j.type)));

  const handleApply = (jobId: string, companySlug: string) => {
      // Create session intent? For now just redirect to public career page application modal
      // Ideally redirect to job specific page
      router.push(`/${companySlug}/careers`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-20">
            <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
                <Link href="/" className="font-bold text-xl tracking-tight text-slate-900">WhiteCarrot</Link>
                <div className="flex-1 flex gap-2 max-w-2xl ml-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            className="pl-9 h-10 bg-slate-100 border-none font-medium" 
                            placeholder="Job title, keywords, or company"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                    <div className="relative w-48 hidden md:block">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            className="pl-9 h-10 bg-slate-100 border-none font-medium" 
                            placeholder="City, state, or 'Remote'"
                            value={loc}
                            onChange={(e) => setLoc(e.target.value)}
                        />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6">Find Jobs</Button>
                </div>
                <div className="ml-auto flex gap-3">
                   <Link href="/candidate/dashboard"><Button variant="ghost">Dashboard</Button></Link>
                   <Link href="/candidate/login"><Button variant="outline">Sign In</Button></Link>
                </div>
            </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 flex gap-6">
            {/* Filter Sidebar */}
            <aside className="w-64 hidden lg:block space-y-6">
                 <div>
                     <h3 className="font-bold text-sm mb-3">Job Type</h3>
                     <div className="space-y-2">
                         {['Full-time', 'Contract', 'Part-time', 'Remote'].map(t => (
                             <label key={t} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 p-1 rounded">
                                 <input 
                                    type="checkbox" 
                                    checked={type.includes(t)}
                                    onChange={(e) => e.target.checked ? setType([...type, t]) : setType(type.filter(x => x !== t))}
                                    className="rounded border-slate-300" 
                                 />
                                 {t}
                             </label>
                         ))}
                     </div>
                 </div>
                 
                 <div>
                     <h3 className="font-bold text-sm mb-3">Salary Estimate</h3>
                     <div className="space-y-2 text-sm text-slate-600">
                         <div className="flex items-center gap-2"><input type="checkbox" /> $50,000+</div>
                         <div className="flex items-center gap-2"><input type="checkbox" /> $100,000+</div>
                         <div className="flex items-center gap-2"><input type="checkbox" /> $150,000+</div>
                     </div>
                 </div>
            </aside>

            {/* Job Feed */}
            <div className="flex-1 flex gap-6">
                <div className="flex-1 space-y-4">
                     <div className="flex items-center justify-between">
                         <h1 className="font-bold text-xl">{selectedJob ? 'Job Details' : `Job Feed`} <span className="text-slate-400 font-normal text-sm ml-2">{jobs.length} jobs found</span></h1>
                         <div className="text-sm text-slate-500">Sorted by: <span className="font-bold text-slate-900">Relevance</span></div>
                     </div>

                     {loading ? (
                         <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-32 bg-white rounded animate-pulse" />)}</div>
                     ) : (
                         jobs.map(job => (
                             <div 
                                key={job.id} 
                                onClick={() => setSelectedJob(job.id)}
                                className={`bg-white p-5 rounded-lg border cursor-pointer hover:border-slate-400 transition-all ${selectedJob === job.id ? 'border-2 border-blue-600 shadow-md ring-1 ring-blue-100' : 'border-slate-200'}`}
                             >
                                 <div className="flex justify-between items-start mb-1">
                                    <h2 className={`font-bold text-lg ${selectedJob === job.id ? 'text-blue-700' : 'text-slate-900'}`}>{job.title}</h2>
                                    {job.publishedAt && <span className="text-xs text-slate-400">new</span>}
                                 </div>
                                 <div className="text-sm text-slate-800 mb-2">{job.company?.name || 'Top Employer'}</div>
                                 <div className="text-sm text-slate-500 mb-3">{job.location} • {job.type}</div>
                                 
                                 <div className="flex gap-2 flex-wrap mb-4">
                                     {job.skills.slice(0, 3).map(s => <span key={s} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{s}</span>)}
                                     {job.salaryRange && <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded font-mono">{job.salaryRange}</span>}
                                 </div>
                                 
                                 <ul className="list-disc list-inside text-xs text-slate-500 space-y-1">
                                     <li>Ideally matches your profile</li>
                                     <li>Apply directly on company site</li>
                                 </ul>
                             </div>
                         ))
                     )}
                </div>
                
                {/* Detail View (Desktop Split) */}
                {selectedJob && (
                    <div className="w-[600px] hidden xl:block bg-white rounded-xl border border-slate-200 shadow-lg sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
                        {(() => {
                            const job = jobs.find(j => j.id === selectedJob);
                            if (!job) return null;
                            return (
                                <div className="p-8 space-y-6">
                                    <div className="sticky top-0 bg-white z-10 pb-4 border-b">
                                        <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                                        <div className="text-slate-600 font-medium mb-3 flex items-center gap-2">
                                            <Building2 className="h-4 w-4" /> {job.company?.name} &nbsp;•&nbsp; {job.location}
                                        </div>
                                        {job.salaryRange && (
                                            <div className="mb-3 text-green-700 font-semibold">
                                                💰 {job.salaryRange}
                                            </div>
                                        )}
                                        <Button onClick={() => handleApply(job.id, job.company!.slug)} className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                                    </div>
                                    
                                    {/* Company Description */}
                                    {job.companyDescription && (
                                        <div>
                                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                                <Building2 className="h-5 w-5" />
                                                About {job.company?.name}
                                            </h3>
                                            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">
                                                {job.companyDescription}
                                            </div>
                                        </div>
                                    )}

                                    {/* Job Description */}
                                    <div>
                                        <h3 className="font-bold text-lg mb-3">Job Description</h3>
                                        <div className="prose prose-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                            {job.detailedJobDescription || job.description || "No description provided for this role."}
                                        </div>
                                    </div>

                                    {/* Responsibilities */}
                                    {job.responsibilities && job.responsibilities.length > 0 && job.responsibilities.some(r => r.trim()) && (
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Key Responsibilities</h3>
                                            <ul className="space-y-2">
                                                {job.responsibilities.filter(r => r.trim()).map((resp, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                        <span className="text-green-600 mt-0.5">✓</span>
                                                        <span>{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Requirements */}
                                    <div>
                                        <h3 className="font-bold text-lg mb-3">Requirements</h3>
                                        {job.requirements && job.requirements.length > 0 && job.requirements.some(r => r.trim()) ? (
                                            <ul className="space-y-2 mb-4">
                                                {job.requirements.filter(r => r.trim()).map((req, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                        <span className="text-blue-600 mt-0.5">•</span>
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                        <div className="flex flex-wrap gap-2">
                                             {job.skills.map(s => <span key={s} className="bg-blue-50 border border-blue-200 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">{s}</span>)}
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    {job.benefits && job.benefits.length > 0 && job.benefits.some(b => b.trim()) && (
                                        <div>
                                            <h3 className="font-bold text-lg mb-3">Benefits & Perks</h3>
                                            <div className="grid gap-2">
                                                {job.benefits.filter(b => b.trim()).map((benefit, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-purple-50 p-3 rounded-lg">
                                                        <span className="text-purple-600 mt-0.5">★</span>
                                                        <span>{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Additional Info */}
                                    <div className="bg-slate-50 p-4 rounded-lg border text-sm">
                                        <h4 className="font-bold text-slate-900 mb-3">Additional Information</h4>
                                        <div className="space-y-2 text-slate-600">
                                            <div className="flex justify-between">
                                                <span>Department:</span>
                                                <span className="font-medium text-slate-900">{job.department}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Experience Level:</span>
                                                <span className="font-medium text-slate-900">{job.experienceLevel}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Work Policy:</span>
                                                <span className="font-medium text-slate-900">{job.workPolicy}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Posted:</span>
                                                <span className="font-medium text-slate-900">{new Date(job.publishedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Apply Button */}
                                    <Button onClick={() => handleApply(job.id, job.company!.slug)} className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700">
                                        Apply for this Position
                                    </Button>
                                </div>
                            )
                        })()}
                    </div>
                )}
            </div>
        </main>
    </div>
  );
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <JobSearch />
        </Suspense>
    )
}
