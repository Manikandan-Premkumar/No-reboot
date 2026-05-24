import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import ConfigCard from './components/ConfigCard'




function App() {
  const [configs, setConfigs] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] =useState('')
  const [password, setPassword] =useState('')

  

async function updateValue(key, newValue) {
  try {

    const token =
      localStorage.getItem('token')

    await axios.put(
      `http://localhost:3000/api/v1/config/${key}`,
      {
        value: newValue,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )

    console.log('Config updated')

    fetchConfigs()

  } catch (error) {
    console.error(error)
  }
}

async function fetchConfigs() {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.get(
      'http://localhost:3000/api/v1/config',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    setConfigs(response.data)
  } catch (error) {
    console.error(error)
  }
}

async function login() {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      {
        username,
        password,
      }
    )

    localStorage.setItem(
      'token',
      response.data.access_token
    )

    setIsLoggedIn(true)

    console.log('Logged in')

  } catch (error) {
    console.error(error)
    alert('Invalid credentials')
  }
}
useEffect(() => {
  if (isLoggedIn) {
    fetchConfigs()
  }
}, [isLoggedIn])


const analyticsEnabled = configs.some(
  c => c.key === 'ENABLE_ANALYTICS' && c.value === true
)

if (!isLoggedIn) {
  return (  
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <div className="
        bg-white
        p-10
        rounded-2xl
        shadow-md
        w-[400px]
      ">

        <h1 className="
          text-3xl
          font-bold
          text-center
        ">
          No Reboot
        </h1>

        <p className="
          text-gray-500
          text-center
          mt-2
        ">
          Config Management Login
        </p>

        <div className="mt-8">

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              p-3
              rounded-lg
            "
          />

          <button
            onClick={login}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-lg
              mt-6
            "
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
        <h2 className="text-3xl font-bold text-gray-800">
          Live Configurations
        </h2>

        <p className="text-gray-500 mt-2">
          Update configs without restarting services
        </p>

        <div className="grid gap-6 mt-8">
          {configs.map((config) => (
            <ConfigCard
              key={config.id}
              config={config}
              updateValue={updateValue}

            />
          ))}
          {
          
          analyticsEnabled && (
          <div className="
            bg-blue-100
            border
            border-blue-300
            rounded-2xl
            p-6
            mt-8
          ">

            <h2 className="
              text-2xl
              font-bold
            ">
              Analytics Dashboard
            </h2>

            <p className="
              mt-2
              text-gray-700
            ">
              Live analytics feature enabled
            </p>

            <div className="
              grid
              grid-cols-3
              gap-4
              mt-6
            ">

              <div className="
                bg-white
                p-4
                rounded-xl
                shadow
              ">
                Users: 1200
              </div>

              <div className="
                bg-white
                p-4
                rounded-xl
                shadow
              ">
                Requests: 32K
              </div>

              <div className="
                bg-white
                p-4
                rounded-xl
                shadow
              ">
                Errors: 12
              </div>

      </div>
    </div>
  )
}
        </div>
      </div>
    </div>

  
  )
}


export default App