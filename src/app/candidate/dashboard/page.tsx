"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Job, Candidate, Application } from "@/lib/types";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { DSA_QUESTIONS } from "@/lib/dsa-data";
import { LEARNING_DATA, HACKATHONS, LearningModule } from "@/lib/learning-data";
import { 
    Loader2, Zap, User, FileText, LayoutDashboard, Award, Download, 
    CheckCircle, BookOpen, PlayCircle, Code2, Rocket, Trophy, LogOut, 
    ArrowLeft, Upload 
} from "lucide-react";
import { CandidateProfile } from "@/components/candidate/CandidateProfile";
import { CandidateTest } from "@/components/candidate/CandidateTest";
import { DSASolver } from "@/components/candidate/DSASolver";

function CandidateDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const candidateId = searchParams.get('candidateId');
  
  // Core State
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'tests' | 'resume' | 'learn' | 'dsa' | 'hackathons'>('home');
  const [loading, setLoading] = useState(true);
  
  // Feature Specific State
  const [testMode, setTestMode] = useState(false);
  const [solvingQuestionId, setSolvingQuestionId] = useState<string | null>(null);
  const [applications, setApplications] = useState<(Application & { job: Job })[]>([]);
  
  // Learning State
  const [selectedBranchId, setSelectedBranchId] = useState<string>('cs');
  const [selectedPathId, setSelectedPathId] = useState<string>('fullstack');
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Resume AI State
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [targetCompany, setTargetCompany] = useState('Google');
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  // Derived State
  const activeBranch = LEARNING_DATA.find(b => b.id === selectedBranchId) || LEARNING_DATA[0];
  const activePath = activeBranch.paths.find(p => p.id === selectedPathId) || activeBranch.paths[0];

  // Effects
  useEffect(() => {
    if (activePath && activePath.modules.length > 0) {
        setSelectedModule(activePath.modules[0]);
    }
  }, [activeBranch, activePath]);

  const loadData = useCallback(async () => {
    if (!candidateId) return;
    try {
      const cand = await MockDB.getCandidateById(candidateId);
      if (cand) {
          setCandidate(cand);
          const apps = await MockDB.getApplicationsByCandidate(cand.id);
          setApplications(apps);
      }
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  }, [candidateId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
  const handleLogout = () => {
      // Clear any session data if needed
      // Mock logout by just redirecting
      router.push('/candidate/login'); 
  };

  const handleTestComplete = async (score: number) => {
      setTestMode(false);
      if (!candidate) return;

      const newCert = "Frontend Engineering Certified";
      const updatedCerts = [...(candidate.certifications || [])];
      
      if (!updatedCerts.includes(newCert) && score >= 70) {
          updatedCerts.push(newCert);
          await MockDB.updateCandidate(candidate.id, { certifications: updatedCerts });
          alert(`Congratulations! You passed with ${score}%. Certificate added to your profile.`);
      } else {
          alert(`Test Completed. Score: ${score}%.`);
      }
      loadData();
  };

  const handleHackathonRegister = async (hackathonId: string) => {
      if (!candidate) return;
      const current = candidate.registeredHackathons || [];
      if (current.includes(hackathonId)) return;
      
      const updated = [...current, hackathonId];
      setCandidate({ ...candidate, registeredHackathons: updated }); // Optimistic
      await MockDB.updateCandidate(candidate.id, { registeredHackathons: updated });
      alert("Successfully Registered! Check your email for details.");
  };

  const handleResumeOptimize = async () => {
      if (!resumeFile || !candidate) return;
      setAnalyzingResume(true);
      
      // Mock AI processing
      setTimeout(async () => {
          let newSkills: string[] = [];
          let recommendations: any[] = [];
          
          if (targetCompany === 'Google') {
              newSkills = ["Golang", "Kubernetes", "System Design", "gRPC"];
              recommendations = [
                  { type: 'dsa', label: 'Graph Algorithms (Advanced)', link: 'dsa' },
                  { type: 'course', label: 'Google Cloud Architecture', link: 'learn' }
              ];
          } else if (targetCompany === 'Amazon') {
              newSkills = ["AWS Lambda", "DynamoDB", "Java", "Leadership Principles"];
              recommendations = [
                  { type: 'dsa', label: 'Dynamic Programming (Knapsack)', link: 'dsa' },
                  { type: 'course', label: 'AWS Certified Solutions Architect', link: 'learn' }
              ];
          } else {
              newSkills = ["React", "Node.js", "Docker"];
               recommendations = [
                  { type: 'test', label: 'Full Stack Assessment', link: 'tests' }
              ];
          }
          
          const allSkills = Array.from(new Set([...candidate.skills, ...newSkills]));
          await MockDB.updateCandidate(candidate.id, { skills: allSkills });
          
          setOptimizationResult({
              company: targetCompany,
              addedSkills: newSkills,
              recommendations,
              scorePre: 65,
              scorePost: 94
          });
          setAnalyzingResume(false);
          loadData();
      }, 3000);
  };

  // Render Logic
  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!candidate && !loading) return <div className="p-8 text-center text-red-500">Access Denied: Candidate Not Found</div>;

  if (testMode) {
      return <CandidateTest onClose={() => setTestMode(false)} onComplete={handleTestComplete} />;
  }

  return (
    <div className="flex bg-slate-50 font-sans h-screen max-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col h-full">
          <div className="p-6">
              <h1 className="text-xl font-bold text-white tracking-tight">WhiteCarrot</h1>
              <p className="text-xs text-slate-500 mt-1">Candidate Portal</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
              <button onClick={() => setActiveTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <LayoutDashboard className="h-5 w-5" /> Dashboard
              </button>
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <User className="h-5 w-5" /> My Profile
              </button>
              <button onClick={() => setActiveTab('learn')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'learn' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <BookOpen className="h-5 w-5" /> Learning Path
              </button>
              <button onClick={() => setActiveTab('dsa')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dsa' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <Code2 className="h-5 w-5" /> DSA Practice
              </button>
               <button onClick={() => setActiveTab('hackathons')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'hackathons' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <Trophy className="h-5 w-5" /> Hackathons
              </button>
              <button onClick={() => setActiveTab('tests')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tests' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <Award className="h-5 w-5" /> Skill Tests
              </button>
              <button onClick={() => setActiveTab('resume')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'resume' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}>
                  <FileText className="h-5 w-5" /> Resume AI
              </button>
          </nav>
          
          <div className="p-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                      {candidate?.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                      <p className="text-sm font-medium text-white truncate">{candidate?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{candidate?.email}</p>
                  </div>
              </div>
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800 gap-2 pl-0">
                  <LogOut className="h-4 w-4 ml-2" /> Logout
              </Button>
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'home' && (
              <div className="max-w-5xl mx-auto space-y-8">
                  <header>
                      <h2 className="text-3xl font-bold text-slate-900">Welcome back, {candidate?.name.split(' ')[0]}</h2>
                      <p className="text-slate-500 mt-2">Here is what&apos;s happening with your job search.</p>
                  </header>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Applied</h3>
                          <p className="text-3xl font-bold text-slate-900 mt-2">{applications.length}</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Interviews</h3>
                          <p className="text-3xl font-bold text-slate-900 mt-2">{applications.filter(a => ['interview', 'selected'].includes(a.status)).length}</p>
                      </div>
                       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                          <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Earned Certs</h3>
                          <p className="text-3xl font-bold text-slate-900 mt-2">{candidate?.certifications?.length || 0}</p>
                      </div>
                  </div>

                  {/* Activity Grid: Hackathons & LeetCode */}
                  <div className="grid md:grid-cols-2 gap-6">
                      {/* Registered Hackathons */}
                      <div className="bg-white p-6 rounded-xl border shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                  <Trophy className="h-5 w-5 text-yellow-500" /> Upcoming Hackathons
                              </h3>
                              <Button variant="ghost" size="sm" onClick={() => setActiveTab('hackathons')} className="text-blue-600 text-xs">View All</Button>
                          </div>
                          
                          {candidate?.registeredHackathons && candidate.registeredHackathons.length > 0 ? (
                              <div className="space-y-4">
                                  {HACKATHONS.filter(h => candidate.registeredHackathons?.includes(h.id)).map(hack => (
                                      <div key={hack.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                          <img src={hack.image} className="h-10 w-10 object-contain bg-white rounded p-1 border" />
                                          <div className="flex-1 min-w-0">
                                              <p className="font-bold text-sm text-slate-900 truncate">{hack.title}</p>
                                              <p className="text-xs text-slate-500">{hack.date}</p>
                                          </div>
                                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                              Going
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
                                  <p className="text-sm">No upcoming hackathons.</p>
                                  <Button variant="link" onClick={() => setActiveTab('hackathons')} className="text-blue-600 text-xs p-0 h-auto">Register for events</Button>
                              </div>
                          )}
                      </div>

                      {/* Coding Activity (LeetCode) */}
                      <div className="bg-white p-6 rounded-xl border shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                  <Code2 className="h-5 w-5 text-orange-500" /> Coding Activity
                              </h3>
                              <Link href="https://leetcode.com" target="_blank">
                                  <Button variant="ghost" size="sm" className="text-slate-400">External</Button>
                              </Link>
                          </div>

                          {(() => {
                                const leetcode = candidate?.codingProfiles?.find(p => p.platform.toLowerCase() === 'leetcode');
                                if (leetcode) {
                                    return (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-500">Platform Rank</span>
                                                <span className="font-bold text-slate-900">{leetcode.rank || 'N/A'}</span>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <div className="text-center mb-3">
                                                    <span className="text-3xl font-bold text-slate-900">{leetcode.stats?.total || 0}</span>
                                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Problems Solved</p>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                                    <div className="bg-green-50 text-green-700 py-1 rounded border border-green-100">
                                                        <span className="font-bold block">{leetcode.stats?.easy || 0}</span> Easy
                                                    </div>
                                                    <div className="bg-yellow-50 text-yellow-700 py-1 rounded border border-yellow-100">
                                                        <span className="font-bold block">{leetcode.stats?.medium || 0}</span> Med
                                                    </div>
                                                    <div className="bg-red-50 text-red-700 py-1 rounded border border-red-100">
                                                        <span className="font-bold block">{leetcode.stats?.hard || 0}</span> Hard
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
                                            <p className="text-sm">LeetCode not connected.</p>
                                            <Button variant="link" onClick={() => setActiveTab('profile')} className="text-blue-600 text-xs p-0 h-auto">Connect in Profile</Button>
                                        </div>
                                    )
                                }
                          })()}
                      </div>
                  </div>

                  {/* GitHub Projects */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between mb-6">
                           <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                               <LayoutDashboard className="h-5 w-5 text-slate-700" /> GitHub Projects
                           </h3>
                           <div className="text-xs text-slate-500">
                               {candidate?.projects ? `${candidate.projects.length} Repositories` : 'Not Connected'}
                           </div>
                      </div>

                      {candidate?.projects && candidate.projects.length > 0 ? (
                          <div className="grid md:grid-cols-2 gap-4">
                              {candidate.projects.map((proj, i) => (
                                  <div key={i} className="p-4 border rounded-lg hover:border-blue-300 transition-colors group">
                                      <div className="flex justify-between items-start">
                                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 truncate pr-4">{proj.name}</h4>
                                          <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded uppercase">Public</span>
                                      </div>
                                      <p className="text-sm text-slate-500 mt-2 line-clamp-2">{proj.description || 'No description available.'}</p>
                                      <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                                          <div className="flex gap-2">
                                               {/* Mock Language Badges */}
                                              <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                                              <span className="text-xs text-slate-400">JavaScript</span>
                                          </div>
                                          <a href={proj.url} target="_blank" className="text-xs text-blue-600 hover:underline">View Repo &rarr;</a>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed">
                              <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                  <Code2 className="h-6 w-6" />
                              </div>
                              <p className="text-slate-600 font-medium">No projects imported yet.</p>
                              <p className="text-slate-400 text-sm mb-4">Connect your GitHub account to showcase your work.</p>
                              <Button variant="outline" onClick={() => setActiveTab('profile')}>Connect GitHub</Button>
                          </div>
                      )}
                  </div>
                  
                  {/* Application List */}
                  <h3 className="text-xl font-bold mt-8 mb-4">Your Applications (AI Analyzed)</h3>
                  <div className="space-y-4">
                      {applications.length === 0 ? (
                            <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed">
                                <p className="text-slate-500">You haven&apos;t applied to any jobs yet.</p>
                            </div>
                      ) : (
                          applications.map(app => (
                              <div key={app.id} className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
                                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                      <div>
                                          <h4 className="font-bold text-lg">{app.job.title}</h4>
                                          <div className="text-sm text-slate-500 flex gap-2">
                                               <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                               <span>•</span>
                                               <span className={`font-bold ${app.score && app.score > 70 ? 'text-green-600' : 'text-orange-500'}`}>
                                                   Match: {app.score?.toFixed(0)}%
                                               </span>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                          <div className={`px-4 py-2 rounded-full text-sm font-bold capitalize 
                                              ${app.status === 'selected' ? 'bg-green-100 text-green-700' : 
                                                app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                                              {app.status.replace('_', ' ')}
                                          </div>
                                          {app.status === 'selected' ? (
                                              <Button className="bg-green-600 hover:bg-green-700 animate-pulse" size="sm" onClick={async () => {
                                                  // Interview Logic
                                                  if(!confirm("Start Interview now? You have 60 minutes.")) return;
                                                  
                                                  alert("Interview Started... (Mocking 60 mins passage)");
                                                  const res = await MockDB.submitInterview(app.id);
                                                  
                                                  if (res.status === 'offer_pending') {
                                                      alert("Interview Passed! You have an offer.");
                                                  } else {
                                                      alert("Interview Failed.");
                                                  }
                                                  loadData();
                                              }}>
                                                  Take Interview (60m)
                                              </Button>
                                          ) : app.status === 'offer_pending' || app.status === 'offer_accepted' ? (
                                              <Button className="bg-purple-600 hover:bg-purple-700" size="sm" onClick={() => {
                                                  if (app.offerLetterUrl) window.open(app.offerLetterUrl, '_blank');
                                              }}>
                                                  <FileText className="h-4 w-4 mr-2" /> View Offer Letter
                                              </Button>
                                          ) : (
                                              <Button variant="outline" size="sm" onClick={async () => {
                                                  const analysis = await MockDB.analyzeApplication(app.id);
                                                  if (analysis && analysis.aiAnalysis && typeof analysis.aiAnalysis !== 'string') {
                                                      alert(`Improvements:\n${analysis.aiAnalysis.improvements?.join('\n') || 'None needed!'}`);
                                                      loadData();
                                                  }
                                              }}>
                                                  View AI Analysis
                                              </Button>
                                          )}
                                      </div>
                                  </div>
                                  
                                  { app.aiAnalysis && typeof app.aiAnalysis !== 'string' && (
                                      <div className="bg-slate-50 p-3 rounded-lg text-sm border border-slate-200">
                                          <p className="font-bold text-slate-700 mb-1">AI Insights:</p>
                                          <div className="grid md:grid-cols-2 gap-4">
                                               <div>
                                                   <span className="text-green-600 font-bold">Strengths:</span> {(app.aiAnalysis as any).strengths?.join(', ')}
                                               </div>
                                               <div>
                                                   <span className="text-red-500 font-bold">Missing:</span> {(app.aiAnalysis as any).missingSkills?.join(', ')}
                                               </div>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          ))
                      )}
                  </div>

                  {/* Find Role Banner */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white flex items-center justify-between shadow-lg mt-8">
                      <div>
                          <h3 className="text-2xl font-bold mb-2">Find your next role</h3>
                          <p className="text-blue-100 max-w-lg">
                              Browse 150+ new jobs matching your profile across all our partner companies.
                          </p>
                      </div>
                      <Link href="/jobs">
                          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold border-none">
                              Browse Jobs
                          </Button>
                      </Link>
                  </div>
              </div>
          )}
          
          {activeTab === 'profile' && candidate && (
              <div className="max-w-4xl mx-auto space-y-4">
                   <div className="flex justify-end">
                       <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 hover:bg-red-50 border-red-200 gap-2">
                           <LogOut className="h-4 w-4" /> Sign Out
                       </Button>
                   </div>
                  <CandidateProfile candidate={candidate} refresh={loadData} />
              </div>
          )}

          {activeTab === 'learn' && (
              <div className="max-w-6xl mx-auto space-y-8">
                  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                          <h2 className="text-3xl font-bold text-slate-900">Learning Path</h2>
                          <p className="text-slate-500 mt-2">Master your domain with curated video modules.</p>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-700">Major:</span>
                          <select 
                              className="bg-white border text-sm rounded-lg p-2.5 min-w-[200px]"
                              value={selectedBranchId}
                              onChange={(e) => {
                                  setSelectedBranchId(e.target.value);
                                  // Reset path to first of new branch
                                  const newBranch = LEARNING_DATA.find(b => b.id === e.target.value);
                                  if (newBranch && newBranch.paths.length > 0) {
                                      setSelectedPathId(newBranch.paths[0].id);
                                  }
                              }}
                          >
                              {LEARNING_DATA.map(b => (
                                  <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                          </select>
                      </div>
                  </header>

                   {/* Sub-Path Selection */}
                   <div className="flex gap-2 overflow-x-auto pb-2">
                      {activeBranch.paths.map(path => (
                          <button 
                              key={path.id}
                              onClick={() => setSelectedPathId(path.id)}
                              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors border ${selectedPathId === path.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                          >
                              {path.name}
                          </button>
                      ))}
                   </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left: Video Player */}
                      <div className="lg:col-span-2 space-y-6">
                           {selectedModule ? (
                               <>
                                  <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg relative group">
                                      <iframe 
                                          width="100%" 
                                          height="100%" 
                                          src={selectedModule.videoUrl} 
                                          title={selectedModule.title} 
                                          frameBorder="0" 
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                          allowFullScreen
                                      ></iframe>
                                  </div>

                                  <div className="bg-white p-6 rounded-xl border shadow-sm">
                                      <h3 className="text-xl font-bold mb-2">{selectedModule.title}</h3>
                                      <p className="text-slate-600 mb-4">{selectedModule.description}</p>
                                      
                                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                          <div className="flex items-center gap-2 mb-2">
                                              <Zap className="h-4 w-4 text-orange-500" />
                                              <span className="font-bold text-sm text-slate-700 flex-1">AI Summary</span>
                                          </div>
                                          <p className="text-sm text-slate-600 leading-relaxed">
                                              {selectedModule.aiSummary}
                                          </p>
                                      </div>
                                  </div>
                               </>
                           ) : (
                               <div className="h-96 flex items-center justify-center bg-slate-100 rounded-xl border border-dashed">
                                   <p className="text-slate-500">Select a module to start learning</p>
                               </div>
                           )}
                      </div>

                      {/* Right: Path Progress */}
                      <div className="space-y-6">
                           <div className="bg-white p-6 rounded-xl border shadow-sm">
                               <h3 className="font-bold mb-4 flex items-center gap-2">
                                   <BookOpen className="h-5 w-5 text-blue-600" /> Course Progress
                               </h3>
                               
                               <div className="space-y-1 max-h-[400px] overflow-y-auto">
                                   {activePath.modules.map((mod, i) => (
                                       <div 
                                          key={mod.id} 
                                          onClick={() => setSelectedModule(mod)}
                                          className={`p-3 rounded-lg flex items-center justify-between text-sm cursor-pointer transition-colors ${selectedModule?.id === mod.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50 border border-transparent'}`}
                                       >
                                            <div className="flex items-center gap-3">
                                                {selectedModule?.id === mod.id ? (
                                                    <PlayCircle className="h-4 w-4 text-blue-600 animate-pulse" />
                                                ) : (
                                                    <CheckCircle className="h-4 w-4 text-slate-300" />
                                                )}
                                                <span className={`${selectedModule?.id === mod.id ? 'font-bold text-blue-700' : 'text-slate-600'}`}>
                                                    {mod.title}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-400">{mod.duration}</span>
                                       </div>
                                   ))}
                               </div>
                           </div>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'dsa' && (
              <div className="max-w-5xl mx-auto space-y-8">
                  {solvingQuestionId ? (
                      <DSASolver question={DSA_QUESTIONS.find(q => q.id === solvingQuestionId)!} onBack={() => setSolvingQuestionId(null)} />
                  ) : (
                      <>
                        <header>
                            <h2 className="text-3xl font-bold text-slate-900">DSA Practice Arena</h2>
                            <p className="text-slate-500 mt-2">Sharpen your Data Structures & Algorithms skills with curated problems.</p>
                        </header>

                        <div className="grid gap-4">
                            {DSA_QUESTIONS.map(q => (
                                <div key={q.id} className="bg-white p-6 rounded-xl border shadow-sm hover:border-slate-300 transition-all flex justify-between items-center group">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg text-slate-900">{q.title}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded font-bold ${q.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {q.difficulty}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500">{q.topic}</span>
                                            {q.companies && q.companies.map(c => (
                                                 <span key={c} className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
                                                     {c}
                                                 </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-1">{q.desc}</p>
                                    </div>
                                    <Button variant="outline" onClick={() => setSolvingQuestionId(q.id)} className="opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                        Solve <Code2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">Why Practice here?</h3>
                            <p className="text-sm text-blue-800">
                                These questions are curated from top tech company interviews (Google, Amazon, Meta). 
                                Solving them increases your "Candidate Score" visible to recruiters.
                            </p>
                        </div>
                      </>
                  )}
              </div>
          )}

          {activeTab === 'tests' && (
              <div className="max-w-5xl mx-auto space-y-8">
                   <header>
                      <h2 className="text-2xl font-bold text-slate-900">Skill Assessments</h2>
                      <p className="text-slate-500">Prove your skills to recruiters and get fast-tracked.</p>
                  </header>
                  
                  <div className="space-y-6">
                       {[
                           { name: "Languages", skills: ["Python", "JavaScript", "Go", "TypeScript", "C#", "Java"] },
                           { name: "Platforms", skills: ["GCP", "AWS", "Kubernetes", "Docker", "Terraform", "VS Code", "Android", "Unreal Engine", "Unity", "Solidity"] },
                           { name: "Observability", skills: ["Grafana", "Prometheus", "Elasticsearch", "Kafka"] },
                           { name: "Frameworks & DBs", skills: ["React", "React Native", "Fiber", "FastAPI", "Node.js", "Flask", "Nextjs", "Django", "MySQL", "Postgres", "MongoDB", "Redis"] }
                       ].map(category => (
                           <div key={category.name} className="bg-white p-6 rounded-xl border shadow-sm">
                               <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">{category.name}</h3>
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                   {category.skills.map(skill => (
                                       <div key={skill} className="flex items-center justify-between p-3 rounded-lg border hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group" onClick={() => setTestMode(true)}>
                                           <span className="font-medium text-sm text-slate-700">{skill}</span>
                                           <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 group-hover:bg-white">
                                               {candidate?.certifications?.includes(skill + " Certified") ? "Passed" : "Start"}
                                           </code>
                                       </div>
                                   ))}
                               </div>
                           </div>
                       ))}
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl space-y-4">
                       <div>
                           <h3 className="font-bold text-emerald-900 text-lg">Your Certificates</h3>
                           <p className="text-sm text-emerald-700">Earned certificates will appear here.</p>
                       </div>
                       
                       {candidate?.certifications && candidate.certifications.length > 0 ? (
                           <div className="grid gap-3">
                               {candidate.certifications.map(cert => (
                                   <div key={cert} className="flex items-center justify-between bg-white p-3 rounded border border-emerald-200">
                                       <div className="flex items-center gap-3">
                                           <CheckCircle className="h-5 w-5 text-emerald-500" />
                                           <span className="font-medium text-slate-800">{cert}</span>
                                       </div>
                                       <Button variant="ghost" size="sm" className="text-blue-600 gap-2">
                                           <Download className="h-4 w-4" /> PDF
                                       </Button>
                                   </div>
                               ))}
                           </div>
                       ) : (
                           <div className="text-sm text-slate-500 italic">No certificates yet.</div>
                       )}
                  </div>
              </div>
          )}

          {activeTab === 'hackathons' && (
              <div className="max-w-6xl mx-auto space-y-8">
                  <header>
                      <h2 className="text-3xl font-bold text-slate-900">Hackathons & Challenges</h2>
                      <p className="text-slate-500 mt-2">Compete with the best minds and win prizes & job offers.</p>
                  </header>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {HACKATHONS.map(hack => {
                          const isRegistered = candidate?.registeredHackathons?.includes(hack.id);
                          return (
                              <div key={hack.id} className={`bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col ${isRegistered ? 'ring-2 ring-green-500 border-green-500' : ''}`}>
                                  <div className="h-32 bg-slate-100 p-4 flex items-center justify-center relative">
                                      <img src={hack.image} className="h-16 object-contain z-10" />
                                      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm">
                                          {hack.status}
                                      </div>
                                      {isRegistered && (
                                          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm flex items-center gap-1">
                                              <CheckCircle className="h-3 w-3" /> Registered
                                          </div>
                                      )}
                                  </div>
                                  <div className="p-6 flex-1 flex flex-col">
                                      <div className="flex-1">
                                          <h3 className="font-bold text-lg mb-1">{hack.title}</h3>
                                          <p className="text-xs text-slate-500 mb-4">by {hack.company}</p>
                                          
                                          <div className="flex flex-wrap gap-2 mb-4">
                                              {hack.tags.map(t => (
                                                  <span key={t} className="text-xs bg-slate-50 px-2 py-1 rounded text-slate-600 border">
                                                      {t}
                                                  </span>
                                              ))}
                                          </div>
                                      </div>
                                      
                                      <div className="space-y-3 pt-4 border-t border-slate-100">
                                          <div className="flex justify-between text-sm">
                                              <span className="text-slate-500">Prize Pool</span>
                                              <span className="font-bold text-green-600">{hack.prize}</span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                              <span className="text-slate-500">Dates</span>
                                              <span className="font-medium text-slate-800">{hack.date}</span>
                                          </div>
                                          
                                          {isRegistered ? (
                                              <Button className="w-full mt-2 gap-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200" size="sm" disabled>
                                                  <CheckCircle className="h-4 w-4" /> You&apos;re Going!

                                              </Button>
                                          ) : (
                                              <Button className="w-full mt-2 gap-2" size="sm" onClick={() => handleHackathonRegister(hack.id)}>
                                                  Register Now <Rocket className="h-4 w-4" />
                                              </Button>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          )}

          {activeTab === 'resume' && (
              <div className="max-w-4xl mx-auto space-y-8">
                   <header>
                      <h2 className="text-2xl font-bold text-slate-900 text-center">AI Resume Optimizer</h2>
                      <p className="text-slate-500 text-center max-w-xl mx-auto mt-2">Upload your resume, select your target company, and let our AI tailor your profile for maximum ATS impact.</p>
                  </header>
                  
                  {!optimizationResult ? (
                      <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
                          {/* File Upload Area */}
                          {!resumeFile ? (
                               <div className="border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer relative">
                                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" onChange={(e) => e.target.files && setResumeFile(e.target.files[0])} />
                                   <div className="h-20 w-20 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                       <Upload className="h-10 w-10" />
                                   </div>
                                   <h3 className="text-xl font-bold text-slate-900 mb-2">Upload your Resume</h3>
                                   <p className="text-slate-500">Supports PDF, DOCX (Max 5MB)</p>
                               </div>
                          ) : (
                              <div className="flex items-center gap-4 p-4 border rounded-xl bg-slate-50">
                                  <div className="h-12 w-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                                      <FileText className="h-6 w-6" />
                                  </div>
                                  <div className="flex-1">
                                      <p className="font-bold text-slate-900">{resumeFile.name}</p>
                                      <p className="text-xs text-slate-500">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready for AI Analysis</p>
                                  </div>
                                  <Button variant="ghost" className="text-red-500" onClick={() => setResumeFile(null)}>Remove</Button>
                              </div>
                          )}
                          
                          {/* Options */}
                          <div className="space-y-4">
                              <label className="block text-sm font-bold text-slate-700">Target Company (For Optimization)</label>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {['Google', 'Amazon', 'Microsoft', 'Netflix'].map(co => (
                                      <div 
                                        key={co} 
                                        onClick={() => setTargetCompany(co)}
                                        className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${targetCompany === co ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-900 ring-offset-2' : 'bg-white hover:border-slate-300'}`}
                                      >
                                          <p className="font-bold">{co}</p>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-14 text-lg shadow-lg shadow-blue-200" disabled={!resumeFile || analyzingResume} onClick={handleResumeOptimize}>
                              {analyzingResume ? (
                                  <div className="flex items-center gap-2">
                                      <Loader2 className="animate-spin h-5 w-5" /> Optimizing for {targetCompany}...
                                  </div>
                              ) : (
                                  <div className="flex items-center gap-2">
                                      <Zap className="h-5 w-5" /> Generate Optimized Resume
                                  </div>
                              )}
                          </Button>
                      </div>
                  ) : (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8">
                          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center">
                              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                  <CheckCircle className="h-8 w-8 text-green-600" />
                              </div>
                              <h3 className="text-2xl font-bold text-green-900 mb-2">Resume Optimized for {optimizationResult.company}!</h3>
                              <p className="text-green-700">Your ATS Score increased from <span className="font-bold">{optimizationResult.scorePre}%</span> to <span className="font-bold">{optimizationResult.scorePost}%</span>.</p>
                              
                              <Button className="mt-6 gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                                  // Generate PDF using jsPDF
                                  import('jspdf').then(({ default: jsPDF }) => {
                                      const doc = new jsPDF();
                                      
                                      // Header
                                      doc.setFontSize(24);
                                      doc.setTextColor(0, 102, 204);
                                      doc.text('OPTIMIZED RESUME', 105, 20, { align: 'center' });
                                      
                                      doc.setFontSize(12);
                                      doc.setTextColor(100, 100, 100);
                                      doc.text(`Optimized for ${optimizationResult.company}`, 105, 28, { align: 'center' });
                                      
                                      // Candidate Info
                                      doc.setFontSize(18);
                                      doc.setTextColor(0, 0, 0);
                                      doc.text(candidate?.name || 'Candidate', 20, 45);
                                      
                                      doc.setFontSize(10);
                                      doc.setTextColor(100, 100, 100);
                                      doc.text(candidate?.email || '', 20, 52);
                                      
                                      // ATS Score
                                      doc.setFillColor(34, 197, 94);
                                      doc.rect(20, 60, 170, 15, 'F');
                                      doc.setFontSize(12);
                                      doc.setTextColor(255, 255, 255);
                                      doc.text(`ATS Score: ${optimizationResult.scorePost}% (Improved from ${optimizationResult.scorePre}%)`, 25, 69);
                                      
                                      // Skills Section
                                      doc.setFontSize(14);
                                      doc.setTextColor(0, 0, 0);
                                      doc.text('SKILLS', 20, 85);
                                      
                                      doc.setFontSize(10);
                                      doc.setTextColor(60, 60, 60);
                                      const skills = candidate?.skills || [];
                                      const skillsText = skills.join(', ');
                                      const splitSkills = doc.splitTextToSize(skillsText, 170);
                                      doc.text(splitSkills, 20, 93);
                                      
                                      // Newly Added Skills
                                      const yPos = 93 + (splitSkills.length * 5) + 10;
                                      doc.setFontSize(14);
                                      doc.setTextColor(0, 0, 0);
                                      doc.text(`SKILLS ADDED FOR ${optimizationResult.company.toUpperCase()}`, 20, yPos);
                                      
                                      doc.setFontSize(10);
                                      doc.setTextColor(34, 197, 94);
                                      doc.setFont('helvetica', 'bold');
                                      const newSkills = optimizationResult.addedSkills.join(', ');
                                      const splitNewSkills = doc.splitTextToSize(newSkills, 170);
                                      doc.text(splitNewSkills, 20, yPos + 8);
                                      
                                      // AI Recommendations
                                      const yPos2 = yPos + 8 + (splitNewSkills.length * 5) + 10;
                                      doc.setFont('helvetica', 'normal');
                                      doc.setFontSize(14);
                                      doc.setTextColor(0, 0, 0);
                                      doc.text('AI RECOMMENDATIONS', 20, yPos2);
                                      
                                      doc.setFontSize(10);
                                      doc.setTextColor(60, 60, 60);
                                      optimizationResult.recommendations.forEach((rec: any, i: number) => {
                                          doc.text(`• ${rec.label}`, 25, yPos2 + 8 + (i * 6));
                                      });
                                      
                                      // Footer
                                      doc.setFontSize(8);
                                      doc.setTextColor(150, 150, 150);
                                      doc.text('Generated by Circle AI - The All-in-One Recruitment Platform', 105, 285, { align: 'center' });
                                      doc.text(new Date().toLocaleDateString(), 105, 290, { align: 'center' });
                                      
                                      // Download
                                      doc.save(`${optimizationResult.company}_Optimized_Resume.pdf`);
                                  });
                              }}>
                                  <Download className="h-4 w-4" /> Download Optimized Resume (PDF)
                              </Button>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-white p-6 rounded-xl border shadow-sm">
                                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                     <Zap className="h-5 w-5 text-yellow-500" /> Skills Injected
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                      {optimizationResult.addedSkills.map((s: string) => (
                                          <span key={s} className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-2 py-1 rounded text-sm font-medium">
                                              {s}
                                          </span>
                                      ))}
                                  </div>
                                  <p className="text-xs text-slate-500 mt-4">These skills verify highly against {optimizationResult.company}&apos;s job descriptions. We&apos;ve updated your profile automatically.</p>

                              </div>
                              
                              <div className="bg-white p-6 rounded-xl border shadow-sm">
                                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                     <Rocket className="h-5 w-5 text-blue-500" /> Recommended Actions
                                  </h4>
                                  <div className="space-y-3">
                                      {optimizationResult.recommendations.map((rec: any, i: number) => (
                                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer" onClick={() => setActiveTab(rec.link as any)}>
                                              <div className="flex items-center gap-3">
                                                  <div className={`h-2 w-2 rounded-full ${rec.type === 'dsa' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                                  <span className="text-sm font-bold text-slate-700">{rec.label}</span>
                                              </div>
                                              <ArrowLeft className="h-4 w-4 rotate-180 text-slate-400" />
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                          
                          <div className="text-center">
                              <Button variant="outline" onClick={() => { setOptimizationResult(null); setResumeFile(null); }}>
                                  Optimize Another Resume
                              </Button>
                          </div>
                      </div>
                  )}
              </div>
          )}
      </main>
    </div>
  );
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CandidateDashboard />
        </Suspense>
    )
}
