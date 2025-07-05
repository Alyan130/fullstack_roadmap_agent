import { Sparkles, ArrowRight, Loader2, CheckCircle, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Roadmap } from "@/App"
import AgentLoader from "./Loader"
import RoadmapGrid from "./Agent"

type ButtonState = "idle" | "loading" | "success"

export default function GenerateRoadmapButton() {
  const [buttonState, setButtonState] = useState<ButtonState>("idle")
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<Roadmap | null>(null)
  const [success , setSuccess] =useState<Boolean>(false)

  const handleClick = async () => {
        try{
        setLoading(true)
        const res = await fetch("http://127.0.0.1:8000/agent-working")
        const data = await res.json()
        const roadMapData:Roadmap = data.data
        setData(roadMapData)
        setSuccess(true)
        }catch(error){
          console.log("Error fetching roadmap data",error);
        }finally{
          setLoading(false)
        }
  }

  if(loading) return <AgentLoader/>
 
  // if(success) return <RoadmapGrid data={data}/>
 

  const buttonVariants = {
    idle: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(147, 51, 234, 0.25)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(147, 51, 234, 0.35)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15,
      },
    },
  }

  const contentVariants = {
    idle: { opacity: 1, y: 0 },
    loading: { opacity: 1, y: 0 },
    success: { opacity: 1, y: 0 },
  }

  const shimmerVariants = {
    animate: {
      x: [-100, 200],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-8">
      {/* Main Button */}
      <motion.button
        className={`
          relative overflow-hidden rounded-2xl px-8 py-4 min-w-[280px] h-16
          bg-gradient-to-r from-purple-600 to-blue-600 
          text-white font-semibold text-lg
          border-0 cursor-pointer
          disabled:cursor-not-allowed disabled:opacity-75
          focus:outline-none focus:ring-4 focus:ring-purple-300
        `}
    
        initial="idle"
        whileHover={buttonState === "idle" ? "hover" : "idle"}
        whileTap={buttonState === "idle" ? "tap" : "idle"}
        onClick={handleClick}
        disabled={buttonState !== "idle"}
      >
        {/* Shimmer Effect */}
        {buttonState === "idle" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-20 h-full"
         
            animate="animate"
          />
        )}

        {/* Button Content */}
        <motion.div className="flex items-center justify-center gap-3" variants={contentVariants} animate={buttonState}>
          <AnimatePresence mode="wait">
            {buttonState === "idle" && (
              <motion.div
                key="idle"
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="w-5 h-5" />
                <span>Generate My Roadmap</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}

            {buttonState === "loading" && (
              <motion.div
                key="loading"
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Your Roadmap...</span>
              </motion.div>
            )}

            {buttonState === "success" && (
              <motion.div
                key="success"
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Roadmap Generated!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        {buttonState === "loading" && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* Helper Text */}
      <motion.div
        className="mt-6 text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {buttonState === "idle" && (
            <motion.div
              key="idle-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="text-slate-700 font-medium">🚀 Get your personalized learning path in seconds</p>
              <p className="text-sm text-slate-500">
                Our AI will create a custom roadmap with tutorials, articles, and weekly plans
              </p>
            </motion.div>
          )}

          {buttonState === "loading" && (
            <motion.div
              key="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="text-slate-700 font-medium">🤖 AI is working its magic...</p>
              <p className="text-sm text-slate-500">Analyzing your goals and finding the best resources</p>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      {/* Feature Preview Cards */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { icon: "🎯", title: "Personalized", desc: "Tailored to your goals" },
          { icon: "📚", title: "Curated Resources", desc: "Best tutorials & articles" },
          { icon: "📅", title: "Weekly Plans", desc: "Structured learning path" },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-purple-100"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
            <p className="text-xs text-slate-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        className="mt-6 flex items-center gap-6 text-sm text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⚡</span>
          <span>Instant Generation</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🎯</span>
          <span>100% Personalized</span>
        </div>
      </motion.div>
    </div>
  )
}
