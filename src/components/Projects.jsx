import { useState, useEffect } from "react"
import PageHeader from "./PageHeader"

function Projects() {

    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('devOS_projects')
        return savedProjects ? JSON.parse(savedProjects) : []
    })

    const [query, setQuery] = useState("")
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
        setProjects(projects.map(project => project.id === id ? { ...project, [field]: val, updatedOn : new Date().toLocaleDateString() } : project))
    }

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(query.toLowerCase()) || 
                              project.tech.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = filterStatus === "All" || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    })

    return (
    <>
        <PageHeader title="Projects"/>
        <div className="heading flex justify-between items-center mt-6">
            <div className="left-part">Projects</div>
            <div className="right-part flex gap-3">
                <input type="text" name="query" className="p-1 border rounded w-40" placeholder="Search Project" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <select name="category" className="p-1 border rounded w-32" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button className="border rounded px-5 py-1" onClick={addProject}>+ Add</button>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
            {
                filteredProjects.map(project => {
                    return (
                        <div key={project.id} className="project-card flex flex-col gap-2 p-3 border rounded">
                            <div className="title grid grid-cols-3 gap-2 items-center">
                                <div className="title-name col-span-1 flex flex-col gap-1">
                                    <h1>{project.title}</h1>
                                    <p>{project.tech}</p>
                                </div>
                                <select value={project.status} className="p-1 border rounded w-full col-span-2" onChange={e => updateProject(project.id, 'status', e.target.value)}>
                                    <option value="Planned">Planned</option>    
                                    <option value="In Progress">In Progress</option>    
                                    <option value="Done">Done</option>    
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" className="repo border w-full rounded p-1" placeholder="Repo link (optional)" value={project.repo} onChange={e => updateProject(project.id, 'repo', e.target.value)}/>
                                <input type="text" className="live border w-full rounded p-1" placeholder="live link (optional)" value={project.live} onChange={e => updateProject(project.id, 'live', e.target.value)}/>
                                <textarea type="text" className="project-notes col-span-2 h-32 border w-full rounded p-1" placeholder="Notes (optional)" value={project.notes} onChange={e => updateProject(project.id, 'notes', e.target.value)}/>
                            </div>
                            <div className="footer flex justify-between items-center mt-4">
                                <p>Created: {project.createdOn}</p>
                                <button className="px-5 py-1 border rounded" onClick={() => deleteProject(project.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="tip">Pro tip: "Done" means: loading/error state + responsive UI + can explain architecture.</div>
    </>
    )
}

export default Projects