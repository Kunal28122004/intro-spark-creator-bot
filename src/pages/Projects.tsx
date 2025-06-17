
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 p-8">
      <div className="max-w-6xl mx-auto">
        <Button 
          onClick={() => navigate('/')} 
          className="mb-8 bg-white text-blue-900 hover:bg-gray-100"
        >
          ← Back to Home
        </Button>
        
        <h1 className="text-5xl font-bold text-white mb-12">My Projects</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">E-Commerce Platform</h3>
            <p className="text-gray-200 mb-4">Full-stack e-commerce solution with React, Node.js, and MongoDB</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Node.js</span>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">MongoDB</span>
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-gray-100">View Project</Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Task Management App</h3>
            <p className="text-gray-200 mb-4">Modern task management with real-time collaboration features</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Firebase</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">TypeScript</span>
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-gray-100">View Project</Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Weather Dashboard</h3>
            <p className="text-gray-200 mb-4">Beautiful weather app with advanced forecasting and maps</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">API Integration</span>
              <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm">Chart.js</span>
            </div>
            <Button className="w-full bg-white text-blue-900 hover:bg-gray-100">View Project</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
