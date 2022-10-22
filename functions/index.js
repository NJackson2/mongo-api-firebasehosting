import functions from 'firebase-functions'
// use this above line if hosting on firebase
import express from 'express'
// bringing in express from the node_modules
import cors from 'cors'

// not a default so need curly braces below
import { getAllFurniture, addNewFurniture, updateFurniture } from './src/furniture.js'

const app = express()
app.use(cors())
app.use(express.json())
//

app.get('/furniture', getAllFurniture)
app.post('/furniture', addNewFurniture)
app.patch('/furniture/:furnitureId', updateFurniture)

// No port here, just a cloud function

export const api = functions.https.onRequest(app)

