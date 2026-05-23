import TestRepository, { TestType } from "../repositories/__test__.repository"

class TestService {
    private testRepository = new TestRepository()

    public async create(test: TestType) {
        await this.testRepository.createNewTest(test)
        return {
            message: "Resource created successfully!"
        }
    }

    async read() {
        const res = await this.testRepository.readTest()
        return {
            message: "Retrieved resources successfully!",
            responses: res
        }
    }

    public async readOne(id: string) {
        const res = await this.testRepository.readTestPerID(id)
        return {
            message: `Retrieved resource with ID ${id} successfully!`,
            responses: res
        }
    }

    public async update(id: string, test: Partial<TestType>) {
        const obj: Partial<TestType> = {}

        if (test.text) obj.text = test.text
        if (test.number) obj.number = test.number

        await this.testRepository.updateTest(obj, id)
        return {
            message: `Updated resource with ID ${id} successfully!`,
        }
    }

    public async delete(id: string) {
        await this.testRepository.deleteTest(id)
        return {
            message: `Deleted resource with ID ${id} successfully!`
        }
    }

    public async __test__() {
        return (await this.testRepository.__test__())
    }
}

export default TestService