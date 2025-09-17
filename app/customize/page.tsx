"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Save,
  ShoppingCart,
  Share2,
  Crop,
  Move,
  RotateCw,
  Trash2,
  Sparkles,
  TrendingUp,
  Camera,
  Type,
  Palette,
} from "lucide-react"

interface DesignElement {
  id: string
  type: "text" | "image" | "sticker" | "emoji"
  content: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scale: number
  color?: string
  fontSize?: number
  src?: string
}

const PHOTO_DESIGN_STEPS = [
  "Design Mode Selection",
  "Brand Selection",
  "Model Selection",
  "Upload Screen",
  "Use As",
  "Collections & Stickers",
  "Customisation",
  "Preview",
]

const COLLECTIONS_FIRST_STEPS = [
  "Design Mode Selection",
  "Brand Selection",
  "Model Selection",
  "Collection Background",
  "Upload Screen (Optional)",
  "Stickers & Text",
  "Customisation",
  "Preview",
]

const COLLECTIONS_ONLY_STEPS = [
  "Design Mode Selection",
  "Brand Selection",
  "Model Selection",
  "Collection Background",
  "Stickers & Text",
  "Customisation",
  "Preview",
]

const SAY_IT_STEPS = [
  "Design Mode Selection",
  "Brand Selection",
  "Model Selection",
  "Phrase Selection",
  "AI Styling",
  "Customisation",
  "Preview",
]

const TRENDING_STEPS = ["Trending", "Load Preset", "Customisation", "Preview"]

