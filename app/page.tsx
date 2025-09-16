import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Smartphone, Palette, Shield, Star } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const collections = [
    { name: "Monochrome", color: "bg-gradient-to-br from-gray-100 to-gray-300" },
    { name: "Streetwear", color: "bg-gradient-to-br from-orange-100 to-red-100" },
    { name: "Retro", color: "bg-gradient-to-br from-yellow-100 to-pink-100" },
    { name: "Graffiti", color: "bg-gradient-to-br from-purple-100 to-blue-100" },
    { name: "Festival", color: "bg-gradient-to-br from-green-100 to-blue-100" },
    { name: "Animal Print", color: "bg-gradient-to-br from-amber-100 to-orange-100" },
    { name: "Space", color: "bg-gradient-to-br from-indigo-100 to-purple-100" },
    { name: "Neon Cyber", color: "bg-gradient-to-br from-cyan-100 to-pink-100" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 blob-mint rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 blob-pink rounded-full opacity-30"></div>
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="w-fit mx-auto rounded-full px-6 py-2 font-medium">
              Custom Phone Cases
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-extra-bold text-balance leading-tight">
              Pimp Your
              <span className="text-foreground"> Phone Case</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto font-normal">
              Create stunning, personalized phone cases with our intuitive design tool. Choose from premium collections
              or start from scratch.
            </p>
            <Button size="lg" className="text-lg px-8 rounded-3xl h-14 font-bold shadow-lg" asChild>
              <Link href="/customize">
                Start Designing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Collections</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
              {collections.map((collection, index) => (
                <Link key={index} href="/templates" className="flex-shrink-0">
                  <Card className="w-32 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer rounded-3xl border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className={`aspect-square ${collection.color} rounded-t-3xl`}></div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-center">{collection.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/20">
        <div className="absolute top-0 left-1/4 w-32 h-32 blob-green rounded-full opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Palette,
                title: "Easy Design",
                description: "Drag & drop interface",
              },
              {
                icon: Shield,
                title: "Premium Quality",
                description: "Durable materials",
              },
              {
                icon: Smartphone,
                title: "Perfect Fit",
                description: "All phone models",
              },
              {
                icon: Star,
                title: "High Quality",
                description: "Vibrant prints",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-3xl border-0 shadow-md bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <feature.icon className="h-10 w-10 text-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 blob-green rounded-full opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-extra-bold mb-4">Ready to Create?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto font-medium">
            Join thousands who've designed their perfect phone case
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 rounded-3xl h-14 font-bold shadow-lg" asChild>
            <Link href="/customize">
              Start Your Design <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
