import { useState } from 'react'
import './App.css'
import AgentLoader from './components/Loader'
import SidebarForm from './components/Sidebar-form'
import Preview from './components/Preview'


function App() {
  const [submiting , isSubmiting] = useState<Boolean>(false)
  return (
    <>
    <main className='max-w-7xl min-h-screen bg-[#020617]'>
    <div className='w-full sm:grid sm:grid-cols-12 '>
      <aside className='w-full col-start-1 col-end-4'>
       <SidebarForm 
       submiting={submiting}
       isSubmiting={isSubmiting}
       />
      </aside>
      <section className='w-full col-start-5 col-end-12 mb-5'>
      <>
       {submiting ? <AgentLoader/> : <Preview/> }
      </>
      </section>
    </div>
    </main>
    </>
  )
}

export default App
