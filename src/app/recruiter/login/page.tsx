"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Loader2, Building2, Mail, Lock, User } from "lucide-react";

export default function RecruiterAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    name: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login with username/email and password
        const recruiter = await MockDB.loginRecruiterWithPassword(
          formData.username || formData.email,
          formData.password
        );
        
        if (!recruiter) {
          setError("Invalid credentials. Please check your username/email and password.");
          setLoading(false);
          return;
        }

        // Store recruiter session
        if (typeof window !== 'undefined') {
          localStorage.setItem('recruiter', JSON.stringify(recruiter));
        }

        // Redirect to dashboard
        router.push(`/dashboard?companyId=${recruiter.companyId}`);
      } else {
        // Signup - create new recruiter account
        if (!formData.username || !formData.email || !formData.password || !formData.name || !formData.companyName) {
          setError("All fields are required for signup.");
          setLoading(false);
          return;
        }

        const newRecruiter = await MockDB.createRecruiter({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          companyName: formData.companyName
        });

        if (!newRecruiter) {
          setError("Signup failed. Username or email may already exist.");
          setLoading(false);
          return;
        }

        // Store recruiter session
        if (typeof window !== 'undefined') {
          localStorage.setItem('recruiter', JSON.stringify(newRecruiter));
        }

        // Redirect to dashboard
        router.push(`/dashboard?companyId=${newRecruiter.companyId}`);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Circle AI</h1>
          <p className="text-slate-500 mt-1">The All-in-One Recruitment Platform</p>
          <h2 className="text-xl font-semibold mt-4">
            {isLogin ? "Recruiter Login" : "Recruiter Signup"}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Corp"
                    className="pl-10"
                    required={!isLogin}
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              {isLogin ? "Username or Email" : "Username"}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                value={isLogin ? formData.username : formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder={isLogin ? "username or email" : "username"}
                className="pl-10"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hr@company.com"
                  className="pl-10"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

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
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
              setFormData({ username: "", email: "", password: "", companyName: "", name: "" });
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="pt-4 border-t">
          <Link href="/candidate/login">
            <Button variant="ghost" className="w-full">
              Looking for jobs? Candidate Login →
            </Button>
          </Link>
        </div>

        {isLogin && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-900 mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-blue-700">
              <p>• Username: <code className="bg-blue-100 px-1 rounded">davidkim</code> | Password: <code className="bg-blue-100 px-1 rounded">password123</code></p>
              <p>• Username: <code className="bg-blue-100 px-1 rounded">sarahjohnson</code> | Password: <code className="bg-blue-100 px-1 rounded">password123</code></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
