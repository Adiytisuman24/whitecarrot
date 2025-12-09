"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Question } from "@/lib/dsa-data";
import { Clock, Play, CheckCircle, ArrowLeft, Lightbulb, Code2 } from "lucide-react";

interface DSASolverProps {
    question: Question;
    onBack: () => void;
}

export function DSASolver({ question, onBack }: DSASolverProps) {
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [language, setLanguage] = useState("JavaScript");
    const [code, setCode] = useState(question.template);
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');

    useEffect(() => {
        // Set Timer based on difficulty
        const duration = question.difficulty === 'Easy' ? 20 * 60 : question.difficulty === 'Medium' ? 40 * 60 : 60 * 60;
        setTimeLeft(duration);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [question]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleRun = async () => {
        setStatus('running');
        // Mock Execution
        await new Promise(r => setTimeout(r, 1500));
        setStatus('success');
    };

    const handleGetHint = () => {
        alert("Gemini Hint: Try iterating efficiently or using a hash map to reduce time complexity to O(n).");
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col bg-slate-50 -m-8"> 
             {/* Header */}
             <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm z-10">
                 <div className="flex items-center gap-4">
                     <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500">
                         <ArrowLeft className="h-4 w-4 mr-2" /> All Problems
                     </Button>
                     <h2 className="font-bold text-lg">{question.title}</h2>
                     <span className={`text-xs px-2 py-0.5 rounded font-bold ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                         {question.difficulty}
                     </span>
                 </div>
                 
                 <div className="flex items-center gap-6">
                     <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-slate-600'}`}>
                         <Clock className="h-4 w-4" />
                         {formatTime(timeLeft)}
                     </div>
                     <Button variant="outline" size="sm" onClick={handleGetHint} className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 gap-2">
                         <Lightbulb className="h-4 w-4" /> Get Hint
                     </Button>
                     <Button onClick={handleRun} disabled={status === 'running' || status === 'success'} className={`${status === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>
                         {status === 'running' ? 'Running...' : status === 'success' ? 'Submitted' : 'Submit'} 
                         {status === 'success' ? <CheckCircle className="ml-2 h-4 w-4" /> : <Play className="ml-2 h-4 w-4" />}
                     </Button>
                 </div>
             </div>

             {/* Workspace */}
             <div className="flex-1 flex overflow-hidden">
                 {/* Problem Desc */}
                 <div className="w-1/3 bg-white border-r p-6 overflow-y-auto">
                     <div className="mb-6">
                         <h3 className="font-bold text-slate-800 mb-2">Description</h3>
                         <p className="text-slate-600 leading-relaxed text-sm">{question.desc}</p>
                     </div>
                     
                     <div className="mb-6">
                         <h3 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Companies</h3>
                         <div className="flex flex-wrap gap-2">
                             {question.companies.map(c => (
                                 <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border">
                                     {c}
                                 </span>
                             ))}
                         </div>
                     </div>

                     <div className="mb-6">
                         <h3 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Example</h3>
                         <div className="bg-slate-50 p-3 rounded-lg font-mono text-xs text-slate-600 border">
                             Input: nums = [2,7,11,15], target = 9 <br/>
                             Output: [0,1] <br/>
                             Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                         </div>
                     </div>
                 </div>

                 {/* Editor */}
                 <div className="w-2/3 flex flex-col">
                     <div className="bg-slate-100 border-b px-4 py-2 flex justify-between items-center">
                         <div className="flex items-center gap-2 text-sm text-slate-500">
                             <Code2 className="h-4 w-4" />
                             <span className="font-bold text-slate-700">Editor</span>
                         </div>
                         <div className="flex gap-2">
                             <select 
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="text-xs bg-white border rounded px-2 py-1 outline-none focus:ring-1 ring-blue-500"
                             >
                                 <option>JavaScript</option>
                                 <option>Python</option>
                                 <option>Java</option>
                                 <option>C++</option>
                             </select>
                         </div>
                     </div>
                     
                     <div className="flex-1 relative">
                         <textarea 
                             value={code}
                             onChange={(e) => setCode(e.target.value)}
                             spellCheck={false}
                             className="absolute inset-0 w-full h-full bg-slate-900 text-blue-50 p-4 font-mono text-sm resize-none outline-none leading-relaxed"
                         />
                     </div>

                     {/* Console / Output */}
                     <div className={`h-64 border-t bg-white flex flex-col transition-all overflow-hidden ${status === 'idle' ? 'h-0 border-none' : ''}`}>
                         <div className="px-4 py-2 border-b bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between items-center">
                             <span>Output Console</span>
                             {status === 'success' && (
                                 <span className="flex items-center gap-1 text-blue-600">
                                     <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span> AI Analysis Ready
                                 </span>
                             )}
                         </div>
                         <div className="p-4 overflow-y-auto">
                             {status === 'running' && (
                                 <div className="flex items-center gap-2 text-slate-500 text-sm">
                                     <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping" /> Running test cases...
                                 </div>
                             )}
                             {status === 'success' && (
                                 <div className="text-sm space-y-4">
                                     <div>
                                         <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                                             <CheckCircle className="h-5 w-5" /> Accepted
                                         </div>
                                         <div className="text-slate-600 bg-green-50 p-3 rounded border border-green-100">
                                             Performance: 45ms <span className="text-slate-400">|</span> Memory: 34.2MB <br/>
                                             Beats 89% of users with {language}
                                         </div>
                                     </div>

                                     {/* AI Analysis Block */}
                                     <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                         <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                             <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full">GEMINI</span> Code Analysis
                                         </h4>
                                         <div className="grid md:grid-cols-2 gap-4 text-sm">
                                             <div>
                                                 <span className="font-bold text-slate-700">Time Complexity:</span> <span className="font-mono text-indigo-700">O(n log n)</span>
                                                 <p className="text-slate-600 text-xs mt-1">Excellent. This is the optimal solution for sorting-based approaches.</p>
                                             </div>
                                             <div>
                                                 <span className="font-bold text-slate-700">Space Complexity:</span> <span className="font-mono text-indigo-700">O(1)</span>
                                                 <p className="text-slate-600 text-xs mt-1">Great job using constant extra space.</p>
                                             </div>
                                         </div>
                                         <div className="mt-3 pt-3 border-t border-indigo-200">
                                             <p className="text-xs text-indigo-800 font-medium">Suggestion: Consider naming variables more descriptively for better readability in production code.</p>
                                         </div>
                                     </div>
                                 </div>
                             )}
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
}
