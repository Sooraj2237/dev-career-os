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

    const deleteApp = (id) => {
        setApps(apps.filter(app => app.id !== id))
    }

    const updateApp = (id, field, val) => {
        setApps(apps.map(app => app.id === id ? { ...app, [field]: val } : app))
    }

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(query.toLowerCase()) || 
                              app.role.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = filterStatus === "All" || app.status === filterStatus;
        return matchesSearch && matchesStatus;
    })

    return (
        <>
            <PageHeader title="Applications"/>
            
            <div className="flex justify-between items-center mt-6">
                <div className="left-side font-bold text-xl">Application Pipeline</div>
                <div className="right-side flex flex-wrap gap-3">
                    <input type="text" className="p-1 border rounded w-40" placeholder="Search Company..." onChange={e => setQuery(e.target.value)} />
                    <select className="p-1 border rounded w-32" defaultValue="All" onChange={e => setFilterStatus(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button className="border rounded px-5 py-1 bg-gray-900 text-white" onClick={addApp}>+ Add</button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 p-4 mt-6 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-3">Company</div>
                <div className="col-span-3">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date / Link</div>
                <div className="col-span-2 text-center">Action</div>
            </div>

            <div className="flex flex-col">
                {filteredApps.map(app => (
                    <div key={app.id} className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 items-center">
                        <div className="col-span-3">
                            <input type="text" className="font-bold w-full bg-transparent focus:bg-white border-b border-transparent focus:border-gray-300 outline-none" value={app.company} onChange={e => updateApp(app.id, 'company', e.target.value)} />
                        </div>
                        <div className="col-span-3">
                            <input type="text" className="w-full bg-transparent focus:bg-white border-b border-transparent focus:border-gray-300 outline-none text-sm" value={app.role} onChange={e => updateApp(app.id, 'role', e.target.value)} />
                        </div>
                        <div className="col-span-2">
                            <select className="p-1 border rounded w-full text-sm bg-white" value={app.status} onChange={e => updateApp(app.id, 'status', e.target.value)}>
                                <option value="Applied">Applied</option>
                                <option value="Screening">Screening</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer 🎉</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex flex-col gap-1 text-sm">
                            <input type="date" className="text-gray-500 text-xs border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:bg-white bg-transparent outline-none w-full pb-1" value={app.date} onChange={e => updateApp(app.id, 'date', e.target.value)} />
                            <input type="text" className="w-full border rounded px-2 py-1 text-xs" placeholder="Job URL" value={app.link} onChange={e => updateApp(app.id, 'link', e.target.value)} />
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <button className="px-4 py-1 border border-red-200 text-red-500 hover:bg-red-50 rounded text-sm" onClick={() => deleteApp(app.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <p className="mt-4 text-sm text-gray-500 text-center font-medium">
                Aim for 5-10 quality applications per week. Iteration is key.
            </p>
        </>
    )
}

export default Applications