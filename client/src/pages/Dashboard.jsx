import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { PlusCircle, Search } from "lucide-react";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    async function load() {
        const res = await api.get("/tasks");
        setTasks(res.data);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { load(); }, []);

    const add = async () => {
        if (!title.trim()) return;
        await api.post("/tasks", { title, description });
        setTitle("");
        setDescription("");
        load();
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            const matches = tasks.filter(task =>
                task.title.toLowerCase().includes(query.toLowerCase())
            );

            // Auto-open modal if there's exactly one match
            if (matches.length === 1) {
                setSelectedTask(matches[0]);
                setShowModal(true);
            } else if (matches.length === 0 || matches.length > 1) {
                // Close modal if no matches or multiple matches
                setShowModal(false);
                setSelectedTask(null);
            }
        } else {
            // Close modal when search is cleared
            setShowModal(false);
            setSelectedTask(null);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navbar />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start lg:items-center justify-between gap-3 sm:gap-4 pt-2">
                    <div className="space-y-1 sm:space-y-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-sky-400">
                            Your Tasks
                        </h1>
                        <p className="text-slate-400 text-xs sm:text-sm">
                            Tasks are automatically scoped to the currently logged in user.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-[10px] sm:text-xs text-slate-300 bg-slate-800/60 border border-slate-700 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm whitespace-nowrap flex-shrink-0">
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                        Changes are saved to your account
                    </div>
                </div>

                {/* New Task Form */}
                <div className="relative bg-linear-to-br from-slate-900/90 to-slate-900/50 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-800/80 p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 backdrop-blur-xl overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-linear-to-br from-emerald-500/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-linear-to-tr from-sky-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="h-0.5 sm:h-1 w-6 sm:w-8 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
                            <h2 className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wider">
                                Create New Task
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[10px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wide block">
                                    Title
                                </label>
                                <input
                                    className="border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 outline-none px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl w-full text-xs sm:text-sm bg-slate-800/60 text-slate-100 placeholder:text-slate-500 transition-all backdrop-blur-sm"
                                    value={title}
                                    placeholder="Enter task title..."
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="text-[10px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wide block">
                                    Description
                                </label>
                                <textarea
                                    className="border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 outline-none px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl w-full text-xs sm:text-sm bg-slate-800/60 text-slate-100 placeholder:text-slate-500 resize-none transition-all backdrop-blur-sm"
                                    style={{ height: '46px' }}
                                    value={description}
                                    placeholder="Add description (optional)..."
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2 sm:pt-3">
                            <button
                                onClick={add}
                                className="group relative bg-linear-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold shadow-xl shadow-emerald-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
                                disabled={!title.trim()}
                            >
                                <PlusCircle size={16} className="sm:w-[18px] sm:h-[18px] group-hover:rotate-90 transition-transform duration-300" />
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative bg-linear-to-br from-slate-900/90 to-slate-900/50 rounded-xl sm:rounded-2xl shadow-xl border border-slate-800/80 p-4 sm:p-5 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <Search className="text-slate-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search tasks by title..."
                            className="flex-1 bg-slate-800/60 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40 outline-none px-4 py-2.5 rounded-lg text-sm text-slate-100 placeholder:text-slate-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setShowModal(false);
                                    setSelectedTask(null);
                                }}
                                className="text-slate-400 hover:text-slate-200 text-sm"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    {searchQuery && filteredTasks.length > 0 && (
                        <div className="mt-3 text-xs text-slate-400">
                            Found {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} matching "{searchQuery}"
                        </div>
                    )}
                    {searchQuery && filteredTasks.length === 0 && (
                        <div className="mt-3 text-xs text-slate-500">
                            No tasks found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Task List */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="h-0.5 sm:h-1 w-6 sm:w-8 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full" />
                        <h2 className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wider">
                            Your Task List
                        </h2>
                        {tasks.length > 0 && (
                            <span className="text-[10px] sm:text-xs text-slate-400 bg-slate-800/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-slate-700">
                                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                            </span>
                        )}
                    </div>

                    {tasks.length === 0 ? (
                        <div className="border-2 border-dashed border-slate-800 rounded-xl sm:rounded-2xl p-8 sm:p-10 lg:p-12 text-center bg-slate-900/40 backdrop-blur-sm">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-slate-800/60 mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm mb-0.5 sm:mb-1 font-medium">No tasks yet</p>
                            <p className="text-slate-500 text-[10px] sm:text-xs">Create your first task using the form above</p>
                        </div>
                    ) : (
                        <div className="grid gap-2.5 sm:gap-3">
                            {(searchQuery ? filteredTasks : tasks).map(t => (
                                <div
                                    key={t._id}
                                    onClick={() => handleTaskClick(t)}
                                    className="cursor-pointer"
                                >
                                    <TaskCard t={t} reload={load} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Search Modal */}
            {showModal && selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedTask(null);
                        setSearchQuery("");
                    }}
                    onUpdate={() => {
                        load();
                        // Refresh selected task
                        const updated = tasks.find(t => t._id === selectedTask._id);
                        if (updated) setSelectedTask(updated);
                    }}
                    onDelete={() => {
                        load();
                        setSearchQuery("");
                    }}
                />
            )}
        </div>
    );
}