"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Upload,
  Download,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  User,
  Bell,
  Menu,
  X,
  ChevronDown,
  FileImage,
  FileIcon as FilePdf,
  Trash2,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  EyeOff,
  Layers,
  Maximize,
  Minimize,
  HelpCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showOriginal, setShowOriginal] = useState(false)
  const [contrast, setContrast] = useState([50])
  const [brightness, setBrightness] = useState([50])
  const [zoom, setZoom] = useState([100])
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setProcessedImage(null)
      setUploadProgress(0)
      setProcessingProgress(0)

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadInterval)
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }

  const processImage = () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate processing progress
    const processInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(processInterval)
          setTimeout(() => {
            setIsProcessing(false)
            setProcessedImage("/placeholder.svg?height=600&width=600")
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
      setProcessedImage(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const neuronAnimation = {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md border-b border-red-900/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
              <span className="text-lg font-bold hidden sm:inline">NeuroScan AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Documentation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="hidden sm:inline">Dr. Sarah Chen</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              className="w-64 border-r border-red-900/20 bg-black fixed md:sticky top-16 h-[calc(100vh-4rem)] z-30 overflow-y-auto"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4">
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
                    <Link href="/dashboard">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload & Analyze
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white" asChild>
                    <Link href="#">
                      <FileText className="mr-2 h-5 w-5" />
                      My Scans
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white" asChild>
                    <Link href="#">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Analytics
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white" asChild>
                    <Link href="#">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                  </Button>
                </nav>

                <div className="mt-8">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Recent Scans</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((_, i) => (
                      <Link key={i} href="#" className="block p-2 rounded-lg hover:bg-red-900/10 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-900/20 rounded-md flex items-center justify-center">
                            <Brain className="w-4 h-4 text-red-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Scan #{1000 + i}</div>
                            <div className="text-xs text-gray-400">{new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-br from-red-950 to-black rounded-lg border border-red-900/30">
                  <h3 className="font-medium mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-400 mb-3">Our support team is available 24/7 to assist you.</p>
                  <Button variant="outline" size="sm" className="w-full border-red-600 text-red-500 hover:bg-red-950">
                    Contact Support
                  </Button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-6 ${isFullscreen ? "fixed inset-0 z-50 bg-black" : ""}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold">MRI Scan Analysis</h1>
                <p className="text-gray-400">Upload and analyze brain MRI scans for tumor detection</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Scan
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.dcm,.nii,.nii.gz"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList className="bg-gray-900/50 p-1">
                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-red-900/30 data-[state=active]:text-white"
                >
                  Upload & Analyze
                </TabsTrigger>
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-red-900/30 data-[state=active]:text-white"
                  disabled={!processedImage}
                >
                  Results
                </TabsTrigger>
                <TabsTrigger
                  value="export"
                  className="data-[state=active]:bg-red-900/30 data-[state=active]:text-white"
                  disabled={!processedImage}
                >
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <div
                  className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {!selectedFile ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto w-24 h-24">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-red-900/20"
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Upload className="h-10 w-10 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Drag & Drop MRI Scan</h3>
                        <p className="text-gray-400 mt-1">or click to browse files</p>
                      </div>
                      <div className="text-sm text-gray-500">Supports DICOM, NIfTI, JPEG, and PNG formats</div>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-red-600 text-red-500 hover:bg-red-950"
                      >
                        Select File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-red-900/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-red-500" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-medium">{selectedFile.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {uploadProgress < 100 ? (
                        <div className="space-y-2 max-w-md mx-auto">
                          <div className="flex justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress
                            value={uploadProgress}
                            className="h-2 bg-gray-800"
                            indicatorClassName="bg-red-600"
                          />
                        </div>
                      ) : isProcessing ? (
                        <div className="space-y-2 max-w-md mx-auto">
                          <div className="flex justify-between text-sm">
                            <span>Processing...</span>
                            <span>{processingProgress}%</span>
                          </div>
                          <Progress
                            value={processingProgress}
                            className="h-2 bg-gray-800"
                            indicatorClassName="bg-red-600"
                          />
                          <div className="text-center text-sm text-gray-400 mt-2">
                            Analyzing scan using AI algorithm
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2 justify-center">
                            <Button
                              onClick={processImage}
                              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Brain className="mr-2 h-4 w-4" />
                                  Analyze Scan
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedFile(null)
                                setProcessedImage(null)
                              }}
                              className="border-gray-700 text-gray-300 hover:bg-gray-900"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                          <div className="text-sm text-gray-400">
                            Click "Analyze Scan" to detect potential tumor regions
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {processedImage && (
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">Analysis Results</h3>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-900/30 text-red-400 hover:bg-red-900/50">Tumor Detected</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleFullscreen}
                          className="text-gray-400 hover:text-white"
                        >
                          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-800">
                          <img
                            src={showOriginal ? "/placeholder.svg?height=600&width=600" : processedImage}
                            alt="MRI scan"
                            className="w-full h-full object-cover"
                            style={{
                              filter: `contrast(${contrast[0]}%) brightness(${brightness[0]}%)`,
                              transform: `scale(${zoom[0] / 100})`,
                            }}
                          />
                          {showAnnotations && !showOriginal && (
                            <div className="absolute inset-0 pointer-events-none">
                              <svg width="100%" height="100%" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                                <motion.circle
                                  cx="300"
                                  cy="250"
                                  r="80"
                                  fill="none"
                                  stroke="rgba(220, 38, 38, 0.8)"
                                  strokeWidth="3"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 1.5, delay: 0.5 }}
                                />
                                <motion.path
                                  d="M280,250 C290,230 310,230 320,250 Z"
                                  fill="rgba(220, 38, 38, 0.3)"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 1.5, delay: 1 }}
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`${showOriginal ? "bg-red-900/30 text-white" : "bg-transparent"} border-red-900`}
                            onClick={() => setShowOriginal(!showOriginal)}
                          >
                            {showOriginal ? (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Original
                              </>
                            ) : (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Processed
                              </>
                            )}
                          </Button>

                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-800 text-gray-400 hover:text-white"
                                    onClick={() => setZoom([Math.max(zoom[0] - 10, 50)])}
                                  >
                                    <ZoomOut className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Zoom Out</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-800 text-gray-400 hover:text-white"
                                    onClick={() => setZoom([Math.min(zoom[0] + 10, 200)])}
                                  >
                                    <ZoomIn className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Zoom In</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-gray-800 text-gray-400 hover:text-white"
                                    onClick={() => {
                                      setZoom([100])
                                      setContrast([50])
                                      setBrightness([50])
                                    }}
                                  >
                                    <RotateCw className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Reset</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                          <h4 className="font-medium mb-4">Analysis Summary</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Tumor Probability:</span>
                              <span className="font-medium text-red-500">87%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Tumor Size:</span>
                              <span>3.2 cm²</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Location:</span>
                              <span>Right Temporal Lobe</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Classification:</span>
                              <span>Glioblastoma (Suspected)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Confidence Score:</span>
                              <span>High (0.92)</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label htmlFor="contrast">Contrast</Label>
                              <span className="text-sm text-gray-400">{contrast}%</span>
                            </div>
                            <Slider
                              id="contrast"
                              min={0}
                              max={200}
                              step={1}
                              value={contrast}
                              onValueChange={setContrast}
                              className="[&_[role=slider]]:bg-red-600"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-2">
                              <Label htmlFor="brightness">Brightness</Label>
                              <span className="text-sm text-gray-400">{brightness}%</span>
                            </div>
                            <Slider
                              id="brightness"
                              min={0}
                              max={200}
                              step={1}
                              value={brightness}
                              onValueChange={setBrightness}
                              className="[&_[role=slider]]:bg-red-600"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-2">
                              <Label htmlFor="zoom">Zoom</Label>
                              <span className="text-sm text-gray-400">{zoom}%</span>
                            </div>
                            <Slider
                              id="zoom"
                              min={50}
                              max={200}
                              step={5}
                              value={zoom}
                              onValueChange={setZoom}
                              className="[&_[role=slider]]:bg-red-600"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="annotations"
                              checked={showAnnotations}
                              onCheckedChange={setShowAnnotations}
                              className="data-[state=checked]:bg-red-600"
                            />
                            <Label htmlFor="annotations">Show Annotations</Label>
                          </div>

                          <Button variant="outline" size="sm" className="border-red-600 text-red-500 hover:bg-red-950">
                            <Layers className="mr-2 h-4 w-4" />
                            View Slices
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                {processedImage && (
                  <>
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 p-6">
                      <h3 className="text-xl font-bold mb-4">Detailed Analysis</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-800">
                            <img
                              src={processedImage || "/placeholder.svg"}
                              alt="MRI scan with tumor detection"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 pointer-events-none">
                              <svg width="100%" height="100%" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                                <motion.circle
                                  cx="300"
                                  cy="250"
                                  r="80"
                                  fill="none"
                                  stroke="rgba(220, 38, 38, 0.8)"
                                  strokeWidth="3"
                                  variants={neuronAnimation}
                                  initial="hidden"
                                  animate="visible"
                                />
                                <motion.path
                                  d="M280,250 C290,230 310,230 320,250 Z"
                                  fill="rgba(220, 38, 38, 0.3)"
                                  variants={neuronAnimation}
                                  initial="hidden"
                                  animate="visible"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                            <h4 className="font-medium mb-2">Segmentation Legend</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                                <span className="text-sm">Healthy Tissue</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-300"></div>
                                <span className="text-sm">Low Density</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <span className="text-sm">Medium Density</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-700"></div>
                                <span className="text-sm">High Density</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                            <h4 className="font-medium mb-4">Tumor Characteristics</h4>
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <div className="text-sm text-gray-400">Size</div>
                                  <div className="font-medium">3.2 cm²</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-400">Volume</div>
                                  <div className="font-medium">4.7 cm³</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-400">Shape</div>
                                  <div className="font-medium">Irregular</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-400">Margins</div>
                                  <div className="font-medium">Poorly Defined</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-400">Enhancement</div>
                                  <div className="font-medium">Heterogeneous</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-400">Necrosis</div>
                                  <div className="font-medium">Present</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                            <h4 className="font-medium mb-4">AI Classification</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Glioblastoma</span>
                                  <span className="text-sm font-medium">87%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Meningioma</span>
                                  <span className="text-sm font-medium">8%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "8%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Astrocytoma</span>
                                  <span className="text-sm font-medium">3%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "3%" }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">Other</span>
                                  <span className="text-sm font-medium">2%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-2">
                                  <div className="bg-red-600 h-2 rounded-full" style={{ width: "2%" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-red-950/30 rounded-lg border border-red-900/30 p-4">
                            <h4 className="font-medium mb-2 text-red-400">AI Recommendation</h4>
                            <p className="text-sm text-gray-300">
                              The analysis suggests a high probability of glioblastoma. Further clinical correlation and
                              histopathological confirmation is recommended. Consider advanced imaging such as perfusion
                              MRI or spectroscopy for additional characterization.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 p-6">
                      <h3 className="text-xl font-bold mb-4">Multi-Slice View</h3>

                      <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="relative aspect-square rounded-lg overflow-hidden border border-gray-800"
                          >
                            <img
                              src="/placeholder.svg?height=150&width=150"
                              alt={`MRI slice ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                              {i + 1}
                            </div>
                            {i === 3 && (
                              <div className="absolute inset-0 pointer-events-none">
                                <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 150 150"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="75"
                                    cy="60"
                                    r="20"
                                    fill="none"
                                    stroke="rgba(220, 38, 38, 0.8)"
                                    strokeWidth="2"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                {processedImage && (
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/20 p-6">
                    <h3 className="text-xl font-bold mb-6">Export Options</h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-600/40 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
                          <FileImage className="w-6 h-6 text-red-500" />
                        </div>
                        <h4 className="font-medium mb-2">Image Files</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Export the processed scan as an image file in various formats.
                        </p>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            PNG Format
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            JPEG Format
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            TIFF Format
                          </Button>
                        </div>
                      </div>

                      <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-600/40 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
                          <FilePdf className="w-6 h-6 text-red-500" />
                        </div>
                        <h4 className="font-medium mb-2">PDF Report</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Generate a comprehensive PDF report with analysis results.
                        </p>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Basic Report
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Detailed Report
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Clinical Report
                          </Button>
                        </div>
                      </div>

                      <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-600/40 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mb-4">
                          <FileText className="w-6 h-6 text-red-500" />
                        </div>
                        <h4 className="font-medium mb-2">Medical Formats</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Export in standard medical imaging formats for clinical use.
                        </p>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            DICOM Format
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            NIfTI Format
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-red-600 text-red-500 hover:bg-red-950"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Raw Data
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-red-950/20 rounded-lg border border-red-900/30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
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
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Important Note</h4>
                          <p className="text-sm text-gray-300">
                            The analysis results are intended for research and educational purposes only. Clinical
                            decisions should not be based solely on these results without proper medical consultation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

