"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Brain,
  ChevronRight,
  Upload,
  Download,
  FileText,
  BarChart3,
  Shield,
  Clock,
  ArrowRight,
  Menu,
  X,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the handleLogin function to navigate to the login page instead of directly to dashboard
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/login")
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const neuronVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white dark:bg-black dark:text-white">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? "bg-black/90 dark:bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center">
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
              <Brain className="w-6 h-6 text-white z-10" />
            </div>
            <span className="text-xl font-bold">NeuroScan AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <Link href="#about" className="hover:text-red-500 transition-colors">
                About
              </Link>
              <Link href="#features" className="hover:text-red-500 transition-colors">
                Features
              </Link>
              <Link href="#contact" className="hover:text-red-500 transition-colors">
                Contact
              </Link>
            </nav>
            <ThemeToggle />
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              Get Started
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black dark:bg-black z-40 pt-20 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="flex flex-col gap-6 text-xl">
            <Link
              href="#about"
              className="py-3 border-b border-gray-800 hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#features"
              className="py-3 border-b border-gray-800 hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#contact"
              className="py-3 border-b border-gray-800 hover:text-red-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="py-3 border-b border-gray-800 flex items-center justify-between">
              <span>Theme</span>
              <ThemeToggle />
            </div>
            <Button
              onClick={() => router.push("/dashboard")}
              className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              Get Started
            </Button>
          </nav>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black dark:from-black dark:via-black/90 dark:to-black z-10" />
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="rgba(220, 38, 38, 0.1)" strokeWidth="2">
                <motion.path
                  d="M400,100 C500,200 600,100 700,200 C800,300 700,400 800,500 C900,600 800,700 700,800"
                  variants={neuronVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M100,200 C200,100 300,200 400,100 C500,0 600,100 700,0"
                  variants={neuronVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M0,400 C100,300 200,400 300,300 C400,200 500,300 600,200 C700,100 800,200 900,100"
                  variants={neuronVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M100,600 C200,500 300,600 400,500 C500,400 600,500 700,400 C800,300 900,400 1000,300"
                  variants={neuronVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  d="M0,800 C100,700 200,800 300,700 C400,600 500,700 600,600 C700,500 800,600 900,500"
                  variants={neuronVariants}
                  initial="hidden"
                  animate="visible"
                />
              </g>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-20">
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div
              variants={fadeInUp}
              className="inline-block px-3 py-1 bg-red-900/30 border border-red-800 rounded-full text-sm font-medium text-red-400"
            >
              Advanced Brain MRI Analysis
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              AI-Powered <span className="text-red-600">Brain Tumor</span> Detection
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-lg">
              Upload your MRI scans and get instant, accurate analysis with our state-of-the-art deep learning
              algorithm.
            </motion.p>
            {/* Update the "Try It Now" button to navigate to the permission request page */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/permission")}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-6"
              >
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-950">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-gradient-to-br from-red-950 to-black dark:from-red-950 dark:to-black p-6 rounded-2xl shadow-2xl border border-red-900/30">
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                Secure Login
              </div>
              <h3 className="text-xl font-bold mb-4">Sign In to Your Account</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@hospital.com"
                    className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-700 bg-black/50 text-red-600 focus:ring-red-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-red-500 hover:text-red-400">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                >
                  Sign In
                </Button>
                <div className="text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="text-red-500 hover:text-red-400">
                    Sign up
                  </a>
                </div>
              </form>
            </div>

            <motion.div
              className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-600/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 bg-red-600/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-white">
              <span className="text-sm mb-2">Scroll to learn more</span>
              <ChevronRight className="w-5 h-5 transform rotate-90" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="text-red-600">NeuroScan AI</span>
            </h2>
            <p className="text-gray-300 dark:text-gray-300">
              We combine cutting-edge AI technology with medical expertise to provide accurate, fast, and reliable brain
              tumor detection from MRI scans.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Replace the placeholder with the provided brain image */}
              <div className="relative rounded-2xl overflow-hidden border border-red-900/30">
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 to-black/50 dark:from-red-950/50 dark:to-black/50 z-10" />
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wxtzrA4dL3SwqHcSaTnfotgsOU4XRp.png"
                  alt="3D brain visualization with medical professionals"
                  className="w-full h-auto"
                />
              </div>
              <motion.div
                className="absolute -bottom-5 -right-5 w-40 h-40 bg-red-600/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-gray-300 dark:text-gray-300">
                At NeuroScan AI, our mission is to revolutionize brain tumor detection by making advanced AI technology
                accessible to healthcare professionals worldwide. We aim to improve diagnosis accuracy, reduce analysis
                time, and ultimately enhance patient outcomes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Trusted by Medical Professionals</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-sm">
                      Our platform is used by radiologists and neurologists in leading hospitals and research
                      institutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">98.7% Accuracy Rate</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-sm">
                      Our AI model has been trained on thousands of MRI scans and validated by expert radiologists.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Rapid Analysis</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-sm">
                      Get results in seconds instead of hours, enabling faster diagnosis and treatment planning.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-950">
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-black to-red-950/20 dark:from-black dark:to-red-950/20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key <span className="text-red-600">Features</span>
            </h2>
            <p className="text-gray-300 dark:text-gray-300">
              Our platform offers a comprehensive set of tools for brain MRI analysis and tumor detection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="w-6 h-6 text-red-500" />,
                title: "Easy Upload",
                description: "Upload MRI scans in various formats including DICOM, NIfTI, JPEG, and PNG.",
              },
              {
                icon: <Brain className="w-6 h-6 text-red-500" />,
                title: "AI Analysis",
                description: "Our deep learning algorithm analyzes the scan and identifies potential tumor regions.",
              },
              {
                icon: <FileText className="w-6 h-6 text-red-500" />,
                title: "Detailed Reports",
                description: "Get comprehensive reports with tumor location, size, and classification.",
              },
              {
                icon: <Download className="w-6 h-6 text-red-500" />,
                title: "Multiple Export Formats",
                description: "Download results in various formats including images, PDFs, and DICOM.",
              },
              {
                icon: <Shield className="w-6 h-6 text-red-500" />,
                title: "HIPAA Compliant",
                description: "Your data is secure with our HIPAA-compliant storage and processing.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-red-500" />,
                title: "Analytics Dashboard",
                description: "Track and analyze multiple scans over time with our intuitive dashboard.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black p-6 rounded-xl border border-red-900/20 hover:border-red-600/40 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8"
            >
              Try NeuroScan AI Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-red-950/20 to-black dark:from-red-950/20 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What <span className="text-red-600">Experts</span> Say
            </h2>
            <p className="text-gray-300 dark:text-gray-300">
              Trusted by leading healthcare professionals and institutions worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "NeuroScan has revolutionized our diagnostic workflow. The accuracy and speed of tumor detection have significantly improved our patient outcomes.",
                name: "Dr. Emily Chen",
                title: "Chief of Radiology, Metro General Hospital",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "As a neurosurgeon, having precise tumor segmentation before surgery is invaluable. NeuroScan provides exactly that with remarkable consistency.",
                name: "Dr. Michael Rodriguez",
                title: "Neurosurgery Department Head, University Medical Center",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                quote:
                  "The AI-powered analysis has helped us detect subtle abnormalities that might have been missed in conventional readings. A game-changer for early diagnosis.",
                name: "Dr. Sarah Johnson",
                title: "Neuro-oncologist, Cancer Research Institute",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black p-6 rounded-xl border border-red-900/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-600">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-red-600 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 11h2.5a2.5 2.5 0 0 0 0-5h-2.5v10M17 11h2.5a2.5 2.5 0 0 0 0-5h-2.5v10"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-300 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <p className="text-gray-300 dark:text-gray-300">
              Find answers to common questions about NeuroScan AI and our AI-powered brain tumor detection.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How accurate is NeuroScan's tumor detection?",
                answer:
                  "NeuroScan achieves a 98.7% accuracy rate in tumor detection, validated through extensive clinical trials and comparisons with expert radiologist diagnoses. Our AI model is continuously trained on diverse datasets to ensure high performance across different patient demographics and scanning equipment.",
              },
              {
                question: "Is my patient data secure and private?",
                answer:
                  "Absolutely. NeuroScan is fully HIPAA compliant and employs end-to-end encryption for all data transfers. Patient scans are anonymized during processing, and we never share or sell any data. You maintain complete ownership and control of all uploaded images and analysis results.",
              },
              {
                question: "What file formats are supported for MRI scans?",
                answer:
                  "NeuroScan supports all major medical imaging formats including DICOM, NIfTI, JPEG, and PNG. For optimal results, we recommend using the original DICOM files from the scanner as they contain important metadata that enhances our analysis accuracy.",
              },
              {
                question: "How long does the analysis process take?",
                answer:
                  "Most MRI scans are analyzed within 30-60 seconds, depending on the file size and complexity. Our advanced cloud infrastructure ensures rapid processing even during peak usage times, allowing for immediate clinical decision-making.",
              },
              {
                question: "Can NeuroScan detect all types of brain tumors?",
                answer:
                  "NeuroScan is trained to detect and classify a wide range of brain tumors including gliomas, meningiomas, pituitary tumors, and metastatic tumors. The system provides probability scores for different tumor types, though final diagnosis should always be confirmed by a qualified healthcare professional.",
              },
              {
                question: "How do I get access to NeuroScan for my institution?",
                answer:
                  "You can request access through our website by clicking the 'Try It Now' button. After submitting your credentials and institution details, our team will review your application and provide access, typically within 24-48 hours. We offer various subscription plans for individual practitioners, research teams, and healthcare institutions.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black rounded-xl border border-red-900/20 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium">
                    {faq.question}
                    <svg
                      className="h-5 w-5 transition-transform group-open:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="border-t border-red-900/20 p-6 text-gray-300 dark:text-gray-300">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in <span className="text-red-600">Touch</span>
            </h2>
            <p className="text-gray-300 dark:text-gray-300">
              Have questions about NeuroScan AI? Our team is here to help you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-gray-300 dark:text-gray-300">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-sm">contact@neuroscan.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-gray-400 dark:text-gray-400 text-sm">
                      123 Innovation Drive, San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-800/50 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-red-500" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-800/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-red-500" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center hover:bg-red-800/50 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-red-500" />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black p-6 rounded-xl border border-red-900/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
                    >
                      First Name
                    </label>
                    <Input
                      id="first-name"
                      type="text"
                      className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1"
                    >
                      Last Name
                    </label>
                    <Input
                      id="last-name"
                      type="text"
                      className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500 p-3"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-black border-t border-red-900/20 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">NeuroScan AI</span>
              </div>
              <p className="text-gray-400 dark:text-gray-400 text-sm mb-4">
                Advanced AI-powered brain tumor detection for healthcare professionals.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Help</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-400 hover:text-red-500 hover:dark:text-red-500 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Subscribe</h4>
              <p className="text-gray-400 dark:text-gray-400 text-sm mb-4">
                Stay updated with our latest news and updates.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-black/50 dark:bg-black/50 border-gray-800 text-white placeholder:text-gray-500 rounded-r-none"
                />
                <Button className="bg-red-600 hover:bg-red-700 rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 dark:text-gray-400 text-sm">
            <p>© 2025 NeuroScan AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

