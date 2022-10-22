import { ObjectId } from "mongodb";
// Mongo-specfic - uniquite identifuer for all docs int he db
import dbConnect from "./dbConnect.js";


export async function getAllFurniture(req, res) {
    // connect to the database
    const db = dbConnect()
    // get the whole furniture collection
    const collection = await db.collection("furniture").find().toArray()
    // catch any errors - send to status 500
        .catch(err => {
            res.status(500).send(err);
            return;
        });
    // send back the array of furniture
    res.set('Cache-Control', 'public, max-age=300, s-maxage = 600') //this is example of using cache - not required
    res.send(collection);
}


export async function addNewFurniture(req, res) {
    
    // get new furniture from the body of the request
    const { brand, model, type, price } = req.body
    const newFurniture = { brand, model, type, price: Number(price) }
    // connect to database
    const db = dbConnect()
    // put this new furniture into our furniture collection in our db
    await db.collection('furniture').insertOne(newFurniture)
    // catch errors and send with status 500
    .catch(err => {    
        res.status(500).send(err)
        return
    })
    // return response with 201 all good
    res.status(201).send({ message: 'Furniture added'})
}

export async function updateFurniture(req, res) {
    const { furnitureId } = req.params
    const db = dbConnect()
    await db.collection('furniture')
        .findOneAndUpdate({ _id: new ObjectId(furnitureId) }, {$set: req.body} )
        .catch(err => {
            res.status(500).send(err)
            return
        })
   
    res.status(201).send({ message: 'Furniture updated '})
}