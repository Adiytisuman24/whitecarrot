import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Briefcase, Users, ArrowRight, UserPlus, LogIn } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      {/* Hero Header */}
      <div className="pt-20 pb-10 text-center space-y-4 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          WhiteCarrot ATS
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          The intelligent recruitment platform connecting top talent with world-class companies through AI-powered matching.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 gap-8 items-stretch mb-20">
        
        {/* Recruiter Section */}
        <div className="flex-1 bg-slate-800/50 rounded-3xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors flex flex-col">
           <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="h-6 w-6 text-blue-400" />
           </div>
           <h2 className="text-3xl font-bold mb-4">For Recruiters</h2>
           <p className="text-slate-400 mb-8 flex-1">
              Streamline your hiring process. Post jobs to branded career pages, manage applications, and let our AI Agent generate screening tasks and identify top candidates instantly.
           </p>
           <div className="space-y-4">
              <Link href="/recruiter/login">
                <Button size="lg" className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                  <LogIn className="h-5 w-5" /> Recruiter Login
                </Button>
              </Link>
              <div className="text-center text-sm text-slate-500">
                Manage multiple company profiles
              </div>
           </div>
        </div>

        {/* Candidate Section */}
        <div className="flex-1 bg-gradient-to-br from-emerald-900/20 to-slate-800/50 rounded-3xl p-8 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3 bg-emerald-500 text-slate-900 font-bold text-xs rounded-bl-xl">
             FAST TRACK ENABLED
           </div>
           <div className="h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-emerald-400" />
           </div>
           <h2 className="text-3xl font-bold mb-4">For Candidates</h2>
           <p className="text-slate-400 mb-8 flex-1">
              One profile, endless opportunities. Create your account to get matched with jobs across our entire portfolio. 
              Our AI recommends roles where you are a top match.
           </p>
           <div className="grid grid-cols-2 gap-4">
              <Link href="/candidate/login">
                <Button size="lg" className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2">
                  <LogIn className="h-5 w-5" /> Log In
                </Button>
              </Link>
              <Link href="/candidate/signup">
                <Button size="lg" className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2">
                  <UserPlus className="h-5 w-5" /> Sign Up
                </Button>
              </Link>
           </div>
           <p className="text-center text-sm text-slate-500 mt-4">
              Join 10,000+ candidates getting hired faster.
           </p>
        </div>

      </div>
      
      <footer className="py-8 text-center text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} WhiteCarrot. Powered by Mini ATS.
      </footer>
    </div>
  );
}
