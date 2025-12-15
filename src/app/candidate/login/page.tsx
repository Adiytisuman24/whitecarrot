"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Loader2, Mail, Lock, User, Github } from "lucide-react";
import Image from "next/image";

export default function CandidateAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login with email and password
        const candidate = await MockDB.loginCandidateWithPassword(
          formData.email,
          formData.password
        );
        
        if (!candidate) {
          setError("Invalid credentials. Please check your email and password.");
          setLoading(false);
          return;
        }

        // Store candidate session
        if (typeof window !== 'undefined') {
          localStorage.setItem('candidate', JSON.stringify(candidate));
        }

        // Redirect to dashboard
        router.push('/candidate/dashboard');
      } else {
        // Signup - create new candidate account
        if (!formData.email || !formData.password || !formData.name) {
          setError("All fields are required for signup.");
          setLoading(false);
          return;
        }

        const newCandidate = await MockDB.createCandidate({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          skills: []
        });

        if (!newCandidate) {
          setError("Signup failed. Email may already exist.");
          setLoading(false);
          return;
        }

        // Store candidate session
        if (typeof window !== 'undefined') {
          localStorage.setItem('candidate', JSON.stringify(newCandidate));
        }

        // Redirect to dashboard
        router.push('/candidate/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    setLoading(true);
    setError("");

    // Simulate social login (in production, use NextAuth or similar)
    setTimeout(async () => {
      try {
        // Mock social login - create/login candidate
        const mockEmail = `user@${provider}.com`;
        const mockName = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;

        let candidate = await MockDB.getCandidateByEmail(mockEmail);
        
        if (!candidate) {
          // Create new candidate from social login
          candidate = await MockDB.createCandidate({
            email: mockEmail,
            name: mockName,
            password: 'social-login-' + provider,
            skills: []
          });
        }

        if (candidate && typeof window !== 'undefined') {
          localStorage.setItem('candidate', JSON.stringify(candidate));
          router.push('/candidate/dashboard');
        } else {
          setError("Social login failed. Please try again.");
          setLoading(false);
        }
      } catch (err) {
        setError("Social login failed. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Circle AI</h1>
          <p className="text-slate-500 mt-1">Find Your Dream Job</p>
          <h2 className="text-xl font-semibold mt-4">
            {isLogin ? "Candidate Login" : "Create Account"}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleSocialLogin('google')}
            variant="outline"
            className="w-full h-12 border-2 hover:bg-slate-50"
            disabled={loading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <Button
            onClick={() => handleSocialLogin('facebook')}
            variant="outline"
            className="w-full h-12 border-2 hover:bg-slate-50"
            disabled={loading}
          >
            <svg className="mr-2 h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </Button>

          <Button
            onClick={() => handleSocialLogin('github')}
            variant="outline"
            className="w-full h-12 border-2 hover:bg-slate-50"
            disabled={loading}
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="pl-10"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFormData({ email: "", password: "", name: "" });
            }}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="pt-4 border-t">
          <Link href="/recruiter/login">
            <Button variant="ghost" className="w-full">
              Are you a recruiter? Recruiter Login →
            </Button>
          </Link>
        </div>

        {isLogin && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-indigo-900 mb-2">Demo Account:</p>
            <div className="space-y-1 text-xs text-indigo-700">
              <p>• Email: <code className="bg-indigo-100 px-1 rounded">john.doe@example.com</code></p>
              <p>• Password: <code className="bg-indigo-100 px-1 rounded">password123</code></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
