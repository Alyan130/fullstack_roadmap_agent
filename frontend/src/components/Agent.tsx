import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, ExternalLink, Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Barchart from "./barchart"
import Piechart from "./pieChart"
import { Roadmap } from "@/App"
import { BrushUpdateDispatchContext } from "recharts/types/context/brushUpdateContext"
import RoadmapDialog from "./send-email"


export default function RoadmapGrid({ data }:{data:Roadmap|null}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const getResourceIcon = (type: string) => {
    return type === "video" ? Play : BookOpen
  }

  const getResourceColor = (type: string) => {
    return type === "video" ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"
  }

  const handleResourceClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="h-screen overflow-y-auto p-2 hide-scrollbar">
      <div className="w-full">
      
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 pt-3">
            Your Learning Roadmap
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto mb-7">
            Follow this carefully curated weekly plan to master your chosen technology stack
          </p>

        <RoadmapDialog trigger={<Button
        className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Get My Roadmap
      </Button>}>
      </RoadmapDialog>
      
        </motion.div>
        
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.weekly_plan.map((item, index) => {
            const ResourceIcon = getResourceIcon(item.resource.resource_type)

            return (
              <motion.div key={item.week}  whileHover="hover">
                <Card className="overflow-hidden border-0 hover:scale-105 ease-linear transition-all shadow-md hover:shadow-lg duration-200  bg-white/80 backdrop-blur-sm h-full py-0">
                  {/* Week Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-xs px-2 py-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Week {item.week}
                    </Badge>
                  </div>

                  {/* Video Thumbnail or Blog Header */}
                  {item.resource.resource_type === "video" && item.resource.thumbnail ? (
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={item.resource.thumbnail || "/placeholder.svg"}
                        alt={item.resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div
                      className={`h-20 bg-gradient-to-r ${getResourceColor(item.resource.resource_type)} flex items-center justify-center`}
                    >
                      <ResourceIcon className="w-8 h-8 text-white" />
                    </div>
                  )}

                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getResourceColor(item.resource.resource_type)} flex items-center justify-center flex-shrink-0 mt-1`}
                      >
                        <ResourceIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">
                          {item.resource.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 px-2 sm:px-2 pb-4">
                    <div className="flex items-center justify-between mb-3 gap-1 sm:gap-0">
                      <Badge variant="outline" className="text-xs px-1 sm:px-2 py-1">
                        {item.resource.resource_type === "video" ? "Video Tutorial" : "Blog Article"}
                      </Badge>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          onClick={() => handleResourceClick(item.resource.url)}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 h-8 px-1 sm:px-3 text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                      </motion.div>
                    </div>

                    {/* Estimated Time */}
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{item.resource.resource_type === "video" ? "~2-3 hours" : "~30-45 min read"}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      <Barchart data={data?.week_per_skill || []}/>
      <Piechart data={data?.skill_boost || []}/>
    </div>
  )
}
