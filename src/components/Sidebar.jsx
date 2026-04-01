import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation()

    const links = [
        { to: "/", label: "Dashboard", icon: "🏡" },
        { to: "/skills", label: "Skills", icon: "🌱" },
        { to: "/projects", label: "Projects", icon: "🪵" },
        { to: "/applications", label: "Applications", icon: "📋" },
        { to: "/notes", label: "Notes", icon: "🍃" },
        { to: "/settings", label: "Settings", icon: "⚙️" },
    ]

    return (
        <div className="flex flex-col min-h-screen border-r px-3 py-5" style={{background: 'rgba(240,237,230,0.7)', borderColor: '#d6cfc4'}}>
            <ul className="flex flex-col gap-1 w-full">
                {links.map(link => {
                    const isActive = location.pathname === link.to
                    return (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                style={isActive
                                    ? {background: 'linear-gradient(90deg, #ddebd5 0%, #d4e6cc 100%)', color: '#3a5c32', borderLeft: '3px solid #6b8f5e'}
                                    : {color: '#5a7060', borderLeft: '3px solid transparent'}
                                }
                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#eaf2e6' }}
                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                            >
                                <span className="text-base">{link.icon}</span>
                                {link.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="mt-auto mx-1 px-4 py-3 rounded-xl text-xs leading-relaxed" style={{background: '#e8f0e2', color: '#6a8060'}}>
                🌤️ Check in daily to grow your streak.
            </div>
        </div>
    )
}

export default Sidebar
