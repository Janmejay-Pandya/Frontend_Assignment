import { useState } from "react";
import api from "../api";
import { LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handle = async () => {
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            nav("/");
        } catch {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
            <div className="max-w-5xl w-full grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
                <div className="text-slate-100 space-y-4 hidden md:block">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Smart Task Manager
                    </p>
                    <h1 className="text-4xl font-semibold leading-tight">
                        Sign in and stay on top of your{" "}
                        <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                            daily tasks
                        </span>
                        .
                    </h1>
                    <p className="text-sm text-slate-400 max-w-md">
                        Organize todos by user, keep track of progress, and never lose focus.
                        Simple, fast, and designed to stay out of your way.
                    </p>
                    <div className="flex gap-4 text-xs text-slate-400">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 space-y-1">
                            <p className="text-slate-300 font-medium">Secure</p>
                            <p>Protected routes & JWT powered backend.</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 space-y-1">
                            <p className="text-slate-300 font-medium">Fast</p>
                            <p>Instant feedback with a clean React UI.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-2xl font-semibold text-slate-50">Welcome back</h2>
                        <p className="text-xs text-slate-400">
                            Log in with your account to access your personal task dashboard.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-300">Email</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition-shadow"
                                placeholder="you@example.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-300">Password</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400 transition-shadow"
                                type="password"
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handle}
                        className="w-full bg-linear-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-[1px]"
                    >
                        <LogIn size={18} /> Login
                    </button>
                    <p className="text-[11px] text-slate-400 text-center">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
