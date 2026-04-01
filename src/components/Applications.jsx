import { useState, useEffect } from "react"
import PageHeader from "./PageHeader"

function Applications() {
    const [apps, setApps] = useState(() => {
        const savedApps = localStorage.getItem('devOS_apps')
        return savedApps ? JSON.parse(savedApps) : []
    })
    const [query, setQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState("All")

    useEffect(() => {
        localStorage.setItem('devOS_apps', JSON.stringify(apps))
    }, [apps])

    const addApp = () => {
        const compName = window.prompt("Enter Company Name", "").trim()
        const role = window.prompt("Enter Role of interest", "").trim()
        const roleFinal = (role === "") ? "any" : role
        if (compName !== "") {
            const newApp = {
                id: crypto.randomUUID(),
                company: compName,
                role: roleFinal,
                status: "Applied",
                link: "",
                date: new Date().toISOString().split('T')[0],
                notes: ""
            }
            setApps([...apps, newApp])
        }
    }

    const deleteApp = (id) => setApps(apps.filter(app => app.id !== id))

    const updateApp = (id, field, val) => {
        setApps(apps.map(app => app.id === id ? { ...app, [field]: val } : app))
    }

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(query.toLowerCase()) ||
                              app.role.toLowerCase().includes(query.toLowerCase())
        const matchesStatus = filterStatus === "All" || app.status === filterStatus
        return matchesSearch && matchesStatus
    })

    const statusStyle = {
        "Applied":   { bg: '#f0ede6', color: '#5a5040', border: '#d4cbbf' },
        "Screening": { bg: '#e6edf8', color: '#3a5080', border: '#b8ccec' },
        "Interview": { bg: '#e8f0e2', color: '#3a5c32', border: '#b4cca8' },
        "Offer":     { bg: '#e4f2ec', color: '#2a6048', border: '#a8d4bc' },
        "Rejected":  { bg: '#f5e8e4', color: '#7a3028', border: '#e0b8b0' },
    }

    return (
        <>
            <PageHeader title="Applications" />
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-base" style={{color: '#2d3a28'}}>Application Pipeline</h2>
                <div className="flex flex-wrap gap-3">
                    <input type="text" className="border rounded-xl px-4 py-2 text-sm outline-none w-44" style={{borderColor: '#c8d4be', background: '#f8fbf6', color: '#2d3a28'}} placeholder="Search company..." onChange={e => setQuery(e.target.value)} />
                    <select className="border rounded-xl px-3 py-2 text-sm outline-none" style={{borderColor: '#c8d4be', background: '#f8fbf6', color: '#2d3a28'}} defaultValue="All" onChange={e => setFilterStatus(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button className="px-5 py-2 rounded-xl text-sm font-bold shadow-sm" style={{background: 'linear-gradient(135deg, #6b8f5e 0%, #4a7260 100%)', color: '#f5f0e8'}} onClick={addApp}>+ Add</button>
                </div>
            </div>

            <div className="rounded-2xl overflow-hidden border shadow-sm" style={{borderColor: '#cddcc5'}}>
                <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{background: '#e8f0e2', color: '#6a8060'}}>
                    <div className="col-span-3">Company</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Date / Link</div>
                    <div className="col-span-2 text-center">Action</div>
                </div>

                {filteredApps.map((app, idx) => {
                    const s = statusStyle[app.status] || statusStyle["Applied"]
                    return (
                        <div key={app.id} className="grid grid-cols-12 gap-4 px-5 py-4 border-t items-center transition-all" style={{borderColor: '#dde8d5', background: idx % 2 === 0 ? '#fafcf8' : '#f5f8f2'}}>
                            <div className="col-span-3">
                                <input type="text" className="font-bold w-full bg-transparent outline-none border-b border-transparent focus:border-gray-300 text-sm" style={{color: '#2d3a28'}} value={app.company} onChange={e => updateApp(app.id, 'company', e.target.value)} />
                            </div>
                            <div className="col-span-3">
                                <input type="text" className="w-full bg-transparent outline-none border-b border-transparent focus:border-gray-300 text-sm" style={{color: '#4a5c40'}} value={app.role} onChange={e => updateApp(app.id, 'role', e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <select className="border rounded-xl w-full text-xs font-semibold px-2 py-1.5 outline-none" style={{background: s.bg, color: s.color, borderColor: s.border}} value={app.status} onChange={e => updateApp(app.id, 'status', e.target.value)}>
                                    <option value="Applied">Applied</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer 🎉</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="col-span-2 flex flex-col gap-1.5">
                                <input type="date" className="text-xs outline-none bg-transparent border-b border-transparent hover:border-gray-300 pb-0.5 w-full" style={{color: '#6a8060'}} value={app.date} onChange={e => updateApp(app.id, 'date', e.target.value)} />
                                <input type="text" className="border rounded-lg px-2 py-1 text-xs outline-none" style={{borderColor: '#d0dcc8', background: '#f5f8f2', color: '#4a5c40'}} placeholder="Job URL" value={app.link} onChange={e => updateApp(app.id, 'link', e.target.value)} />
                            </div>
                            <div className="col-span-2 flex justify-center">
                                <button className="px-4 py-1.5 border rounded-xl text-xs font-semibold transition-all" style={{borderColor: '#e0b8b0', color: '#7a3028', background: '#fdf0ee'}} onClick={() => deleteApp(app.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}

                {filteredApps.length === 0 && (
                    <div className="px-5 py-10 text-center text-sm" style={{color: '#8a9e7e'}}>No applications yet. Cast your first seed 🌾</div>
                )}
            </div>

            <p className="mt-4 text-xs text-center font-medium" style={{color: '#8a9e7e'}}>
                🌻 Aim for 5–10 quality applications per week. Iteration is key.
            </p>
        </>
    )
}

export default Applications
