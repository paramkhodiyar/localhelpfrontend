import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors tracking-tight"
          >
            Local Help
          </Link>
          <nav className="flex items-center gap-4">
            <Link 
              className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
              to="/login"
            >
              Login
            </Link>
            <Link 
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm transition"
              to="/signup"
            >
              Sign up
            </Link>
            <Link 
              className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
              to="/health"
            >
              Health
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 animate-fadeIn">
            Welcome to <span className="text-blue-600">Local Help</span>
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            A community platform where you can connect, support, and grow — together.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <Link 
              to="/login" 
              className="block rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
              <p className="text-gray-600">Access your account securely and stay connected.</p>
            </Link>

            <Link 
              to="/signup" 
              className="block rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign up</h2>
              <p className="text-gray-600">Join the community and start helping locally today.</p>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/70 backdrop-blur-md py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Local Help. All rights reserved.
      </footer>
    </div>
  )
}

export default App
