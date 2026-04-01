import { useState, useEffect } from "react"

function PageHeader({title}) {
    const defaultStreak = {current: 0, best: 0, lastCheckIn: 'Never'}

    const [streak, setStreak] = useState(defaultStreak)
    const today = new Date().toISOString().split('T')[0]
    const isCheckedIn = (streak.lastCheckIn === today)

    useEffect(() => {
        const saveStreak = localStorage.getItem('devOS_streak')
        if (saveStreak) setStreak(JSON.parse(saveStreak))
    }, [])

    const checkIn = () => {
        if (isCheckedIn) return
        let newStreak = {...streak}
        const newDate = new Date()
        newDate.setDate(newDate.getDate() - 1)
        const yesterday = newDate.toISOString().split('T')[0]
        if (streak.lastCheckIn === yesterday) newStreak.current += 1
        else newStreak.current = 1
        if (newStreak.current > newStreak.best) newStreak.best = newStreak.current
        newStreak.lastCheckIn = today
        setStreak(newStreak)
        localStorage.setItem('devOS_streak', JSON.stringify(newStreak))
    }

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-black tracking-tight" style={{color: '#2d3a28'}}>{title}</h1>
                    <p className="text-xs mt-0.5 font-medium" style={{color: '#8a9e7e'}}>
                        🔥 Streak {streak.current} &nbsp;·&nbsp; Best {streak.best} &nbsp;·&nbsp; Last check-in {streak.lastCheckIn}
                    </p>
                </div>
                {!isCheckedIn ? (
                    <button
                        onClick={checkIn}
                        className="px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
                        style={{background: 'linear-gradient(135deg, #6b8f5e 0%, #4a7260 100%)', color: '#f5f0e8'}}
                    >
                        Daily Check-in
                    </button>
                ) : (
                    <button
                        className="px-5 py-2 rounded-xl text-sm font-bold border"
                        style={{background: '#e8f0e2', borderColor: '#b8d4ac', color: '#4a7260'}}
                    >
                        Checked In ✅
                    </button>
                )}
            </div>
            <hr className="mb-6" style={{borderColor: '#d6cfc4'}} />
        </>
    )
}

export default PageHeader
