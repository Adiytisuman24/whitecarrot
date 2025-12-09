"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function CandidateSignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", skills: "", resumeUrl: "https://linkedin.com/in/" });
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const skillList = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
            const candidate = await MockDB.createCandidate({
                name: formData.name,
                email: formData.email,
                resumeUrl: formData.resumeUrl,
                skills: skillList,
                role: 'Candidate',
                bio: 'New user'
            });

            router.push(`/candidate/dashboard?candidateId=${candidate.id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-500">Join WhiteCarrot and get hired faster.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Resume / LinkedIn</label>
                        <Input required value={formData.resumeUrl} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Top Skills (Comma separated)</label>
                        <Input required value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="React, Sales, Design..." />
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 mt-4">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
                    </Button>
                </form>
                
                <div className="mt-6 text-center text-sm">
                    Already have an account? <Link href="/candidate/login" className="text-blue-600 font-semibold hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
}
