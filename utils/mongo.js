import { MongoClient } from 'mongodb'

const { DB_COLLECTION, MONGODB_DB } = process.env

if (!DB_COLLECTION) {
    throw new Error(
        'Please define the DB_COLLECTION environment variable'
    )
}

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        cached.promise = MongoClient.connect(DB_COLLECTION, opts)
            .then((client) => {
                return {
                    client
                }
            })
    }
    cached.conn = await cached.promise
    return cached.conn
}