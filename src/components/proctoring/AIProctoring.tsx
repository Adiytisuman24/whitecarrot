"use client";

import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

interface ProctoringAlert {
    type: 'looking_away' | 'multiple_faces' | 'no_face' | 'speaking' | 'suspicious_movement';
    severity: 'warning' | 'critical';
    timestamp: string;
    message: string;
}

interface AIProctoringProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    onCheatingDetected: (alerts: ProctoringAlert[]) => void;
    candidateId: string;
    questionId: string;
}

export function AIProctoring({ videoRef, onCheatingDetected, candidateId, questionId }: AIProctoringProps) {
    const [model, setModel] = useState<any>(null);
    const [alerts, setAlerts] = useState<ProctoringAlert[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const alertCountRef = useRef<{ [key: string]: number }>({
        looking_away: 0,
        multiple_faces: 0,
        no_face: 0,
        speaking: 0
    });

    useEffect(() => {
        loadModel();
        return () => {
            if (model) {
                model.dispose();
            }
        };
    }, []);

    const loadModel = async () => {
        try {
            // Load BlazeFace model for face detection
            const blazeface = await import('@tensorflow-models/blazeface');
            const loadedModel = await blazeface.load();
            setModel(loadedModel);
            setIsAnalyzing(true);
            startAnalysis(loadedModel);
        } catch (error) {
            console.error('Failed to load AI model:', error);
        }
    };

    const startAnalysis = (loadedModel: any) => {
        const analyzeFrame = async () => {
            if (!videoRef.current || !isAnalyzing) return;

            try {
                const predictions = await loadedModel.estimateFaces(videoRef.current, false);
                
                const newAlerts: ProctoringAlert[] = [];

                // Check for no face detected
                if (predictions.length === 0) {
                    alertCountRef.current.no_face++;
                    if (alertCountRef.current.no_face > 3) {
                        newAlerts.push({
                            type: 'no_face',
                            severity: 'critical',
                            timestamp: new Date().toISOString(),
                            message: 'No face detected - candidate may have left the frame'
                        });
                    }
                } else {
                    alertCountRef.current.no_face = 0;
                }

                // Check for multiple faces
                if (predictions.length > 1) {
                    alertCountRef.current.multiple_faces++;
                    if (alertCountRef.current.multiple_faces > 2) {
                        newAlerts.push({
                            type: 'multiple_faces',
                            severity: 'critical',
                            timestamp: new Date().toISOString(),
                            message: 'Multiple faces detected - candidate may not be alone'
                        });
                    }
                } else {
                    alertCountRef.current.multiple_faces = 0;
                }

                // Analyze eye gaze and head position
                if (predictions.length === 1) {
                    const face = predictions[0];
                    const landmarks = face.landmarks;
                    
                    // Analyze face position and orientation
                    const faceAnalysis = analyzeFacePosition(landmarks, face.topLeft, face.bottomRight);
                    
                    if (faceAnalysis.lookingAway) {
                        alertCountRef.current.looking_away++;
                        if (alertCountRef.current.looking_away > 5) {
                            newAlerts.push({
                                type: 'looking_away',
                                severity: faceAnalysis.direction === 'down' ? 'critical' : 'warning',
                                timestamp: new Date().toISOString(),
                                message: `Candidate looking ${faceAnalysis.direction} - possible cheating`
                            });
                        }
                    } else {
                        alertCountRef.current.looking_away = 0;
                    }

                    // Check for mouth movement (speaking)
                    if (faceAnalysis.mouthOpen) {
                        alertCountRef.current.speaking++;
                        if (alertCountRef.current.speaking > 10) {
                            newAlerts.push({
                                type: 'speaking',
                                severity: 'critical',
                                timestamp: new Date().toISOString(),
                                message: 'Candidate appears to be speaking - may be communicating with someone'
                            });
                        }
                    } else {
                        alertCountRef.current.speaking = 0;
                    }
                }

                if (newAlerts.length > 0) {
                    setAlerts(prev => [...prev, ...newAlerts]);
                    onCheatingDetected(newAlerts);
                }

            } catch (error) {
                console.error('Error analyzing frame:', error);
            }

            // Continue analysis
            if (isAnalyzing) {
                requestAnimationFrame(analyzeFrame);
            }
        };

        analyzeFrame();
    };

    const analyzeFacePosition = (landmarks: number[][], topLeft: number[], bottomRight: number[]) => {
        // Extract key facial landmarks
        const rightEye = landmarks[0]; // Right eye
        const leftEye = landmarks[1];  // Left eye
        const nose = landmarks[2];     // Nose
        const mouth = landmarks[3];    // Mouth
        const rightEar = landmarks[4]; // Right ear
        const leftEar = landmarks[5];  // Left ear

        // Calculate face center
        const faceWidth = bottomRight[0] - topLeft[0];
        const faceHeight = bottomRight[1] - topLeft[1];
        const faceCenterY = (topLeft[1] + bottomRight[1]) / 2;

        // Analyze vertical position (looking up/down)
        const eyeLevel = (rightEye[1] + leftEye[1]) / 2;
        const noseLevel = nose[1];
        
        let lookingAway = false;
        let direction = 'center';

        // Looking down (eyes significantly below center)
        if (eyeLevel > faceCenterY + faceHeight * 0.15) {
            lookingAway = true;
            direction = 'down';
        }
        
        // Looking up (eyes significantly above center)
        if (eyeLevel < faceCenterY - faceHeight * 0.15) {
            lookingAway = true;
            direction = 'up';
        }

        // Looking left/right (asymmetric eye positions)
        const eyeDistance = Math.abs(rightEye[0] - leftEye[0]);
        const expectedEyeDistance = faceWidth * 0.4;
        
        if (eyeDistance < expectedEyeDistance * 0.7) {
            lookingAway = true;
            direction = nose[0] < (topLeft[0] + bottomRight[0]) / 2 ? 'left' : 'right';
        }

        // Check mouth opening (speaking detection)
        const mouthHeight = Math.abs(mouth[1] - nose[1]);
        const mouthOpen = mouthHeight > faceHeight * 0.08;

        return {
            lookingAway,
            direction,
            mouthOpen,
            confidence: 0.85
        };
    };

    return null; // This is a headless component
}

// Helper function to send automatic rejection email
export async function sendCheatingRejectionEmail(
    candidateEmail: string,
    candidateName: string,
    questionTitle: string,
    alerts: ProctoringAlert[]
) {
    const cheatingReasons = alerts.map(alert => alert.message).join('\n- ');
    
    const emailContent = `
📧 AUTOMATIC REJECTION EMAIL

To: ${candidateEmail}
Subject: Test Disqualification - ${questionTitle}

Dear ${candidateName},

We regret to inform you that your test submission for "${questionTitle}" has been 
automatically rejected due to suspicious activity detected by our AI proctoring system.

VIOLATIONS DETECTED:
- ${cheatingReasons}

Our AI monitoring system detected the following behaviors during your test:
${alerts.map(a => `• ${a.timestamp}: ${a.message}`).join('\n')}

As per our testing policy, any form of cheating or suspicious behavior results in 
immediate disqualification. Your test has been flagged and will not be reviewed.

If you believe this is an error, please contact our support team with your test ID.

This decision is final and cannot be appealed.

Best regards,
Automated Proctoring System
    `;

    console.log(emailContent);
    
    // In production: Send actual email via API
    // await fetch('/api/send-email', {
    //     method: 'POST',
    //     body: JSON.stringify({ to: candidateEmail, subject: '...', content: emailContent })
    // });

    return emailContent;
}
