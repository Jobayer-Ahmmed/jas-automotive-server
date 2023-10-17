import express from "express"
import cors from "cors"
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import 'dotenv/config'

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())


// console.log(process.env.DB_USER, process.env.SECRET_KEY)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.3j47jpb.mongodb.net/?retryWrites=true&w=majority`
// const uri = "mongodb://127.0.0.1:27017"

const client = new MongoClient(uri);

async function run() {
  try {


    const DB = client.db("jasDB")
    const userCollection = DB.collection("userCollection")

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.get("/", (req, res)=>{
      res.send("I am from back end")
    })
    app.get("/user", async(req, res)=>{
      const cursor = userCollection.find()
      const result =  await cursor.toArray()
      res.send(result)
    })
    app.get("/edit/:editId", async(req, res)=>{
      const id = req.params.editId
      console.log("from edit: ",id)
      const givingId = new ObjectId(id)
      const query = {_id : givingId}
      const result = await cafeCollection.findOne(query)
      res.send(result)
    })

    app.post("/user", async(req, res)=>{
      const newUser = req.body
      console.log(newUser)
      const result  =await userCollection.insertOne(newUser)
      res.send(result)

    })



    app.get("/cafe", async(req, res)=>{
      const cursor = cafeCollection.find()
      const result =  await cursor.toArray()
      res.send(result)
    })
    app.post("/cafe", async(req, res)=>{
      const newCafe = req.body
      console.log(newCafe)
      const result  =await cafeCollection.insertOne(newCafe)
      res.send(result)

    })
    
    app.put("/edit/:editId", async(req, res)=>{
      const id = req.params.editId
      console.log("backend edit: ",id)
      const givingId = new ObjectId(id)
      const query = {_id : givingId}
      const data = req.body
      const updateData = {
            $set:{
              name : data.name,
              price : data.price,
              taste : data.taste,
              photo : data.photo
            }
          }
      const result = await cafeCollection.updateOne(query, updateData)
      res.send(result)
    })

    app.delete("/delete/:deleteId", async(req, res)=>{
      const id = req.params.deleteId
      console.log(id)
      const givingId = new ObjectId(id)
      const query = {_id : givingId}
      const result = await cafeCollection.deleteOne(query)
      res.send(result)
    })
  } 
  catch(err){
    console.log("My error is : ",err)
  }
}
run().catch(console.dir);


app.listen(port, console.log(`Port ${port} is running`))









