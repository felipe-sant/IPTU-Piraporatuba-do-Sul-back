import db from "../db";
import bcrypt from "bcryptjs"

export type UserDTO = {
    id?: number,
    nome: string,
    email: string,
    senha: string,
    tipo_usuario_id: number
}

export type UserCreateDTO = Omit<UserDTO, "id">
export type UserReadDTO = Omit<UserDTO, "senha">
export type UserUpdateDTO = Partial<UserCreateDTO>
export type UserLoginDTO = Omit<UserDTO, "nome">

class UserRepository {
    /* TODO: aplicar na camada service o hashpassword */
    async createNewUser(element: UserCreateDTO): Promise<void> {
        const query = "INSERT INTO usuario (nome, email, senha, tipo_usuario_id) VALUES ($1, $2, $3, $4)"
        await db.query(query, [element.nome, element.email, element.senha, element.tipo_usuario_id])
    }

    async readUsers(): Promise<UserReadDTO[]> {
        const query = "SELECT id, nome, email, tipo_usuario_id FROM usuario"
        const res = await db.query(query)
        return res.rows
    }

    async readUserPerID(id: string): Promise<UserReadDTO | null> {
        const query = "SELECT id, nome, email, tipo_usuario_id FROM usuario WHERE id = $1"
        const res = await db.query(query, [id])
        if (res.rowCount === 0) return null
        return res.rows[0]
    }

    /* TODO: aplicar que somente usuários do tipo admin conseguirem mudar o tipo_usuario_id */
    async updateUser(element: UserUpdateDTO, id: string): Promise<void> {
        const allowedKeys: (keyof UserUpdateDTO)[] = ["nome", "email", "tipo_usuario_id"]
        const keys = allowedKeys.filter((key) => typeof element[key] !== "undefined")
        if (keys.length === 0) return

        const sets = keys.map((key, index) => `${key} = $${index + 1}`)
        const values = keys.map((key) => element[key])

        const query = `
            UPDATE usuario
            SET ${sets.join(", ")}
            WHERE id = $${keys.length + 1}
        `
        await db.query(query, [...values, id])
    }

    /* TODO: aplicar na camada service o hashpassword */
    async updatePassword(password: string, id: string): Promise<void> {
        const query = `UPDATE usuario SET senha = $1 WHERE id = $2`
        await db.query(query, [password, id])
    }

    async deleteUser(id: string): Promise<void> {
        const query = "DELETE FROM usuario WHERE id = $1"
        await db.query(query, [id])
    }

    async comparePassword(email: string, senha: string): Promise<boolean> {
        const query = "SELECT senha FROM usuario WHERE email = $1"
        const res = await db.query(query, [email])
        if (res.rowCount === 0) return false
        return await new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(senha, res.rows[0].senha, (err, same) => {
                if (err) return reject(err)
                resolve(!!same)
            })
        })
    }
}

export default UserRepository