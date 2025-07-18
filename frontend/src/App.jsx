import { useState } from 'react'
import './App.css'
import SidebarForm from './components/Sidebar-form'
import Preview from './components/Preview'
import GenerateRoadmapButton from './components/generate_button'


function App() {
  const [formSubmitted, setFormSubmitted]= useState(false)
  
  return (
    <>
    <main className='max-w-7xl min-h-screen bg-[#020617]'>
    <div className='w-full flex flex-row items-center justify-between'>
      <aside className='w-[25%] ml-2'>
       <SidebarForm 
       formSubmitted={formSubmitted}
       setFormSubmitted={setFormSubmitted}
       />
      </aside>
      <section className='w-full sm:w-[70%] mb-5  sm:mr-5 sm:px10 sm:pb-4'>
      <>
       {formSubmitted ? <GenerateRoadmapButton/> : <Preview/>}
      </>
      </section>
    </div>
    </main>
    
    </>
  )
}

export default App
