import { useEffect, useState } from "react"

import { databaseService } from "./database"
import { ProductionOrder } from "./schema"

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initDatabase()
  }, [])

  const initDatabase = async () => {
    try {
      await databaseService.init()
      setIsInitialized(true)
      await loadProductionOrders()
    } catch (error) {
      console.error("Failed to initialize database:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadProductionOrders = async () => {
    try {
      setLoading(true)
      const orders = await databaseService.getAllProductionOrders()
      setProductionOrders(orders)
    } catch (error) {
      console.error("Failed to load production orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id: number, status: "pending" | "in-progress" | "completed") => {
    try {
      await databaseService.updateProductionOrderStatus(id, status)
      await loadProductionOrders() // Refresh the list
    } catch (error) {
      console.error("Failed to update order status:", error)
    }
  }

  const searchOrders = async (query: string) => {
    try {
      setLoading(true)
      const orders = await databaseService.searchProductionOrders(query)
      setProductionOrders(orders)
    } catch (error) {
      console.error("Failed to search orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterByStatus = async (status: "pending" | "in-progress" | "completed") => {
    try {
      setLoading(true)
      const orders = await databaseService.filterByStatus(status)
      setProductionOrders(orders)
    } catch (error) {
      console.error("Failed to filter orders:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    isInitialized,
    productionOrders,
    loading,
    loadProductionOrders,
    updateOrderStatus,
    searchOrders,
    filterByStatus,
  }
}
