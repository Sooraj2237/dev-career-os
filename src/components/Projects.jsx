import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import PageHeader from "./PageHeader"

function Projects() {
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('devOS_projects')
        return savedProjects ? JSON.parse(savedProjects) : []
    })

    const location = useLocation()
    const [query, setQuery] = useState(location.state?.search || "")
    const [filterStatus, setFilterStatus] = useState("All")

    useEffect(() => {
        localStorage.setItem('devOS_projects', JSON.stringify(projects))
    }, [projects])

    const addProject = () => {
        const projectName = window.prompt("Enter Project Title", "").trim()
        const techStack = window.prompt("Enter Tech Stack", "").trim()
        if (projectName !== "" && techStack !== "") {
            const newProject = {
                id: crypto.randomUUID(),
                title: projectName,
                tech: techStack,
                status: "In Progress",
                repo: "",
                live: "",
                notes: "",
                createdOn: new Date().toLocaleDateString(),
                updatedOn: new Date().toLocaleDateString()
            }
            setProjects([...projects, newProject])
        }
    }

    const deleteProject = (id) => {
        setProjects(projects.filter(project => project.id !== id))
    }

    const updateProject = (id, field, val) => {
        setProjects(projects.map(project => project.id === id ? { ...project, [field]: val, updatedOn: new Date().toLocaleDateString() } : project))
    }

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(query.toLowerCase()) ||
                              project.tech.toLowerCase().includes(query.toLowerCase())
        const matchesStatus = filterStatus === "All" || project.status === filterStatus
        return matchesSearch && matchesStatus
    })

    const statusStyle = {
        "Planned":     { bg: '#f0ede6', color: '#5a5040', border: '#d4cbbf', dot: '#b09070' },
        "In Progress": { bg: '#e8f0e2', color: '#3a5c32', border: '#b4cca8', dot: '#6b8f5e' },
        "Done":        { bg: '#e4f2ec', color: '#2a6048', border: '#a8d4bc', dot: '#3a9060' },
    }

    return (
        <>
            <PageHeader title="Projects" />
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-base" style={{color: '#2d3a28'}}>Project Garden</h2>
                <div className="flex gap-3">
                    <input type="text" className="border rounded-xl px-4 py-2 text-sm outline-none w-44" style={{borderColor: '#c8d4be', background: '#f8fbf6', color: '#2d3a28'}} placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
                    <select className="border rounded-xl px-3 py-2 text-sm outline-none" style={{borderColor: '#c8d4be', background: '#f8fbf6', color: '#2d3a28'}} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button className="px-5 py-2 rounded-xl text-sm font-bold shadow-sm" style={{background: 'linear-gradient(135deg, #6b8f5e 0%, #4a7260 100%)', color: '#f5f0e8'}} onClick={addProject}>+ Add</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {filteredProjects.map(project => {
                    const s = statusStyle[project.status] || statusStyle["Planned"]
                    return (
                        <div key={project.id} className="flex flex-col gap-3 p-5 rounded-2xl border shadow-sm" style={{borderColor: '#cddcc5', background: '#fafcf8'}}>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h1 className="font-bold text-sm" style={{color: '#2d3a28'}}>{project.title}</h1>
                                    <p className="text-xs mt-0.5" style={{color: '#8a9e7e'}}>{project.tech}</p>
                                </div>
                                <select value={project.status} className="border rounded-xl px-3 py-1.5 text-xs font-semibold outline-none shrink-0" style={{background: s.bg, color: s.color, borderColor: s.border}} onChange={e => updateProject(project.id, 'status', e.target.value)}>
                                    <option value="Planned">Planned</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" className="border rounded-xl px-3 py-2 text-xs outline-none" style={{borderColor: '#d6e0cc', background: '#f5f8f2', color: '#4a5c40'}} placeholder="Repo link (optional)" value={project.repo} onChange={e => updateProject(project.id, 'repo', e.target.value)} />
                                <input type="text" className="border rounded-xl px-3 py-2 text-xs outline-none" style={{borderColor: '#d6e0cc', background: '#f5f8f2', color: '#4a5c40'}} placeholder="Live link (optional)" value={project.live} onChange={e => updateProject(project.id, 'live', e.target.value)} />
                                <textarea className="col-span-2 h-24 border rounded-xl px-3 py-2 text-xs outline-none resize-none" style={{borderColor: '#d6e0cc', background: '#f5f8f2', color: '#4a5c40'}} placeholder="Notes (optional)" value={project.notes} onChange={e => updateProject(project.id, 'notes', e.target.value)} />
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <p className="text-xs" style={{color: '#9aaa8e'}}>Planted {project.createdOn}</p>
                                <button className="text-xs px-4 py-1.5 rounded-lg border font-semibold transition-all" style={{borderColor: '#e0b8b0', color: '#7a3028', background: '#fdf0ee'}} onClick={() => deleteProject(project.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-16 text-sm" style={{color: '#8a9e7e'}}>No projects yet. Plant your first seed 🌱</div>
            )}

            <p className="mt-5 text-xs font-medium" style={{color: '#8a9e7e'}}>🪵 "Done" means: loading/error state + responsive UI + can explain architecture.</p>
        </>
    )
}

export default Projects
