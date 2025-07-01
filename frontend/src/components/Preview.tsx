import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Youtube, Globe, Calendar, BarChart3, Mail, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Mobileform from "./Mobile-form"

export default function Preview() {
  const features = [
    {
      icon: Youtube,
      title: "YouTube Tutorial Search",
      description:
        "Automatically finds and curates relevant video tutorials from YouTube to support your learning journey.",
      gradient: "from-purple-500 to-blue-500",
      iconColor: "text-white",
    },
    {
      icon: Globe,
      title: "Web Content Discovery",
      description:
        "Searches the web for high-quality blogs, documentation, and articles related to your roadmap topics.",
      gradient: "from-blue-500 to-indigo-500",
      iconColor: "text-white",
    },
    {
      icon: Calendar,
      title: "Weekly Planning",
      description: "Creates structured weekly plans with milestones, tasks, and deadlines to keep you on track.",
      gradient: "from-indigo-500 to-purple-500",
      iconColor: "text-white",
    },
    {
      icon: BarChart3,
      title: "Progress Charts",
      description:
        "Generates visual charts and analytics to track your learning progress and identify areas for improvement.",
      gradient: "from-purple-500 to-violet-500",
      iconColor: "text-white",
    },
    // {
    //   icon: Mail,
    //   title: "PDF Email Reports",
    //   description: "Compiles your roadmap into professional PDF reports and sends them directly to your email.",
    //   gradient: "from-blue-600 to-purple-600",
    //   iconColor: "text-white",
    // },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-transparent from-slate-50 via-blue-50 to-purple-50 p-6 overflow-hidden">
      <motion.div className="max-w-5xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <motion.div variants={sparkleVariants} animate="animate">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Roadmap Builder Agent
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Your intelligent companion for creating comprehensive learning roadmaps. Discover resources, plan your
            journey, and track your progress with AI-powered assistance.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 flex-wrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {["AI-Powered", "Automated Planning", "Progress Tracking"].map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="secondary" className="px-3 py-1 bg-purple-100 text-purple-700 border-purple-200">
                  {badge}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
          <Mobileform trigger={<Badge variant="secondary" className="sm:hidden px-5 py-2 mt-4 bg-purple-100 text-purple-700 border-purple-200">Get started</Badge>}/>  
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="flex"
              >
                <Card className="group bg-[#180931] border-0 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex-1 backdrop-blur-sm">
                  <CardHeader className="pb-3 pt-2 px-4">
                    <motion.div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-3 text-white shadow-lg`}
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <IconComponent className={`w-5 h-5 ${feature.iconColor}`} />
                    </motion.div>
                    <CardTitle className="text-base font-semibold text-slate-300 leading-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <CardDescription className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}
