import { useState, useEffect } from "react"
import PageHeader from "./PageHeader"

function Skills() {

    const [skills, setSkills] = useState(() => {
        const savedSkills = localStorage.getItem('devOS_skills')
        return (savedSkills) ? JSON.parse(savedSkills) : []
    })

    const [query, setQuery] = useState("")

    useEffect(() => {
        localStorage.setItem('devOS_skills', JSON.stringify(skills))
    }, [skills])

    const addSkill = () => {
        const skillName = window.prompt("Enter Skill Name: ", "").trim()
        if (skillName != "") {
            const newSkill = {
                id: crypto.randomUUID(),
                name: skillName,
                level: 0,
                target: 5,
                notes: ""
            }
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
        const newLevel = current + increment
        if (newLevel > 5) newLevel = 5
        if (newLevel < 0) newLevel = 0
        updateSkill(id, 'level', newLevel)
    }

    const filteredSkills = skills.filter(skill => skill.name.toLowerCase().includes(query.toLowerCase()))

    return (
    <>
        <PageHeader title="Skills"/>
        <div className="flex justify-between items-center mt-6">
            <div className="left-side">
                <h2>Skills</h2>
            </div>
            <div className="right-side flex flex-wrap gap-3 text-center">
                <input type="text" name="skill-search" className="border rounded w-64 px-5 py-1" onChange={e => setQuery(e.target.value)} placeholder="Search for a Skill" />
                <button className="border rounded px-5 py-2" onClick={addSkill}>+ Add</button>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">Skill</div>
                    <div className="col-span-2">Level</div>
                    <div className="col-span-2">Target</div>
                    <div className="col-span-4">Notes</div>
                    <div className="col-span-1">Action</div>
        </div>
        {filteredSkills.map(skill => {
            return (
            <>
                <div key={skill.id} className="grid grid-cols-12 gap-4 p-4">
                    <div className="col-span-3 py-3">{skill.name}</div>
                    <div className="col-span-2 border rounded py-2 flex justify-evenly items-center">
                        <button className="border rounded text px-3 py-1" onClick={() => levelChange(skill.id, skill.level, -1)}>-</button>
                        <p>{skill.level}</p>
                        <button className="border rounded text px-3 py-1" onClick={() => levelChange(skill.id, skill.level, +1)}>+</button>
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <select className="border rounded w-full px-3" value={skill.target} onChange={(e) => updateSkill(skill.id, 'target', parseInt(e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="col-span-4 flex justify-center">
                        <input type="text" name="notes" className="border rounded w-full px-3" placeholder="What's next?" value={skill.notes} onChange={(e) => updateSkill(skill.id, 'notes', e.target.value)}/>
                    </div>
                    <div className="col-span-1 flex justify-center">
                        <button className="border rounded w-full" onClick={() => deleteSkill(skill.id)}>Delete</button>
                    </div>
                </div>
            </>
            )
        })}
        <p className="mt-4 text-sm text-gray-500 font-medium">
            Rule: Target 4/5 on core stack + be able to explain decisions.
        </p>
    </>
    )
}

export default Skills