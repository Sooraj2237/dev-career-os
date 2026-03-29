function Dashboard() {
    return (
    <>
        <div className="heading flex items-center justify-between mb-6">
            <div className="left-head">
                <h1>Dashboard</h1>
                <p>Current Streak 1 | Best 1 | Last check in 2026-03-29</p>
            </div>
            <div className="right-head">
                <button className="border rounded px-5 py-1">Check In</button>
            </div>
        </div>
        <hr />
        <div className="stats grid grid-cols-4 mt-6 gap-3">
            <div className="skills border rounded p-3 flex flex-col">
                <h2>Skills Completed</h2>
                <h4>0/4</h4>
                <p>0% at target</p>
            </div>
            <div className="projects border rounded p-3 flex flex-col">
                <h2>Projects Done</h2>
                <h4>0/1</h4>
                <p>0% Completed</p>
            </div>
            <div className="applications border rounded p-3 flex flex-col">
                <h2>Applications</h2>
                <h4>1</h4>
                <p>Offer 0 | Interview 0</p>
            </div>
            <div className="skill-level border rounded p-3 flex flex-col">
                <h2>Avg Skill Level</h2>
                <h4>2.5/5</h4>
                <p>Aim 4+ across core stack</p>
            </div>
        </div>
        <div className="bottom-split grid grid-cols-2 mt-8 gap-3">
            <div className="snapshot p-3 flex flex-col gap-3 border rounded">
                <h2>Pipeline Snapshot</h2>
                <div className="flex flex-wrap gap-2">
                    <span className="border px-3 py-1 text-sm rounded-full">Applied 1</span>
                    <span className="border px-3 py-1 text-sm rounded-full">Screening 0</span>
                    <span className="border px-3 py-1 text-sm rounded-full">Interview 0</span>
                    <span className="border px-3 py-1 text-sm rounded-full">Offer 0</span>
                    <span className="border px-3 py-1 text-sm rounded-full">Rejected 0</span>
                </div>
                <p>This is what makes your resume "real": consistent application + iteration</p>
            </div>
            <div className="updates flex flex-col gap-3 p-2 border rounded">
                <h1>Latest Updates</h1>
                <div className="flex justify-between p-2 items-center border rounded">
                    <div className="latest-project flex flex-col">
                        <p>Latest Project</p>
                        <h3>Weather Dashboard | In Progress</h3>
                    </div>
                    <button className="open-latest px-5 py-3 border rounded">Open</button>
                </div>
                <div className="flex justify-between p-2 items-center border rounded">
                    <div className="latest-project flex flex-col">
                        <p>Latest Note</p>
                        <h3>Interview Prep</h3>
                    </div>
                    <button className="open-latest px-5 py-3 border rounded">Open</button>
                </div>
                <div className="latest-project flex flex-col p-2  border rounded">
                    <p>Check-in Today</p>
                    <h3>No ❌</h3>
                </div>
            </div>
        </div>
    </>
    )
}

export default Dashboard