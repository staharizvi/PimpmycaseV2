"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  caseType: string
  phone: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Custom Sunset Design",
      caseType: "Premium Silicone",
      phone: "iPhone 15 Pro",
      price: 24.99,
      quantity: 1,
      image: "custom-sunset-design",
    },
    {
      id: 2,
      name: "Minimalist Quote",
      caseType: "Clear Crystal",
      phone: "iPhone 15",
      price: 19.99,
      quantity: 2,
      image: "minimalist-quote-design",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [promoError, setPromoError] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    setPromoError("")

    // Mock promo codes
    const validCodes = {
      SAVE10: 10,
      WELCOME15: 15,
      STUDENT20: 20,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes],
      })
      setPromoCode("")
    } else {
      setPromoError("Invalid promo code")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const total = subtotal + shipping - promoDiscount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background blobs */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Start designing your perfect phone case!</p>
            <Button asChild>
              <Link href="/customize">Start Designing</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <Badge variant="secondary" className="mb-4">
            Shopping Cart
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Your Cart</h1>
          <p className="text-xl text-muted-foreground">{cartItems.length} items ready for checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex-shrink-0">
                      <img
                        src={`/modern-phone-case-mockup-with-custom-design.jpg?height=96&width=96&query=${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{item.caseType}</p>
                      <p className="text-sm text-muted-foreground mb-3">{item.phone}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-muted/50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                {/* Promo Code Section */}
                <div className="space-y-3 mb-6">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{appliedPromo.code} applied</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={removePromoCode}>
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        />
                        <Button variant="outline" onClick={applyPromoCode}>
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <Alert variant="destructive">
                          <AlertDescription>{promoError}</AlertDescription>
                        </Alert>
                      )}
                      <div className="text-xs text-muted-foreground">Try: SAVE10, WELCOME15, STUDENT20</div>
                    </>
                  )}
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
