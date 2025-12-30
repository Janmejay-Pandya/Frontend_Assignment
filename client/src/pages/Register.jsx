import { useState } from "react";
import api from "../api";
import { UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const submit = async () => {
        try {
            await api.post("/auth/signup", { name, email, password });
            // Automatically log the user in after successful signup
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            alert("Registered Successfully");
            nav("/");
        } catch (err) {
            alert("Unable to register. Please check your details and try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4 pt-5">
            <div className="max-w-5xl w-full grid md:grid-cols-[0.9fr,1.1fr] gap-8 items-center">
                <div className="text-slate-100 space-y-4 hidden md:block order-last md:order-first">
                    <h1 className="text-4xl font-semibold leading-tight">
                        Create your{" "}
                        <span className="bg-linear-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                            personal task space
                        </span>
                        .
                    </h1>
                    <p className="text-sm text-slate-400 max-w-md">
                        Register once and keep all your tasks organized by account.
                        Every task is associated with your user so your dashboard is always personal.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 space-y-1">
                            <p className="text-slate-300 font-medium">User specific</p>
                            <p>Each task is linked to your user in the database.</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 space-y-1">
                            <p className="text-slate-300 font-medium">Simple auth</p>
                            <p>JWT based login & protected routes on the frontend.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-2xl font-semibold text-slate-50">Create account</h2>
                        <p className="text-xs text-slate-400">
                            Join in a few seconds and start managing tasks with a clean UI.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-300">Name</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400 transition-shadow"
                                placeholder="Your name"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-300">Email</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400 transition-shadow"
                                placeholder="you@example.com"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-300">Password</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400 transition-shadow"
                                type="password"
                                placeholder="••••••••"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        onClick={submit}
                        className="w-full bg-linear-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30 transition-transform hover:-translate-y-[1px]"
                    >
                        <UserPlus size={18} /> Sign Up
                    </button>
                    <p className="text-[11px] text-slate-400 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-sky-400 hover:text-sky-300 font-medium">
                            Log in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
