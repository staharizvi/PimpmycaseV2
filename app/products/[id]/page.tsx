import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Shield, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const getProduct = (id: string) => {
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
      detailedDescription:
        "Our Premium Silicone Case offers the perfect balance of protection and style. Made from high-quality silicone material, it provides excellent grip while maintaining a slim profile. The case is fully compatible with wireless charging and features precise cutouts for all ports and buttons.",
      specifications: {
        Material: "Premium Silicone",
        "Drop Protection": "Up to 6 feet",
        "Wireless Charging": "Compatible",
        Weight: "45g",
        Thickness: "1.2mm",
      },
    },
  ]

  return products.find((p) => p.id === Number.parseInt(id))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)

  if (!product) {
    notFound()
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
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
              <img
                src={`/modern-phone-case-mockup-with-custom-design.jpg?height=500&width=500&query=${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                >
                  <img
                    src={`/modern-phone-case-mockup-with-custom-design.jpg?height=100&width=100&query=${product.image} angle ${i}`}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    Save{" "}
                    {Math.round(
                      ((Number.parseFloat(product.originalPrice.slice(1)) - Number.parseFloat(product.price.slice(1))) /
                        Number.parseFloat(product.originalPrice.slice(1))) *
                        100,
                    )}
                    %
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-lg text-muted-foreground">{product.detailedDescription}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Available Colors</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button key={color} variant="outline" size="sm">
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Compatible Devices</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((device) => (
                    <Badge key={device} variant="secondary">
                      {device}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href={`/customize?product=${product.id}`}>Customize This Case</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-4">
                <div className="grid gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4">
                <div className="grid gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Reviews coming soon!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
