import UserRepository from "../repositories/user.repository";

class UserService {
    private userRepository = new UserRepository()

    public async listUsers() {
        const res = await this.userRepository.readUsers()
        return {
            message: "Retrieved users successfully!",
            responses: res
        }
    }
}

export default UserService