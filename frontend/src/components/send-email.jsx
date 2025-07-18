"use client" 

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog,DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"



export default function RoadmapDialog({trigger}) {
  const [dialogState, setDialogState] = useState("form")
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Username is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setDialogState("email-sent")
      } else {
        throw new Error("Failed to submit user data")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setDialogState("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendEmail = async () => {
    setDialogState("loading")

    try {
      const response = await fetch("http://127.0.0.1:8000/send-email")
      if (response.ok) {
        setDialogState("success")
        setTimeout(() => {
          resetDialog()
        }, 3000)
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setDialogState("error")
    }
  }

  const resetDialog = () => {
    setDialogState("form")
    setFormData({ name: "", email: "" })
    setErrors({})
    setIsSubmitting(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="w-full flex items-center justify-center ">
      {/* Trigger Button */}
      {/* Dialog */}
      <Dialog>
        <DialogTrigger>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md  sm:ml-30 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <DialogHeader className="text-center pb-6">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Enter Details to Get Roadmap
              </DialogTitle>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {/* Form State */}
              {dialogState === "form" && (
                <motion.div key="form" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Enter your username"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`pl-10 h-12 border-2 transition-colors ${
                            errors.name
                              ? "border-red-300 focus:border-red-500"
                              : "border-slate-200 focus:border-purple-500"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`pl-10 h-12 border-2 transition-colors ${
                            errors.email
                              ? "border-red-300 focus:border-red-500"
                              : "border-slate-200 focus:border-purple-500"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Email Sent State */}
              {dialogState === "email-sent" && (
                <motion.div
                  key="email-sent"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to Send!</h3>
                  <p className="text-slate-600 mb-6">
                    Your roadmap is ready. Click below to send it to your email address.
                  </p>
                  <Button
                    onClick={handleSendEmail}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to Email
                  </Button>
                </motion.div>
              )}

              {/* Loading State */}
              {dialogState === "loading" && (
                <motion.div
                  key="loading"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Sending Email...</h3>
                  <p className="text-slate-600">Please wait while we send your roadmap to your email.</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-6">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Success State */}
              {dialogState === "success" && (
                <motion.div
                  key="success"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Email Sent Successfully!</h3>
                  <p className="text-slate-600">
                    Your personalized roadmap has been sent to <strong>{formData.email}</strong>
                  </p>
                  <p className="text-sm text-slate-500 mt-2">This dialog will close automatically.</p>
                </motion.div>
              )}

              {/* Error State */}
              {dialogState === "error" && (
                <motion.div
                  key="error"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h3>
                  <p className="text-slate-600 mb-6">We couldn't process your request. Please try again.</p>
                  <Button
                    onClick={resetDialog}
                    variant="outline"
                    className="w-full h-12 border-2 border-slate-300 hover:border-purple-500 transition-colors bg-transparent"
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
