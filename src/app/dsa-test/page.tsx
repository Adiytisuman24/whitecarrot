"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DSAQuestion } from "@/lib/types";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { AIProctoring, sendCheatingRejectionEmail } from "@/components/proctoring/AIProctoring";
import { 
    Clock, 
    Lightbulb, 
    Play, 
    Send, 
    Camera,
    CameraOff,
    AlertCircle,
    CheckCircle,
    XCircle,
    Loader2,
    AlertTriangle,
    Eye,
    Users
} from "lucide-react";

interface ProctoringAlert {
    type: 'looking_away' | 'multiple_faces' | 'no_face' | 'speaking' | 'suspicious_movement';
    severity: 'warning' | 'critical';
    timestamp: string;
    message: string;
}

function DSATestPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const questionId = searchParams.get('questionId');
    const candidateId = searchParams.get('candidateId');

    const [question, setQuestion] = useState<DSAQuestion | null>(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState<'javascript' | 'python' | 'java'>('javascript');
    const [timeLeft, setTimeLeft] = useState(0);
    const [testStarted, setTestStarted] = useState(false);
    const [testSubmitted, setTestSubmitted] = useState(false);
    const [hintsUsed, setHintsUsed] = useState<number[]>([]);
    const [testResults, setTestResults] = useState<any[]>([]);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [proctoring, setProctoring] = useState(false);
    const [proctoringAlerts, setProctoringAlerts] = useState<ProctoringAlert[]>([]);
    const [cheatingDetected, setCheatingDetected] = useState(false);
    const [autoRejected, setAutoRejected] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!questionId || !candidateId) {
            alert("Invalid test link");
            router.push('/');
            return;
        }

        loadQuestion();
    }, [questionId]);

    useEffect(() => {
        if (testStarted && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleSubmit(true); // Auto-submit when time runs out
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [testStarted, timeLeft]);

    const loadQuestion = async () => {
        if (!questionId) return;
        
        try {
            const q = await MockDB.getDSAQuestion(questionId);
            if (q) {
                setQuestion(q);
                setTimeLeft(q.timeLimit * 60); // Convert minutes to seconds
                // Set starter code
                if (q.starterCode?.javascript) {
                    setCode(q.starterCode.javascript);
                }
            } else {
                alert("Question not found");
                router.push('/');
            }
        } catch (error) {
            console.error("Failed to load question", error);
            alert("Failed to load question");
        } finally {
            setLoading(false);
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user'
                },
                audio: false 
            });
            
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraEnabled(true);
            setProctoring(true);

            // Start periodic snapshots for proctoring
            startProctoring(stream);
        } catch (error) {
            console.error("Camera access denied", error);
            alert("Camera access is required for this test. Please enable camera permissions.");
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        setCameraEnabled(false);
        setProctoring(false);
    };

    const startProctoring = (stream: MediaStream) => {
        // Take snapshot every 30 seconds
        const interval = setInterval(() => {
            if (canvasRef.current && videoRef.current) {
                const canvas = canvasRef.current;
                const video = videoRef.current;
                const ctx = canvas.getContext('2d');
                
                if (ctx) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0);
                    
                    // Convert to base64 and log (in real app, send to server)
                    const snapshot = canvas.toDataURL('image/jpeg');
                    console.log('📸 Proctoring snapshot taken:', new Date().toISOString());
                    // In production: send snapshot to server for analysis
                }
            }
        }, 30000); // Every 30 seconds

        // Store interval ID to clear later
        (window as any).proctoringInterval = interval;
    };

    const handleStartTest = async () => {
        await startCamera();
        setTestStarted(true);
    };

    const handleCheatingDetected = async (alerts: ProctoringAlert[]) => {
        setProctoringAlerts(prev => [...prev, ...alerts]);
        
        // Count critical violations
        const criticalAlerts = [...proctoringAlerts, ...alerts].filter(a => a.severity === 'critical');
        
        // Auto-reject if 3 or more critical violations
        if (criticalAlerts.length >= 3 && !autoRejected) {
            setAutoRejected(true);
            setCheatingDetected(true);
            
            // Stop test immediately
            stopCamera();
            clearInterval((window as any).proctoringInterval);
            
            // Send automatic rejection email
            if (question && candidateId) {
                const email = await sendCheatingRejectionEmail(
                    `candidate-${candidateId}@example.com`, // In production: get from database
                    `Candidate ${candidateId}`,
                    question.title,
                    criticalAlerts
                );
                
                console.log('🚨 CHEATING DETECTED - AUTO REJECTION');
                console.log('Critical Violations:', criticalAlerts.length);
                console.log('Violations:', criticalAlerts.map(a => a.message).join(', '));
                console.log(email);
            }
            
            alert('⚠️ CHEATING DETECTED!\n\nYour test has been automatically terminated due to suspicious activity.\n\nViolations:\n' + 
                  criticalAlerts.map(a => `• ${a.message}`).join('\n') +
                  '\n\nA rejection email has been sent to your registered email address.');
            
            // Redirect after alert
            setTimeout(() => router.push('/'), 2000);
        }
    };

    const useHint = (index: number) => {
        if (!hintsUsed.includes(index)) {
            setHintsUsed([...hintsUsed, index]);
        }
    };

    const runTestCases = () => {
        if (!question) return;

        const results = question.testCases.filter(tc => !tc.isHidden).map((testCase, index) => {
            try {
                // This is a simplified test runner
                // In production, you'd run this on a secure backend
                const func = new Function('return ' + code)();
                const input = eval(`[${testCase.input}]`);
                const output = func(...input);
                const expected = eval(testCase.expectedOutput);
                
                const passed = JSON.stringify(output) === JSON.stringify(expected);
                
                return {
                    index: index + 1,
                    input: testCase.input,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: JSON.stringify(output),
                    passed
                };
            } catch (error: any) {
                return {
                    index: index + 1,
                    input: testCase.input,
                    expectedOutput: testCase.expectedOutput,
                    actualOutput: `Error: ${error.message}`,
                    passed: false
                };
            }
        });

        setTestResults(results);
    };

    const handleSubmit = async (autoSubmit = false) => {
        if (!question || !candidateId) return;

        // Run all test cases (including hidden ones)
        const allResults = question.testCases.map((testCase, index) => {
            try {
                const func = new Function('return ' + code)();
                const input = eval(`[${testCase.input}]`);
                const output = func(...input);
                const expected = eval(testCase.expectedOutput);
                
                return {
                    index: index + 1,
                    passed: JSON.stringify(output) === JSON.stringify(expected)
                };
            } catch (error) {
                return {
                    index: index + 1,
                    passed: false
                };
            }
        });

        const passedCount = allResults.filter(r => r.passed).length;
        const score = (passedCount / allResults.length) * 100;

        console.log('🎯 Test Submitted:');
        console.log('Candidate ID:', candidateId);
        console.log('Question:', question.title);
        console.log('Score:', score.toFixed(0) + '%');
        console.log('Passed:', passedCount, '/', allResults.length, 'test cases');
        console.log('Hints Used:', hintsUsed.length);
        console.log('Time Taken:', formatTime((question.timeLimit * 60) - timeLeft));
        console.log('Auto-submitted:', autoSubmit);

        stopCamera();
        clearInterval((window as any).proctoringInterval);
        setTestSubmitted(true);

        // In production: Save results to database
        alert(`Test submitted! Score: ${score.toFixed(0)}%\nPassed ${passedCount}/${allResults.length} test cases`);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!question) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold">Question not found</h2>
                </div>
            </div>
        );
    }

    if (testSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Test Submitted!</h2>
                    <p className="text-slate-600 mb-6">
                        Your answers have been recorded and will be reviewed by the recruiter.
                    </p>
                    <Button onClick={() => router.push('/')}>
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    if (!testStarted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-4 text-sm">
                            <span className={`px-3 py-1 rounded-full font-medium ${
                                question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {question.difficulty}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {question.timeLimit} minutes
                            </span>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Camera Proctoring Required
                            </h3>
                            <p className="text-sm text-slate-700">
                                This test requires camera access for proctoring. Your video will be recorded
                                during the test to ensure integrity. Please ensure:
                            </p>
                            <ul className="text-sm text-slate-700 mt-2 space-y-1 ml-4">
                                <li>• You are in a well-lit room</li>
                                <li>• Your face is clearly visible</li>
                                <li>• You are alone in the room</li>
                                <li>• No other tabs or applications are open</li>
                            </ul>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4">
                            <h3 className="font-semibold mb-2">Instructions:</h3>
                            <ul className="text-sm text-slate-700 space-y-1">
                                <li>• Read the problem carefully</li>
                                <li>• Write your solution in the code editor</li>
                                <li>• Test your code with the provided test cases</li>
                                <li>• Submit before time runs out</li>
                                <li>• You can use up to {question.hints.length} hints (penalty may apply)</li>
                            </ul>
                        </div>
                    </div>

                    <Button 
                        onClick={handleStartTest} 
                        className="w-full h-12 text-lg"
                    >
                        <Camera className="h-5 w-5 mr-2" />
                        Enable Camera & Start Test
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header with Timer and Camera */}
            <header className="bg-white border-b px-6 py-3 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-lg">{question.title}</h1>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {question.difficulty}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Timer */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg ${
                            timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                            <Clock className="h-5 w-5" />
                            {formatTime(timeLeft)}
                        </div>

                        {/* Camera Status */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                            cameraEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {cameraEnabled ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
                            <span className="text-sm font-medium">
                                {cameraEnabled ? 'Recording' : 'Camera Off'}
                            </span>
                        </div>

                        <Button onClick={() => handleSubmit(false)} variant="default">
                            <Send className="h-4 w-4 mr-2" />
                            Submit
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Problem Description */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white rounded-lg border p-4">
                            <h3 className="font-semibold mb-3">Problem Description</h3>
                            <div className="text-sm text-slate-700 whitespace-pre-wrap">
                                {question.description}
                            </div>
                        </div>

                        {/* Hints */}
                        {question.hints && question.hints.length > 0 && (
                            <div className="bg-white rounded-lg border p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4" />
                                    Hints ({hintsUsed.length}/{question.hints.length} used)
                                </h3>
                                <div className="space-y-2">
                                    {question.hints.map((hint, index) => (
                                        <div key={index}>
                                            {hintsUsed.includes(index) ? (
                                                <div className="text-sm bg-yellow-50 border border-yellow-200 rounded p-2">
                                                    <strong>Hint {index + 1}:</strong> {hint}
                                                </div>
                                            ) : (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => useHint(index)}
                                                    className="w-full"
                                                >
                                                    Show Hint {index + 1}
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Camera Feed */}
                        <div className="bg-white rounded-lg border p-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Camera className="h-4 w-4" />
                                Proctoring Feed
                            </h3>
                            <div className="relative aspect-video bg-slate-900 rounded overflow-hidden">
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    muted
                                    className="w-full h-full object-cover"
                                />
                                {proctoring && (
                                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        REC
                                    </div>
                                )}
                            </div>
                            <canvas ref={canvasRef} className="hidden" />
                            
                            {/* AI Proctoring Component */}
                            {testStarted && cameraEnabled && (
                                <AIProctoring 
                                    videoRef={videoRef}
                                    onCheatingDetected={handleCheatingDetected}
                                    candidateId={candidateId || 'unknown'}
                                    questionId={questionId || 'unknown'}
                                />
                            )}
                        </div>

                        {/* Proctoring Alerts */}
                        {proctoringAlerts.length > 0 && (
                            <div className="bg-white rounded-lg border border-orange-200 p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2 text-orange-700">
                                    <AlertTriangle className="h-4 w-4" />
                                    Proctoring Alerts ({proctoringAlerts.length})
                                </h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {proctoringAlerts.slice(-5).reverse().map((alert, index) => (
                                        <div 
                                            key={index}
                                            className={`text-xs p-2 rounded ${
                                                alert.severity === 'critical' 
                                                    ? 'bg-red-50 border border-red-200 text-red-700' 
                                                    : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {alert.severity === 'critical' ? (
                                                    <XCircle className="h-3 w-3" />
                                                ) : (
                                                    <AlertCircle className="h-3 w-3" />
                                                )}
                                                <span className="font-medium">{alert.type.replace('_', ' ').toUpperCase()}</span>
                                            </div>
                                            <p className="mt-1">{alert.message}</p>
                                            <p className="text-[10px] opacity-70 mt-1">
                                                {new Date(alert.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Code Editor and Test Cases */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Language Selector */}
                        <div className="bg-white rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold">Code Editor</h3>
                                <select
                                    value={language}
                                    onChange={(e) => {
                                        setLanguage(e.target.value as any);
                                        // Update code with starter code for selected language
                                        const starterCode = question.starterCode?.[e.target.value as keyof typeof question.starterCode];
                                        if (starterCode) setCode(starterCode);
                                    }}
                                    className="border rounded px-3 py-1 text-sm"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                </select>
                            </div>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-96 font-mono text-sm border rounded p-4 bg-slate-50"
                                placeholder="Write your code here..."
                            />
                        </div>

                        {/* Test Cases */}
                        <div className="bg-white rounded-lg border p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold">Test Cases</h3>
                                <Button size="sm" onClick={runTestCases}>
                                    <Play className="h-4 w-4 mr-1" />
                                    Run Tests
                                </Button>
                            </div>
                            
                            {testResults.length === 0 ? (
                                <p className="text-sm text-slate-500">Run tests to see results</p>
                            ) : (
                                <div className="space-y-2">
                                    {testResults.map((result) => (
                                        <div 
                                            key={result.index}
                                            className={`p-3 rounded border ${
                                                result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                {result.passed ? (
                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-red-600" />
                                                )}
                                                <span className="font-medium text-sm">Test Case {result.index}</span>
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <div><strong>Input:</strong> {result.input}</div>
                                                <div><strong>Expected:</strong> {result.expectedOutput}</div>
                                                <div><strong>Got:</strong> {result.actualOutput}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DSATestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <DSATestPageContent />
        </Suspense>
    );
}
