"use client";

import { useState, useEffect } from "react";
import { Job, Application, Candidate } from "@/lib/types";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
    Users, 
    FileText, 
    Zap, 
    Send, 
    Loader2, 
    CheckSquare, 
    Edit, 
    Save, 
    X, 
    ExternalLink,
    Github,
    Award,
    Briefcase,
    Code,
    GraduationCap,
    MapPin,
    Star,
    Eye,
    ChevronDown,
    ChevronUp
} from "lucide-react";

export function JobItem({ job: initialJob }: { job: Job }) {
    const [expanded, setExpanded] = useState(false);
    const [applications, setApplications] = useState<(Application & { candidate: Candidate })[]>([]);
    const [loading, setLoading] = useState(false);
    const [aiTask, setAiTask] = useState<string | null>(null);
    const [generatingTask, setGeneratingTask] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [job, setJob] = useState<Job>(initialJob);
    const [saving, setSaving] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    useEffect(() => {
        if (expanded) {
            setLoading(true);
            MockDB.getApplicationsForJob(job.id).then(apps => {
                setApplications(apps);
                setLoading(false);
            });
        }
    }, [expanded, job.id]);

    const generateTask = async () => {
        setGeneratingTask(true);
        // Simulate LLM call
        await new Promise(r => setTimeout(r, 1500));
        
        const tasks = [
            "Build a small React component that fetches data from an API and displays it in a grid.",
            "Design a system architecture for a high-traffic e-commerce site.",
            "Write a function to optimize a large dataset for search performance.",
            "Create a marketing campaign plan launch for a new B2B product."
        ];
        
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        setAiTask(`Based on the requirement for '${job.title}' and skills [${job.skills.join(', ')}], here is a recommended screening task:\n\n**${randomTask}**`);
        setGeneratingTask(false);
    };

    const handleInvite = (app: Application & { candidate: Candidate }) => {
        alert(`Invitation sent to ${app.candidate.email} from recruiters@whitecarrot`);
    };

    const handleSaveJob = async () => {
        setSaving(true);
        try {
            await MockDB.updateJob(job.id, job);
            setEditMode(false);
        } catch (error) {
            console.error("Failed to save job", error);
            alert("Failed to save job details");
        } finally {
            setSaving(false);
        }
    };

    const viewCandidatePortfolio = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleRejectCandidate = async (app: Application & { candidate: Candidate }, reason: string) => {
        if (!confirm(`Are you sure you want to reject ${app.candidate.name}?`)) return;
        
        try {
            await MockDB.updateApplication(app.id, {
                status: 'rejected',
                rejectionInfo: {
                    rejectedBy: 'Company',
                    reason: reason || 'After careful consideration, we have decided to move forward with other candidates.',
                    rejectedAt: new Date().toISOString(),
                    emailSent: true
                }
            });
            
            // Simulate sending rejection email
            console.log(`📧 Company Rejection Email Sent to ${app.candidate.email}:`);
            console.log(`Subject: Application Update - ${job.title}`);
            console.log(`Dear ${app.candidate.name},\n\nThank you for your interest in the ${job.title} position at our company. After careful review, we regret to inform you that we will not be moving forward with your application at this time.\n\nReason: ${reason}\n\nWe appreciate the time you took to apply and wish you the best in your job search.\n\nBest regards,\nThe Hiring Team`);
            
            alert(`Rejection email sent to ${app.candidate.email}`);
            
            // Reload applications
            const apps = await MockDB.getApplicationsForJob(job.id);
            setApplications(apps);
        } catch (error) {
            console.error("Failed to reject candidate", error);
            alert("Failed to reject candidate");
        }
    };

    return (
        <div className="rounded-lg border bg-white p-4 transition-all">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-slate-500">{job.location} • {job.type} • {job.workPolicy}</p>
                    <div className="flex gap-2 mt-2">
                        {job.skills?.slice(0,3).map(s => (
                            <span key={s} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">{s}</span>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditMode(!editMode)}
                    >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Job
                    </Button>
                    <Button variant={expanded ? "secondary" : "outline"} onClick={() => setExpanded(!expanded)}>
                        {expanded ? 'Close' : 'Manage'}
                    </Button>
                </div>
            </div>

            {/* Edit Job Details Section */}
            {editMode && (
                <div className="mt-6 border-t pt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Edit Job Details
                        </h4>
                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setEditMode(false)}>
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                            </Button>
                            <Button size="sm" onClick={handleSaveJob} disabled={saving}>
                                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                                Save Changes
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Job Title</label>
                            <Input 
                                value={job.title}
                                onChange={(e) => setJob({...job, title: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <Input 
                                value={job.location}
                                onChange={(e) => setJob({...job, location: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Salary Range</label>
                            <Input 
                                value={job.salaryRange || ''}
                                onChange={(e) => setJob({...job, salaryRange: e.target.value})}
                                placeholder="e.g., $80K-$120K / year"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Department</label>
                            <Input 
                                value={job.department}
                                onChange={(e) => setJob({...job, department: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company Description</label>
                        <textarea 
                            className="w-full rounded-md border p-3 text-sm min-h-[100px]"
                            value={job.companyDescription || ''}
                            onChange={(e) => setJob({...job, companyDescription: e.target.value})}
                            placeholder="Tell candidates about your company..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Detailed Job Description</label>
                        <textarea 
                            className="w-full rounded-md border p-3 text-sm min-h-[150px]"
                            value={job.detailedJobDescription || job.description}
                            onChange={(e) => setJob({...job, detailedJobDescription: e.target.value})}
                            placeholder="Provide a detailed job description..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Key Responsibilities (comma-separated)</label>
                            <textarea 
                                className="w-full rounded-md border p-3 text-sm min-h-[100px]"
                                value={job.responsibilities?.join(', ') || ''}
                                onChange={(e) => setJob({...job, responsibilities: e.target.value.split(',').map(r => r.trim())})}
                                placeholder="Lead development, Mentor team, Design architecture..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Requirements (comma-separated)</label>
                            <textarea 
                                className="w-full rounded-md border p-3 text-sm min-h-[100px]"
                                value={job.requirements?.join(', ') || ''}
                                onChange={(e) => setJob({...job, requirements: e.target.value.split(',').map(r => r.trim())})}
                                placeholder="5+ years experience, Bachelor's degree, Strong communication..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Benefits (comma-separated)</label>
                        <textarea 
                            className="w-full rounded-md border p-3 text-sm"
                            value={job.benefits?.join(', ') || ''}
                            onChange={(e) => setJob({...job, benefits: e.target.value.split(',').map(b => b.trim())})}
                            placeholder="Health insurance, Remote work, Learning budget, Stock options..."
                        />
                    </div>
                </div>
            )}

            {expanded && (
                <div className="mt-6 border-t pt-6 animate-in fade-in slide-in-from-top-2">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Applicants Column */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold flex items-center gap-2">
                                    <Users className="h-4 w-4" /> 
                                    Eligible Candidates ({applications.filter(a => (a.score || 0) >= 80 && a.status !== 'rejected').length})
                                </h4>
                            </div>
                            
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : applications.filter(a => (a.score || 0) >= 80 && a.status !== 'rejected').length === 0 ? (
                                <div className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded">No eligible applicants (80%+ match).</div>
                            ) : (
                                <div className="space-y-3">
                                    {applications.filter(a => (a.score || 0) >= 80 && a.status !== 'rejected').sort((a,b) => (b.score || 0) - (a.score || 0)).map(app => (
                                        <div key={app.id} className="p-4 border rounded-lg bg-green-50 border-green-200 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="font-medium flex items-center gap-2">
                                                        {app.candidate.name}
                                                        <span className="text-[10px] bg-yellow-100 text-yellow-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                                            <Zap className="h-3 w-3" /> {app.score?.toFixed(0)}% MATCH
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">{app.candidate.email}</p>
                                                    <p className="text-xs text-slate-600 mt-1">{typeof app.aiAnalysis === 'string' ? app.aiAnalysis : `Match: ${app.aiAnalysis?.matchPercentage}%`}</p>
                                                    
                                                    {/* Quick Preview */}
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {app.candidate.role && (
                                                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                                                                <Briefcase className="h-3 w-3" />
                                                                {app.candidate.role}
                                                            </span>
                                                        )}
                                                        {app.candidate.experienceLevel && (
                                                            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-1 rounded">
                                                                {app.candidate.experienceLevel}
                                                            </span>
                                                        )}
                                                        {app.candidate.college?.isVerified && (
                                                            <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                                                                <GraduationCap className="h-3 w-3" />
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2 pt-2 border-t border-green-200">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() => viewCandidatePortfolio(app.candidate)}
                                                >
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    View Portfolio
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                                    onClick={() => handleInvite(app)}
                                                >
                                                    <Send className="h-3 w-3 mr-1" />
                                                    Invite
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="text-red-600 hover:bg-red-50"
                                                    onClick={() => handleRejectCandidate(app, 'Not a good fit for the current role.')}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Rejected Candidates Section */}
                            {applications.filter(a => a.status === 'rejected').length > 0 && (
                                <div className="mt-6 pt-6 border-t">
                                    <h4 className="font-semibold flex items-center gap-2 mb-3 text-red-700">
                                        <X className="h-4 w-4" /> 
                                        Rejected ({applications.filter(a => a.status === 'rejected').length})
                                    </h4>
                                    <div className="space-y-2">
                                        {applications.filter(a => a.status === 'rejected').map(app => (
                                            <div key={app.id} className="p-3 border rounded-lg bg-red-50 border-red-200">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm flex items-center gap-2">
                                                            {app.candidate.name}
                                                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                                                                {app.score?.toFixed(0)}% Match
                                                            </span>
                                                            {app.rejectionInfo && (
                                                                <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                                                    Rejected by {app.rejectionInfo.rejectedBy}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate-500">{app.candidate.email}</p>
                                                        {app.rejectionInfo && (
                                                            <p className="text-xs text-red-600 mt-1">Reason: {app.rejectionInfo.reason}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* AI Actions Column */}
                        <div className="space-y-4 border-l pl-8 border-slate-100">
                             <h4 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-purple-500" /> AI Recruiter Assistant</h4>
                             
                             <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 space-y-4">
                                 <p className="text-sm text-purple-900">
                                     Generate a technical screening task tailored to this job's description and required skills.
                                 </p>
                                 
                                 {!aiTask ? (
                                     <Button onClick={generateTask} disabled={generatingTask} className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                                         {generatingTask ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckSquare className="h-4 w-4" />}
                                         Generate Interview Task
                                     </Button>
                                 ) : (
                                     <div className="space-y-3 animate-in fade-in">
                                         <div className="bg-white p-3 rounded border text-sm text-slate-700 whitespace-pre-wrap">
                                             {aiTask}
                                         </div>
                                         <div className="flex gap-2">
                                             <Button 
                                                size="sm" 
                                                className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                                                onClick={() => alert(`Task sent to all shortlisted candidates via recipients@whitecarrot`)}
                                             >
                                                 <Send className="h-3 w-3" /> Send to Candidates
                                             </Button>
                                             <Button size="sm" variant="ghost" onClick={() => setAiTask(null)}>Discard</Button>
                                         </div>
                                     </div>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Candidate Portfolio Modal */}
            {selectedCandidate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCandidate(null)}>
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                                <p className="text-slate-600">{selectedCandidate.role || 'Candidate'}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Contact Info */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-medium">{selectedCandidate.email}</p>
                                </div>
                                {selectedCandidate.location && (
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-500">Location</p>
                                        <p className="font-medium flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            {selectedCandidate.location}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Bio */}
                            {selectedCandidate.bio && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold">About</h3>
                                    <p className="text-slate-700">{selectedCandidate.bio}</p>
                                </div>
                            )}

                            {/* Skills */}
                            {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.skills.map(skill => (
                                            <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {selectedCandidate.college && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5" />
                                        Education
                                    </h3>
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium">{selectedCandidate.college.name}</p>
                                                <p className="text-sm text-slate-600">{selectedCandidate.college.degree}</p>
                                                <p className="text-sm text-slate-500">Batch: {selectedCandidate.college.batch} • CGPA: {selectedCandidate.college.cgpa}</p>
                                            </div>
                                            {selectedCandidate.college.isVerified && (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {selectedCandidate.projects && selectedCandidate.projects.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Code className="h-5 w-5" />
                                        Projects
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedCandidate.projects.map((project, idx) => (
                                            <div key={idx} className="bg-slate-50 p-4 rounded-lg">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <p className="font-medium">{project.name}</p>
                                                        {project.description && (
                                                            <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                                                        )}
                                                    </div>
                                                    {project.url && (
                                                        <a 
                                                            href={project.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-700"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Coding Profiles */}
                            {selectedCandidate.codingProfiles && selectedCandidate.codingProfiles.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Code className="h-5 w-5" />
                                        Coding Profiles
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {selectedCandidate.codingProfiles.map((profile, idx) => (
                                            <div key={idx} className="bg-slate-50 p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-medium">{profile.platform}</p>
                                                    <a 
                                                        href={profile.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </div>
                                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-yellow-500" />
                                                    Rank: {profile.rank}
                                                </p>
                                                {profile.stats && (
                                                    <div className="mt-2 text-xs text-slate-500 grid grid-cols-2 gap-1">
                                                        <span>Easy: {profile.stats.easy}</span>
                                                        <span>Medium: {profile.stats.medium}</span>
                                                        <span>Hard: {profile.stats.hard}</span>
                                                        <span>Total: {profile.stats.total}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Certifications */}
                            {selectedCandidate.certifications && selectedCandidate.certifications.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Award className="h-5 w-5" />
                                        Certifications
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCandidate.certifications.map((cert, idx) => (
                                            <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Resume */}
                            {selectedCandidate.resumeUrl && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Resume
                                    </h3>
                                    <a 
                                        href={selectedCandidate.resumeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                    >
                                        View Resume <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            )}

                            {/* GitHub */}
                            {selectedCandidate.githubUrl && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Github className="h-5 w-5" />
                                        GitHub
                                    </h3>
                                    <a 
                                        href={selectedCandidate.githubUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                    >
                                        View GitHub Profile <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
