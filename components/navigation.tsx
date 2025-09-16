"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Smartphone, User, ShoppingCart } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/customize", label: "Design" },
    { href: "/templates", label: "Templates" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Smartphone className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-mono">Pimp My Case</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/customize">Start Designing</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/cart" onClick={() => setIsOpen(false)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/customize" onClick={() => setIsOpen(false)}>
                      Start Designing
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
