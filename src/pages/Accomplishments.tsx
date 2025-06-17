
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Accomplishments = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-700 to-pink-800 p-8">
      <div className="max-w-5xl mx-auto">
        <Button 
          onClick={() => navigate('/')} 
          className="mb-8 bg-white text-blue-900 hover:bg-gray-100"
        >
          ← Back to Home
        </Button>
        
        <h1 className="text-5xl font-bold text-white mb-12">Accomplishments</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">🏆 Awards & Recognition</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-bold text-white">Best Developer Award 2023</h4>
                <p className="text-gray-200">Recognized for outstanding contribution to team projects</p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-bold text-white">Innovation Excellence</h4>
                <p className="text-gray-200">Created breakthrough solutions for client challenges</p>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-bold text-white">Technical Leadership</h4>
                <p className="text-gray-200">Led successful migration to modern tech stack</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">📊 Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Projects Completed</span>
                <span className="text-2xl font-bold text-white">50+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Happy Clients</span>
                <span className="text-2xl font-bold text-white">30+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Code Commits</span>
                <span className="text-2xl font-bold text-white">2000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-200">Years Experience</span>
                <span className="text-2xl font-bold text-white">4+</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">🎓 Certifications</h3>
            <div className="space-y-3">
              <div className="bg-white/20 rounded p-3">
                <h4 className="font-bold text-white">AWS Certified Developer</h4>
                <p className="text-gray-200 text-sm">Amazon Web Services - 2023</p>
              </div>
              <div className="bg-white/20 rounded p-3">
                <h4 className="font-bold text-white">React Professional</h4>
                <p className="text-gray-200 text-sm">Meta Certification - 2022</p>
              </div>
              <div className="bg-white/20 rounded p-3">
                <h4 className="font-bold text-white">Full-Stack Specialist</h4>
                <p className="text-gray-200 text-sm">FreeCodeCamp - 2021</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">🌟 Impact</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white mb-2">Performance Improvements</h4>
                <p className="text-gray-200 text-sm">Optimized applications achieving 40% faster load times</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Cost Savings</h4>
                <p className="text-gray-200 text-sm">Reduced infrastructure costs by 30% through optimization</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">User Experience</h4>
                <p className="text-gray-200 text-sm">Improved user satisfaction scores by 25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accomplishments
