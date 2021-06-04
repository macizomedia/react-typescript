export type Constructor<T> = new (...args: any[]) => T


function createInMemoryDatabase<T>() {
    return class memoryDatabase {
        private db: Record<string, T> = {}

        set(id: string, value: T) {
            this.db[id] = value
        }

        get(id: string): T {
            return this.db[id]
        }

        getObject(): object {
            return this.db
        }
    }
}

const stringDatabase = createInMemoryDatabase<string>()

const dbStr = new stringDatabase()

dbStr.set('one', 'first log')

export function makeHandler<T extends Constructor<{
    getObject(): object;
}>> (Base: T, fn: (data: object) => void) {
    return class makeHandler extends Base {
        handler() {
            fn(this.getObject())
        }
    }

}

