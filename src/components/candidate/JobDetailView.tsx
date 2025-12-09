"use client";

import { Job, Company } from "@/lib/types";
import { 
    MapPin, 
    Briefcase, 
    Clock, 
    DollarSign, 
    Building2,
    CheckCircle,
    Star,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface JobDetailViewProps {
    job: Job;
    company: Company;
    onApply?: () => void;
    hasApplied?: boolean;
}

export function JobDetailView({ job, company, onApply, hasApplied }: JobDetailViewProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
                        <div className="flex flex-wrap gap-4 text-slate-600">
                            <span className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {company.name}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.workPolicy}
                            </span>
                        </div>
                    </div>
                    {company.branding.logoUrl && (
                        <img 
                            src={company.branding.logoUrl} 
                            alt={company.name}
                            className="h-16 w-auto object-contain"
                        />
                    )}
                </div>

                {job.salaryRange && (
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg w-fit">
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold">{job.salaryRange}</span>
                    </div>
                )}

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span 
                                    key={skill} 
                                    className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Apply Button */}
                <div className="mt-6 pt-6 border-t">
                    {hasApplied ? (
                        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-6 py-3 rounded-lg w-fit">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-semibold">Application Submitted</span>
                        </div>
                    ) : (
                        <Button 
                            onClick={onApply}
                            className="px-8 py-3 text-lg"
                            style={{ 
                                backgroundColor: company.branding.primaryColor,
                                color: 'white'
                            }}
                        >
                            Apply Now
                        </Button>
                    )}
                </div>
            </div>

            {/* Company Description */}
            {job.companyDescription && (
                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Building2 className="h-6 w-6" />
                        About {company.name}
                    </h2>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {job.companyDescription}
                    </p>
                </div>
            )}

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Job Description</h2>
                <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {job.detailedJobDescription || job.description}
                    </p>
                </div>
            </div>

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Star className="h-6 w-6" />
                        Key Responsibilities
                    </h2>
                    <ul className="space-y-3">
                        {job.responsibilities.filter(r => r.trim()).map((responsibility, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{responsibility}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Award className="h-6 w-6" />
                        Requirements
                    </h2>
                    <ul className="space-y-3">
                        {job.requirements.filter(r => r.trim()).map((requirement, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{requirement}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Benefits & Perks</h2>
                    <div className="grid md:grid-cols-2 gap-3">
                        {job.benefits.filter(b => b.trim()).map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-700">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Additional Info */}
            <div className="bg-slate-50 rounded-xl border p-6">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-slate-500 mb-1">Department</p>
                        <p className="font-semibold text-slate-900">{job.department}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 mb-1">Experience Level</p>
                        <p className="font-semibold text-slate-900">{job.experienceLevel}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 mb-1">Posted</p>
                        <p className="font-semibold text-slate-900">
                            {new Date(job.publishedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Apply Button */}
            {!hasApplied && (
                <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Ready to join {company.name}?
                    </h3>
                    <Button 
                        onClick={onApply}
                        className="px-8 py-3 text-lg"
                        style={{ 
                            backgroundColor: company.branding.primaryColor,
                            color: 'white'
                        }}
                    >
                        Apply for this Position
                    </Button>
                </div>
            )}
        </div>
    );
}
