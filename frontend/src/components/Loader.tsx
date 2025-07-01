import { motion, AnimatePresence } from "framer-motion"
import { Bot, Brain, Search, FileText, Database, Cog } from "lucide-react"
import { useState, useEffect } from "react"

const loadingStages = [
  {
    id: 1,
    text: "Objectives Agent Call",
    icon: Brain,
    description: "Analyzing your learning goals...",
  },
  {
    id: 2,
    text: "Resources Agent Call",
    icon: Search,
    description: "Searching for tutorials and content...",
  },
  {
    id: 3,
    text: "Roadmap Agent Called",
    icon: FileText,
    description: "Building your personalized roadmap...",
  },
  {
    id: 4,
    text: "Collection Data",
    icon: Database,
    description: "Gathering and organizing resources...",
  },
  {
    id: 5,
    text: "Working",
    icon: Cog,
    description: "Finalizing your learning path...",
  },
]

export default function AgentLoader() {
  const [currentStage, setCurrentStage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < loadingStages.length - 1) {
          return prev + 1
        } else {
          setIsComplete(true)
          return prev
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const orbitalVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${((currentStage + 1) / loadingStages.length) * 100}%`,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  const dotVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const CurrentIcon = loadingStages[currentStage]?.icon || Bot

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6">
      <motion.div className="relative max-w-md w-full" variants={containerVariants} initial="hidden" animate="visible">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"
          variants={pulseVariants}
          animate="animate"
        />

        {/* Main Container */}
        <div className="relative bg-purple-800/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Orbital Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 border-2 border-purple-400/30 rounded-full"
              variants={orbitalVariants}
              animate="animate"
            />
            <motion.div
              className="absolute w-24 h-24 border border-blue-400/20 rounded-full"
              variants={orbitalVariants}
              animate="animate"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Central Agent Icon */}
          <div className="relative flex flex-col items-center mb-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <CurrentIcon className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            {/* Floating Dots */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  style={{
                    top: `${50 + 30 * Math.sin((i * Math.PI) / 3)}%`,
                    left: `${50 + 30 * Math.cos((i * Math.PI) / 3)}%`,
                  }}
                  variants={dotVariants}
                  animate="animate"
                  transition={{ delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>

          {/* Stage Text */}
          <div className="text-center mb-6 h-20 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={currentStage} variants={textVariants} initial="hidden" animate="visible" exit="exit">
                <h2 className="text-xl font-bold text-white mb-2">{loadingStages[currentStage]?.text}</h2>
                <p className="text-purple-200 text-sm">{loadingStages[currentStage]?.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-purple-200 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentStage + 1) / loadingStages.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="flex justify-center space-x-2">
            {loadingStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index <= currentStage ? "bg-gradient-to-r from-purple-400 to-blue-400" : "bg-white/20"
                }`}
                animate={index === currentStage ? { scale: [1, 1.3, 1] } : {}}
                transition={{
                  duration: 0.6,
                  repeat: index === currentStage ? Number.POSITIVE_INFINITY : 0,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
