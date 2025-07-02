import { useEffect, useState } from 'react'
import './App.css'
import AgentLoader from './components/Loader'
import SidebarForm from './components/Sidebar-form'
import Preview from './components/Preview'
import RoadmapTimeline from './components/Agent'
import Barchart from './components/barchart'
import Piechart from './components/pieChart'

export interface Resource {
  resource_type: string
  title: string
  url: string
  thumbnail?: string
}

export interface WeeklyPlan {
  week: number
  resource: Resource
}

export interface WeekPerSkill {
  week: number
  objective: string
}

export interface SkillBoost {
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
  const [submiting , isSubmiting] = useState<Boolean>(false);
  const [data, setData] = useState<Roadmap | null>(null)
  const [loading, setLoading] = useState<Boolean>(false);


  useEffect(()=>{
    const fetchRoadmap = async () => {
      try{
      setLoading(true)
      const res = await fetch("http://127.0.0.1:8000/learning-roadmap/latest")
      const data = await res.json()
      const roadMapData:Roadmap = data.data
      setData(roadMapData)
      console.log(roadMapData);
      }catch(error){
        console.log("Error fetching roadmap data",error);
      }finally{
        setLoading(false)
      }
    }
    fetchRoadmap()
  },[])

  return (
    <>
    <main className='max-w-7xl min-h-screen bg-[#020617]'>
    <div className='w-full sm:grid sm:grid-cols-12 '>
      <aside className='w-full col-start-1 col-end-4 ml-2'>
       <SidebarForm 
       submiting={submiting}
       isSubmiting={isSubmiting}
       />
      </aside>
      <section className='w-full col-start-5 col-end-12 mb-5'>
      <>
       {submiting ? <AgentLoader/> : <RoadmapTimeline data={data}/>}
    
      </>
      </section>
    </div>
    </main>
    </>
  )
}

export default App