export default function CustomizePage() {
  const [currentFlow, setCurrentFlow] = useState<"photo-design" | "collections-first" | "collections-only" | "sayit" | "trending" | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedDesignMode, setSelectedDesignMode] = useState<string | null>(null)
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null)
  const [aiStyle, setAiStyle] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageShape, setImageShape] = useState<string>("original")
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const collectionUploadRef = useRef<HTMLInputElement>(null)
  const backgroundUploadRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [cropMode, setCropMode] = useState(false)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 })
  const [useAs, setUseAs] = useState<"background" | "sticker" | null>(null) // Added state for branching logic

  const brands = [
    { id: "apple", name: "Apple", icon: "🍎" },
    { id: "samsung", name: "Samsung", icon: "📱" },
  ]

  const devicesByBrand = {
    apple: [
      {
        id: "iphone-15-pro-max",
        name: "iPhone 15 Pro Max",
        available: true,
        dimensions: { width: 192, height: 320 },
        image: "/phone-models/iphone-15-pro-max.svg"
      },
      {
        id: "iphone-15-pro",
        name: "iPhone 15 Pro",
        available: true,
        dimensions: { width: 188, height: 312 },
        image: "/phone-models/iphone-15-pro.svg"
      },
      {
        id: "iphone-15",
        name: "iPhone 15",
        available: true,
        dimensions: { width: 186, height: 310 },
        image: "/phone-models/iphone-15.svg"
      },
      {
        id: "iphone-14-pro",
        name: "iPhone 14 Pro",
        available: true,
        dimensions: { width: 187, height: 311 },
        image: "/phone-models/iphone-14-pro.svg"
      },
    ],
    samsung: [
      {
        id: "galaxy-s24-ultra",
        name: "Galaxy S24 Ultra",
        available: true,
        dimensions: { width: 195, height: 325 },
        image: "/phone-models/galaxy-s24-ultra.svg"
      },
      {
        id: "galaxy-s24-plus",
        name: "Galaxy S24+",
        available: true,
        dimensions: { width: 190, height: 318 },
        image: "/phone-models/galaxy-s24-plus.svg"
      },
      {
        id: "galaxy-s24",
        name: "Galaxy S24",
        available: true,
        dimensions: { width: 185, height: 308 },
        image: "/phone-models/galaxy-s24.svg"
      },
      {
        id: "galaxy-s23-ultra",
        name: "Galaxy S23 Ultra",
        available: true,
        dimensions: { width: 194, height: 324 },
        image: "/phone-models/galaxy-s23-ultra.svg"
      },
    ],
  }

  const designModes = [
    {
      id: "photo-design",
      name: "Photo + Design",
      description: "Upload photos and add collection backgrounds",
      icon: Camera
    },
    {
      id: "collections-first",
      name: "Collections First",
      description: "Start with collection backgrounds, add photos optionally",
      icon: Palette
    },
    {
      id: "collections-only",
      name: "Collections Only",
      description: "Pure collection designs with stickers and text",
      icon: Sparkles
    },
    {
      id: "sayit",
      name: "Say It!",
      description: "AI-powered text designs",
      icon: Type
    },
  ]

  const phrases = [
    "Good Vibes Only",
    "Stay Wild",
    "Dream Big",
    "Be Kind",
    "Live Laugh Love",
    "Adventure Awaits",
    "Choose Joy",
    "Make It Happen",
    "Stay Strong",
    "Be You",
  ]

  const aiStyles = [
    { id: "graffiti", name: "Graffiti", preview: "from-purple-500 to-pink-500" },
    { id: "neon", name: "Neon", preview: "from-cyan-400 to-pink-400" },
    { id: "vintage", name: "Vintage", preview: "from-amber-600 to-orange-700" },
    { id: "minimal", name: "Minimal", preview: "from-gray-900 to-gray-600" },
  ]

  const trendingPresets = [
    { id: "sunset-vibes", name: "Sunset Vibes", preview: "from-orange-400 to-pink-500" },
    { id: "ocean-waves", name: "Ocean Waves", preview: "from-blue-400 to-cyan-500" },
    { id: "forest-green", name: "Forest Green", preview: "from-green-600 to-emerald-500" },
    { id: "cosmic-purple", name: "Cosmic Purple", preview: "from-purple-600 to-indigo-500" },
  ]

  const collections = [
    { id: "monochrome", name: "Monochrome", color: "from-gray-900 to-gray-600", preview: "/placeholder-n43hv.png" },
    { id: "sports", name: "Sports", color: "from-blue-600 to-green-500", preview: "/placeholder-j927u.png" },
    { id: "graffiti", name: "Graffiti", color: "from-purple-500 to-pink-500", preview: "/placeholder-23ynr.png" },
    {
      id: "streetwear",
      name: "Streetwear",
      color: "from-orange-500 to-red-500",
      preview: "/placeholder-1i47w.png",
    },
    { id: "festival", name: "Festival", color: "from-yellow-400 to-pink-500", preview: "/placeholder-2ihww.png" },
    { id: "retro", name: "Retro", color: "from-cyan-400 to-purple-500", preview: "/placeholder-zu7jo.png" },
    { id: "neon-cyber", name: "Neon Cyber", color: "from-cyan-400 to-pink-400", preview: "/placeholder-sy0x6.png" },
    {
      id: "animal-print",
      name: "Animal Print",
      color: "from-amber-600 to-orange-700",
      preview: "/placeholder-bseg3.png",
    },
    { id: "space", name: "Space", color: "from-indigo-900 to-purple-900", preview: "/placeholder-kqlec.png" },
  ]

  const backgrounds = [
    { id: "none", name: "None", preview: "transparent" },
    { id: "solid-white", name: "White", preview: "#ffffff" },
    { id: "solid-black", name: "Black", preview: "#000000" },
    { id: "gradient-sunset", name: "Sunset", preview: "linear-gradient(45deg, #ff6b6b, #ffd93d)" },
    { id: "gradient-ocean", name: "Ocean", preview: "linear-gradient(45deg, #667eea, #764ba2)" },
    { id: "gradient-forest", name: "Forest", preview: "linear-gradient(45deg, #11998e, #38ef7d)" },
  ]

  const layouts = [
    { id: "single", name: "Single", description: "One large photo", disabled: false },
    { id: "2-in-1", name: "2-in-1", description: "Two photos side by side", disabled: selectedBackground === "none" },
    { id: "4-in-1", name: "4-in-1", description: "Four photos in grid", disabled: selectedBackground === "none" },
  ]

  const stickers = [
    { id: "heart", emoji: "❤️", name: "Heart" },
    { id: "star", emoji: "⭐", name: "Star" },
    { id: "lightning", emoji: "⚡", name: "Lightning" },
    { id: "fire", emoji: "🔥", name: "Fire" },
    { id: "crown", emoji: "👑", name: "Crown" },
    { id: "diamond", emoji: "💎", name: "Diamond" },
    { id: "rocket", emoji: "🚀", name: "Rocket" },
    { id: "peace", emoji: "✌️", name: "Peace" },
    { id: "skull", emoji: "💀", name: "Skull" },
    { id: "rainbow", emoji: "🌈", name: "Rainbow" },
    { id: "alien", emoji: "👽", name: "Alien" },
    { id: "robot", emoji: "🤖", name: "Robot" },
  ]

  const getCurrentSteps = () => {
    if (currentFlow === "photo-design") return PHOTO_DESIGN_STEPS
    if (currentFlow === "collections-first") return COLLECTIONS_FIRST_STEPS
    if (currentFlow === "collections-only") return COLLECTIONS_ONLY_STEPS
    if (currentFlow === "sayit") return SAY_IT_STEPS
    if (currentFlow === "trending") return TRENDING_STEPS
    return PHOTO_DESIGN_STEPS
  }

  const getCurrentStepName = () => {
    const steps = getCurrentSteps()
    return steps[currentStep] || "Unknown"
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: DesignElement = {
          id: `image-${Date.now()}`,
          type: "image",
          content: "",
          src: e.target?.result as string,
          x: 50,
          y: 50,
          width: 120,
          height: 120,
          rotation: 0,
          scale: 1,
        }
        setElements([...elements, newImage])
        setSelectedElement(newImage.id)
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCollectionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log("[v0] Collection upload:", e.target?.result)
        setSelectedCollection("monochrome")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        console.log("[v0] Background upload:", e.target?.result)
        setSelectedBackground("solid-white")
      }
      reader.readAsDataURL(file)
    }
  }

  const addSticker = (sticker: (typeof stickers)[0]) => {
    const newElement: DesignElement = {
      id: `sticker-${Date.now()}`,
      type: "sticker",
      content: sticker.emoji,
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
      width: 40,
      height: 40,
      rotation: 0,
      scale: 1,
    }
    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
  }

  const addEmoji = (emoji: string) => {
    const newElement: DesignElement = {
      id: `emoji-${Date.now()}`,
      type: "emoji",
      content: emoji,
      x: Math.random() * 100 + 50,
      y: Math.random() * 100 + 50,
      width: 30,
      height: 30,
      rotation: 0,
      scale: 1,
    }
    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
  }

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(
      elements.map((el) => {
        if (el.id === id) {
          const updated = { ...el, ...updates }
          // Constrain position within phone case bounds
          updated.x = Math.max(0, Math.min(160, updated.x))
          updated.y = Math.max(0, Math.min(280, updated.y))
          return updated
        }
        return el
      }),
    )
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const handleDragStart = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault()
    const element = elements.find((el) => el.id === elementId)
    if (!element) return

    setIsDragging(true)
    setSelectedElement(elementId)

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return

    const phoneRect = e.currentTarget.getBoundingClientRect()
    const newX = ((e.clientX - phoneRect.left - dragOffset.x) / phoneRect.width) * 192
    const newY = ((e.clientY - phoneRect.top - dragOffset.y) / phoneRect.height) * 320

    updateElement(selectedElement, { x: newX, y: newY })
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const applyCrop = () => {
    if (selectedElement && cropMode) {
      const element = elements.find((el) => el.id === selectedElement)
      if (element && element.type === "image") {
        // Apply crop area to the image
        updateElement(selectedElement, {
          width: cropArea.width,
          height: cropArea.height,
        })
      }
    }
    setCropMode(false)
  }

  const canProceed = () => {
    const stepName = getCurrentStepName()

    switch (stepName) {
      case "Design Mode Selection":
        return selectedDesignMode !== null
      case "Brand Selection":
        return selectedBrand !== null
      case "Model Selection":
        return selectedModel !== null
      case "Upload Screen":
        return uploadedImage !== null
      case "Upload Screen (Optional)":
        return true // Optional step, can proceed without upload
      case "Use As":
        return useAs !== null
      case "Collection Background":
        return selectedCollection !== null
      case "Phrase Selection":
        return selectedPhrase !== null
      case "AI Styling":
        return aiStyle !== null
      case "Trending":
        return true
      case "Load Preset":
        return selectedPreset !== null
      case "Collections & Stickers":
      case "Stickers & Text":
        return true
      case "Customisation":
        return true
      case "Preview":
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    const steps = getCurrentSteps()
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDesignModeSelect = (mode: string) => {
    setSelectedDesignMode(mode)
    setCurrentFlow(mode as "photo-design" | "collections-first" | "collections-only" | "sayit")
  }

  const handleTrendingEntry = () => {
    setCurrentFlow("trending")
    setCurrentStep(0)
  }

  const renderStepContent = () => {
    const stepName = getCurrentStepName()

    switch (stepName) {
      case "Design Mode Selection":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">CHOOSE DESIGN MODE</h2>
              <p className="text-muted-foreground">Select how you want to create your case</p>
            </div>

            <div className="space-y-4">
              {designModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={selectedDesignMode === mode.id ? "default" : "outline"}
                  className="w-full h-20 flex items-center justify-start p-6 rounded-3xl border-2"
                  onClick={() => handleDesignModeSelect(mode.id)}
                >
                  <mode.icon className="h-8 w-8 mr-4" />
                  <div className="text-left">
                    <div className="font-medium text-lg">{mode.name}</div>
                    <div className="text-sm text-muted-foreground">{mode.description}</div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="text-center">
              <Button variant="ghost" className="rounded-full" onClick={handleTrendingEntry}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Browse Trending Designs
              </Button>
            </div>
          </div>
        )

      case "Brand Selection":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">SELECT YOUR PHONE BRAND</h2>
              <p className="text-muted-foreground">Choose your phone brand to continue</p>
            </div>

            <div className="space-y-4">
              {brands.map((brand) => (
                <Button
                  key={brand.id}
                  variant={selectedBrand === brand.id ? "default" : "outline"}
                  className="w-full h-20 flex items-center justify-start p-6 rounded-3xl border-2"
                  onClick={() => setSelectedBrand(brand.id)}
                >
                  <div className="text-4xl mr-4">{brand.icon}</div>
                  <div className="text-left">
                    <div className="font-medium text-lg">{brand.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {devicesByBrand[brand.id as keyof typeof devicesByBrand]?.length} models available
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )

      case "Model Selection":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">SELECT YOUR PHONE MODEL</h2>
              <p className="text-muted-foreground">
                Choose your {brands.find(b => b.id === selectedBrand)?.name} model
              </p>
            </div>

            {selectedBrand && (
              <div className="space-y-4">
                {devicesByBrand[selectedBrand as keyof typeof devicesByBrand]?.map((device) => (
                  <Button
                    key={device.id}
                    variant={selectedModel === device.id ? "default" : "outline"}
                    className="w-full h-24 flex items-center justify-between p-6 rounded-3xl border-2"
                    onClick={() => setSelectedModel(device.id)}
                    disabled={!device.available}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-20 bg-muted rounded-lg mr-4 flex items-center justify-center">
                        <div className="w-8 h-14 bg-foreground/20 rounded-md"></div>
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-lg">{device.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {device.available ? "Available" : "Coming Soon"}
                        </div>
                      </div>
                    </div>
                    {selectedModel === device.id && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )

      case "Upload Screen":
      case "Upload Screen (Optional)":
        const isOptional = stepName === "Upload Screen (Optional)"
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">
                {isOptional ? "ADD A PHOTO (OPTIONAL)" : "UPLOAD YOUR PHOTO"}
              </h2>
              <p className="text-muted-foreground">
                {isOptional
                  ? "You can add a photo to your collection design or skip this step"
                  : "Add the photo you want on your case"
                }
              </p>
            </div>

            {!uploadedImage ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-3xl p-12 text-center">
                <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <p className="text-lg text-muted-foreground mb-6">Drag & drop or click to upload</p>
                <Button size="lg" className="rounded-full" onClick={() => fileInputRef.current?.click()}>
                  <Camera className="h-5 w-5 mr-2" />
                  Choose Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-muted/30 rounded-3xl p-8 flex items-center justify-center">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded"
                    className="max-w-48 max-h-48 object-cover rounded-2xl"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent rounded-2xl border-2"
                  onClick={() => setUploadedImage(null)}
                >
                  Upload Different Photo
                </Button>
              </div>
            )}
          </div>
        )

      case "Phrase Selection":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">CHOOSE YOUR PHRASE</h2>
              <p className="text-muted-foreground">Select a phrase or type your own</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {phrases.map((phrase) => (
                <Button
                  key={phrase}
                  variant={selectedPhrase === phrase ? "default" : "outline"}
                  className="h-14 rounded-2xl border-2"
                  onClick={() => setSelectedPhrase(phrase)}
                >
                  {phrase}
                </Button>
              ))}
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-3xl p-6 text-center">
              <Type className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-3">Or type your own phrase</p>
              <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                Custom Text
              </Button>
            </div>
          </div>
        )

      case "AI Styling":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">AI STYLING</h2>
              <p className="text-muted-foreground">Choose how AI should style "{selectedPhrase}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aiStyles.map((style) => (
                <Button
                  key={style.id}
                  variant={aiStyle === style.id ? "default" : "outline"}
                  className="h-24 p-4 flex flex-col rounded-2xl border-2"
                  onClick={() => setAiStyle(style.id)}
                >
                  <div className={`w-full h-8 rounded-xl bg-gradient-to-r ${style.preview} mb-2`}></div>
                  <span className="text-sm font-medium">{style.name}</span>
                </Button>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
              <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">AI will generate a unique design based on your selections</p>
            </div>
          </div>
        )

      case "Collection Background":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">CHOOSE COLLECTION BACKGROUND</h2>
              <p className="text-muted-foreground">Select a collection background for your design</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {collections.map((collection) => (
                <Button
                  key={collection.id}
                  variant={selectedCollection === collection.id ? "default" : "outline"}
                  className="h-24 p-4 flex flex-col rounded-2xl border-2"
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  <div className={`w-full h-12 rounded-xl bg-gradient-to-r ${collection.color} mb-2`}></div>
                  <span className="text-sm font-medium">{collection.name}</span>
                </Button>
              ))}
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-3xl p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-3">Or upload custom collection background</p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-transparent"
                onClick={() => collectionUploadRef.current?.click()}
              >
                Choose File
              </Button>
              <input
                ref={collectionUploadRef}
                type="file"
                accept="image/*"
                onChange={handleCollectionUpload}
                className="hidden"
              />
            </div>
          </div>
        )

      case "Trending":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">TRENDING DESIGNS</h2>
              <p className="text-muted-foreground">Popular designs this week</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {trendingPresets.map((preset) => (
                <Button
                  key={preset.id}
                  variant="outline"
                  className="h-32 p-4 flex flex-col rounded-2xl border-2 bg-transparent"
                  onClick={() => {
                    setSelectedPreset(preset.id)
                    setCurrentStep(1)
                  }}
                >
                  <div className={`w-full h-16 rounded-xl bg-gradient-to-r ${preset.preview} mb-2`}></div>
                  <span className="text-xs font-medium text-center">{preset.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )

      case "Load Preset":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">LOADING PRESET</h2>
              <p className="text-muted-foreground">
                Setting up "{trendingPresets.find((p) => p.id === selectedPreset)?.name}"
              </p>
            </div>

            <div className="bg-muted/30 rounded-3xl p-8 text-center">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Preparing your design...</p>
            </div>
          </div>
        )

      case "Use As":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">USE AS</h2>
              <p className="text-muted-foreground">How would you like to use your uploaded image?</p>
            </div>

            <div className="space-y-4">
              <Button
                variant={useAs === "background" ? "default" : "outline"}
                className="w-full h-20 flex items-center justify-start p-6 rounded-3xl border-2"
                onClick={() => setUseAs("background")}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mr-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary/40 rounded-lg"></div>
                </div>
                <div className="text-left">
                  <div className="font-medium text-lg">Background</div>
                  <div className="text-sm text-muted-foreground">Full cover design with crop/scale options</div>
                </div>
              </Button>

              <Button
                variant={useAs === "sticker" ? "default" : "outline"}
                className="w-full h-20 flex items-center justify-start p-6 rounded-3xl border-2"
                onClick={() => setUseAs("sticker")}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl mr-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-secondary/60 rounded-full"></div>
                </div>
                <div className="text-left">
                  <div className="font-medium text-lg">Sticker</div>
                  <div className="text-sm text-muted-foreground">Resizable overlay with shape options</div>
                </div>
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
              <p className="text-sm text-blue-800">
                {useAs === "background"
                  ? "Your image will cover the entire case and can be cropped to fit perfectly"
                  : useAs === "sticker"
                    ? "Your image will be added as a movable sticker with various shape options"
                    : "Choose how you want to use your uploaded image"}
              </p>
            </div>
          </div>
        )

      case "Collections & Stickers":
      case "Stickers & Text":
        const stepName2 = getCurrentStepName()
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">
                {stepName2 === "Collections & Stickers" ? "COLLECTIONS & STICKERS" : "STICKERS & TEXT"}
              </h2>
              <p className="text-muted-foreground">
                {stepName2 === "Collections & Stickers"
                  ? "Add collection backgrounds and stickers to your design"
                  : "Add stickers and text to your collection background"}
              </p>
            </div>

            {stepName2 === "Collections & Stickers" && (
              <>
                <div className="text-center text-xs text-muted-foreground mb-4">COLLECTION BACKGROUNDS</div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {collections.slice(0, 6).map((collection) => (
                    <Button
                      key={collection.id}
                      variant={selectedCollection === collection.id ? "default" : "outline"}
                      className="h-20 p-3 flex flex-col rounded-2xl border-2"
                      onClick={() => setSelectedCollection(collection.id)}
                    >
                      <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${collection.color} mb-1`}></div>
                      <span className="text-xs font-medium">{collection.name}</span>
                    </Button>
                  ))}
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-3xl p-6 text-center mb-6">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">Upload Custom Background</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent"
                    onClick={() => backgroundUploadRef.current?.click()}
                  >
                    Choose File
                  </Button>
                  <input
                    ref={backgroundUploadRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="hidden"
                  />
                </div>
              </>
            )}

            <div className="text-center text-xs text-muted-foreground mb-4">STICKERS</div>
            <div className="grid grid-cols-6 gap-2">
              {stickers.slice(0, 12).map((sticker) => (
                <Button
                  key={sticker.id}
                  variant="outline"
                  className="h-12 text-lg bg-transparent hover:bg-muted/50 rounded-xl border-2"
                  onClick={() => addSticker(sticker)}
                >
                  {sticker.emoji}
                </Button>
              ))}
            </div>
          </div>
        )

      case "Customisation":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">CUSTOMISATION</h2>
              <p className="text-muted-foreground">Fine-tune your design</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Photo Shape & Position</Label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { id: "original", name: "Original", icon: Crop },
                    { id: "circle", name: "Circle", icon: Move },
                    { id: "square", name: "Square", icon: RotateCw },
                  ].map((shape) => (
                    <Button
                      key={shape.id}
                      variant={imageShape === shape.id ? "default" : "outline"}
                      className="h-14 flex flex-col rounded-2xl border-2"
                      onClick={() => setImageShape(shape.id)}
                    >
                      <shape.icon className="h-4 w-4 mb-1" />
                      <span className="text-xs">{shape.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {selectedElement && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Selected Element</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
                      onClick={() => deleteElement(selectedElement)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Size</Label>
                      <Slider
                        value={[elements.find((el) => el.id === selectedElement)?.scale || 1]}
                        onValueChange={([value]) => updateElement(selectedElement, { scale: value })}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Rotation</Label>
                      <Slider
                        value={[elements.find((el) => el.id === selectedElement)?.rotation || 0]}
                        onValueChange={([value]) => updateElement(selectedElement, { rotation: value })}
                        min={-180}
                        max={180}
                        step={15}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "Preview":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl mb-2">PREVIEW & FINALIZE</h2>
              <p className="text-muted-foreground">Review your design and complete your order</p>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/30 rounded-3xl p-6">
                <h3 className="font-medium mb-3">Design Summary</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Design Mode:{" "}
                    {selectedDesignMode === "photo-design"
                      ? "Photo + Design"
                      : selectedDesignMode === "collections-first"
                        ? "Collections First"
                        : selectedDesignMode === "collections-only"
                          ? "Collections Only"
                          : selectedDesignMode === "sayit"
                            ? "Say It!"
                            : "Trending"}
                  </p>
                  {selectedBrand && selectedModel && (
                    <p>
                      Phone: {brands.find(b => b.id === selectedBrand)?.name} {devicesByBrand[selectedBrand as keyof typeof devicesByBrand]?.find(d => d.id === selectedModel)?.name}
                    </p>
                  )}
                  {selectedCollection && (
                    <p>Collection: {collections.find(c => c.id === selectedCollection)?.name}</p>
                  )}
                  {selectedPhrase && <p>Phrase: {selectedPhrase}</p>}
                  {aiStyle && <p>AI Style: {aiStyles.find((s) => s.id === aiStyle)?.name}</p>}
                  {selectedPreset && <p>Preset: {trendingPresets.find((p) => p.id === selectedPreset)?.name}</p>}
                  <p>Elements: {elements.length}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent rounded-2xl border-2">
                  <Save className="h-4 w-4 mr-2" />
                  Save Design
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent rounded-2xl border-2">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button className="w-full h-14 rounded-2xl">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart - $29.99
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-heading text-lg">
              STEP {currentStep + 1} OF {getCurrentSteps().length} – {getCurrentStepName().toUpperCase()}
            </h1>
            <Badge variant="secondary" className="rounded-full">
              {Math.round(((currentStep + 1) / getCurrentSteps().length) * 100)}%
            </Badge>
          </div>
          <Progress value={((currentStep + 1) / getCurrentSteps().length) * 100} className="h-2 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8">{renderStepContent()}</div>

          {currentFlow && getCurrentStepName() !== "Design Mode Selection" && getCurrentStepName() !== "Brand Selection" && getCurrentStepName() !== "Trending" && (
            <div className="bg-muted/30 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-center">
                {selectedModel ? (
                  <div className="text-center">
                    <div className="mb-4">
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">
                        {brands.find(b => b.id === selectedBrand)?.name} {devicesByBrand[selectedBrand as keyof typeof devicesByBrand]?.find(d => d.id === selectedModel)?.name}
                      </h3>
                    </div>
                    <div
                      className="relative bg-card rounded-[2.5rem] shadow-xl border-2 border-muted-foreground/20 overflow-hidden cursor-pointer mx-auto"
                      style={{
                        width: `${devicesByBrand[selectedBrand as keyof typeof devicesByBrand]?.find(d => d.id === selectedModel)?.dimensions.width || 192}px`,
                        height: `${devicesByBrand[selectedBrand as keyof typeof devicesByBrand]?.find(d => d.id === selectedModel)?.dimensions.height || 320}px`
                      }}
                      onMouseMove={handleDragMove}
                      onMouseUp={handleDragEnd}
                      onMouseLeave={handleDragEnd}
                    >
                      <div className="absolute inset-3 bg-white rounded-[2rem] overflow-hidden">
                    {selectedCollection && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${collections.find((c) => c.id === selectedCollection)?.color}`}
                      ></div>
                    )}
                    {selectedBackground && selectedBackground !== "none" && !selectedCollection && (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: backgrounds.find((bg) => bg.id === selectedBackground)?.preview,
                        }}
                      ></div>
                    )}

                    <svg width="100%" height="100%" viewBox="0 0 192 320" className="absolute inset-0">
                      {elements.map((element) => (
                        <g key={element.id}>
                          {element.type === "image" && element.src ? (
                            <image
                              href={element.src}
                              x={element.x}
                              y={element.y}
                              width={element.width * (element.scale || 1)}
                              height={element.height * (element.scale || 1)}
                              transform={`rotate(${element.rotation} ${element.x + element.width / 2} ${element.y + element.height / 2})`}
                              className={`cursor-move ${selectedElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                              onMouseDown={(e) => handleDragStart(e as any, element.id)}
                              onClick={() => setSelectedElement(element.id)}
                              clipPath={
                                imageShape === "circle"
                                  ? "circle(50%)"
                                  : imageShape === "square"
                                    ? "inset(0 round 8px)"
                                    : "none"
                              }
                            />
                          ) : (
                            <text
                              x={element.x}
                              y={element.y + element.height}
                              fontSize={element.width * (element.scale || 1)}
                              transform={`rotate(${element.rotation} ${element.x + element.width / 2} ${element.y + element.height / 2})`}
                              className={`cursor-move select-none ${selectedElement === element.id ? "drop-shadow-lg" : ""}`}
                              onMouseDown={(e) => handleDragStart(e as any, element.id)}
                              onClick={() => setSelectedElement(element.id)}
                            >
                              {element.content}
                            </text>
                          )}
                        </g>
                      ))}
                    </svg>
                  </div>

                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    <div className="w-48 h-80 bg-muted/50 rounded-[2.5rem] mx-auto flex items-center justify-center">
                      <p className="text-sm">Select a phone model to preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1 bg-transparent rounded-2xl border-2"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={nextStep}
              disabled={!canProceed() || currentStep === getCurrentSteps().length - 1}
              className="flex-1 rounded-2xl"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
