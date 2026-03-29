import { useState, useEffect } from "react"

function PageHeader({title}) {
    const defaultStreak = {current: 0, best: 0, lastCheckIn: 'Never'}
    
    const [streak, setStreak] = useState(defaultStreak)
    const today = new Date().toISOString().split('T')[0]
    const isCheckedIn = (streak.lastCheckIn === today)

    useEffect(() => {
        const saveStreak = localStorage.getItem('devOS_streak')
        if (saveStreak) {
            setStreak(JSON.parse(saveStreak))
        }
    }, [])

    const checkIn = () => {
        if (isCheckedIn) {
            return;
        }

        let newStreak = {...streak}

        const newDate = new Date()
        newDate.setDate(newDate.getDate() - 1)
        const yesterday = newDate.toISOString().split('T')[0]

        if (streak.lastCheckIn === yesterday) {
            newStreak.current += 1
        } else {
            newStreak.current = 1
        }

        if (newStreak.current > newStreak.best) {
            newStreak.best = newStreak.current
        }

        newStreak.lastCheckIn = today

        setStreak(newStreak)
        localStorage.setItem('devOS_streak', JSON.stringify(newStreak))
    }

    return (
    <>
        <div className="heading flex items-center justify-between mb-6">
            <div className="left-head">
                <h1>{title}</h1>
                <p>Current Streak {streak.current} | Best {streak.best} | Last check in {streak.lastCheckIn}</p>
            </div>
            <div className="right-head">
                {!isCheckedIn && (
                    <button className="border rounded px-5 py-1 cursor-pointer" onClick={checkIn}>Daily Check-in</button>
                )}
                {isCheckedIn && (
                    <button className="border rounded px-5 py-1">Checked In ✅</button>
                )}
            </div>
        </div>
        <hr />
    </>
    )
}

export default PageHeader