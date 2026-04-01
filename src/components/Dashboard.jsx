import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PageHeader from "./PageHeader"

function Dashboard() {
    const navigate = useNavigate()

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
    const latestNote = notes.length > 0 ? notes[0] : { title: "No notes yet" }

    const savedStreak = localStorage.getItem('devOS_streak')
    const parsedStreak = savedStreak ? JSON.parse(savedStreak) : { lastCheckIn: 'Never' }
    const today = new Date().toISOString().split('T')[0]
    const isCheckedIn = parsedStreak.lastCheckIn === today

    const statCards = [
        { label: "Skills Mastered", value: `${masteredSkills}/${totalSkills}`, sub: `${skillProgress}% of target`, icon: "🌱", accent: '#5a8f5e', bg: '#eaf4e8' },
        { label: "Projects Done", value: `${doneProjects}/${totalProjects}`, sub: `${projectProgress}% completed`, icon: "🪵", accent: '#7a6040', bg: '#f4ede4' },
        { label: "Applications", value: totalApps, sub: `Offers ${offers} · Interviews ${interviews}`, icon: "📋", accent: '#4a7260', bg: '#e6f0ec' },
        { label: "Avg Skill Level", value: `${avgSkillLevel}/5`, sub: "Aim 4+ across core stack", icon: "🌿", accent: '#6b7a40', bg: '#f0f2e4' },
    ]

    return (
        <>
            <PageHeader title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                {statCards.map((card, i) => (
                    <div key={i} className="rounded-2xl p-5 flex flex-col shadow-sm border" style={{background: card.bg, borderColor: card.accent + '30'}}>
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{color: card.accent + 'cc'}}>{card.label}</h2>
                            <span className="text-xl">{card.icon}</span>
                        </div>
                        <h4 className="text-3xl font-black" style={{color: '#2d3a28'}}>{card.value}</h4>
                        <p className="text-xs font-medium mt-1.5" style={{color: card.accent}}>{card.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-6">
                <div className="rounded-2xl p-6 flex flex-col gap-4 shadow-sm border" style={{background: '#f8faf5', borderColor: '#cddcc5'}}>
                    <h2 className="font-bold text-base" style={{color: '#2d3a28'}}>Pipeline Snapshot</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: `Applied ${pipeline.applied}`, bg: '#f0ede6', color: '#5a5040', border: '#d4cbbf' },
                            { label: `Screening ${pipeline.screening}`, bg: '#e6edf8', color: '#3a5080', border: '#b8ccec' },
                            { label: `Interview ${pipeline.interview}`, bg: '#e8f0e2', color: '#3a5c32', border: '#b4cca8' },
                            { label: `Offer ${pipeline.offer}`, bg: '#e4f2ec', color: '#2a6048', border: '#a8d4bc' },
                            { label: `Rejected ${pipeline.rejected}`, bg: '#f5e8e4', color: '#7a3028', border: '#e0b8b0' },
                        ].map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-sm font-semibold rounded-full border" style={{background: tag.bg, color: tag.color, borderColor: tag.border}}>{tag.label}</span>
                        ))}
                    </div>
                    <p className="text-sm mt-auto" style={{color: '#7a8c6e'}}>Consistent application + iteration is what makes your resume real.</p>
                </div>

                <div className="rounded-2xl p-6 flex flex-col gap-3 shadow-sm border" style={{background: '#f8faf5', borderColor: '#cddcc5'}}>
                    <h1 className="font-bold text-base mb-1" style={{color: '#2d3a28'}}>Latest Updates</h1>

                    <div className="flex justify-between items-center p-3 rounded-xl border" style={{background: '#f0f5ee', borderColor: '#cddcc5'}}>
                        <div className="flex flex-col">
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{color: '#8a9e7e'}}>Latest Project</p>
                            <h3 className="font-bold text-sm mt-0.5" style={{color: '#2d3a28'}}>{latestProject.title} · {latestProject.status}</h3>
                        </div>
                        {projects.length > 0 && (
                            <button onClick={() => navigate('/projects', { state: { search: latestProject.title } })} className="px-4 py-1.5 rounded-lg text-xs font-bold border transition-all" style={{background: '#fff', borderColor: '#c8d8c0', color: '#4a7260'}}>Open</button>
                        )}
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl border" style={{background: '#f0f5ee', borderColor: '#cddcc5'}}>
                        <div className="flex flex-col">
                            <p className="text-xs font-semibold uppercase tracking-wider" style={{color: '#8a9e7e'}}>Latest Note</p>
                            <h3 className="font-bold text-sm mt-0.5 truncate" style={{color: '#2d3a28'}}>{latestNote.title}</h3>
                        </div>
                        {notes.length > 0 && (
                            <button onClick={() => navigate('/notes', { state: { noteId: latestNote.id } })} className="px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ml-2" style={{background: '#fff', borderColor: '#c8d8c0', color: '#4a7260'}}>Open</button>
                        )}
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl border mt-auto" style={{background: '#f0f5ee', borderColor: '#cddcc5'}}>
                        <p className="text-sm font-bold" style={{color: '#2d3a28'}}>Check-in Today</p>
                        <h3 className="text-sm font-black" style={{color: '#4a7260'}}>{isCheckedIn ? "Yes ✅" : "No ❌"}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
