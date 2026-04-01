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

    useEffect(() => { loadExportData() }, [])

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
            <div className="mb-6">
                <h2 className="text-lg font-bold" style={{color: '#2d3a28'}}>Settings</h2>
                <p className="text-sm mt-1" style={{color: '#7a8c6e'}}>Data is saved locally in your browser. Export or import your JSON backup below.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 border rounded-2xl p-6 shadow-sm flex flex-col gap-4" style={{borderColor: '#cddcc5', background: '#fafcf8'}}>
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold" style={{color: '#2d3a28'}}>Export / Import Data</h3>
                        <div className="flex gap-3">
                            <button onClick={loadExportData} className="text-sm font-bold px-4 py-1.5 rounded-xl border transition-all" style={{borderColor: '#b8cca8', color: '#4a7260', background: '#eaf2e4'}}>Export JSON</button>
                            <button onClick={handleImport} className="text-sm font-bold px-4 py-1.5 rounded-xl border transition-all" style={{borderColor: '#c8d4be', color: '#2d3a28', background: '#f0f5ec'}}>Import JSON</button>
                        </div>
                    </div>
                    <textarea
                        className="w-full h-[500px] p-4 rounded-xl font-mono text-xs outline-none resize-none border"
                        style={{borderColor: '#d0dcc8', background: '#f5f8f2', color: '#3a4e30'}}
                        value={jsonText}
                        onChange={e => setJsonText(e.target.value)}
                        spellCheck="false"
                    />
                </div>

                <div className="border rounded-2xl p-6 shadow-sm flex flex-col items-start h-fit" style={{borderColor: '#e8c8c0', background: '#fdf8f6'}}>
                    <h3 className="font-bold mb-2" style={{color: '#2d3a28'}}>Danger Zone</h3>
                    <p className="text-sm mb-6" style={{color: '#8a6e68'}}>
                        This clears all localStorage data for this app. This action cannot be undone.
                    </p>
                    <button onClick={handleReset} className="text-sm font-bold px-5 py-2 rounded-xl border transition-all" style={{borderColor: '#e0b8b0', color: '#7a3028', background: '#fdf0ee'}}>
                        Reset All Data
                    </button>
                </div>
            </div>
        </>
    )
}

export default Settings
