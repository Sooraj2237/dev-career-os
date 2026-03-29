import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar flex flex-col items-center bg-white border-r min-h-screen">
            <ul className="mr-auto w-full p-4">
                <li className="mb-2"><Link to="/" className="block px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold text-gray-700">Dashboard</Link></li>
                <li className="mb-2"><Link to="/skills" className="block px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold text-gray-700">Skills</Link></li>
                <li className="mb-2"><Link to="/projects" className="block px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold text-gray-700">Projects</Link></li>
                <li className="mb-2"><Link to="/applications" className="block px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold text-gray-700">Applications</Link></li>
                <li className="mb-2"><Link to="/notes" className="block px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold text-gray-700">Notes</Link></li>
                <li className="mb-2"><Link to="/settings" className="block px-6 py-3 border rounded-lg hover:bg-gray-50 font-semibold text-gray-700">Settings</Link></li>
                <li className="mt-8 px-6 py-3 text-sm text-gray-500 bg-gray-50 rounded-lg">Tip: Check in daily to build your streak.</li>
            </ul>
        </div>
    );
}

export default Sidebar;