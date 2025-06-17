
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-700 to-blue-800 p-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate('/')} 
          className="mb-8 bg-white text-blue-900 hover:bg-gray-100"
        >
          ← Back to Home
        </Button>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
          <h1 className="text-5xl font-bold text-white mb-8">About Me</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Who I Am</h2>
              <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                Hello! I'm Aniket, a passionate full-stack developer from Gujarat, India. 
                I love creating digital experiences that make a difference in people's lives.
              </p>
              
              <h3 className="text-2xl font-bold text-white mb-4">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Frontend</h4>
                  <p className="text-gray-200 text-sm">React, TypeScript, Tailwind CSS, Next.js</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Backend</h4>
                  <p className="text-gray-200 text-sm">Node.js, Express, MongoDB, PostgreSQL</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Tools</h4>
                  <p className="text-gray-200 text-sm">Git, Docker, AWS, Firebase</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Design</h4>
                  <p className="text-gray-200 text-sm">Figma, Adobe XD, UI/UX Design</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">My Journey</h2>
              <div className="space-y-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white">2023 - Present</h4>
                  <h5 className="font-semibold text-gray-200">Senior Full-Stack Developer</h5>
                  <p className="text-gray-300 text-sm">Leading development of modern web applications</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white">2021 - 2023</h4>
                  <h5 className="font-semibold text-gray-200">Frontend Developer</h5>
                  <p className="text-gray-300 text-sm">Specialized in React and modern frontend technologies</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <h4 className="font-bold text-white">2019 - 2021</h4>
                  <h5 className="font-semibold text-gray-200">Computer Science Degree</h5>
                  <p className="text-gray-300 text-sm">Graduated with honors from Gujarat University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
