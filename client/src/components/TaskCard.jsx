import { useState } from "react";
import api from "../api";


export default function TaskCard({ t, reload }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(t.title);
    const [description, setDescription] = useState(t.description || "");
    // eslint-disable-next-line no-unused-vars
    const [isHovered, setIsHovered] = useState(false);

    const del = async () => {
        await api.delete(`/tasks/${t._id}`);
        reload();
    };

    const save = async () => {
        if (!title.trim()) return;
        await api.put(`/tasks/${t._id}`, { title, description });
        setIsEditing(false);
        reload();
    };

    const cancel = () => {
        setTitle(t.title);
        setDescription(t.description || "");
        setIsEditing(false);
    };
    return (
        <div
            className="group relative border border-slate-800/80 bg-linear-to-br from-slate-900/90 to-slate-900/50 rounded-xl p-4 flex justify-between items-start shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all hover:border-slate-700 backdrop-blur-sm overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Subtle gradient overlay on hover */}
            <div className={`absolute inset-0 bg-linear-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            <div className="space-y-1.5 flex-1 mr-3 relative z-10">
                {isEditing ? (
                    <div className="space-y-2.5">
                        <input
                            className="w-full text-sm border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Task title"
                        />
                        <textarea
                            className="w-full text-xs border border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 resize-none bg-slate-800/50 text-slate-100 placeholder:text-slate-500"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Description (optional)"
                            rows={2}
                        />
                    </div>
                ) : (
                    <>
                        <p className="font-medium text-slate-100 text-base group-hover:text-white transition-colors">{t.title}</p>
                        {t.description && (
                            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                {t.description}
                            </p>
                        )}
                    </>
                )}
            </div>

            <div className="flex items-center gap-1.5 relative z-10">
                {isEditing ? (
                    <>
                        <button
                            className="text-emerald-400 hover:text-emerald-300 p-2 rounded-lg hover:bg-emerald-500/10 transition-all hover:scale-110"
                            onClick={save}
                            title="Save"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                        <button
                            className="text-slate-400 hover:text-slate-300 p-2 rounded-lg hover:bg-slate-700/50 transition-all hover:scale-110"
                            onClick={cancel}
                            title="Cancel"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="text-sky-400 hover:text-sky-300 p-2 rounded-lg hover:bg-sky-500/10 transition-all hover:scale-110"
                            onClick={() => setIsEditing(true)}
                            title="Edit task"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-all hover:scale-110"
                            onClick={del}
                            title="Delete task"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
