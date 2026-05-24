import express, { Request, Response } from 'express'
import cors from 'cors'
import requestLoggerMiddleware from './middleware/requestLogger.middleware'
import userRoutes from './routes/user.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLoggerMiddleware)

app.use("/api", userRoutes)
app.use("/", (_: Request, res: Response) => res.sendStatus(404))

export default app