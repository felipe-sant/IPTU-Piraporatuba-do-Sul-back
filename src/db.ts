import { Client } from "pg"
import dotenv from "dotenv"

dotenv.config()

const username = process.env.PG_USERNAME
const password = process.env.PG_PASSWORD
const host = process.env.PG_HOST
const port = process.env.PG_PORT
const database = process.env.PG_DB

const db = new Client({
    connectionString: `postgresql://${username}:${password}@${host}:${port}/${database}`
})

db.connect()
    .then(() => console.log("🟢 Conectado ao PostgreSQL com sucesso!"))
    .catch((err: unknown) => console.error("🔴 Erro ao conectar:", err))

export default db