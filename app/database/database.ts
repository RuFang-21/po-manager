import * as SQLite from "expo-sqlite"

import { ProductionOrder, CREATE_PRODUCTION_ORDERS_TABLE, SAMPLE_DATA } from "./schema"

let db: SQLite.SQLiteDatabase | null = null

export const initDatabase = async () => {
  if (db) {
    console.log("Database already initialized")
    return
  }

  try {
    console.log("Initializing database...")
    db = await SQLite.openDatabaseAsync("production_orders.db")

    if (!db) throw new Error("Failed to open database")

    await createTables()
    await insertSampleData()
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
    db = null
    throw error
  }
}

const createTables = async () => {
  if (!db) throw new Error("Database not initialized")
  await db.execAsync(CREATE_PRODUCTION_ORDERS_TABLE)
}

const insertSampleData = async () => {
  if (!db) throw new Error("Database not initialized")

  const count = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM production_orders",
  )

  if (count?.count === 0) {
    for (const item of SAMPLE_DATA) {
      await db.runAsync(
        `INSERT INTO production_orders (finished_goods, produced_quantity, raw_materials, due_date, storage_location, status) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        item.finished_goods,
        item.produced_quantity,
        item.raw_materials,
        item.due_date,
        item.storage_location,
        item.status,
      )
    }
    console.log("Sample data inserted")
  }
}

export const getAllProductionOrders = async () => {
  if (!db) throw new Error("Database not initialized")
  return await db.getAllAsync<ProductionOrder>("SELECT * FROM production_orders ORDER BY id DESC")
}

export const getProductionOrderById = async (id: number) => {
  if (!db) throw new Error("Database not initialized")
  return await db.getFirstAsync<ProductionOrder>("SELECT * FROM production_orders WHERE id = ?", id)
}

export const updateProductionOrderStatus = async (
  id: number,
  status: "pending" | "in progress" | "completed",
) => {
  if (!db) {
    console.log("Database not initialized, initializing now...")
    await initDatabase()
  }

  if (!db) throw new Error("Database initialization failed")

  console.log("Database: Updating order ID", id, "to status", status)

  const existingOrder = await db.getFirstAsync<{ id: number }>(
    "SELECT id FROM production_orders WHERE id = ?",
    id,
  )

  if (!existingOrder) {
    throw new Error(`Order with ID ${id} not found`)
  }

  const result = await db.runAsync(
    "UPDATE production_orders SET status = ? WHERE id = ?",
    status,
    id,
  )

  console.log("Database: Update result", result)

  if (result.changes === 0) {
    throw new Error(`No rows updated for order ID ${id}`)
  }
}

export const searchProductionOrders = async (query: string) => {
  if (!db) throw new Error("Database not initialized")
  return await db.getAllAsync<ProductionOrder>(
    `SELECT * FROM production_orders 
     WHERE finished_goods LIKE ? OR status LIKE ? 
     ORDER BY id DESC`,
    `%${query}%`,
    `%${query}%`,
  )
}

export const filterByStatus = async (status: "pending" | "in progress" | "completed") => {
  if (!db) throw new Error("Database not initialized")
  return await db.getAllAsync<ProductionOrder>(
    "SELECT * FROM production_orders WHERE status = ? ORDER BY id DESC",
    status,
  )
}

export const createProductionOrder = async (order: Omit<ProductionOrder, "id">) => {
  if (!db) throw new Error("Database not initialized")
  const result = await db.runAsync(
    `INSERT INTO production_orders (finished_goods, produced_quantity, raw_materials, due_date, storage_location, status) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    order.finished_goods,
    order.produced_quantity,
    order.raw_materials,
    order.due_date,
    order.storage_location,
    order.status,
  )
  return result.lastInsertRowId
}

export const databaseService = {
  init: initDatabase,
  getAllProductionOrders,
  getProductionOrderById,
  updateProductionOrderStatus,
  searchProductionOrders,
  filterByStatus,
  createProductionOrder,
}
