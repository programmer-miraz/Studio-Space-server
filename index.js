import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb';

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
const connectClient = await connectToMongoDB()
const db = connectClient.db("Studio-space")
const categoryData = db.collection("category")
const studiosData = db.collection("cart")


app.get('/', (req, res) => {

    res.send('Hello World!');
});

app.get('/cetagory', async (req, res) => {
    const result = await categoryData.find({}).toArray()
    res.send(result)
})

//cart data 
app.get('/explore-studios', async (req, res) => {
    const result = await studiosData.find({}).toArray()
    res.send(result)
})

//details 
app.get('/explore-studios/:id', async (req, res) => {
    const { id } = req.params
    const result = await studiosData.findOne({ _id: new ObjectId(id) })
    res.send(result)
})


app.post('/', (req, res) => {
    res.send("home")

})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});