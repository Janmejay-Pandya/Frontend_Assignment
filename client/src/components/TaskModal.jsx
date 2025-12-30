import { useState, useEffect } from "react";
import api from "../api";
import { X } from "lucide-react";

export default function TaskModal({ task, onClose, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(task.title);
        setDescription(task.description || "");
        setIsEditing(false);
    }, [task]);

    const save = async () => {
        if (!title.trim()) return;
        await api.put(`/tasks/${task._id}`, { title, description });
        setIsEditing(false);
        onUpdate();
    };

    const del = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            await api.delete(`/tasks/${task._id}`);
            onDelete();
            onClose();
        }
    };

    const cancel = () => {
        setTitle(task.title);
        setDescription(task.description || "");
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-linear-to-br from-slate-900/95 to-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-emerald-500/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-sky-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-sky-400">
                            {isEditing ? "Edit Task" : "Task Details"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        {isEditing ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                                        Title
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 outline-none bg-slate-800/60 text-slate-100 placeholder:text-slate-500"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="Task title"
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 outline-none bg-slate-800/60 text-slate-100 placeholder:text-slate-500 resize-none"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder="Description (optional)"
                                        rows={4}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 sm:p-5">
                                    <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Title</p>
                                    <p className="text-lg sm:text-xl font-semibold text-slate-100">{task.title}</p>
                                </div>
                                {task.description && (
                                    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 sm:p-5">
                                        <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Description</p>
                                        <p className="text-base text-slate-300 leading-relaxed">{task.description}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-slate-800">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={cancel}
                                    className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={del}
                                        className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={save}
                                        className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white transition-all text-sm font-medium shadow-lg shadow-emerald-500/30"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={del}
                                    className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
                                >
                                    Delete Task
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white transition-all text-sm font-medium shadow-lg shadow-emerald-500/30"
                                >
                                    Edit Task
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

