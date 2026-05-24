import db from "../db";
import bcrypt from "bcryptjs"

export type UserDTO = {
    id?: number,
    nome: string,
    email: string,
    senha: string,
    tipo_usuario: string
}

export type UserCreateDTO = Omit<UserDTO, "id">
export type UserReadDTO = Omit<UserDTO, "senha" | "tipo_usuario">
export type UserUpdateDTO = Partial<UserCreateDTO>
export type UserLoginDTO = Omit<UserDTO, "nome">

class UserRepository {
    async createNewUser(element: UserCreateDTO): Promise<void> {
        const query = "INSERT INTO usuario VALUES (DEFAULT, $1, $2, $3, $4)"
        await db.query(query, [element.nome, element.email, element.senha, element.tipo_usuario])
    }

    async readUsers(): Promise<UserReadDTO[]> {
        const query = "SELECT id, nome, email FROM usuario"
        const res = await db.query(query)
        return res.rows
    }

    async readUserPerID(id: string): Promise<UserReadDTO> {
        const query = "SELECT id, nome, email, tipo_usuario_id FROM usuario WHERE id = $1"
        const res = await db.query(query, [id])
        return res.rows[0]
    }

    async updateUser(element: UserUpdateDTO, id: string): Promise<void> {
        const keys = Object.keys(element) as (keyof UserUpdateDTO)[]
        if (keys.length === 0) return
        const sets = keys.map((key, index) => `${key} = $${index + 1}`)
        const values = keys.map(key => element[key])
        const query = `
            UPDATE usuario
            SET ${sets.join(", ")}
            WHERE id = $${keys.length + 1}
        `
        await db.query(query, [...values, id])
    }

    async deleteUser(id: string): Promise<void> {
        const query = "DELETE FROM usuario WHERE id = $1"
        await db.query(query, [id])
    }

    async comparePassword(email: string, senha: string): Promise<boolean> {
        const query = "SELECT senha FROM usuario WHERE email = $1"
        const res = await db.query(query, [email])
        if (res.rowCount === 0) return false
        return bcrypt.compareSync(senha, res.rows[0].senha)
    }
}

export default UserRepository