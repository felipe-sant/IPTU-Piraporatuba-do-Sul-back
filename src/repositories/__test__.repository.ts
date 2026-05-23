import db from "../db";

export type TestType = {
    id?: number,
    text: string,
    number: number
}

class TestRepository {
    async createNewTest(element: TestType): Promise<void> {
        const query = "INSERT INTO test VALUES (DEFAULT, $1, $2)"
        await db.query(query, [element.text, element.number])
    }

    async readTest(): Promise<TestType[]> {
        const query = "SELECT * FROM test"
        const res = await db.query(query)
        return res.rows
    }

    async readTestPerID(id: string): Promise<TestType> {
        const query = "SELECT * FROM test WHERE id = $1"
        const res = await db.query(query, [id])
        return res.rows[0]
    }

    async updateTest(element: Partial<TestType>, id: string): Promise<void> {
        const keys = Object.keys(element) as (keyof typeof element)[]
        if (keys.length === 0) return

        const sets = keys.map((key, index) => `${key} = $${index + 1}`)
        const values = keys.map(key => element[key])

        const query = `
            UPDATE test
            SET ${sets.join(", ")}
            WHERE id = $${keys.length + 1}
        `

        await db.query(query, [...values, id])
    }

    async deleteTest(id: string): Promise<void> {
        const query = "DELETE FROM test WHERE id = $1"
        await db.query(query, [id])
    }

    async __test__(): Promise<boolean> {
        const res = await db.query("SELECT now()")
        return res.rowCount === 1
    }
}

export default TestRepository