import { join } from 'path'
import lowDb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
interface Status {
    key: string
    username: string
    status: 'UP' | 'DOWN' | 'COOLING' | 'SUSPENDED'
}
interface User {
    key: string
    status: boolean
    username: string
    password: string
}
interface SessionStates {
    key: string
    session: Object
}
interface Database {
    users: Array<User>
    status: Array<Status>
    sessionStates: Array<SessionStates>
}
const file = join(__dirname, './db.json')
const db = lowDb(new FileSync<Database>(file))

db.read()

db.defaults( {users: [], status: [], sessionStates: []}).write()

export default db
