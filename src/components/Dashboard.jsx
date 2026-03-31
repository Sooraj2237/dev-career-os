import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "./PageHeader"

function Dashboard() {
    const navigate = useNavigate();

    const [skills, setSkills] = useState([])
    const [projects, setProjects] = useState([])
    const [apps, setApps] = useState([])
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const savedSkills = localStorage.getItem('devOS_skills')
        const savedProjects = localStorage.getItem('devOS_projects')
        const savedApps = localStorage.getItem('devOS_apps')
        const savedNotes = localStorage.getItem('devOS_notes')

        if (savedSkills) setSkills(JSON.parse(savedSkills))
        if (savedProjects) setProjects(JSON.parse(savedProjects))
        if (savedApps) setApps(JSON.parse(savedApps))
        if (savedNotes) setNotes(JSON.parse(savedNotes))
    }, [])

    const totalSkills = skills.length
    const masteredSkills = skills.filter(s => s.level >= s.target).length
    const skillProgress = totalSkills === 0 ? 0 : Math.round((masteredSkills / totalSkills) * 100)
    const avgSkillLevel = totalSkills === 0 ? 0 : (skills.reduce((acc, s) => acc + s.level, 0) / totalSkills).toFixed(1)
    const totalProjects = projects.length
    const doneProjects = projects.filter(p => p.status === "Done").length
    const projectProgress = totalProjects === 0 ? 0 : Math.round((doneProjects / totalProjects) * 100)
    const totalApps = apps.length
    const interviews = apps.filter(a => a.status === "Interview").length
    const offers = apps.filter(a => a.status === "Offer").length

    const pipeline = {
        applied: apps.filter(a => a.status === "Applied").length,
        screening: apps.filter(a => a.status === "Screening").length,
        interview: interviews,
        offer: offers,
        rejected: apps.filter(a => a.status === "Rejected").length
    }

    const latestProject = projects.length > 0 ? projects[projects.length - 1] : { title: "No projects yet", status: "N/A" }
    const latestApp = apps.length > 0 ? apps[apps.length - 1] : { company: "No applications yet", role: "N/A" }
    const latestNote = notes.length > 0 ? notes[0] : { title: "No notes yet" }

    const savedStreak = localStorage.getItem('devOS_streak')
    const parsedStreak = savedStreak ? JSON.parse(savedStreak) : { lastCheckIn: 'Never' }
    const today = new Date().toISOString().split('T')[0]
    const isCheckedIn = parsedStreak.lastCheckIn === today

    return (
        <>
            <PageHeader title="Dashboard" />
            <div className="stats grid grid-cols-1 md:grid-cols-4 mt-6 gap-4">
                <div className="skills border border-gray-200 bg-white rounded-xl p-4 flex flex-col shadow-sm">
                    <h2 className="text-gray-500 font-semibold text-sm mb-1">Skills Mastered</h2>
                    <h4 className="text-2xl font-black text-gray-800">{masteredSkills}/{totalSkills}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">{skillProgress}% of target</p>
                </div>
                <div className="projects border border-gray-200 bg-white rounded-xl p-4 flex flex-col shadow-sm">
                    <h2 className="text-gray-500 font-semibold text-sm mb-1">Projects Done</h2>
                    <h4 className="text-2xl font-black text-gray-800">{doneProjects}/{totalProjects}</h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">{projectProgress}% Completed</p>
                </div>
                <div className="applications border border-gray-200 bg-white rounded-xl p-4 flex flex-col shadow-sm">
                    <h2 className="text-gray-500 font-semibold text-sm mb-1">Applications</h2>
                    <h4 className="text-2xl font-black text-gray-800">{totalApps}</h4>
                    <p className="text-xs text-green-600 font-bold mt-1">Offers {offers} | Interviews {interviews}</p>
                </div>
                <div className="skill-level border border-gray-200 bg-white rounded-xl p-4 flex flex-col shadow-sm">
                    <h2 className="text-gray-500 font-semibold text-sm mb-1">Avg Skill Level</h2>
                    <h4 className="text-2xl font-black text-gray-800">{avgSkillLevel}/5</h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">Aim 4+ across core stack</p>
                </div>
            </div>
            <div className="bottom-split grid grid-cols-1 md:grid-cols-2 mt-8 gap-6">
                <div className="snapshot p-5 flex flex-col gap-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                    <h2 className="font-bold text-lg text-gray-800">Pipeline Snapshot</h2>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-50 border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 rounded-full">Applied {pipeline.applied}</span>
                        <span className="bg-blue-50 border border-blue-200 px-3 py-1 text-sm font-semibold text-blue-700 rounded-full">Screening {pipeline.screening}</span>
                        <span className="bg-purple-50 border border-purple-200 px-3 py-1 text-sm font-semibold text-purple-700 rounded-full">Interview {pipeline.interview}</span>
                        <span className="bg-green-50 border border-green-200 px-3 py-1 text-sm font-semibold text-green-700 rounded-full">Offer {pipeline.offer}</span>
                        <span className="bg-red-50 border border-red-200 px-3 py-1 text-sm font-semibold text-red-700 rounded-full">Rejected {pipeline.rejected}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-auto">This is what makes your resume "real": consistent application + iteration</p>
                </div>
                <div className="updates flex flex-col gap-3 p-5 border border-gray-200 bg-white rounded-xl shadow-sm">
                    <h1 className="font-bold text-lg text-gray-800 mb-1">Latest Updates</h1>
                    <div className="flex justify-between p-3 items-center border border-gray-100 bg-gray-50 rounded-lg">
                        <div className="latest-project flex flex-col">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Latest Project</p>
                            <h3 className="font-bold text-gray-800 text-sm">{latestProject.title} | {latestProject.status}</h3>
                        </div>
                        {projects.length > 0 && (
                            <button 
                                onClick={() => navigate('/projects', { state: { search: latestProject.title } })}
                                className="bg-white border px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 transition shadow-sm"
                            >
                                Open
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between p-3 items-center border border-gray-100 bg-gray-50 rounded-lg">
                        <div className="latest-project flex flex-col">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Latest Note</p>
                            <h3 className="font-bold text-gray-800 text-sm truncate">{latestNote.title}</h3>
                        </div>
                        {notes.length > 0 && (
                            <button 
                                onClick={() => navigate('/notes', { state: { noteId: latestNote.id } })}
                                className="bg-white border px-4 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100 transition shadow-sm ml-2"
                            >
                                Open
                            </button>
                        )}
                    </div>
                    <div className="flex justify-between p-3 items-center border border-gray-100 bg-white rounded-lg mt-auto">
                        <p className="text-sm font-bold text-gray-700">Check-in Today</p>
                        <h3 className="text-sm font-black">{isCheckedIn ? "Yes ✅" : "No ❌"}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard