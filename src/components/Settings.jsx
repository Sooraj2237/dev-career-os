import { useState, useEffect } from "react"
import PageHeader from "./PageHeader"

function Settings() {
    const [jsonText, setJsonText] = useState("")

    const loadExportData = () => {
        const allData = {
            profile: JSON.parse(localStorage.getItem('devOS_profile')) || { name: "Dev", role: "Software Engineer", goal: "Get a job in 2026" },
            streak: JSON.parse(localStorage.getItem('devOS_streak')) || { current: 0, best: 0, lastCheckIn: "Never" },
            skills: JSON.parse(localStorage.getItem('devOS_skills')) || [],
            projects: JSON.parse(localStorage.getItem('devOS_projects')) || [],
            apps: JSON.parse(localStorage.getItem('devOS_apps')) || [],
            notes: JSON.parse(localStorage.getItem('devOS_notes')) || []
        }
        setJsonText(JSON.stringify(allData, null, 2)) 
    }
    
    useEffect(() => {
        loadExportData()
    }, [])

    const handleImport = () => {
        try {
            const parsed = JSON.parse(jsonText)
            if (parsed.profile) localStorage.setItem('devOS_profile', JSON.stringify(parsed.profile))
            if (parsed.streak) localStorage.setItem('devOS_streak', JSON.stringify(parsed.streak))
            if (parsed.skills) localStorage.setItem('devOS_skills', JSON.stringify(parsed.skills))
            if (parsed.projects) localStorage.setItem('devOS_projects', JSON.stringify(parsed.projects))
            if (parsed.apps) localStorage.setItem('devOS_apps', JSON.stringify(parsed.apps))
            if (parsed.notes) localStorage.setItem('devOS_notes', JSON.stringify(parsed.notes))
            
            alert("✅ Data imported successfully!")
            window.location.reload()
        } catch (error) {
            alert("❌ Invalid JSON format. Please check for missing brackets or commas.")
        }
    }

    const handleReset = () => {
        const confirmDelete = window.confirm("⚠️ ARE YOU SURE? This will permanently delete all your skills, projects, applications, and notes. This cannot be undone.")
        
        if (confirmDelete) {
            localStorage.removeItem('devOS_profile')
            localStorage.removeItem('devOS_streak')
            localStorage.removeItem('devOS_skills')
            localStorage.removeItem('devOS_projects')
            localStorage.removeItem('devOS_apps')
            localStorage.removeItem('devOS_notes')
            
            alert("💥 All data has been wiped.")
            window.location.reload()
        }
    }

    return (
        <>
            <PageHeader title="Settings" />
            <div className="mt-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Data is saved locally in your browser. You can export/import JSON.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border border-gray-200 bg-white rounded-xl p-5 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Export / Import</h3>
                        <div className="flex gap-3">
                            <button 
                                onClick={loadExportData}
                                className="bg-indigo-50 text-indigo-700 font-bold px-4 py-1.5 rounded-lg text-sm border border-indigo-100 hover:bg-indigo-100 transition"
                            >
                                Export JSON
                            </button>
                            <button 
                                onClick={handleImport}
                                className="bg-gray-50 text-gray-700 font-bold px-4 py-1.5 rounded-lg text-sm border border-gray-200 hover:bg-gray-100 transition"
                            >
                                Import JSON
                            </button>
                        </div>
                    </div>
                    <textarea 
                        className="w-full h-[500px] p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-xs text-gray-700 focus:outline-blue-500 focus:bg-white transition resize-none"
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                        spellCheck="false"
                    ></textarea>
                </div>
                <div className="border border-red-100 bg-white rounded-xl p-5 shadow-sm flex flex-col items-start h-fit">
                    <h3 className="font-bold text-gray-800 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        This clears localStorage data for this app.
                    </p>
                    <button 
                        onClick={handleReset}
                        className="bg-red-50 text-red-600 font-bold px-5 py-2 rounded-lg text-sm border border-red-100 hover:bg-red-100 hover:text-red-700 transition"
                    >
                        Reset All Data
                    </button>
                </div>

            </div>
        </>
    )
}

export default Settings