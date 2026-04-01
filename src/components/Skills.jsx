import { useState, useEffect } from "react"
import PageHeader from "./PageHeader"

function Skills() {
    const [skills, setSkills] = useState(() => {
        const savedSkills = localStorage.getItem('devOS_skills')
        return savedSkills ? JSON.parse(savedSkills) : []
    })
    const [query, setQuery] = useState("")

    useEffect(() => {
        localStorage.setItem('devOS_skills', JSON.stringify(skills))
    }, [skills])

    const addSkill = () => {
        const skillName = window.prompt("Enter Skill Name: ", "").trim()
        if (skillName != "") {
            const newSkill = { id: crypto.randomUUID(), name: skillName, level: 0, target: 5, notes: "" }
            setSkills([...skills, newSkill])
        }
    }

    const deleteSkill = (id) => {
        setSkills(skills.filter(skill => skill.id != id))
    }

    const updateSkill = (id, field, val) => {
        setSkills(skills.map(skill => skill.id === id ? {...skill, [field]: val} : skill))
    }

    const levelChange = (id, current, increment) => {
        let newLevel = current + increment
        if (newLevel > 5) newLevel = 5
        if (newLevel < 0) newLevel = 0
        updateSkill(id, 'level', newLevel)
    }

    const filteredSkills = skills.filter(skill => skill.name.toLowerCase().includes(query.toLowerCase()))

    const levelDots = (level, target) => (
        <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="w-3 h-3 rounded-full border transition-all" style={{
                    background: i <= level ? (i <= target ? '#6b8f5e' : '#c8a060') : '#e0dbd2',
                    borderColor: i <= level ? (i <= target ? '#4a7260' : '#a07040') : '#ccc8c0'
                }}></div>
            ))}
        </div>
    )

    return (
        <>
            <PageHeader title="Skills" />
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-base" style={{color: '#2d3a28'}}>Skill Matrix</h2>
                <div className="flex gap-3">
                    <input type="text" className="border rounded-xl px-4 py-2 text-sm outline-none w-56" style={{borderColor: '#c8d4be', background: '#f8fbf6', color: '#2d3a28'}} onChange={e => setQuery(e.target.value)} placeholder="Search skills..." />
                    <button className="px-5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all" style={{background: 'linear-gradient(135deg, #6b8f5e 0%, #4a7260 100%)', color: '#f5f0e8'}} onClick={addSkill}>+ Add</button>
                </div>
            </div>

            <div className="rounded-2xl overflow-hidden border shadow-sm" style={{borderColor: '#cddcc5'}}>
                <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{background: '#e8f0e2', color: '#6a8060'}}>
                    <div className="col-span-3">Skill</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-2">Target</div>
                    <div className="col-span-4">Notes</div>
                    <div className="col-span-1">Action</div>
                </div>

                {filteredSkills.map((skill, idx) => (
                    <div key={skill.id} className="grid grid-cols-12 gap-4 px-5 py-4 items-center border-t transition-all" style={{borderColor: '#dde8d5', background: idx % 2 === 0 ? '#fafcf8' : '#f5f8f2'}}>
                        <div className="col-span-3">
                            <p className="font-semibold text-sm" style={{color: '#2d3a28'}}>{skill.name}</p>
                            <div className="mt-1.5">{levelDots(skill.level, skill.target)}</div>
                        </div>
                        <div className="col-span-2 flex items-center gap-2 rounded-xl px-2 py-1.5 border w-fit" style={{borderColor: '#c8d8c0', background: '#f0f5ee'}}>
                            <button className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-sm transition-all" style={{background: '#e0ebe0', color: '#3a5c32'}} onClick={() => levelChange(skill.id, skill.level, -1)}>−</button>
                            <p className="font-black text-base w-4 text-center" style={{color: '#2d3a28'}}>{skill.level}</p>
                            <button className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-sm transition-all" style={{background: '#6b8f5e', color: '#f5f0e8'}} onClick={() => levelChange(skill.id, skill.level, +1)}>+</button>
                        </div>
                        <div className="col-span-2">
                            <select className="border rounded-xl px-3 py-1.5 text-sm w-full outline-none" style={{borderColor: '#c8d8c0', background: '#f8fbf6', color: '#2d3a28'}} value={skill.target} onChange={(e) => updateSkill(skill.id, 'target', parseInt(e.target.value))}>
                                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div className="col-span-4">
                            <input type="text" className="border rounded-xl px-3 py-1.5 text-sm w-full outline-none" style={{borderColor: '#c8d8c0', background: '#f8fbf6', color: '#2d3a28'}} placeholder="What's next?" value={skill.notes} onChange={(e) => updateSkill(skill.id, 'notes', e.target.value)} />
                        </div>
                        <div className="col-span-1">
                            <button className="text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all w-full" style={{borderColor: '#e0b8b0', color: '#7a3028', background: '#fdf0ee'}} onClick={() => deleteSkill(skill.id)}>Delete</button>
                        </div>
                    </div>
                ))}

                {filteredSkills.length === 0 && (
                    <div className="px-5 py-10 text-center text-sm" style={{color: '#8a9e7e'}}>No skills yet. Start growing your tree 🌳</div>
                )}
            </div>
            <p className="mt-4 text-xs font-medium" style={{color: '#8a9e7e'}}>🌿 Rule: Target 4/5 on core stack + be able to explain decisions.</p>
        </>
    )
}

export default Skills
