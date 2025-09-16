import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Truck, HeartHandshake } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: Award, label: "Years Experience", value: "8+" },
    { icon: Truck, label: "Orders Shipped", value: "200,000+" },
    { icon: HeartHandshake, label: "Satisfaction Rate", value: "99.2%" },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-32 right-32 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-accent/12 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Our Story
          </Badge>
          <h1 className="text-4xl font-bold mb-4">About Pimp My Case</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about helping you express your unique style through custom phone cases that combine premium
            protection with personal creativity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Pimp My Case, we believe your phone case should be as unique as you are. That's why we've created an
              intuitive design platform that makes it easy for anyone to create stunning, personalized phone cases.
            </p>
            <p className="text-lg text-muted-foreground">
              From our premium materials to our cutting-edge printing technology, every aspect of our process is
              designed to deliver exceptional quality that protects your device while showcasing your personal style.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
              <img
                src="/modern-phone-case-mockup-with-custom-design.jpg?height=400&width=400&query=team working on phone case designs"
                alt="Our team at work"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-12">What We Stand For</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality First",
              description:
                "We use only premium materials and state-of-the-art printing technology to ensure your case looks great and lasts long.",
            },
            {
              title: "Creative Freedom",
              description:
                "Our design tools give you complete creative control, whether you're uploading your own art or customizing our templates.",
            },
            {
              title: "Customer Care",
              description:
                "Your satisfaction is our priority. We're here to help every step of the way, from design to delivery.",
            },
          ].map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
