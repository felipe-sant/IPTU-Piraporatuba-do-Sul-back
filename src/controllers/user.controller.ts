import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
    private userService = new UserService()

    public async listUsers(_: Request, res: Response): Promise<void> {
        try {
            const result = await this.userService.listUsers()
            res.status(200).json(result)
        } catch (error: unknown) {
            console.error("Error:", error)
            res.sendStatus(500)
        }
    }
}

export default UserController