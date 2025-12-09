"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Monitor, Mic, Fullscreen, Video, Clock } from "lucide-react";

export function CandidateTest({ onClose, onComplete }: { onClose: () => void, onComplete: (score: number) => void }) {
    const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
    const [timeLeft, setTimeLeft] = useState(1200); // 20 mins
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [code, setCode] = useState("// Write your solution here\nfunction twoSum(nums, target) {\n\n}");
    
    // Proctored State
    const [cameraOn, setCameraOn] = useState(true);
    const [micOn, setMicOn] = useState(true);

    const questions = [
        { 
            id: 1, 
            title: "Two Sum", 
            diff: "Easy",
            desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            template: "function twoSum(nums, target) {\n\n}" 
        },
        { 
            id: 2, 
            title: "Valid Parentheses", 
            diff: "Medium",
            desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            template: "function isValid(s) {\n\n}" 
        }
    ];

    const handleSubmit = () => {
        setStep('result');
        // Random score for mock
        const score = Math.floor(Math.random() * (100 - 70 + 1) + 70);
        setTimeout(() => onComplete(score), 2000); // Auto close after showing result briefly
    };

    if (step === 'intro') {
        return (
            <div className="fixed inset-0 z-50 bg-slate-900 text-white flex flex-col items-center justify-center p-8">
                 <div className="max-w-2xl text-center space-y-6">
                     <div className="h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                         <Monitor className="h-10 w-10 text-white" />
                     </div>
                     <h1 className="text-4xl font-bold">Technical Assessment: Frontend Engineer</h1>
                     <p className="text-slate-300 text-lg">
                         This is a proctored environment. Please ensure your camera and microphone are enabled.
                         Switching tabs or exiting fullscreen will be flagged.
                     </p>
                     
                     <div className="flex justify-center gap-8 py-8">
                         <div className="flex flex-col items-center gap-2">
                             <div className={`h-12 w-12 rounded-full flex items-center justify-center ${cameraOn ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                 <Video className="h-6 w-6" />
                             </div>
                             <span className="text-sm">Camera Ready</span>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                             <div className={`h-12 w-12 rounded-full flex items-center justify-center ${micOn ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                 <Mic className="h-6 w-6" />
                             </div>
                             <span className="text-sm">Audio Check</span>
                         </div>
                     </div>
                     
                     <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 text-xl font-bold rounded-full shadow-lg shadow-blue-900/50" onClick={() => setStep('test')}>
                         Start Test
                     </Button>
                     <button onClick={onClose} className="block w-full text-slate-500 hover:text-white mt-4">Cancel</button>
                 </div>
            </div>
        )
    }

    if (step === 'result') {
        return (
            <div className="fixed inset-0 z-50 bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Submitting Results...</h2>
                    <p className="text-slate-400">Recording code execution and proctoring logs.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 font-sans">
            {/* Proctor Header */}
            <div className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">
                <span className="font-mono font-bold text-lg text-emerald-400">LIVE PROCTORING ACTIVE</span>
                <div className="flex items-center gap-4 text-sm font-medium">
                     <span className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded">
                         <Clock className="h-4 w-4" /> {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                     </span>
                     <span className="flex items-center gap-2 text-red-400 animate-pulse">
                         <span className="h-2 w-2 rounded-full bg-red-500" /> REC
                     </span>
                     <Button variant="ghost" size="sm" onClick={handleSubmit}>Submit Test</Button>
                </div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
                {/* Question Panel */}
                <div className="w-1/3 border-r border-slate-800 p-6 overflow-y-auto bg-slate-900">
                    <h2 className="text-xl font-bold mb-4">{questions[activeQuestion].id}. {questions[activeQuestion].title}</h2>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-6 ${questions[activeQuestion].diff === 'Easy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {questions[activeQuestion].diff}
                    </span>
                    
                    <div className="prose prose-invert text-slate-300">
                        <p>{questions[activeQuestion].desc}</p>
                    </div>
                </div>
                
                {/* Code Editor Mock */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                    <div className="flex-1 p-4 font-mono text-sm leading-relaxed text-slate-300 outline-none">
                        <textarea 
                            className="w-full h-full bg-transparent resize-none outline-none" 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                        />
                    </div>
                    <div className="h-12 border-t border-slate-800 bg-slate-900 flex items-center justify-end px-4 gap-3">
                         <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">Run Code</Button>
                         <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white font-bold">Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
