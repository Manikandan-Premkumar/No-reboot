import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import ConfigCard from './components/ConfigCard'

function App() {
  const [configs, setConfigs] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function fetchConfigs() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/config`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setConfigs(response.data)
    } catch (error) {
      console.error("Error fetching configs:", error)
    }
  }

  
  async function updateValue(key, newValue) {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/config/${key}`,
        { value: newValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('Config updated successfully')
      fetchConfigs()
    } catch (error) {
      console.error("Error updating config:", error)
    }
  }

  async function login() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { username, password }
      )

      if (response.data?.access_token) {
        localStorage.setItem('token', response.data.access_token)
        setIsLoggedIn(true)
        console.log('Logged in successfully')
      } else {
        alert('Authentication failed: No access token returned.')
      }
    } catch (error) {
      console.error("Login error:", error)
      alert('Invalid credentials or server unreachable')
    }
  }

 
  function logout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setConfigs([])
    setUsername('')
    setPassword('')
  }

  
  useEffect(() => {
    if (isLoggedIn) {
      fetchConfigs()
    }
  }, [isLoggedIn])

  
  const analyticsEnabled = configs.some(
    c => c.key === 'ENABLE_ANALYTICS' && c.value === 'true'
  )

  if (!isLoggedIn) {
    return (  
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-md w-[400px]">
          <h1 className="text-3xl font-bold text-center">No Reboot</h1>
          <p className="text-gray-500 text-center mt-2">Config Management Login</p>

          <div className="mt-8">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={login}
              className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

 
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Live Configurations</h2>
            <p className="text-gray-500 mt-2">Update configs without restarting services</p>
          </div>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition shadow-sm"
          >
            Logout
          </button>
        </div>

       
        <div className="grid gap-6 mt-8">
          {configs.map((config) => (
            <ConfigCard
              key={config.id || config.key}
              config={config}
              updateValue={updateValue}
            />
          ))}
        </div>

        
        {analyticsEnabled && (
          <div className="bg-blue-100 border border-blue-300 rounded-2xl p-6 mt-8 shadow-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-900">Analytics Dashboard</h2>
            <p className="mt-2 text-blue-700">Live analytics feature tracking enabled</p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl shadow-sm font-semibold text-gray-700">
                Users: 1,200
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm font-semibold text-gray-700">
                Requests: 32K
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm font-semibold text-gray-700">
                Errors: 12
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App