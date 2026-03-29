function Header() {
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
                <div className="right flex items-center gap-3">
                    <div className="Profile text-right">
                        <h1>Sooraj</h1>
                        <p>Role | Become a Finisher</p>
                    </div>
                    <div className="dp border p-4 rounded-full">
                        <h1>S</h1>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header