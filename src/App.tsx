import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Component/Button'
import CloseIcon from './Component/icons/Close'



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
      <div className="card bg-secondary">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="h-xxl text-primary">
        Click on the Vite and React logos to learn more
      </p>
      <Button variant="primary">Primary</Button>
      <Button variant="primary" leftIcon={<CloseIcon width={16} height={16} /> } rightIcon={<CloseIcon width={16} height={16} /> }>
        Save
      </Button>
      <Button leftIcon={<CloseIcon width={16} height={16} /> } >With left icon</Button>
      <Button iconOnly leftIcon={<CloseIcon width={16} height={16} /> } aria-label="Settings" />
    </>
  )
}

export default App
