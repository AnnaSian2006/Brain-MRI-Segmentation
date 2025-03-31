"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, ArrowLeft, Shield, Lock, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function PermissionPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [institution, setInstitution] = useState("")
  const [role, setRole] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to request access
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(2)
    }, 1500)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black/90 backdrop-blur-md border-b border-red-900/20">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-red-600 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <Brain className="w-5 h-5 text-white z-10" />
            </div>
            <span className="text-lg font-bold">NeuroScan AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {step === 1 ? (
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <div className="p-6 md:p-8">
                  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold">Request Access</h1>
                  </motion.div>

                  <motion.p variants={fadeInUp} className="text-gray-300 mb-6">
                    NeuroScan AI is available exclusively to verified healthcare professionals and researchers. Please
                    complete this form to request access to our platform.
                  </motion.p>

                  <form onSubmit={handleSubmit}>
                    <motion.div variants={fadeInUp} className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first-name" className="text-sm font-medium text-gray-300 mb-1">
                            First Name
                          </Label>
                          <Input
                            id="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="last-name" className="text-sm font-medium text-gray-300 mb-1">
                            Last Name
                          </Label>
                          <Input
                            id="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1">
                          Professional Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                          placeholder="john.doe@hospital.org"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Please use your institutional email address</p>
                      </div>

                      <div>
                        <Label htmlFor="institution" className="text-sm font-medium text-gray-300 mb-1">
                          Institution/Organization
                        </Label>
                        <Input
                          id="institution"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                          placeholder="General Hospital"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="role" className="text-sm font-medium text-gray-300 mb-1">
                          Professional Role
                        </Label>
                        <Input
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                          placeholder="Radiologist, Neurologist, Researcher, etc."
                          required
                        />
                      </div>

                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox
                          id="terms"
                          required
                          className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 mt-1"
                        />
                        <Label htmlFor="terms" className="text-sm text-gray-300 font-normal">
                          I confirm that I am a healthcare professional or researcher and agree to the{" "}
                          <Link href="#" className="text-red-500 hover:text-red-400 underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-red-500 hover:text-red-400 underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Submitting Request...
                          </>
                        ) : (
                          "Submit Access Request"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>

                <div className="bg-red-950/20 border-t border-red-900/30 p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    Your information is secure and will only be used to verify your professional status. We typically
                    process access requests within 24-48 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Request Submitted</h1>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Thank you for your interest in NeuroScan AI. We've received your access request and will review it
                  shortly. You'll receive an email at <span className="text-white font-medium">{email}</span> with
                  further instructions.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                  >
                    Continue to Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/")}
                    className="w-full border-red-600 text-red-500 hover:bg-red-950"
                  >
                    Return to Home
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

