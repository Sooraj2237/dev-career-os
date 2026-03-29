import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Header/>
        <div className="flex flex-1">
          <div className="left-part w-48 flex-shrink-0">
            <Sidebar/>
          </div>
          <div className="right-part flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/skills" element={<h1 className="text-2xl font-bold">Skills Tracker Coming Soon...</h1>} />
              <Route path="/projects" element={<h1 className="text-2xl font-bold">Projects Portfolio Coming Soon...</h1>} />
              <Route path="/applications" element={<h1 className="text-2xl font-bold">Job Applications Coming Soon...</h1>} />
              <Route path="/notes" element={<h1 className="text-2xl font-bold">Notes Engine Coming Soon...</h1>} />
              <Route path="/settings" element={<h1 className="text-2xl font-bold">Settings Engine Coming Soon...</h1>} />
            </Routes>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
