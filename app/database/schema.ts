export interface ProductionOrder {
  id: number
  finished_goods: string
  produced_quantity: number
  raw_materials: string
  due_date: string
  storage_location: string
  status: "pending" | "in-progress" | "completed"
}

export const CREATE_PRODUCTION_ORDERS_TABLE = `
  CREATE TABLE IF NOT EXISTS production_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    finished_goods TEXT NOT NULL,
    produced_quantity INTEGER NOT NULL,
    raw_materials TEXT NOT NULL,
    due_date TEXT NOT NULL,
    storage_location TEXT NOT NULL,
    status TEXT CHECK(status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending'
  );
`

export const SAMPLE_DATA = [
  {
    finished_goods: "Chocolate Chip Cookies",
    produced_quantity: 10,
    raw_materials: "Flour, Sugar, Chocolate Chips, Butter, Eggs",
    due_date: "2024-10-12",
    storage_location: "Warehouse B",
    status: "pending",
  },
  {
    finished_goods: "Vanilla Cupcakes",
    produced_quantity: 24,
    raw_materials: "Flour, Sugar, Vanilla Extract, Butter, Eggs",
    due_date: "2024-10-15",
    storage_location: "Warehouse A",
    status: "in-progress",
  },
  {
    finished_goods: "Blueberry Muffins",
    produced_quantity: 12,
    raw_materials: "Flour, Sugar, Blueberries, Butter, Eggs",
    due_date: "2024-10-08",
    storage_location: "Warehouse C",
    status: "completed",
  },
  {
    finished_goods: "Strawberry Muffins",
    produced_quantity: 12,
    raw_materials: "Flour, Sugar, Blueberries, Butter, Eggs",
    due_date: "2024-10-08",
    storage_location: "Warehouse C",
    status: "completed",
  },
  {
    finished_goods: "Grape Muffins",
    produced_quantity: 12,
    raw_materials: "Flour, Sugar, Blueberries, Butter, Eggs",
    due_date: "2024-10-08",
    storage_location: "Warehouse C",
    status: "completed",
  },
  {
    finished_goods: "Apple Muffins",
    produced_quantity: 12,
    raw_materials: "Flour, Sugar, Blueberries, Butter, Eggs",
    due_date: "2024-10-08",
    storage_location: "Warehouse C",
    status: "completed",
  },
  {
    finished_goods: "Strawberry Muffins",
    produced_quantity: 12,
    raw_materials: "Flour, Sugar, Strawberries, Butter, Eggs",
    due_date: "2024-10-08",
    storage_location: "Warehouse C",
    status: "completed",
  },
  {
    finished_goods: "Mixed Berry Muffins",
    produced_quantity: 12,
    raw_materials: "Flour, Sugar, Blueberries, Butter, Eggs",
    due_date: "2024-10-08",
    storage_location: "Warehouse C",
    status: "completed",
  },
]
