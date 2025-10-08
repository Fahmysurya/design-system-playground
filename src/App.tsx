import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Component/Action & Input/Button'
import CloseIcon from './Component/icons/Close'
import TextInput from './Component/Action & Input/Textinput'
import Select from './Component/Action & Input/Select'
import DropdownMenu from './Component/Action & Input/Dropdown_menu'



function App() {
  const [count, setCount] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tags,setTags] = useState<string[]>([])

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
      <div className='gap-2 flex '>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary" leftIcon={<CloseIcon width={16} height={16} /> } rightIcon={<CloseIcon width={16} height={16} /> }>
          Save
        </Button>
        <Button variant='tertiary' leftIcon={<CloseIcon width={16} height={16} /> } >With left icon</Button>
        <Button variant='stroke' iconOnly leftIcon={<CloseIcon width={16} height={16} /> } aria-label="Settings" />
        <Button variant="danger">danger</Button>
      </div>

    <div className='gap-2 flex flex-col mt-2'>
      <TextInput placeholder='Enter your fullname'/>
      <TextInput 
        label='Email'
        type='number'
        placeholder='Enter your active email'
      />
      <Select
        variant='multiple'
        placeholder='Can select more than 1'
        options={[
          { label: 'Tag 1', value: 'tag1' },
          { label: 'Tag 2', value: 'tag2' },
          { label: 'Tag 3', value: 'tag3' }
        ]}
        value={selectedTags}
        onChange={(value) => {
          // Ensure value is always string[]
          setSelectedTags(Array.isArray(value) ? value : [value]);
        }}
      />
      <DropdownMenu
        label='Button'
        items={[{ id: '1',label: 'Option'}, { id: '2', label: 'Option '}]}
        align='start'
      />
      <DropdownMenu
        label="Tags"
        menuType="checkbox"
        align='end'
        items={[
          { id: 'tag-1', label: 'Tag 1' },
          { id: 'tag-2', label: 'Tag 2' },
          { id: 'tag-3', label: 'Tag 3' },
        ]}
        value={tags}
        onChange={(next) => setTags(next as string[])}
      />
    </div>
      
    </>
  )
}

export default App
