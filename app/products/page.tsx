"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Shield, Smartphone, Truck, Award, Heart } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])

  const products = [
    {
      id: 1,
      name: "Premium Silicone Case",
      price: "$24.99",
      originalPrice: "$29.99",
      rating: 4.8,
      reviews: 1247,
      features: ["Drop Protection", "Wireless Charging", "Easy Grip"],
      image: "premium-silicone-case",
      category: "silicone",
      colors: ["Black", "White", "Blue", "Pink", "Clear"],
      compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14", "Samsung S24"],
      description: "Premium silicone material with enhanced grip and wireless charging compatibility.",
    },
    {
      id: 2,
      name: "Clear Crystal Case",
      price: "$19.99",
      originalPrice: "$24.99",
      rating: 4.6,
      reviews: 892,
      features: ["Crystal Clear", "Anti-Yellow", "Slim Profile"],
      image: "clear-crystal-case",
      category: "clear",
      colors: ["Clear", "Frosted", "Tinted"],
      compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14", "Samsung S24"],
      description: "Ultra-clear protection that showcases your phone's original design.",
    },
    {
      id: 3,
      name: "Tough Armor Case",
      price: "$34.99",
      originalPrice: "$39.99",
      rating: 4.9,
      reviews: 2156,
      features: ["Military Grade", "Kickstand", "Screen Protection"],
      image: "tough-armor-case",
      category: "rugged",
      colors: ["Black", "Navy", "Red", "Gray"],
      compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14", "Samsung S24"],
      description: "Maximum protection with military-grade materials and built-in kickstand.",
    },
    {
      id: 4,
      name: "Leather Wallet Case",
      price: "$39.99",
      originalPrice: "$49.99",
      rating: 4.7,
      reviews: 634,
      features: ["Card Slots", "Premium Leather", "Magnetic Closure"],
      image: "leather-wallet-case",
      category: "wallet",
      colors: ["Brown", "Black", "Tan", "Navy"],
      compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14"],
      description: "Genuine leather wallet case with multiple card slots and magnetic closure.",
    },
    {
      id: 5,
      name: "MagSafe Compatible Case",
      price: "$27.99",
      originalPrice: "$32.99",
      rating: 4.8,
      reviews: 1089,
      features: ["MagSafe Ready", "Wireless Charging", "Magnetic Mount"],
      image: "magsafe-case",
      category: "magsafe",
      colors: ["Black", "White", "Blue", "Purple"],
      compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14"],
      description: "Perfect MagSafe compatibility with strong magnetic connection.",
    },
    {
      id: 6,
      name: "Eco-Friendly Case",
      price: "$22.99",
      originalPrice: "$27.99",
      rating: 4.5,
      reviews: 456,
      features: ["Biodegradable", "Plant-Based", "Compostable"],
      image: "eco-case",
      category: "eco",
      colors: ["Natural", "Green", "Brown"],
      compatibility: ["iPhone 15", "iPhone 15 Pro", "iPhone 14", "Samsung S24"],
      description: "Environmentally friendly case made from plant-based materials.",
    },
  ]

  const categories = [
    { id: "all", name: "All Cases", count: products.length },
    { id: "silicone", name: "Silicone", count: products.filter((p) => p.category === "silicone").length },
    { id: "clear", name: "Clear", count: products.filter((p) => p.category === "clear").length },
    { id: "rugged", name: "Rugged", count: products.filter((p) => p.category === "rugged").length },
    { id: "wallet", name: "Wallet", count: products.filter((p) => p.category === "wallet").length },
    { id: "magsafe", name: "MagSafe", count: products.filter((p) => p.category === "magsafe").length },
    { id: "eco", name: "Eco-Friendly", count: products.filter((p) => p.category === "eco").length },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-40 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Product Catalog
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Phone Case Collection</h1>
          <p className="text-xl text-muted-foreground">Premium protection meets custom design</p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={`/modern-phone-case-mockup-with-custom-design.jpg?height=300&width=300&query=${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(product.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="destructive" className="text-xs">
                        Sale
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="text-right">
                    <div className="font-bold">{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span className="text-sm">{product.compatibility.length} phone models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">{product.colors.length} color options</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link href={`/customize?product=${product.id}`}>Customize This Case</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">Free shipping on orders over $25</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lifetime Warranty</h3>
              <p className="text-sm text-muted-foreground">We stand behind our quality</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Only the finest materials used</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
