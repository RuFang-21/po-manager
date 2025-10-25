import { useEffect, useState, useCallback } from "react"

import { databaseService } from "../database/database"
import { ProductionOrder } from "../database/schema"

export const useOrders = () => {
  const [orders, setOrders] = useState<ProductionOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await databaseService.init() // Ensure database is initialized
      const data = await databaseService.getAllProductionOrders()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders")
      console.error("Error loading orders:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const updateStatus = useCallback(
    async (id: number, status: "pending" | "in-progress" | "completed") => {
      try {
        await databaseService.updateProductionOrderStatus(id, status)
        await loadOrders() // Refresh the list
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update status")
        console.error("Error updating status:", err)
      }
    },
    [loadOrders],
  )

  const searchOrders = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await databaseService.searchProductionOrders(query)
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search orders")
      console.error("Error searching orders:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const filterByStatus = useCallback(async (status: "pending" | "in-progress" | "completed") => {
    try {
      setLoading(true)
      setError(null)
      const data = await databaseService.filterByStatus(status)
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to filter orders")
      console.error("Error filtering orders:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshOrders = useCallback(async () => {
    console.log("Manually refreshing orders...")
    await loadOrders()
  }, [loadOrders])

  return {
    orders,
    loading,
    error,
    loadOrders,
    refreshOrders,
    updateStatus,
    searchOrders,
    filterByStatus,
  }
}

export const useOrderById = (id: string) => {
  const [order, setOrder] = useState<ProductionOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadOrder = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      await databaseService.init() // Ensure database is initialized
      console.log("Loading order with ID:", id, "Type:", typeof id)
      const numericId = parseInt(id)
      console.log("Parsed ID:", numericId, "Is valid:", !isNaN(numericId))
      const data = await databaseService.getProductionOrderById(numericId)
      console.log("Order data retrieved:", data)
      setOrder(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order")
      console.error("Error loading order:", err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadOrder()
  }, [loadOrder])

  const updateStatus = async (status: "pending" | "in-progress" | "completed") => {
    try {
      if (!order) {
        throw new Error("No order loaded")
      }

      console.log("Updating status from", order.status, "to", status, "for order ID", order.id)
      setLoading(true)

      await databaseService.updateProductionOrderStatus(order.id, status)
      console.log("Status updated successfully, reloading order...")

      setOrder({ ...order, status })

      await loadOrder()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update status"
      setError(errorMessage)
      console.error("Error updating status:", err)

      alert(`Failed to update status: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    order,
    loading,
    error,
    loadOrder,
    updateStatus,
  }
}
