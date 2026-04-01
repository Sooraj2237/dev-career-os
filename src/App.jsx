import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Applications from './components/Applications'
import Notes from './components/Notes'
import Settings from './components/Settings'

function App() {
  return (
    <div className="min-h-screen font-sans flex flex-col" style={{background: 'linear-gradient(160deg, #f5f0e8 0%, #eef2eb 40%, #f0ede6 100%)', backgroundAttachment: 'fixed'}}>
      <Header />
      <div className="flex flex-1">
        <div className="w-52 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
