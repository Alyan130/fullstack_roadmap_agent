import { useEffect, useState } from 'react'
import './App.css'
import AgentLoader from './components/Loader'
import SidebarForm from './components/Sidebar-form'
import RoadmapTimeline from './components/Agent'
import Preview from './components/Preview'
import GenerateRoadmapButton from './components/generate_button'
import RoadmapGrid from './components/Agent'

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
  const [formSubmitted, setFormSubmitted]= useState<Boolean>(false)

  const learningPlan = {
    _id:"123",
    weekly_plan: [
      {
        week: 1,
        resource:
          {
            objective: "Python Basics",
            resource_type: "article",
            title: "Python Syntax Guide",
            url: "https://example.com/python-syntax"
          },
        },
        {
        week: 2,
        resource:
          {
            objective: "Deep Learning Fundamentals",
            resource_type: "interactive",
            title: "TensorFlow Playground",
            url: "https://example.com/tensorflow-play"
          },
        },
      {
        week: 3,
        resource:
          {
            objective: "LLM Architecture",
            resource_type: "research paper",
            title: "Attention Is All You Need",
            url: "https://example.com/attention-paper"
          },
        },
    ],
    week_per_skill: [
      { week: 1, objective: "Python Programming" },
      { week: 2, objective: "Deep Learning" },
      { week: 3, objective: "LLM Architecture" },
    ],
    skill_boost: [
      { name: "Machine Learning", confidence: 40 },
      { name: "LLMs", confidence: 30 },
      { name: "Python", confidence: 65 },
      { name: "Neural Networks", confidence: 35 }
    ]
  };
  
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
      <section className='w-full sm:w-[70%] mb-5  sm:mr-5'>
      <>
       {/* {formSubmitted ? <GenerateRoadmapButton/> :<Preview/>} */}
       <RoadmapGrid data={learningPlan}/>
      </>
      </section>
    </div>
    </main>
    
    </>
  )
}

export default App
