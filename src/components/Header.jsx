import { useEffect, useState } from "react"

function Header() {
    const defaultProfile = {name: 'Sooraj', role: 'Role', goal: 'Become a Finisher'}
        
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(defaultProfile)

    useEffect(() => {
        const saveData = localStorage.getItem('devOS_profile')
        if (saveData) {
            setProfile(JSON.parse(saveData))
        }
    }, [])

    const handleChange = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value})
    }
    
    const saveProfile = () => {
        localStorage.setItem('devOS_profile', JSON.stringify(profile))
        setIsEditing(false)
    }

    const cancelProfile = () => {
        const saveData = localStorage.getItem('devOS_profile')
        if (saveData) {
            setProfile(JSON.parse(saveData))
        } else {
            setProfile(defaultProfile)
        }
        setIsEditing(false)
    }

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-white border-b">
                <div className="left flex items-center gap-3">
                    <div className="logo border p-3 rounded-lg">
                        <h1>OS</h1>
                    </div>
                    <div className="Site">
                        <h2>Developer Career OS</h2>
                        <p>Track Skills | Projects | Applications | Streak</p>
                    </div>
                </div>
                <div className="right flex flex-col gap-3">
                    {!isEditing && (
                    <>
                    <div className="right-content flex items-center gap-3">
                        <div className="Profile text-right">
                            <h1>{profile.name}</h1>
                            <p>{profile.role} | Goal: {profile.goal}</p>
                        </div>
                        <div className="dp border p-4 rounded-full">
                            <h1>{profile.name[0].toUpperCase()}</h1>
                        </div>
                    </div>
                    <div className="right-buttons fit-content ml-auto">
                        <button className="px-3 py-1 border rounded-md cursor-pointer" onClick={()=>setIsEditing(true)}>Edit</button>
                    </div>
                    </>
                    )}
                    {isEditing && (
                    <>
                    <div className="edit-form flex flex-col gap-2">
                        <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleChange} className="border p-1 rounded"/>
                        <input type="text" name="role" placeholder="Role" value={profile.role} onChange={handleChange} className="border p-1 rounded"/>
                        <input type="text" name="goal" placeholder="Goal" value={profile.goal} onChange={handleChange} className="border p-1 rounded"/>
                        <div className="right-buttons fit-content ml-auto flex gap-2">
                            <button onClick={saveProfile} className="px-3 py-1 border rounded-md cursor-pointer">Save</button>
                            <button onClick={cancelProfile} className="px-3 py-1 border rounded-md cursor-pointer">Cancel</button>
                        </div>
                    </div>
                    </>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header