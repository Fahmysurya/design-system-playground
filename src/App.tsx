import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card bg-secondary p-6 rounded-lg">
        <button 
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="h-xxl text-primary mt-6">
        Click on the Vite and React logos to learn more
      </p>
      
      {/* Demo berbagai penggunaan custom colors */}
      <div className="mt-8 space-y-4">
        <div className="bg-primary text-white p-4 rounded">
          Background Primary (#F85306)
        </div>
        <div className="bg-secondary text-black p-4 rounded">
          Background Secondary (#F4B400)
        </div>
        <div className="border-2 border-primary p-4 rounded">
          Border Primary
        </div>
        <div className="text-secondary font-semibold">
          Text Secondary Color
        </div>
      </div>
    </>
  )
}

export default App
