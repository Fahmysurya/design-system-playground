import React from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Design System Playground</h1>
        <p>Button Component Testing</p>
        
        <div className="space-y-6 ">
          {/* Button Variants */}
          <div className='gap-3'>
            <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>

          {/* Buttons with Icons */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Buttons with Icons</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" iconLeft="➕">Add Item</Button>
              <Button variant="secondary" iconRight="➡️">Next Step</Button>
              <Button variant="tertiary" iconLeft="🔍">Search</Button>
              <Button variant="stroke" iconRight="📋">Copy</Button>
              <Button variant="danger" iconLeft="🗑️">Delete</Button>
            </div>
          </section>

          {/* Icon Only Buttons */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Icon Only Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" iconOnly>➕</Button>
              <Button variant="secondary" iconOnly>➡️</Button>
              <Button variant="tertiary" iconOnly>🔍</Button>
              <Button variant="stroke" iconOnly>📋</Button>
              <Button variant="danger" iconOnly>🗑️</Button>
            </div>
          </section>

          {/* Interactive Testing */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Interactive Testing</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => alert('Primary clicked!')}>
                Click Me
              </Button>
              <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
                Secondary Click
              </Button>
              <Button variant="danger" onClick={() => alert('Danger clicked!')}>
                Delete Action
              </Button>
            </div>
          </section>
        </div>
      </header>
    </div>
  )
}

export default App
