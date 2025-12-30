import { LogOut, Sparkles, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const nav = useNavigate();

    return (
        <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
                <div className="flex items-center gap-3 text-slate-100">
                    <div className="relative">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/25">
                            <Sparkles size={20} className="animate-pulse" />
                        </span>
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                    </div>
                    <div>
                        <div className="font-semibold text-base tracking-tight">
                            Task Dashboard
                        </div>
                        <div className="text-[11px] text-slate-400">
                            Manage tasks for the current user
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-2 text-xs font-medium text-slate-300 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all hover:scale-105"
                        onClick={() => nav("/profile")}
                        title="View Profile"
                    >
                        <User size={14} /> Profile
                    </button>
                    <button
                        className="flex items-center gap-2 text-xs font-medium text-slate-300 px-4 py-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all hover:scale-105"
                        onClick={() => {
                            localStorage.removeItem("token");
                            nav("/login");
                        }}
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </div>
        </header>
    );
}