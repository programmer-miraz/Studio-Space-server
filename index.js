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
const bookingData = db.collection("booking")


app.get('/', (req, res) => {

    res.send('Hello World!');
});
///cetagory
app.get('/cetagory', async (req, res) => {
    const result = await categoryData.find({}).toArray()
    res.send(result)
})


// All Studio Data + Category Filter
app.get('/explore-studios', async (req, res) => {
    const { category } = req.query;

    const filter = {};

    if (category) {
        filter.category = category;
    }

    const result = await studiosData.find(filter).toArray();

    res.send(result);
});

//details 
app.get('/explore-studios/:id', async (req, res) => {
    const { id } = req.params
    const result = await studiosData.findOne({ _id: new ObjectId(id) })
    res.send(result)
})

//add studio
app.post("/add_studio", async (req, res) => {
    const data = req.body
    const result = await studiosData.insertOne(data)
    res.send(result)
})

// my listing
app.get("/my-listing/:email", async (req, res) => {
    const email = req.params.email;
    const result = await studiosData.find({ email: email }).toArray()
    res.send(result)

});

//edit get data
app.get("/my-listing-edit/:id", async (req, res) => {
    const { id } = req.params;
    const result = await studiosData.findOne({
        _id: new ObjectId(id),
    });

    res.send(result);
});


//boking collectio
app.post("/booking", async (req, res) => {
    const data = req.body
    const result = await bookingData.insertOne(data)
    res.send(result)
})

// Boking get
app.get("/booking/:email", async (req, res) => {
    const email = req.params.email;
    const result = await bookingData.find({ email: email }).toArray()
    res.send(result)

});


// delete my listing data 
app.delete("/my-listing/:email", async (req, res) => {
    const { email } = req.params
    const result = await studiosData.deleteOne({ email: email })
    res.send(result)

})
//updatedData 
app.patch("/my-listing-update/:id", async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await studiosData.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
    )
    res.json(result)


})


app.post('/', (req, res) => {
    res.send("home")

})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});