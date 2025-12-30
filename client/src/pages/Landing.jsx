import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
    const nav = useNavigate();
    const isAuthed = Boolean(localStorage.getItem("token"));

    const goToApp = () => {
        if (isAuthed) nav("/dashboard");
        else nav("/login");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center px-4 py-8">
            <div className="max-w-6xl w-full grid lg:grid-cols-[1.2fr,0.9fr] gap-8 items-center">
                {/* Left: Hero content */}
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 bg-slate-900/70 px-3 py-1 rounded-full border border-slate-800/80 backdrop-blur ">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow shadow-emerald-400/60" />
                        Task Manager
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ">
                        Stay organized with a{" "}
                        <span className="bg-linear-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                            clean, personal
                        </span>{" "}
                        task dashboard.
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                        Secure login, user‑specific tasks, and a modern interface built with React and Tailwind.
                        Sign in or create an account to start managing your tasks in seconds.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={goToApp}
                            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-linear-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all hover:-translate-y-0.5"
                        >
                            <span>{isAuthed ? "Go to Dashboard" : "Start Now"}</span>
                            <svg
                                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                            </svg>
                        </button>
                        {!isAuthed && (
                            <div className="flex gap-2 text-xs sm:text-sm">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-xl border border-slate-700/80 bg-slate-900/40 hover:bg-slate-800/80 text-sky-300 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-slate-400">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 space-y-1 backdrop-blur">
                            <p className="text-slate-200 font-medium text-xs">User‑based tasks</p>
                            <p>Each task is stored with your user ID for a personal dashboard.</p>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 space-y-1 backdrop-blur">
                            <p className="text-slate-200 font-medium text-xs">Secure access</p>
                            <p>Protected routes using JWT and a simple auth flow.</p>
                        </div>
                    </div>
                </div>

                {/* Right: Decorative / preview card */}
                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-6 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl" />

                    <div className="relative bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-2xl shadow-slate-900/80 p-4 sm:p-5 backdrop-blur-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">Preview</p>
                                <p className="text-sm font-semibold text-slate-100">Dashboard Snapshot</p>
                            </div>
                            <span className="px-2 py-1 rounded-full text-[10px] bg-emerald-500/10 border border-emerald-500/40 text-emerald-300">
                                Live UI
                            </span>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between text-slate-400">
                                <span>Tasks today</span>
                                <span className="text-emerald-400 font-medium">3</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                    <div className="h-full w-2/3 bg-linear-to-r from-emerald-400 to-sky-400" />
                                </div>
                                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                    <div className="h-full w-1/3 bg-linear-to-r from-sky-400 to-emerald-400" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-[0.18em]">
                                Example tasks
                            </p>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-lg px-3 py-2">
                                    <span className="text-xs text-slate-100">Finish assignment UI</span>
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                </div>
                                <div className="flex items-center justify-between bg-slate-900/70 border border-slate-800 rounded-lg px-3 py-2">
                                    <span className="text-xs text-slate-200">Refactor API calls</span>
                                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                                </div>
                                <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2">
                                    <span className="text-xs text-slate-400">Plan tomorrow&apos;s tasks</span>
                                    <span className="h-2 w-2 rounded-full bg-slate-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}