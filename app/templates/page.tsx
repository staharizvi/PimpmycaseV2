"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart, Eye, Download } from "lucide-react"
import Link from "next/link"

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = ["All", "Abstract", "Nature", "Minimalist", "Typography", "Vintage", "Geometric"]

  const templates = [
    {
      id: 1,
      name: "Sunset Gradient",
      category: "Abstract",
      price: "Free",
      downloads: 1247,
      description: "Beautiful gradient sunset colors",
      tags: ["gradient", "sunset", "warm", "abstract"],
    },
    {
      id: 2,
      name: "Forest Path",
      category: "Nature",
      price: "$2.99",
      downloads: 892,
      description: "Serene forest pathway design",
      tags: ["nature", "forest", "green", "peaceful"],
    },
    {
      id: 3,
      name: "Clean Lines",
      category: "Minimalist",
      price: "Free",
      downloads: 2156,
      description: "Simple geometric lines",
      tags: ["minimal", "clean", "geometric", "simple"],
    },
    {
      id: 4,
      name: "Bold Quote",
      category: "Typography",
      price: "$1.99",
      downloads: 634,
      description: "Inspirational typography design",
      tags: ["typography", "quote", "bold", "text"],
    },
    {
      id: 5,
      name: "Retro Vibes",
      category: "Vintage",
      price: "$2.99",
      downloads: 1089,
      description: "80s inspired retro aesthetic",
      tags: ["retro", "80s", "vintage", "neon"],
    },
    {
      id: 6,
      name: "Hex Pattern",
      category: "Geometric",
      price: "Free",
      downloads: 1456,
      description: "Modern hexagonal pattern",
      tags: ["geometric", "hexagon", "pattern", "modern"],
    },
    {
      id: 7,
      name: "Ocean Waves",
      category: "Abstract",
      price: "$1.99",
      downloads: 987,
      description: "Flowing ocean wave design",
      tags: ["ocean", "waves", "blue", "flowing"],
    },
    {
      id: 8,
      name: "Mountain View",
      category: "Nature",
      price: "$2.99",
      downloads: 743,
      description: "Majestic mountain landscape",
      tags: ["mountain", "landscape", "nature", "scenic"],
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (templateId: number) => {
    setFavorites((prev) => (prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]))
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/12 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Template Gallery
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Choose Your Template</h1>
          <p className="text-xl text-muted-foreground">Browse our collection of professionally designed templates</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Sort by Popular
            </Button>
            <Button variant="outline">Price: Low to High</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg relative overflow-hidden">
                  <img
                    src={`/abstract-geometric-shapes.png?height=320&width=240&query=${template.name} phone case template`}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={`/customize?template=${template.id}`}>Use Template</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(template.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(template.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      {template.downloads}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {template.price}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/customize?template=${template.id}`}>Use Template</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
