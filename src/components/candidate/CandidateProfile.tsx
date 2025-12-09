"use client";

import { useState } from "react";
import { Candidate } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, Upload, FileText, CheckCircle, Camera } from "lucide-react";
import { MockDB } from "@/lib/mock-db";

export function CandidateProfile({ candidate, refresh }: { candidate: Candidate, refresh: () => void }) {

    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [projectUrl, setProjectUrl] = useState('');
    const [projectName, setProjectName] = useState('');
    const [codingProfile, setCodingProfile] = useState<{platform: string, url: string}>({platform: 'LeetCode', url: ''});
    const [githubUrl, setGithubUrl] = useState(candidate.githubUrl || '');
    const [isVerifying, setIsVerifying] = useState(false);
    const [digilockerStep, setDigilockerStep] = useState<'idle' | 'phone' | 'otp' | 'success'>('idle');
    const [otp, setOtp] = useState('');
    const [college, setCollege] = useState(candidate.college?.name || 'IIT Bombay');
    
    // Email/Name editing states
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedName, setEditedName] = useState(candidate.name);
    const [editedEmail, setEditedEmail] = useState(candidate.email);
    const [emailOtpStep, setEmailOtpStep] = useState<'idle' | 'sent' | 'verified'>('idle');
    const [emailOtp, setEmailOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [sendingOtp, setSendingOtp] = useState(false);

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploadingResume(true);
        // Simulate parsing
        setTimeout(async () => {
             const newSkills = [...(candidate.skills || []), "Next.js", "TailwindCSS", "System Design"];
             // Dedup
             const uniqueSkills = Array.from(new Set(newSkills));
             await MockDB.updateCandidate(candidate.id, { skills: uniqueSkills });
             setUploadingResume(false);
             alert("Resume Parsed! Skills updated.");
             refresh();
        }, 2000);
    };

    const addProject = async () => {
        if (!projectName || !projectUrl) return;
        const newProject = { name: projectName, url: projectUrl };
        const updatedProjects = [...(candidate.projects || []), newProject];
        await MockDB.updateCandidate(candidate.id, { projects: updatedProjects });
        setProjectName('');
        setProjectUrl('');
        refresh();
    };

    const addCodingProfile = async () => {
         if (!codingProfile.url) return;
         // Simulate fetching enhanced stats
         const easy = Math.floor(Math.random() * 100);
         const medium = Math.floor(Math.random() * 50);
         const hard = Math.floor(Math.random() * 20);
         const total = easy + medium + hard;
         const mockRank = Math.floor(Math.random() * 50000) + 1;

         const newProfile = { 
             platform: codingProfile.platform, 
             url: codingProfile.url,
             rank: `${mockRank}`,
             stats: { easy, medium, hard, total }
         };
         const updatedProfiles = [...(candidate.codingProfiles || []), newProfile];
         await MockDB.updateCandidate(candidate.id, { codingProfiles: updatedProfiles });
         setCodingProfile({ ...codingProfile, url: '' });
         refresh();
    };

    const saveGithub = async () => {
        await MockDB.updateCandidate(candidate.id, { githubUrl });
        alert("GitHub account connected!");
        refresh();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:3011/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (res.ok) {
                 await MockDB.updateCandidate(candidate.id, { profileImage: `http://localhost:3011${data.filePath}` });
                 alert("Profile picture updated!");
                 refresh();
            } else {
                alert('Upload Failed: ' + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Upload Error");
        } finally {
            setUploadingImage(false);
        }
    }
    
    // Email OTP Verification
    const handleSendEmailOtp = async () => {
        if (editedEmail === candidate.email) {
            alert("Email hasn't changed!");
            return;
        }
        
        setSendingOtp(true);
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        
        // Simulate sending email
        setTimeout(() => {
            setSendingOtp(false);
            setEmailOtpStep('sent');
            alert(`OTP sent to ${editedEmail}: ${otp} (Check console for demo)`);
            console.log(`🔐 OTP for ${editedEmail}: ${otp}`);
        }, 1500);
    };
    
    const handleVerifyEmailOtp = async () => {
        if (emailOtp === generatedOtp) {
            setEmailOtpStep('verified');
            alert("Email verified successfully!");
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };
    
    const handleSaveProfile = async () => {
        // Check if email changed and not verified
        if (editedEmail !== candidate.email && emailOtpStep !== 'verified') {
            alert("Please verify your new email address first!");
            return;
        }
        
        await MockDB.updateCandidate(candidate.id, {
            name: editedName,
            email: editedEmail,
            emailVerified: editedEmail !== candidate.email ? true : candidate.emailVerified
        });
        
        setIsEditingProfile(false);
        setEmailOtpStep('idle');
        setEmailOtp('');
        setGeneratedOtp('');
        alert("Profile updated successfully!");
        refresh();
    };
    
    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        setEditedName(candidate.name);
        setEditedEmail(candidate.email);
        setEmailOtpStep('idle');
        setEmailOtp('');
        setGeneratedOtp('');
    };
    
    // ... verification logic ...
    const handleDigilockerVerification = async () => {
        if (digilockerStep === 'idle') {
            setDigilockerStep('phone');
        } else if (digilockerStep === 'phone') {
            setIsVerifying(true);
            setTimeout(() => {
                setIsVerifying(false);
                setDigilockerStep('otp');
            }, 1500);
        } else if (digilockerStep === 'otp') {
            if (otp !== '1234') {
                alert("Invalid OTP (Use 1234)");
                return;
            }
            setIsVerifying(true);
            setTimeout(async () => {
                // Fetch Verified Data
                const verifiedCollege = {
                     name: college,
                     isVerified: true,
                     cgpa: 9.2, 
                     degree: 'B.Tech in Computer Science',
                     batch: '2025'
                };
                // Sync Projects from College
                const syncedProjects = [
                    { name: "Final Year Capstone: AI ATS", url: "https://github.com/student/ats", description: "Built a full-stack ATS with Next.js" },
                    { name: "IoT Home Automation", url: "https://github.com/iot-lab/home", description: "Smart home system using Arduino" }
                ];
                
                await MockDB.updateCandidate(candidate.id, { 
                    college: verifiedCollege,
                    projects: [...(candidate.projects || []), ...syncedProjects]
                });
                
                setIsVerifying(false);
                setDigilockerStep('success');
                refresh();
            }, 2000);
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6">
                 <div className="relative group">
                     <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg relative">
                         {candidate.profileImage ? (
                             <img src={candidate.profileImage} className="h-full w-full object-cover" alt="Profile" />
                         ) : (
                             <span className="text-2xl font-bold text-slate-400">{candidate.name.charAt(0)}</span>
                         )}
                         <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" onChange={handleImageUpload} />
                     </div>
                     <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow border hover:bg-slate-50 pointer-events-none">
                         {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin text-slate-500" /> : <Camera className="h-4 w-4 text-slate-700" />}
                     </button>
                 </div>
                 <div className="flex-1">
                     {!isEditingProfile ? (
                         <>
                             <div className="flex items-center gap-3">
                                 <h2 className="text-2xl font-bold">{candidate.name}</h2>
                                 <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                                     Edit Profile
                                 </Button>
                             </div>
                             <div className="flex items-center gap-2 mt-1">
                                 <p className="text-slate-500">{candidate.email}</p>
                                 {candidate.emailVerified && (
                                     <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                                         <CheckCircle className="h-3 w-3" /> Verified
                                     </div>
                                 )}
                             </div>
                             <p className="text-slate-500">{candidate.role || 'Job Seeker'}</p>
                         </>
                     ) : (
                         <div className="space-y-4 bg-slate-50 p-4 rounded-lg border">
                             <div>
                                 <label className="text-sm font-medium text-slate-700">Full Name</label>
                                 <Input 
                                     value={editedName} 
                                     onChange={(e) => setEditedName(e.target.value)}
                                     className="mt-1"
                                 />
                             </div>
                             
                             <div>
                                 <label className="text-sm font-medium text-slate-700">Email Address</label>
                                 <div className="flex gap-2 mt-1">
                                     <Input 
                                         type="email"
                                         value={editedEmail} 
                                         onChange={(e) => {
                                             setEditedEmail(e.target.value);
                                             if (e.target.value !== candidate.email) {
                                                 setEmailOtpStep('idle');
                                             }
                                         }}
                                         className="flex-1"
                                     />
                                     {editedEmail !== candidate.email && emailOtpStep === 'idle' && (
                                         <Button onClick={handleSendEmailOtp} disabled={sendingOtp} size="sm">
                                             {sendingOtp ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send OTP'}
                                         </Button>
                                     )}
                                 </div>
                                 
                                 {emailOtpStep === 'sent' && (
                                     <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                         <p className="text-sm text-blue-800 mb-2">Enter the 6-digit OTP sent to {editedEmail}</p>
                                         <div className="flex gap-2">
                                             <Input 
                                                 placeholder="Enter OTP"
                                                 value={emailOtp}
                                                 onChange={(e) => setEmailOtp(e.target.value)}
                                                 maxLength={6}
                                                 className="flex-1"
                                             />
                                             <Button onClick={handleVerifyEmailOtp} size="sm">
                                                 Verify
                                             </Button>
                                         </div>
                                     </div>
                                 )}
                                 
                                 {emailOtpStep === 'verified' && (
                                     <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                                         <CheckCircle className="h-4 w-4" />
                                         Email verified successfully!
                                     </div>
                                 )}
                             </div>
                             
                             <div className="flex gap-2 pt-2">
                                 <Button onClick={handleSaveProfile} className="flex-1">
                                     Save Changes
                                 </Button>
                                 <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                                     Cancel
                                 </Button>
                             </div>
                         </div>
                     )}
                     
                     {!isEditingProfile && candidate.college?.isVerified && (
                        <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                                <CheckCircle className="h-4 w-4" />
                                Verified Student • {candidate.college.name}
                            </div>
                            <div className="text-xs text-slate-500 pl-2">
                                {candidate.college.degree} ({candidate.college.batch}) • CGPA: <span className="font-bold text-slate-700">{candidate.college.cgpa}</span>
                            </div>
                        </div>
                     )}
                 </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                 {/* Resume Section */}
                 <div className="bg-white p-6 rounded-xl border shadow-sm">
                     <h3 className="font-bold flex items-center gap-2 mb-4"><FileText className="h-5 w-5 text-blue-500" /> Resume & Skills</h3>
                     <div className="space-y-4">
                         <div className="relative">
                             <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".doc,.docx,.pdf" onChange={handleResumeUpload} />
                             <div className="p-4 bg-slate-50 border border-slate-200 border-dashed rounded-lg text-center cursor-pointer hover:bg-slate-100 transition-colors">
                                 {uploadingResume ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                        <span className="text-sm font-medium text-blue-600">Uploading & Parsing...</span>
                                    </div>
                                 ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="h-6 w-6 text-slate-400" />
                                        <span className="text-sm font-medium text-slate-600">Upload CV (Word/PDF)</span>
                                        <span className="text-xs text-slate-400">Drag & Drop or Click to Upload</span>
                                    </div>
                                 )}
                             </div>
                         </div>
                         
                         <div>
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Detected Skills</label>
                             <div className="flex flex-wrap gap-2 mt-2">
                                 {candidate.skills.map(s => (
                                     <span key={s} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded text-sm font-medium">
                                         {s}
                                     </span>
                                 ))}
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Projects Section */}
                 <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
                     <div>
                        <h3 className="font-bold mb-4">Projects</h3>
                        <div className="space-y-3 mb-4">
                            {(candidate.projects || []).map((p, i) => (
                                <div key={i} className="flex justify-between items-start p-2 bg-slate-50 rounded">
                                    <div>
                                        <p className="font-medium text-sm">{p.name}</p>
                                        <a href={p.url} target="_blank" className="text-xs text-blue-500 hover:underline truncate block max-w-[200px]">{p.url}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} className="h-9 text-sm" />
                            <Input placeholder="URL" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} className="h-9 text-sm" />
                            <Button size="sm" onClick={addProject}>Add</Button>
                        </div>
                     </div>

                     <div className="border-t pt-4">
                        <h3 className="font-bold mb-4">Coding Profiles</h3>
                        <div className="space-y-4 mb-4">
                            {(candidate.codingProfiles || []).map((p, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="font-bold text-sm">{p.platform}</p>
                                            <p className="text-xs text-slate-500">Rank: #{p.rank}</p>
                                        </div>
                                        <a href={p.url} target="_blank" className="text-xs text-blue-500 hover:underline">View Profile</a>
                                    </div>
                                    {p.stats && (
                                        <div className="space-y-1">
                                            <div className="flex text-xs justify-between text-slate-500 mb-1">
                                                <span>Easy ({p.stats.easy})</span>
                                                <span>Medium ({p.stats.medium})</span>
                                                <span>Hard ({p.stats.hard})</span>
                                            </div>
                                            <div className="flex h-2 rounded-full overflow-hidden bg-slate-200 w-full">
                                                <div style={{ width: `${(p.stats.easy / p.stats.total) * 100}%` }} className="bg-green-500" />
                                                <div style={{ width: `${(p.stats.medium / p.stats.total) * 100}%` }} className="bg-yellow-500" />
                                                <div style={{ width: `${(p.stats.hard / p.stats.total) * 100}%` }} className="bg-red-500" />
                                            </div>
                                            <p className="text-xs text-right mt-1 font-bold text-slate-700">Total Solved: {p.stats.total}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                             <select 
                                className="h-9 text-sm border rounded px-2 bg-white"
                                value={codingProfile.platform}
                                onChange={e => setCodingProfile({...codingProfile, platform: e.target.value})}
                             >
                                 <option>LeetCode</option>
                                 <option>CodeChef</option>
                                 <option>HackerRank</option>
                                 <option>HackerEarth</option>
                             </select>
                            <Input placeholder="Profile URL" value={codingProfile.url} onChange={e => setCodingProfile({...codingProfile, url: e.target.value})} className="h-9 text-sm" />
                            <Button size="sm" onClick={addCodingProfile}>Add</Button>
                        </div>
                     </div>
                 </div>
                 
                 {/* Verification & Socials */}
                 <div className="col-span-full grid md:grid-cols-2 gap-8">
                     <div className="bg-white p-6 rounded-xl border shadow-sm">
                         <h3 className="font-bold mb-4 flex items-center gap-2">
                             <span className="bg-black text-white p-1 rounded-full"><div className="h-3 w-3 bg-white rounded-full"></div></span> GitHub
                         </h3>
                         <div className="flex gap-2">
                             <Input placeholder="GitHub Profile URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />
                             <Button onClick={saveGithub}>Connect</Button>
                         </div>
                     </div>

                 </div>

                 {/* Eligibility Section (New) */}
                 <div className="bg-white p-6 rounded-xl border shadow-sm col-span-full">
                     <h3 className="font-bold flex items-center gap-2 mb-4">
                         <span className="bg-blue-600 w-2 h-6 rounded-sm"></span> 
                         Global Placement Eligibility
                     </h3>
                     <p className="text-sm text-slate-500 mb-4">Based on your verified CGPA ({candidate.college?.cgpa || 'N/A'}) and Degree.</p>
                     
                     <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left">
                             <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                 <tr>
                                     <th className="px-4 py-3">Company</th>
                                     <th className="px-4 py-3">Min CGPA</th>
                                     <th className="px-4 py-3">Branches</th>
                                     <th className="px-4 py-3">Status</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y">
                                 {[
                                     { name: "Google", minCgpa: 8.5, branches: "CS, IT, ECE" },
                                     { name: "Microsoft", minCgpa: 7.5, branches: "All" },
                                     { name: "Amazon", minCgpa: 6.5, branches: "All" },
                                     { name: "Netflix", minCgpa: 8.0, branches: "CS Only" },
                                     { name: "Local Startup", minCgpa: 0, branches: "Any" }
                                 ].map(co => {
                                     const myCgpa = candidate.college?.cgpa || 0;
                                     const isEligible = myCgpa >= co.minCgpa;
                                     
                                     return (
                                         <tr key={co.name} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-bold text-slate-700">{co.name}</td>
                                            <td className="px-4 py-3">{co.minCgpa}</td>
                                            <td className="px-4 py-3 text-slate-500">{co.branches}</td>
                                            <td className="px-4 py-3">
                                                {isEligible ? (
                                                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold border border-green-100">Eligible</span>
                                                ) : (
                                                    <span className="text-red-500 bg-red-50 px-2 py-1 rounded text-xs font-bold border border-red-100">Requires {co.minCgpa}</span>
                                                )}
                                            </td>
                                         </tr>
                                     )
                                 })}
                             </tbody>
                         </table>
                     </div>
                 </div>

                 <div className="col-span-full grid md:grid-cols-2 gap-8">
                         <div>
                             <h3 className="font-bold text-blue-900 mb-2">College Verification</h3>
                             <p className="text-sm text-blue-700 mb-4">Connect with DigiLocker to pull verified academic records.</p>
                             
                             {!candidate.college?.isVerified ? (
                                 <div className="space-y-3">
                                     {digilockerStep === 'idle' && (
                                         <div className="flex gap-2">
                                             <select className="flex-1 h-10 border rounded px-2" value={college} onChange={e => setCollege(e.target.value)}>
                                                 <option>IIT Bombay</option>
                                                 <option>IIT Delhi</option>
                                                 <option>BITS Pilani</option>
                                                 <option>NIT Trichy</option>
                                                 <option>VIT Vellore</option>
                                                 <option>SRM University</option>
                                             </select>
                                             <Button onClick={() => handleDigilockerVerification()}>Verify</Button>
                                         </div>
                                     )}

                                     {digilockerStep === 'phone' && (
                                         <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-4">
                                              <Input placeholder="Phone Number (Linked to Aadhaar)" defaultValue="9876543210" disabled />
                                              <Button onClick={() => handleDigilockerVerification()} disabled={isVerifying}>
                                                  {isVerifying ? <Loader2 className="animate-spin" /> : "Send OTP"}
                                              </Button>
                                         </div>
                                     )}

                                     {digilockerStep === 'otp' && (
                                         <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                                              <p className="text-xs text-slate-500">Enter OTP (Use 1234)</p>
                                              <div className="flex gap-2">
                                                  <Input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={4} className="tracking-widest font-bold text-center" />
                                                  <Button onClick={() => handleDigilockerVerification()} disabled={isVerifying}>
                                                      {isVerifying ? <Loader2 className="animate-spin" /> : "Verify"}
                                                  </Button>
                                              </div>
                                         </div>
                                     )}
                                 </div>
                             ) : (
                                 <div className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
                                      <div className="text-center py-2">
                                          <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                              <CheckCircle className="h-6 w-6 text-green-600" />
                                          </div>
                                          <p className="font-bold text-slate-800">Verification Successful</p>
                                          <p className="text-xs text-slate-500">Data synced from DigiLocker</p>
                                      </div>
                                 </div>
                             )}
                         </div>
                         <div className="mt-4 flex items-center gap-2 justify-end opacity-50">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/DigiLocker_logo.png/1200px-DigiLocker_logo.png" className="h-6 opacity-80" alt="DigiLocker" />
                             <span className="text-xs font-bold text-slate-400">Powered by DigiLocker</span>
                         </div>
                     </div>
                 </div>
            </div>
    );
}

