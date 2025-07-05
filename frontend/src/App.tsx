import { useEffect, useState } from 'react'
import './App.css'
import AgentLoader from './components/Loader'
import SidebarForm from './components/Sidebar-form'
import RoadmapTimeline from './components/Agent'
import Preview from './components/Preview'
import GenerateRoadmapButton from './components/generate_button'

interface Resource {
  resource_type: string
  title: string
  url: string
  thumbnail?: string
}

interface WeeklyPlan {
  week: number
  resource: Resource
}

interface WeekPerSkill {
  week: number
  objective: string
}

interface SkillBoost {
  name: string
  confidence: number
}

export interface Roadmap {
  _id:string,
  weekly_plan: WeeklyPlan[]
  week_per_skill: WeekPerSkill[]
  skill_boost: SkillBoost[]
}

function App() {
  const [data, setData] = useState<Roadmap | null>(null)
  const [formSubmitted, setFormSubmitted]= useState<Boolean>(false)

  

  return (
    <>
    <main className='max-w-7xl min-h-screen bg-[#020617]'>
    <div className='w-full sm:grid sm:grid-cols-12 '>
      <aside className='w-full col-start-1 col-end-4 ml-2'>
       <SidebarForm 
       formSubmitted={formSubmitted}
       setFormSubmitted={setFormSubmitted}
       />
      </aside>
      <section className='w-full col-start-5 col-end-12 mb-5'>
      <>
       {formSubmitted ? <GenerateRoadmapButton/> :<Preview/>}
      </>
      </section>
    </div>
    </main>
    </>
  )
}

export default App
