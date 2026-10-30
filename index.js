import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5000;
app.use(express.json())
app.use(cors())

const client = new MongoClient(process.env.MONGO_DB_URI);
export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}
const connectClient = connectToMongoDB()
const db = connectClient.db()
const user_1 = db.collection()

app.get('/', (req, res) => {

    res.send('Hello World!');
});


app.post('/', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});