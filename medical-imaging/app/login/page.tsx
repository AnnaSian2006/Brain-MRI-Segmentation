"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
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

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-center mb-6">Sign in to access NeuroScan AI</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@hospital.com"
                    className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                      Password
                    </Label>
                    <Link href="#" className="text-xs text-red-500 hover:text-red-400">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-300 font-normal">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </div>

            <div className="bg-red-950/20 border-t border-red-900/30 p-4 text-center">
              <p className="text-sm text-gray-300">
                Don't have an account?{" "}
                <Link href="/permission" className="text-red-500 hover:text-red-400 font-medium">
                  Request Access
                </Link>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-red-500" />
              <p className="text-sm text-gray-400">Secure, encrypted connection</p>
            </div>
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="#" className="text-gray-400 hover:text-white underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-gray-400 hover:text-white underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

