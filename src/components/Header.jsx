import { useEffect, useState } from "react"

function Header() {
    const defaultProfile = {name: 'Sooraj', role: 'Role', goal: 'Become a Finisher'}

    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState(defaultProfile)

    useEffect(() => {
        const saveData = localStorage.getItem('devOS_profile')
        if (saveData) setProfile(JSON.parse(saveData))
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
        if (saveData) setProfile(JSON.parse(saveData))
        else setProfile(defaultProfile)
        setIsEditing(false)
    }

    return (
        <header className="flex justify-between items-center px-7 py-4 border-b" style={{background: 'rgba(245,240,232,0.92)', borderColor: '#d6cfc4', backdropFilter: 'blur(8px)'}}>
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl text-lg" style={{background: 'linear-gradient(135deg, #6b8f5e 0%, #4a7260 100%)', color: '#f0f5ee'}}>
                    🌿
                </div>
                <div>
                    <h2 className="font-bold text-base tracking-tight" style={{color: '#2d3a28'}}>Developer Career OS</h2>
                    <p className="text-xs tracking-wide" style={{color: '#7a8c6e'}}>Track Skills · Projects · Applications · Streak</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
                {!isEditing && (
                    <>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <h1 className="font-bold text-sm" style={{color: '#2d3a28'}}>{profile.name}</h1>
                                <p className="text-xs" style={{color: '#7a8c6e'}}>{profile.role} · {profile.goal}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base" style={{background: 'linear-gradient(135deg, #a3b899 0%, #6b8f5e 100%)', color: '#f5f0e8'}}>
                                {profile.name[0].toUpperCase()}
                            </div>
                        </div>
                        <button className="text-xs font-semibold px-3 py-1 rounded-lg border transition-all" style={{borderColor: '#b8c9b0', color: '#5a7a50', background: '#f0f5ee'}} onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                )}
                {isEditing && (
                    <div className="flex flex-col gap-2">
                        <input type="text" name="name" placeholder="Name" value={profile.name} onChange={handleChange} className="border rounded-lg px-3 py-1.5 text-sm outline-none" style={{borderColor: '#c8d8c0', background: '#f8fbf6', color: '#2d3a28'}} />
                        <input type="text" name="role" placeholder="Role" value={profile.role} onChange={handleChange} className="border rounded-lg px-3 py-1.5 text-sm outline-none" style={{borderColor: '#c8d8c0', background: '#f8fbf6', color: '#2d3a28'}} />
                        <input type="text" name="goal" placeholder="Goal" value={profile.goal} onChange={handleChange} className="border rounded-lg px-3 py-1.5 text-sm outline-none" style={{borderColor: '#c8d8c0', background: '#f8fbf6', color: '#2d3a28'}} />
                        <div className="flex gap-2 ml-auto">
                            <button onClick={saveProfile} className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-all" style={{background: '#6b8f5e', color: '#f5f0e8'}}>Save</button>
                            <button onClick={cancelProfile} className="text-xs font-semibold px-4 py-1.5 rounded-lg border transition-all" style={{borderColor: '#c8d8c0', color: '#5a7a50', background: '#f0f5ee'}}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
