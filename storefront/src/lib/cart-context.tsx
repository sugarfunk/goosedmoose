"use client"

/**
 * Shopping Cart Context
 *
 * Manages cart state across the application using React Context.
 * Provides functions to:
 * - Add items to cart
 * - Remove items from cart
 * - Update quantities
 * - Get cart totals
 * - Sync with Medusa backend
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { medusaClient } from "./medusa-client"

interface CartItem {
  variantId: string
  productId: string
  title: string
  subtitle?: string
  variantTitle: string
  price: number
  quantity: number
  thumbnail?: string
}

interface CartContextType {
  cart: CartItem[]
  cartId: string | null
  itemCount: number
  total: number
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("goosedmoose_cart")
    const savedCartId = localStorage.getItem("goosedmoose_cart_id")

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing saved cart:", error)
      }
    }

    if (savedCartId) {
      setCartId(savedCartId)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("goosedmoose_cart", JSON.stringify(cart))
  }, [cart])

  // Calculate totals
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Add item to cart
  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.variantId === newItem.variantId
      )

      if (existingItem) {
        // Increment quantity if item already exists
        return prevCart.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...newItem, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeItem = (variantId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.variantId !== variantId))
  }

  // Update item quantity
  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    )
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
    setCartId(null)
    localStorage.removeItem("goosedmoose_cart")
    localStorage.removeItem("goosedmoose_cart_id")
  }

  const value = {
    cart,
    cartId,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
