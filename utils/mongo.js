import mongoose from 'mongoose'

const connection = {}

async function connectToDatabase() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.DB_COLLECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
}

export default connectToDatabase