import { Request, Response } from "express";
import TestService from "../services/__test__.service";

class TestController {
    private testService = new TestService()

    /**
     * `POST | http://0.0.0.0:0000/api/test`
     */
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { text, number } = req.body

            if (!text) {
                res.status(401).json({ message: "text is required" })
                return
            }

            if (typeof text !== "string") {
                res.status(401).json({ message: "The text must be of type string." })
                return
            }

            if (!number) {
                res.status(401).json({ message: "number is required" })
                return
            }

            if (typeof number !== "number") {
                res.status(401).json({ message: "The number must be of type number." })
                return
            }

            const result = await this.testService.create({ text, number })
            res.status(201).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * `GET | http://0.0.0.0:0000/api/test`
     */
    public async read(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.testService.read()
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * `GET | http://0.0.0.0:0000/api/test/:id`
     */
    public async readOne(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

            const result = await this.testService.readOne(id)
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * `PUT | http://0.0.0.0:0000/api/test/:id`
     */
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

            const { text, number } = req.body

            if (text && typeof text !== "string") {
                res.status(401).json({ message: "The text must be of type string." })
                return
            }

            if (number && typeof number !== "number") {
                res.status(401).json({ message: "The number must be of type number." })
                return
            }

            const result = await this.testService.update(id, { text, number })
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * `DELETE | http://0.0.0.0:0000/api/test/:id`
     */
    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

            const result = await this.testService.delete(id)
            res.status(204).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }

    /**
     * `GET | http://0.0.0.0:0000/api/test/_`
     */
    public async __test__(_: Request, res: Response) {
        try {
            const testService = await this.testService.__test__()
            if (testService) {
                res.sendStatus(200)
                return
            } else {
                res.sendStatus(500)
                return
            }
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }
}

export default TestController