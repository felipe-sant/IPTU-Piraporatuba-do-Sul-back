import { Router } from "express"
import UserController from "../controllers/user.controller"

class UserRoutes {
    private userController = new UserController()
    private router = Router()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(
            "/users",
            this.userController.listUsers.bind(this.userController)
        )
    }

    public getRouter() {
        return this.router
    }
}

const userRoutes = new UserRoutes().getRouter()
export default userRoutes