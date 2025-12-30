import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import { User, Mail, ArrowLeft } from "lucide-react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        async function loadUser() {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data);
            } catch (err) {
                console.error("Error loading user:", err);
                alert("Failed to load user profile");
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <div className="text-slate-400">Loading profile...</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <div className="text-slate-400">User not found</div>
                </div>
            </div>
        );
    }

    // Get initials for avatar
    const initials = user.name
        ?.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navbar />
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                <button
                    onClick={() => nav("/dashboard")}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </button>

                <div className="relative bg-linear-to-br from-slate-900/90 to-slate-900/50 rounded-2xl shadow-2xl border border-slate-800/80 p-6 sm:p-8 lg:p-10 backdrop-blur-xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-emerald-500/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-sky-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-6">
                        {/* Profile Picture Icon */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-xl shadow-emerald-500/30">
                                    {initials}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center">
                                    <User size={16} className="text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="space-y-4">
                            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 sm:p-5 space-y-1">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 uppercase tracking-wider mb-2">
                                    <User size={14} />
                                    Name
                                </div>
                                <p className="text-lg sm:text-xl font-semibold text-slate-100">
                                    {user.name}
                                </p>
                            </div>

                            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 sm:p-5 space-y-1">
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 uppercase tracking-wider mb-2">
                                    <Mail size={14} />
                                    Email
                                </div>
                                <p className="text-lg sm:text-xl font-semibold text-slate-100">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Additional Info Card */}
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 text-center">
                            <p className="text-xs text-slate-400">
                                Your account is secure and your tasks are private to you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

