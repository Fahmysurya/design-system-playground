import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Component/Action & Input/Button'
import ButtonGroup from './Component/Action & Input/Button_group'
import ModalDialog from './Component/Messaging/Modal_dialog'
import CloseIcon from './Component/icons/Close'
import TextInput from './Component/Action & Input/Textinput'
import Select from './Component/Action & Input/Select'
import DropdownMenu from './Component/Action & Input/Dropdown_menu'



function App() {
  const [count, setCount] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tags,setTags] = useState<string[]>([])
  
  // Modal states
  const [modalStates, setModalStates] = useState({
    sizeDemo: false,
    headerDemo: false,
    footerDemo: false,
    noCloseDemo: false,
    fullDemo: false
  })

  const openModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: true }))
  }

  const closeModal = (modalName: keyof typeof modalStates) => {
    setModalStates(prev => ({ ...prev, [modalName]: false }))
  }

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

      {/* Button Group Examples */}
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-natural">Button Group Examples</h2>
        
        {/* 2 Button Group */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-natural">2 Button Group</h3>
          <ButtonGroup
            buttons={[
              { children: 'Cancel', variant: 'secondary' },
              { children: 'Save', variant: 'primary' }
            ]}
          />
        </div>

        {/* 3 Button Group */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-natural">3 Button Group</h3>
          <ButtonGroup
            buttons={[
              { children: 'Previous', variant: 'secondary' },
              { children: 'Next', variant: 'primary' },
              { children: 'Finish', variant: 'primary' }
            ]}
          />
        </div>



        {/* 3 Button Group - With Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-natural">3 Button Group (With Icons)</h3>
          <ButtonGroup
            buttons={[
              { children: 'Edit', leftIcon: <CloseIcon width={16} height={16} />, variant: 'primary' },
              { children: 'Copy', leftIcon: <CloseIcon width={16} height={16} />, variant: 'secondary' },
              { children: 'Delete', leftIcon: <CloseIcon width={16} height={16} />, variant: 'danger' }
            ]}
          />
        </div>

      </div>

      {/* Modal Dialog Examples */}
      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-semibold text-natural">Modal Dialog Examples</h2>
        
        {/* Modal Size Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-natural">Modal Sizes</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => openModal('sizeDemo')}>
              Show Size Demo
            </Button>
          </div>
        </div>

        {/* Header Variant Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-natural">Header Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => openModal('headerDemo')}>
              Show Header Demo
            </Button>
            <Button variant="tertiary" onClick={() => openModal('noCloseDemo')}>
              No Close Button
            </Button>
          </div>
        </div>

        {/* Footer Variant Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-natural">Footer Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => openModal('footerDemo')}>
              Show Footer Demo
            </Button>
          </div>
        </div>

        {/* Complete Modal Example */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-natural">Complete Modal Example</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => openModal('fullDemo')}>
              Show Complete Modal
            </Button>
          </div>
        </div>
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

      {/* Modal Components */}
      
      {/* Size Demo Modal */}
      <ModalDialog
        isOpen={modalStates.sizeDemo}
        onClose={() => closeModal('sizeDemo')}
        title="Modal Size Demo"
        size="large"
        rightButtons={[
          { children: 'Cancel', variant: 'secondary', onClick: () => closeModal('sizeDemo') },
          { children: 'Save', variant: 'primary', onClick: () => closeModal('sizeDemo') }
        ]}
      >
        <div className="space-y-4">
          <p className="text-natural">This modal demonstrates the large size variant.</p>
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-pink-300">
            <p className="text-gray-600 text-center">Content Area Placeholder</p>
            <p className="text-sm text-gray-500 text-center mt-2">
              This represents the main content area of the modal dialog.
              You can place any content here including forms, text, images, etc.
            </p>
          </div>
        </div>
      </ModalDialog>

      {/* Header Demo Modal */}
      <ModalDialog
        isOpen={modalStates.headerDemo}
        onClose={() => closeModal('headerDemo')}
        title="Header Variants Demo"
        size="medium"
        headerVariant="with-back"
        rightButton={{ 
          children: 'Continue', 
          variant: 'primary', 
          onClick: () => closeModal('headerDemo') 
        }}
        onBack={() => alert('Back button clicked!')}
      >
        <div className="space-y-4">
          <p className="text-natural">This modal shows the back and close button variant in the header.</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Try clicking the back arrow or the X button in the header.</p>
          </div>
        </div>
      </ModalDialog>

      {/* No Close Demo Modal */}
      <ModalDialog
        isOpen={modalStates.noCloseDemo}
        onClose={() => closeModal('noCloseDemo')}
        title="No Close Button Demo"
        size="medium"
        headerVariant="no-close"
        rightButton={{ 
          children: 'Got it!', 
          variant: 'primary', 
          onClick: () => closeModal('noCloseDemo') 
        }}
      >
        <div className="space-y-4">
          <p className="text-natural">This modal has no close button in the header.</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Notice there's no X button in the header. You can only close this modal by clicking the button below or pressing Escape.</p>
          </div>
        </div>
      </ModalDialog>

      {/* Footer Demo Modal */}
      <ModalDialog
        isOpen={modalStates.footerDemo}
        onClose={() => closeModal('footerDemo')}
        title="Footer Variants Demo"
        size="medium"
        footerVariant="left-right"
        leftButton={{ 
          children: 'Cancel', 
          variant: 'secondary', 
          onClick: () => closeModal('footerDemo') 
        }}
        rightButtons={[
          { children: 'Save Draft', variant: 'tertiary', onClick: () => alert('Draft saved!') },
          { children: 'Publish', variant: 'primary', onClick: () => closeModal('footerDemo') }
        ]}
      >
        <div className="space-y-4">
          <p className="text-natural">This modal demonstrates the left-right buttons footer variant.</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Notice how the buttons are arranged: one on the left, two on the right.</p>
          </div>
        </div>
      </ModalDialog>

      {/* Complete Modal Example */}
      <ModalDialog
        isOpen={modalStates.fullDemo}
        onClose={() => closeModal('fullDemo')}
        title="Complete Modal Example"
        size="x-large"
        rightButtons={[
          { children: 'Cancel', variant: 'secondary', onClick: () => closeModal('fullDemo') },
          { children: 'Save Changes', variant: 'primary', onClick: () => closeModal('fullDemo') }
        ]}
      >
        <div className="space-y-6">
          <p className="text-natural">This is a complete modal dialog example with all features:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-natural">Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-natural">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-natural">Message</label>
            <textarea 
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your message here..."
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-pink-300">
            <p className="text-gray-600 text-center">Large Content Area</p>
            <p className="text-sm text-gray-500 text-center mt-2">
              This demonstrates how the modal can handle larger content areas with forms, inputs, and other UI elements.
              The modal automatically adjusts its height based on the content.
            </p>
          </div>
        </div>
      </ModalDialog>
      
    </>
  )
}

export default App
